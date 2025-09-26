"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";

const TaglineSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-background py-20 w-screen">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <motion.h1
            className="font-poppins font-bold text-6xl md:text-8xl text-primary mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            Designing dreams,
            <br />
            Building realities
          </motion.h1>
        </AnimatedSection>

        <AnimatedSection animation="fade" delay={0.8}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <p className="font-luxury text-xl md:text-2xl text-primary italic">
              &quot;We shape our buildings [so they] shape us.&quot;
            </p>
            <p className="font-inter text-lg text-primary/60 mt-4">
              — Winston Churchill
            </p>
          </motion.div>
        </AnimatedSection>

        {/* Decorative Elements */}
        <motion.div
          className="absolute left-1/4 top-1/4 w-2 h-2 bg-accent rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 w-3 h-3 bg-accent rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
      </div>
    </section>
  );
};

export default TaglineSection;
