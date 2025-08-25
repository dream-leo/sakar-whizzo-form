"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Send,
  User,
  Phone,
  Heart,
  DollarSign,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  interested: yup
    .string()
    .oneOf(["yes", "no"], "Please select an option")
    .required("This field is required"),
  budget: yup
    .string()
    .oneOf(
      ["90lac-1cr", "1cr-110cr", "110cr-120cr", "flexible"],
      "Please select a budget range"
    )
    .required("Budget selection is required"),
});

type FormData = yup.InferType<typeof schema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitType, setSubmitType] = useState<"success" | "error" | "">("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log("Form Data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitMessage(
        "Thank you for your interest! We will contact you within 24 hours."
      );
      setSubmitType("success");
      reset();
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.");
      setSubmitType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1], // Use array format instead of string
      },
    },
  };

  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#CEAE92] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#E8D5C4] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-6 py-3 mb-6 bg-[#CEAE92]/20 rounded-full border border-[#CEAE92]/30">
            <Heart className="w-5 h-5 text-[#CEAE92] mr-2" />
            <span className="text-sm font-medium text-[#CEAE92]">
              Express Your Interest
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to <span className="text-[#CEAE92]">Experience</span> Luxury?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards your dream home. Fill out this form and
            our experts will guide you through your luxury living journey.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Name Field */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label
                    htmlFor="name"
                    className="flex items-center text-sm font-semibold text-white mb-3"
                  >
                    <User className="w-4 h-4 text-[#CEAE92] mr-2" />
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-[#CEAE92] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                    {watchedValues.name && (
                      <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                    )}
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center text-sm text-red-400"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.name.message}
                    </motion.p>
                  )}
                </motion.div>

                {/* Mobile Field */}
                <motion.div variants={itemVariants} className="space-y-3">
                  <label
                    htmlFor="mobile"
                    className="flex items-center text-sm font-semibold text-white mb-3"
                  >
                    <Phone className="w-4 h-4 text-[#CEAE92] mr-2" />
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      id="mobile"
                      {...register("mobile")}
                      className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl focus:ring-2 focus:ring-[#CEAE92] focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300"
                      placeholder="Enter your mobile number"
                    />
                    {watchedValues.mobile &&
                      watchedValues.mobile.length === 10 && (
                        <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-400" />
                      )}
                  </div>
                  {errors.mobile && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center text-sm text-red-400"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.mobile.message}
                    </motion.p>
                  )}
                </motion.div>
              </div>

              {/* Interest Question */}
              <motion.div variants={itemVariants} className="space-y-4">
                <label className="flex items-center text-sm font-semibold text-white mb-4">
                  <Heart className="w-4 h-4 text-[#CEAE92] mr-2" />
                  Are you interested in owning a 3BHK home in Manjalpur,
                  Vadodara? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      value: "yes",
                      label: "Yes, I'm interested",
                      color: "green",
                    },
                    { value: "no", label: "No, not right now", color: "gray" },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="relative cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register("interested")}
                        className="sr-only"
                      />
                      <div
                        className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                          watchedValues.interested === option.value
                            ? "bg-[#CEAE92]/20 border-[#CEAE92] text-white"
                            : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.label}</span>
                          {watchedValues.interested === option.value && (
                            <CheckCircle className="w-5 h-5 text-[#CEAE92]" />
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.interested && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-sm text-red-400"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.interested.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Budget Question */}
              <motion.div variants={itemVariants} className="space-y-4">
                <label className="flex items-center text-sm font-semibold text-white mb-4">
                  <DollarSign className="w-4 h-4 text-[#CEAE92] mr-2" />
                  What is your approximate budget for a 3BHK home? *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: "90lac-1cr", label: "₹90 Lac to ₹1 Crore" },
                    { value: "1cr-110cr", label: "₹1 Crore to ₹1.10 Crore" },
                    {
                      value: "110cr-120cr",
                      label: "₹1.10 Crore to ₹1.20 Crore",
                    },
                    {
                      value: "flexible",
                      label: "Open to Discuss / Flexible Budget",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="relative cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register("budget")}
                        className="sr-only"
                      />
                      <div
                        className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 ${
                          watchedValues.budget === option.value
                            ? "bg-[#CEAE92]/20 border-[#CEAE92] text-white"
                            : "bg-white/5 border-white/20 text-gray-300 hover:border-white/40"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.label}</span>
                          {watchedValues.budget === option.value && (
                            <CheckCircle className="w-5 h-5 text-[#CEAE92]" />
                          )}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.budget && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center text-sm text-red-400"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.budget.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-6">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#CEAE92] to-[#B8956F] text-white py-6 px-8 rounded-2xl font-bold text-lg hover:from-[#B8956F] hover:to-[#CEAE92] focus:ring-4 focus:ring-[#CEAE92]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Submitting Your Interest...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Send className="w-5 h-5 mr-3" />
                      Express Your Interest
                    </div>
                  )}
                </motion.button>
              </motion.div>

              {/* Submit Message */}
              {submitMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-6 rounded-2xl border ${
                    submitType === "success"
                      ? "bg-green-500/10 border-green-500/30 text-green-300"
                      : "bg-red-500/10 border-red-500/30 text-red-300"
                  }`}
                >
                  <div className="flex items-center">
                    {submitType === "success" ? (
                      <CheckCircle className="w-5 h-5 mr-3" />
                    ) : (
                      <AlertCircle className="w-5 h-5 mr-3" />
                    )}
                    {submitMessage}
                  </div>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
