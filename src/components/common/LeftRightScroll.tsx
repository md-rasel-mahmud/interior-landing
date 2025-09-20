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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    // setup panels
    const panels = Array.from(inner.querySelectorAll<HTMLElement>(".lr-panel"));
    const panelCount = panels.length;

    if (panelCount <= 1) return;

    // calculate distance to scroll
    const calcDistance = () => inner.scrollWidth - window.innerWidth;

    // set initial position
    const onRefreshInit = () => {
      gsap.set(inner, { x: direction === "left" ? -calcDistance() : 0 });
    };

    // initial position
    onRefreshInit();

    // create animation
    const anim = gsap.to(inner, {
      x: () => (direction === "left" ? 0 : -calcDistance()),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        // important fix: add window.innerHeight to prevent gap
        end: () => `+=${calcDistance() + window.innerHeight}`,
        pin: true,
        scrub: 1,
        snap: panelCount > 1 ? 1 / (panelCount - 1) : 0,
        invalidateOnRefresh: true,
      },
    });

    // handle refresh
    ScrollTrigger.addEventListener("refreshInit", onRefreshInit);
    ScrollTrigger.refresh();

    // cleanup on unmount
    return () => {
      anim.kill();
      ScrollTrigger.removeEventListener("refreshInit", onRefreshInit);
      const st = anim.scrollTrigger as ScrollTrigger | undefined;
      if (st) st.kill();
    };
  }, [direction, children]);

  // calculate inner width based on number of children
  const childCount = React.Children.count(children) || 0;
  const innerWidth = `${Math.max(childCount, 1) * 100}vw`;

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <div
        ref={wrapperRef}
        style={{ width: "100%", position: "relative" }}
        className="relative"
      >
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
    </div>
  );
}
