"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

const TeamSection = ({ isPage }: { isPage?: boolean }) => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Lead Interior Designer",
      bio: "15+ years crafting luxury residential spaces with an eye for timeless elegance.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Architect",
      bio: "Specializes in sustainable architecture and innovative space planning solutions.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    },
    {
      name: "Elena Volkov",
      role: "Project Manager",
      bio: "Ensures seamless project execution from concept to completion with precision.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
    },
    {
      name: "Sarah Chen",
      role: "Lead Interior Designer",
      bio: "15+ years crafting luxury residential spaces with an eye for timeless elegance.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
    },
  ];

  return (
    <section
      id="team"
      className={cn(
        "min-h-screen flex flex-col gap-7 justify-center w-screen bg-background"
        // isPage ? "bg-background" : "bg-foreground"
      )}
    >
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center">
            <Heading>Our Team</Heading>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-4 gap-2">
          {teamMembers.map((member, index) => {
            return (
              <AnimatedSection
                key={member.name}
                animation="scale"
                delay={0.2 * (index + 1)}
              >
                <motion.div
                  className={cn(
                    "rounded-2xl p-2 text-center group hover:shadow-gold transition-all duration-500 overflow-hidden"
                  )}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="relative mx-auto mb-6 w-full h-72 rounded-lg overflow-hidden shadow-soft"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>

                  <motion.h3
                    className={cn(
                      "text-2xl font-semibold text-accent mb-2"
                      // isPage ? "text-foreground" : "text-background"
                    )}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {member.name}
                  </motion.h3>

                  {/* Decorative Element */}
                  <motion.div
                    className={cn(
                      "w-12 h-px mx-auto my-2 transition-opacity duration-300"
                      // isPage ? "bg-foreground/30" : "bg-background/30"
                    )}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    viewport={{ once: true }}
                  />

                  <motion.p
                    className={cn(
                      "font-inter text-sm mb-4"
                      // isPage ? "text-foreground/50" : "text-background/50"
                    )}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {member.role}
                  </motion.p>
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>

      {!isPage && (
        <div className="text-center">
          <Link
            href="/team"
            className="px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent/90 transition"
          >
            Meet the Team
          </Link>
        </div>
      )}
    </section>
  );
};

export default TeamSection;
