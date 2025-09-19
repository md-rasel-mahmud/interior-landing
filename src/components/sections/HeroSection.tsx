"use client";
import React from "react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-interior.jpg";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image Wrapper */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.img
          src={heroImage.src}
          alt="Luxury Interior Design"
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }} // slightly smaller scale to prevent overflow
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Optional minimal overlay text */}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
