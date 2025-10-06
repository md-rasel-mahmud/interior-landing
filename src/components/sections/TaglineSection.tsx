"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedSection from "../ui/animated-section";

gsap.registerPlugin(ScrollTrigger);

const TaglineSection = () => {
  const textRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      // split characters
      const chars = textRef.current.querySelectorAll("span.char");

      gsap.fromTo(
        chars,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05, // delay between chars
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%", // when to trigger
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  // helper function to wrap characters in spans
  const splitText = (text: string) =>
    text.split("").map((char, i) => (
      <span key={i} className="char inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section className="min-h-screen flex items-center justify-center bg-background py-20 w-screen">
      <div className="container mx-auto px-6">
        <AnimatedSection animation="slideUp" delay={0.1}>
          <h1
            // ref={textRef}
            className="font-bold text-6xl md:text-7xl text-primary mb-8 leading-tight"
          >
            {/* {splitText("Designing dreams,")} */}
            Designing dreams,
            <br />
            {/* {splitText("Building realities")} */}
            Building realities
          </h1>
        </AnimatedSection>

        <AnimatedSection animation="fade" delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 1,
              ease: [0.5, 1, 0.3, 1],
            }}
            viewport={{ once: true, amount: 0.6 }}
          >
            <p className="font-thin text-xl md:text-2xl text-foreground/80 italic">
              &quot;We shape our buildings [so they] shape us.&quot;
            </p>
            <p className="font-thin text-lg text-foreground/70 mt-4">
              — Winston Churchill
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TaglineSection;
