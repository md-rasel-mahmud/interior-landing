"use client";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Dot, MapPin } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import { projects } from "@/constrain/project-list";
import { ProjectCarousel } from "@/components/sections/ProjectCarousel";

export default function ProjectDetailPage() {
  const { projectSlug } = useParams();
  const project = projects.find((p) => p.slug === projectSlug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        Project not found
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Hero Carousel */}
        <AnimatedSection animation="slideUp" delay={0.2}>
          <ProjectCarousel images={project.images} />
        </AnimatedSection>

        {/* Content */}
        <div className="mt-12 grid lg:grid-cols-3 gap-12">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <AnimatedSection animation="slideUp" delay={0.3}>
              <motion.h3
                className="font-luxury text-5xl md:text-6xl font-semibold text-gradient-foreground mb-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                {project.title}
              </motion.h3>
              <div className="flex items-center text-foreground/70 mt-3">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="font-inter text-sm">{project.location}</span>
              </div>
              <p className="mt-6 font-inter text-lg leading-relaxed text-foreground/80">
                {project.description}
              </p>
            </AnimatedSection>

            {/* Features List */}
            <AnimatedSection animation="slideUp" delay={0.4}>
              <h3 className="font-luxury text-xl font-semibold text-accent mt-10 mb-4">
                Key Features
              </h3>
              <ul className="space-y-3">
                {project.features.map((feature, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center text-foreground/70"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 * i, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <Dot /> <span className="ml-2">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>
          </div>

          {/* Sidebar Info */}
          <div>
            <AnimatedSection animation="slideRight" delay={0.5}>
              <div className="p-6 rounded-2xl bg-foreground/5 border border-primary/30 shadow-md">
                <h3 className="font-luxury text-lg font-semibold text-accent mb-4">
                  Project Details
                </h3>
                <div className="space-y-3 text-sm font-inter text-foreground/80">
                  <p>
                    <span className="font-medium text-primary">Type:</span>{" "}
                    {project.type}
                  </p>
                  <p>
                    <span className="font-medium text-primary">Location:</span>{" "}
                    {project.location}
                  </p>
                  <p>
                    <span className="font-medium text-primary">Status:</span>{" "}
                    Completed
                  </p>
                  <p>
                    <span className="font-medium text-primary">Year:</span> 2024
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
