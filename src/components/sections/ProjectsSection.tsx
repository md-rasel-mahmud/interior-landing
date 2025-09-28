"use client";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import { ExternalLink, MapPin } from "lucide-react";
import Heading from "@/components/common/Heading";
import { projects } from "@/constrain/project-list";
import Link from "next/link";
import { categories } from "@/constrain/category-list";
import Image from "next/image";

const ProjectsSection = ({
  isPage,
  categorySlug,
}: {
  isPage?: boolean;
  categorySlug?: string;
}) => {
  const projectList = categorySlug
    ? projects.filter((project) => project.categorySlug === categorySlug)
    : projects;

  const category = categorySlug
    ? categories.find((cat) => cat.slug === categorySlug)
    : null;

  return (
    <section
      id="projects"
      className="min-h-screen py-24 bg-background w-screen"
    >
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.2}>
          <div className="text-center mb-16">
            <Heading>{category ? `${category?.name}` : "All Projects"}</Heading>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-1">
          {projectList
            .slice(0, isPage ? projects.length : 3)
            .map((project, index) => (
              <AnimatedSection
                key={project.title}
                animation="scale"
                delay={0.1 * (index + 1)}
              >
                <Link
                  href={`/projects/${project.categorySlug}/${project.slug}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="h-full"
                  >
                    <div className="relative border-none overflow-hidden shadow-none hover:shadow-xl transition-all duration-300 h-[35rem] group">
                      {/* Background Image */}
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 group-hover:opacity-0 transition-all bg-black/50" />

                      <div className="absolute inset-0 flex items-center justify-center gap-2">
                        <div className="relative">
                          <span className="text-background text-xl font-semibold z-10">
                            {project.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
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
