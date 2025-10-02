"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ParallaxProps = {
  children: React.ReactNode;
  y?: number; // how much vertical parallax movement
  start?: string; // scroll start position
  end?: string; // scroll end position
};

export default function Parallax({
  children,
  y = -150,
  start = "top bottom",
  end = "bottom top",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        y,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          scrub: true,
        },
      });
    }
  }, [y, start, end]);

  return <div ref={ref}>{children}</div>;
}
