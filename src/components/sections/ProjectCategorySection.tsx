"use client";

import { CategoryTypeWithId } from "@/backend/models/category/category.dto";
import Heading from "@/components/common/Heading";
import Loading from "@/components/common/Loading";
import { Card } from "@/components/ui/card";
import axiosInstance from "@/lib/axios.instanse";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const ProjectCategorySection = () => {
  const { data: categoryList, isLoading: categoryListLoading } = useSWR(
    `/category?page=1&limit=3`,
    (url) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (categoryListLoading) {
    return <Loading />;
  }

  return (
    <section className="py-16 bg-background w-full">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <Heading>Our Services</Heading>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-5">
          {categoryList?.data &&
            categoryList?.data?.map(
              (category: CategoryTypeWithId, index: number) => (
                <Link key={category._id} href={`/projects/${category._id}`}>
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
                        <span className="text-background transform transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 z-10">
                          <ArrowRight />
                        </span>
                      </div>
                    </Card>
                  </motion.div>
                </Link>
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default ProjectCategorySection;
