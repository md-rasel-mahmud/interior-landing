"use client";

import Heading from "@/components/common/Heading";
import { Card } from "@/components/ui/card";
import { categories } from "@/constrain/category-list";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ServicesSection = ({ isPage }: { isPage?: boolean }) => {
  return (
    <section
      className={cn(
        "py-16 min-h-screen flex flex-col justify-center w-full",
        isPage ? "bg-background" : "bg-foreground"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Heading isDarkText={isPage ? false : true}>Our Services</Heading>
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
                <Card className="relative border-none overflow-hidden rounded-2xl shadow-none hover:shadow-xl transition-all duration-300 h-56 group">
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
                    <span className="text-background transform transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 z-10">
                      <ArrowRight />
                    </span>
                  </div>
                </Card>
              </motion.div>
            </Link>
          ))}
        </div>
        {!isPage && (
          <div className="text-center mt-12">
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-accent text-background rounded-full font-medium hover:bg-accent/90 transition"
              >
                View All Services
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
