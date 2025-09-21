"use client";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import { ExternalLink, MapPin } from "lucide-react";
import Heading from "@/components/common/Heading";
import { projects } from "@/constrain/project-list";
import Link from "next/link";

const ProjectsSection = ({ isPage }: { isPage?: boolean }) => {
  return (
    <section
      id="projects"
      className="min-h-screen py-24 bg-background w-screen"
    >
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <Heading>Featured Projects</Heading>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .slice(0, isPage ? projects.length : 3)
            .map((project, index) => (
              <AnimatedSection
                key={project.title}
                animation="scale"
                delay={0.1 * (index + 1)}
              >
                <motion.div
                  className="bg-foreground/5 border border-primary/40 min-h-[30rem] rounded-2xl overflow-hidden group hover:shadow-gold transition-all duration-500 cursor-pointer"
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Overlay Icon */}
                    <Link href={`/projects/${project.slug}`}>
                      <motion.div
                        className="absolute top-4 right-4 w-10 h-10 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        whileHover={{ scale: 1.1, rotate: 15 }}
                      >
                        <ExternalLink className="w-5 h-5 text-luxury-navy" />
                      </motion.div>
                    </Link>

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-secondary/80 rounded-full">
                      <span className="font-inter text-xs font-medium text-accent">
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <motion.h3
                      className="font-luxury text-xl font-semibold text-accent mb-2 group-hover:text-gradient-gold transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {project.title}
                    </motion.h3>

                    <motion.div
                      className="flex items-center text-foreground/70 mb-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="font-inter text-sm">
                        {project.location}
                      </span>
                    </motion.div>

                    <motion.p
                      className="font-inter text-foreground/80 text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      viewport={{ once: true }}
                    >
                      {project.description}
                    </motion.p>

                    {/* Hover Line */}
                    <motion.div className="w-0 h-px bg-gradient-gold mt-4 group-hover:w-full transition-all duration-500" />
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
        </div>

        {/* View All Button */}
        {isPage || (
          <AnimatedSection animation="fade" delay={1}>
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="effect-btn-outline px-8 py-4 rounded-full font-inter font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Projects
              </motion.button>
            </motion.div>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
