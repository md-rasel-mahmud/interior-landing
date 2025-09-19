"use client";

import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import Heading from "@/components/common/Heading";

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Lead Interior Designer",
      bio: "15+ years crafting luxury residential spaces with an eye for timeless elegance.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face",
      socialLinks: [
        { platform: "linkedin", url: "https://linkedin.com/in/sarahchen" },
        { platform: "instagram", url: "https://instagram.com/sarahchen" },
        { platform: "twitter", url: "https://twitter.com/sarahchen" },
      ],
    },
    {
      name: "Marcus Rodriguez",
      role: "Senior Architect",
      bio: "Specializes in sustainable architecture and innovative space planning solutions.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
      socialLinks: [
        {
          platform: "linkedin",
          url: "https://linkedin.com/in/marcusrodriguez",
        },
        { platform: "instagram", url: "https://instagram.com/marcusrodriguez" },
        { platform: "twitter", url: "https://twitter.com/marcusrodriguez" },
      ],
    },
    {
      name: "Elena Volkov",
      role: "Project Manager",
      bio: "Ensures seamless project execution from concept to completion with precision.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
      socialLinks: [
        { platform: "linkedin", url: "https://linkedin.com/in/elenavolkov" },
        { platform: "instagram", url: "https://instagram.com/elenavolkov" },
        { platform: "twitter", url: "https://twitter.com/elenavolkov" },
      ],
    },
  ];

  return (
    <section id="team" className="min-h-screen py-20 bg-luxury-navy">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <Heading>Our Team</Heading>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => {
            console.log("member.socialLinks :>> ", member.socialLinks);
            return (
              <AnimatedSection
                key={member.name}
                animation="scale"
                delay={0.2 * (index + 1)}
              >
                <motion.div
                  className="glass-luxury-background  rounded-2xl p-8 text-center group hover:shadow-gold transition-all duration-500"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="relative mx-auto mb-6 w-32 h-32 rounded-full overflow-hidden shadow-soft"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>

                  <motion.h3
                    className="font-luxury text-2xl font-semibold text-accent mb-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {member.name}
                  </motion.h3>

                  <motion.p
                    className="font-inter text-lg text-background/70 mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {member.role}
                  </motion.p>

                  <motion.p
                    className="font-inter text-background/40 leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    {member.bio}
                  </motion.p>

                  {member.socialLinks && (
                    <motion.div
                      className="flex justify-center space-x-4 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {member.socialLinks.map((link) => (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-luxury-gold/60 hover:text-accent transition-colors duration-300"
                        >
                          {link.platform === "linkedin" ? (
                            <Linkedin size={20} />
                          ) : link.platform === "instagram" ? (
                            <Instagram size={20} />
                          ) : link.platform === "twitter" ? (
                            <Twitter size={20} />
                          ) : null}
                          <span className="sr-only">{link.platform}</span>
                        </a>
                      ))}
                    </motion.div>
                  )}

                  {/* Decorative Element */}
                  <motion.div
                    className="w-12 h-px bg-gradient-gold mx-auto mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
