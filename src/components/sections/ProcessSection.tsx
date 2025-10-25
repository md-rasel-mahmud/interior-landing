"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  FileText,
  Palette,
  Eye,
  CheckCircle,
  Package,
  Hammer,
} from "lucide-react";
import Heading from "@/components/common/Heading";
import { cn } from "@/lib/utils";
import NavigateButton from "@/components/common/NavigateButton";

const ProcessSection = ({ isPage }: { isPage?: boolean }) => {
  const processSteps = [
    {
      icon: Lightbulb,
      title: "Initial Consultation",
      number: "01",
    },
    {
      icon: FileText,
      title: "Onboarding (Quotation, Contract, Timeline)",
      number: "02",
    },
    {
      icon: Palette,
      title: "Concept Design & Approval",
      number: "03",
    },
    {
      icon: Eye,
      title: "Design Review",
      number: "04",
    },
    {
      icon: CheckCircle,
      title: "Final Design Approval",
      number: "05",
    },
    {
      icon: Package,
      title: "Design Package Delivery",
      number: "06",
    },
    {
      icon: Hammer,
      title: "Execution Optional (Design & Build)",
      number: "07",
    },
  ];

  return (
    <section
      id="process"
      className="min-h-screen py-20 bg-background w-screen overflow-x-auto"
    >
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
        <div className="absolute lg:left-1/2 top-[18%] lg:top-40 bottom-20 w-[3px] bg-gradient-to-b from-primary/50 to-transparent  " />

        <div className="flex flex-col lg:space-y-20">
          {processSteps
            .slice(0, isPage ? processSteps.length : 2)
            .map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div key={step.title}>
                  <motion.div
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
                        "rounded-2xl py-4 px-6 lg:p-8 max-w-lg transition-all duration-500 flex justify-start w-full lg:w-1/2"
                      )}
                    >
                      <div className="flex justify-start items-center mb-6 gap-2">
                        <div>
                          <div className="w-14 h-14 leading-[0] bg-gradient-to-tr from-primary to-primary/60 rounded-full flex items-center justify-center text-background font-bold text-xl shadow-md">
                            {step.number}
                          </div>
                        </div>

                        <step.icon className="w-8 h-8 hidden lg:block text-primary" />

                        <h3 className="font-luxury lg:text-2xl font-semibold text-gray-800">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    {/* Connector Dot */}
                    <div className="absolute left-0 lg:left-1/2 transform -translate-x-1/2 top-[40%] lg:top-1/2 -mt-3">
                      <motion.div
                        className="w-6 h-6 rounded-full bg-primary border-4 border-white shadow-lg"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: false }}
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
        </div>

        {!isPage && processSteps.length > 2 && (
          <div className="text-center mu-3">
            <NavigateButton href="/process">View Full Process</NavigateButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProcessSection;
