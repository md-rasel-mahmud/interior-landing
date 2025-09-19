"use client";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import { Lightbulb, Layout, Palette, CheckCircle } from "lucide-react";
import Heading from "@/components/common/Heading";

const ProcessSection = () => {
  const processSteps = [
    {
      icon: Lightbulb,
      title: "Concept Development",
      description:
        "We begin by understanding your vision, lifestyle, and design preferences to create a unique concept.",
      number: "01",
    },
    {
      icon: Layout,
      title: "Space Planning",
      description:
        "Strategic planning to optimize functionality and flow while maximizing the potential of your space.",
      number: "02",
    },
    {
      icon: Palette,
      title: "Material & Color Selection",
      description:
        "Curated selection of premium materials, textures, and colors that bring your vision to life.",
      number: "03",
    },
    {
      icon: CheckCircle,
      title: "Execution & Handover",
      description:
        "Seamless project management and execution, ensuring every detail meets our luxury standards.",
      number: "04",
    },
  ];

  return (
    <section id="process" className="min-h-screen py-20 bg-luxury-navy">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <Heading>Our Process</Heading>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12">
          {processSteps.map((step, index) => (
            <AnimatedSection
              key={step.title}
              animation={index % 2 === 0 ? "slideRight" : "slideLeft"}
              delay={0.2 * (index + 1)}
            >
              <motion.div
                className="glass-luxury-background rounded-2xl p-8 group hover:shadow-gold transition-all duration-500"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-start space-x-6">
                  {/* Step Number */}
                  <motion.div
                    className="flex-shrink-0"
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center">
                        <span className="font-luxury text-2xl font-bold text-luxury-navy">
                          {step.number}
                        </span>
                      </div>
                      <motion.div
                        className="absolute inset-0 bg-accent rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <motion.div
                      className="flex items-center mb-4"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <step.icon className="w-8 h-8 text-accent mr-3 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="font-luxury text-2xl font-semibold text-accent">
                        {step.title}
                      </h3>
                    </motion.div>

                    <motion.p
                      className="font-inter text-background/50 leading-relaxed"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {step.description}
                    </motion.p>

                    {/* Progress Line */}
                    {index < processSteps.length - 1 && (
                      <motion.div
                        className="hidden lg:block absolute left-[70px] top-[120px] w-px h-16 bg-gradient-to-b from-accent to-transparent"
                        initial={{ scaleY: 0, originY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
