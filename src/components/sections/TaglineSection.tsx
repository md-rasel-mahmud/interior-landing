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
            className="font-bold text-6xl md:text-7xl text-primary mb-8"
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
            <p className="font-thin text-xl md:text-2xl text-foreground/80 italic">
              &quot;We shape our buildings [so they] shape us.&quot;
            </p>
            <p className="font-thin text-lg text-foreground/70 mt-4">
              — Winston Churchill
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TaglineSection;
