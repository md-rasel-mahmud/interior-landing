"use client";

import { motion } from "framer-motion";
import { Lightbulb, Layout, Palette, CheckCircle } from "lucide-react";
import Heading from "@/components/common/Heading";
import { cn } from "@/lib/utils";

const ProcessPage = () => {
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
    <section id="process" className="min-h-screen py-20 bg-background w-screen">
      <div className="container mx-auto px-6 relative">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-20"
        >
          <Heading>Our Process</Heading>
        </motion.div>

        {/* Vertical Line Center */}
        <div className="absolute left-1/2 top-40 bottom-20 w-[3px] bg-gradient-to-b from-accent/50 to-transparent hidden lg:block" />

        <div className="flex flex-col space-y-24">
          {processSteps.map((step, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={step.title}
                className={`relative flex flex-col lg:flex-row items-center ${
                  isLeft ? "lg:justify-start" : "lg:justify-end"
                }`}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                {/* Content Card */}
                <div
                  className={cn(
                    "glass-effect-bg rounded-2xl p-8 max-w-lg !bg-primary/10 border !border-primary/40 hover:shadow-gold transition-all duration-500",
                    isLeft ? "lg:mr-[calc(50%-12px)]" : "lg:ml-[calc(50%-12px)]"
                  )}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-14 h-14 bg-gradient-to-tr from-accent to-accent/60 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">
                      {step.number}
                    </div>
                    <step.icon className="w-8 h-8 text-accent" />
                    <h3 className="ml-3 font-luxury text-2xl font-semibold text-gray-800">
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-inter text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector Dot */}
                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-1/2 -mt-3">
                  <motion.div
                    className="w-6 h-6 rounded-full bg-accent border-4 border-white shadow-lg"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: false }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessPage;
