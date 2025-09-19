"use client";

import { useRef, useEffect, useState } from "react";

const PortfolioSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !innerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const offset = window.innerHeight - rect.top; // how much section is visible
      setScrollY(offset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-[400px] overflow-hidden relative bg-gray-100 flex items-center"
    >
      <div
        ref={innerRef}
        className="flex gap-6 absolute top-0 left-0 h-full transition-transform duration-0"
        style={{
          transform: `translateX(-${scrollY}px)`,
        }}
      >
        {["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"].map((item, idx) => (
          <div
            key={idx}
            className="w-[500px] h-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
