"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import Heading from "@/components/common/Heading";
import { services } from "@/constrain/services-list";
import Link from "next/link";

const ServicesSection = ({ isPage }: { isPage?: boolean }) => {
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
          {services
            .slice(0, isPage ? services.length : 3)
            .map((service, index) => (
              <AnimatedSection
                key={service.title}
                animation="scale"
                delay={0.1 * (index + 1)}
              >
                <motion.div
                  className="bg-foreground/5 border border-primary/40 min-h-[5rem] rounded-2xl p-8 group hover:shadow-gold transition-all duration-500 cursor-pointer"
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

        {isPage || (
          <div className="flex justify-center">
            <AnimatedSection animation="fade" delay={1}>
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Link
                  className="effect-btn-outline px-8 py-4 rounded-full font-inter font-medium"
                  href="/services"
                >
                  View All Services
                </Link>
              </motion.div>
            </AnimatedSection>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
