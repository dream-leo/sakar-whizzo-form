import { NextRequest, NextResponse } from "next/server";

// Types for better type safety
interface LeadData {
  name: string;
  mobile: string;
  interested: "yes" | "no";
  budget: string;
  timestamp?: string;
  source?: string;
}

interface WebhookResponse {
  success: boolean;
  message?: string;
  id?: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse incoming lead data
    const leadData: LeadData = await request.json();

    // Validate required fields
    if (!leadData.name || !leadData.mobile) {
      return NextResponse.json(
        { error: "Name and mobile are required fields" },
        { status: 400 }
      );
    }

    // Validate mobile number format
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(leadData.mobile)) {
      return NextResponse.json(
        { error: "Invalid mobile number format" },
        { status: 400 }
      );
    }

    // Get webhook URL from environment variables
    const leadWebhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (!leadWebhookUrl) {
      console.error("LEAD_WEBHOOK_URL not configured");
      return NextResponse.json(
        { error: "Lead processing service not configured" },
        { status: 500 }
      );
    }

    // Prepare lead data for webhook
    const webhookPayload = {
      ...leadData,
      timestamp: new Date().toISOString(),
      source: "sakar_whizzo_website",
      user_agent: request.headers.get("user-agent") || "unknown",
      ip_address:
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown",
      // lead_score: calculateLeadScore(leadData),
      formatted_budget: formatBudget(leadData.budget),
    };

    console.log("Processing lead:", webhookPayload);

    // Send lead data to webhook (Make.com or any other service)
    const webhookResponse = await fetch(leadWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.LEAD_API_KEY}`, // if required
        "User-Agent": "SakarWhizzo-LeadAPI/1.0",
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      const errorText = await webhookResponse.text();
      console.error("Lead webhook error:", errorText);

      return NextResponse.json(
        {
          error: "Failed to process your lead. Please try again.",
          details:
            process.env.NODE_ENV === "development" ? errorText : undefined,
        },
        { status: webhookResponse.status }
      );
    }

    // Parse webhook response
    let webhookData: WebhookResponse;
    try {
      webhookData = await webhookResponse.json();
    } catch {
      // Some webhooks might not return JSON
      webhookData = { success: true, message: "Lead processed successfully" };
    }

    // Log successful lead submission
    console.log("Lead processed successfully:", webhookData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Your interest has been registered successfully!",
        leadId: webhookData.id || `lead_${Date.now()}`,
        timestamp: webhookPayload.timestamp,
        nextSteps: "Our team will contact you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lead API Error:", error);

    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
        details:
          process.env.NODE_ENV === "development"
            ? (error as Error).message
            : undefined,
      },
      { status: 500 }
    );
  }
}

// Optional: Handle GET requests for API status
export async function GET() {
  return NextResponse.json({
    message: "Sakar Whizzo Lead API",
    status: "active",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      submit: "POST /api/lead",
    },
  });
}

// Utility functions
function calculateLeadScore(data: LeadData): number {
  let score = 0;

  if (data.interested === "yes") score += 50;
  if (data.budget !== "flexible") score += 30;
  if (data.mobile.length === 10) score += 20;

  return score;
}

function formatBudget(budget: string): string {
  const budgetMap: Record<string, string> = {
    "90lac-1cr": "₹90 Lakhs - ₹1 Crore",
    "1cr-110cr": "₹1 Crore - ₹1.10 Crore",
    "110cr-120cr": "₹1.10 Crore - ₹1.20 Crore",
    flexible: "Flexible Budget",
  };
  return budgetMap[budget] || budget;
}
