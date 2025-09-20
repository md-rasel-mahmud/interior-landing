"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import {
  Home,
  Building2,
  Palette,
  Lightbulb,
  Hammer,
  Ruler,
} from "lucide-react";
import Heading from "@/components/common/Heading";

const ServicesSection = () => {
  const services = [
    {
      icon: Home,
      title: "Residential Design",
      description:
        "Transform your home into a personalized sanctuary that reflects your lifestyle and taste.",
    },
    {
      icon: Building2,
      title: "Commercial Spaces",
      description:
        "Create inspiring work environments that enhance productivity and brand identity.",
    },
    {
      icon: Palette,
      title: "Color Consultation",
      description:
        "Expert color selection to create the perfect mood and atmosphere for any space.",
    },
    {
      icon: Lightbulb,
      title: "Lighting Design",
      description:
        "Innovative lighting solutions that enhance both functionality and ambiance.",
    },
    {
      icon: Hammer,
      title: "Full Renovation",
      description:
        "Complete transformation services from concept to final execution.",
    },
    {
      icon: Ruler,
      title: "Space Planning",
      description: "Optimize your space for maximum functionality and flow.",
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen py-20 bg-background w-screen"
    >
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <Heading>Our Services</Heading>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <AnimatedSection
              key={service.title}
              animation="scale"
              delay={0.1 * (index + 1)}
            >
              <motion.div
                className="bg-foreground/5 border border-primary/40 min-h-[20rem] rounded-2xl p-8 group hover:shadow-gold transition-all duration-500 cursor-pointer"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  className="flex items-center justify-center w-16 h-16 bg-gradient rounded-full mb-6 mx-auto group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <service.icon className="w-8 h-8 text-background/80" />
                </motion.div>

                <motion.h3
                  className="font-luxury text-2xl font-semibold text-accent text-center mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {service.title}
                </motion.h3>

                <motion.p
                  className="font-inter text-foreground/80 text-center leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {service.description}
                </motion.p>

                {/* Hover Effect Line */}
                <motion.div className="w-0 h-px bg-gradient mx-auto mt-6 group-hover:w-12 transition-all duration-300" />
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
