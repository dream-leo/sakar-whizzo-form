"use client";
import { motion, Variants } from "framer-motion";
import { Play, Eye, Star, Users } from "lucide-react";

export default function VideoSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.42, 0, 0.58, 1],
      },
    },
  };

  return (
    <section className="relative w-full py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#CEAE92] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-4 w-72 h-72 bg-[#E8D5C4] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#DCC5A8] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-2 mb-6 bg-[#CEAE92]/10 rounded-full border border-[#CEAE92]/20">
            <Play className="w-4 h-4 text-[#CEAE92] mr-2" />
            <span className="text-sm font-medium text-[#CEAE92]">
              Exclusive Videos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Experience <span className="text-[#CEAE92]">Sakar Whizzo</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Take a virtual tour and hear from our satisfied residents about
            their luxury living experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto"
        >
          {/* Sample House Tour Video */}
          <motion.div variants={itemVariants} className="group">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#CEAE92]/30">
              {/* Video Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#CEAE92] to-[#B8956F] rounded-xl flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Sample House Tour
                    </h3>
                    <p className="text-gray-600">3BHK Luxury Apartment</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-[#CEAE92]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">Premium</span>
                </div>
              </div>

              {/* Video Container - Fixed */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500">
                <iframe
                  src="https://www.youtube.com/embed/36B48S66wjI"
                  title="Sample House Tour - Sakar Whizzo"
                  className="w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Stats */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Play className="w-4 h-4" />
                    <span className="text-sm">3:08 mins</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Virtual Tour</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-[#CEAE92]/10 rounded-full">
                  <span className="text-xs font-medium text-[#CEAE92]">
                    Featured
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Client Review Video */}
          <motion.div variants={itemVariants} className="group">
            <div className="relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[#CEAE92]/30">
              {/* Video Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#B8956F] to-[#CEAE92] rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      Client Review
                    </h3>
                    <p className="text-gray-600">Resident Experience</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-green-600">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold">5.0</span>
                </div>
              </div>

              {/* Video Container - Fixed */}
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-500">
                <iframe
                  src="https://www.youtube.com/embed/fXc96i6x-L4"
                  title="Client Review - Sakar Whizzo"
                  className="w-full h-full rounded-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Video Stats */}
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Play className="w-4 h-4" />
                    <span className="text-sm">1:53 mins</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Testimonial</span>
                  </div>
                </div>
                <div className="px-3 py-1 bg-green-100 rounded-full">
                  <span className="text-xs font-medium text-green-600">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
