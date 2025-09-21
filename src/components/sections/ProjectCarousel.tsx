"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  images: string[];
  className?: string;
};

export function ProjectCarousel({ images, className }: Props) {
  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Carousel Container */}
      <div ref={emblaRef} className="overflow-hidden rounded-2xl shadow-lg">
        <div className="flex">
          {images.map((src, i) => (
            <div key={i} className="min-w-full relative">
              <Image
                src={src}
                alt={`Project image ${i + 1}`}
                width={1200}
                height={800}
                className="h-[550px] w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <Button
        onClick={scrollPrev}
        size="icon"
        variant="secondary"
        className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full shadow-md text-background"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <Button
        onClick={scrollNext}
        size="icon"
        variant="secondary"
        className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full shadow-md text-background"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>

      {/* Dots */}
      <div className="flex justify-center mt-3 gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-colors",
              i === selectedIndex ? "bg-primary" : "bg-foreground/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}
