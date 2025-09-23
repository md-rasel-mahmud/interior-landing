"use client";

import Heading from "@/components/common/Heading";
import { Card } from "@/components/ui/card";
import { categories } from "@/constrain/category-list";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ProjectCategorySection = () => {
  return (
    <section className="py-16 bg-background w-full">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Heading>Project Categories</Heading>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-5">
          {categories.map((category, index) => (
            <Link key={category.slug} href={`/projects/${category.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ scale: 1.03 }}
                className="h-full"
              >
                <Card className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl hover:border hover:border-primary transition-all duration-300 h-56 group">
                  {/* Background Image */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />

                  {/* Category Name */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <span className="text-background text-xl font-semibold z-10">
                      {category.name}
                    </span>

                    {/* Arrow Icon (hidden until hover) */}
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      whileHover={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-background"
                    >
                      →
                    </motion.span>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCategorySection;
