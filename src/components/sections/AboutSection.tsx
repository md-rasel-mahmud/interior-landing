"use client";
import React from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import ownerImage from "@/assets/owner-portrait.jpg";
import Image from "next/image";

const AboutSection = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center py-20 bg-background w-screen"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <AnimatedSection animation="slideRight" delay={0.2}>
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative overflow-hidden rounded-2xl shadow-luxury">
                <Image
                  src={ownerImage}
                  alt="Founder of Platonic Interior Design"
                  className="w-full h-[600px] object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/30 to-transparent"></div>
              </div>

              {/* Decorative Frame */}
              <motion.div
                className="absolute -top-4 -left-4 w-full h-full border-2 border-accent rounded-2xl -z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>
          </AnimatedSection>

          {/* Content */}
          <div className="space-y-8">
            <AnimatedSection animation="slideLeft" delay={0.4}>
              <motion.h2
                className=" text-5xl md:text-6xl font-bold text-gradient-foreground leading-tight "
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                About Platonic
              </motion.h2>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={0.6}>
              <motion.div
                className="space-y-6 text-foreground/90"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
              >
                <p className="font-inter text-lg leading-relaxed">
                  As the founder of Platonic, my vision has always been simple:
                  to design and build spaces that inspire. I believe every home
                  tells a story, and our role is to bring that story to life
                  with craftsmanship, creativity, and care.
                </p>

                <p className="font-inter text-lg leading-relaxed">
                  What began as a passion for architecture and design has grown
                  into a full-service firm serving individuals, corporates, and
                  developers. Our philosophy is simple: to blend creativity with
                  precision, ensuring every project reflects both beauty and
                  function.
                </p>

                <motion.div
                  className="pt-6"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4 text-accent">
                    <div className="w-12 h-px bg-gradient-to-l from-primary"></div>

                    <span className="font-luxury text-xl italic">
                      Creating timeless spaces
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
