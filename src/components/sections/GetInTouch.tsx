"use client";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import { Mail, Send, Smartphone, Instagram } from "lucide-react";

import Heading from "@/components/common/Heading";
import { cn } from "@/lib/utils";
import Link from "next/link";

const GetInTouch = ({ isPage }: { isPage?: boolean }) => {
  const contactInfo = [
    {
      icon: Mail,
      title: "hello@platonicdesign.com",
      href: "mailto:hello@platonicdesign.com",
    },
    {
      icon: Smartphone,
      title: "+1 (555) 123-4567",
      href: "tel:+15551234567",
    },
    {
      icon: Instagram,
      title: "@platonicdesign",
      href: "https://www.instagram.com/platonicdesign",
    },
  ];

  if (!isPage) {
    contactInfo.push({
      icon: Send,
      title: "Send a Message",
      href: "/contact",
    });
  }

  return (
    <section id="contact" className={cn("pt-20 pb-10 w-screen bg-background")}>
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <Heading>Get in touch</Heading>
          </div>
        </AnimatedSection>

        <div
          className={cn(
            "grid grid-cols-1 overflow-hidden",
            isPage ? "lg:grid-cols-3" : "lg:grid-cols-4"
          )}
        >
          {/* Contact Information */}

          {contactInfo.map((info, index) => (
            <Link className="group" href={info.href} key={info.title}>
              <AnimatedSection animation="slideRight" delay={0.2 * (index + 1)}>
                <motion.div
                  className={cn(
                    "h-[20rem] w-full flex flex-col items-center justify-center text-center p-6 hover:shadow-lg transition-shadow duration-300 group",
                    index % 2 === 0
                      ? "bg-foreground text-background/70"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  <motion.div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <info.icon size={50} />
                  </motion.div>

                  <p className="mt-4 text-lg font-medium group-hover:underline">
                    {info.title}
                  </p>
                </motion.div>
              </AnimatedSection>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
