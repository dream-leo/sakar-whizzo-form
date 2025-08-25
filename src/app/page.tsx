import ContactForm from "@/components/ContactForm";
import Header from "@/components/Header";
import VideoSection from "@/components/VideoSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <VideoSection />
      <ContactForm />
    </main>
  );
}
