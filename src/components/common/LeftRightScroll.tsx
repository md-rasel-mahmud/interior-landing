"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  direction?: "left" | "right";
};

export default function LeftRightScroll({
  children,
  direction = "right",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const inner = innerRef.current;
    if (!container || !inner) return;

    const panels = gsap.utils.toArray<HTMLElement>(".lr-panel");
    if (panels.length <= 1) return;

    const getDistance = () => inner.scrollWidth - window.innerWidth;

    // Set initial position depending on direction
    const setInitial = () => {
      const distance = getDistance();
      gsap.set(inner, { x: direction === "left" ? -distance : 0 });
    };
    setInitial();

    const anim = gsap.to(inner, {
      x: () => {
        const distance = getDistance();
        return direction === "left" ? 0 : -distance;
      },
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.5,
        snap: 1 / (panels.length - 1),
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    ScrollTrigger.addEventListener("refreshInit", setInitial);
    ScrollTrigger.refresh();

    return () => {
      anim.kill();
      ScrollTrigger.removeEventListener("refreshInit", setInitial);
      anim.scrollTrigger?.kill();
    };
  }, [direction, children]);

  const childCount = React.Children.count(children);
  const innerWidth = `${Math.max(childCount, 1) * 100}vw`;

  return (
    <section className="relative w-full">
      <div ref={containerRef} className="overflow-hidden relative">
        <div
          ref={innerRef}
          className="lr-inner flex"
          style={{
            width: innerWidth,
            willChange: "transform",
          }}
        >
          {React.Children.map(children, (child, i) => (
            <div
              className="lr-panel w-screen min-h-screen flex items-center justify-center"
              key={i}
              style={{ flex: "0 0 100vw" }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
