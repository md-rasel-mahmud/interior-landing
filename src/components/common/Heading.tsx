"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const Heading = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div className="relative ">
      <motion.h2 className="absolute font-bold inset-x-0 text-6xl md:text-8xl -mt-2 md:-mt-5 text-transparent text-stroke">
        {children}
      </motion.h2>

      <motion.h3
        className="font-luxury text-5xl md:text-6xl font-semibold text-gradient-foreground mb-6 "
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
      >
        {children}
      </motion.h3>
    </motion.div>
  );
};

export default Heading;
