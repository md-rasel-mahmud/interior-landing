"use client";

import { motion } from "framer-motion";
import { Lightbulb, Layout, Palette, CheckCircle } from "lucide-react";
import Heading from "@/components/common/Heading";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProcessSection = ({ isPage }: { isPage?: boolean }) => {
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
      <div className="max-w-screen-lg mx-auto px-6 relative">
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

        <div className="flex flex-col space-y-20">
          {processSteps
            .slice(0, isPage ? processSteps.length : 2)
            .map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  className={cn(
                    "relative flex flex-col lg:flex-row items-center",
                    isLeft ? "lg:justify-start" : "lg:justify-end"
                  )}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: false, amount: 0.3 }}
                >
                  {/* Content Card */}
                  <div
                    className={cn(
                      "rounded-2xl p-8 max-w-lg transition-all duration-500",
                      isLeft
                        ? "lg:mr-[calc(50%-12px)]"
                        : "lg:ml-[calc(50%-12px)]"
                    )}
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-tr from-accent to-accent/60 rounded-full flex items-center justify-center text-background font-bold text-xl mr-4 shadow-md">
                        {step.number}
                      </div>
                      <step.icon className="w-8 h-8 text-accent" />
                      <h3 className="ml-3 font-luxury text-2xl font-semibold text-gray-800">
                        {step.title}
                      </h3>
                    </div>
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

        {!isPage && processSteps.length > 2 && (
          <div className="text-center mu-3">
            <Link
              href="/process"
              className="inline-block px-6 py-3 bg-accent text-background font-semibold rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              View Full Process
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessSection;
