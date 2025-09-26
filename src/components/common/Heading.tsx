"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const Heading = ({
  children,
  isDarkText,
}: {
  children: ReactNode;
  isDarkText?: boolean;
}) => {
  return (
    <motion.div className="relative">
      <motion.h2
        className={cn(
          "text-5xl md:text-6xl font-semibold mb-6",
          isDarkText ? "text-background/70" : "text-primary"
        )}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        {children}
      </motion.h2>
    </motion.div>
  );
};

export default Heading;
