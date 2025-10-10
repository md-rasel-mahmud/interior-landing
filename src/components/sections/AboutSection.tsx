"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedSection from "../ui/animated-section";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Image import
import ownerImage from "@/assets/team-members/owner.jpg";
// import ownerAndCo_founder1 from "@/assets/team-members/owner_and_co-founder-2.jpg";
import ownerAndCo_founder2 from "@/assets/team-members/owner_and_co-founder-3.jpg";
import ownerAndCo_founder3 from "@/assets/team-members/owner_and_co-founder-1.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import AboutServiceSection from "@/components/sections/AboutServiceSection";
import { cn } from "@/lib/utils";

const images = [
  ownerImage,
  // ownerAndCo_founder1,
  ownerAndCo_founder2,
  ownerAndCo_founder3,
];

const AboutSection = ({ isPage }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 }, // duration = smoothness
    [Autoplay({ delay: 3000 })]
  );

  const [loading, setLoading] = useState(true);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();
  return (
    <section
      id="about"
      className="min-h-screen flex items-center py-20 bg-background w-full md:w-screen"
    >
      <div className="container mx-auto px-4lg:px-20">
        <div
          className={cn(
            "grid grid-cols-1 lg:grid-cols-2 gap-16",
            isPage ? "items-center" : "items-start"
          )}
        >
          {/* Image Slider */}
          {/* <div
            className="relative overflow-hidden rounded-2xl shadow-lg"
            ref={emblaRef}
          >
            {
              //Slides
            }
            <div className="flex">
              {images.map((img, index) => (
                <div className="relative flex-[0_0_100%] h-[600px]" key={index}>
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background">
                      <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></span>
                    </div>
                  )}
                  <Image
                    src={img}
                    alt={`Slide ${index + 1}`}
                    fill
                    className="object-cover object-center"
                    quality={100}
                    onLoadingComplete={() => setLoading(false)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/30 to-transparent"></div>
                </div>
              ))}
            </div>

            {
              // Prev/Next Arrows
            }
            <button
              onClick={scrollPrev}
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-background/50 backdrop-blur-md hover:bg-background text-primary p-2 rounded-full shadow z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={scrollNext}
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-background/50 backdrop-blur-md hover:bg-background text-primary p-2 rounded-full shadow z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div> */}

          <div className="relative flex-[0_0_100%] h-[750px]">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background">
                <span className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></span>
              </div>
            )}

            <Image
              src={images[0]}
              alt={"about image"}
              fill
              className="object-cover object-center rounded-lg"
              quality={100}
              onLoadingComplete={() => setLoading(false)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-navy/30 to-transparent"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <AnimatedSection animation="slideLeft" delay={0.4}>
              <motion.h2
                className=" text-5xl md:text-6xl font-bold text-primary leading-tight "
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
              >
                Our Story
              </motion.h2>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={0.6}>
              {isPage || <AboutServiceSection />}

              <motion.div
                className="space-y-6 text-foreground/90"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true }}
              >
                <p className="font-inter text-lg text-secondary/70">
                  As the founder of Platonic, my vision has always been simple:
                  to design and build spaces that inspire. I believe every home
                  tells a story, and our role is to bring that story to life
                  with craftsmanship, creativity, and care.
                </p>

                <p className="font-inter text-lg text-secondary/70">
                  What began as a passion for architecture and design has grown
                  into a full-service firm serving individuals, corporates, and
                  developers. Our philosophy is simple: to blend creativity with
                  precision, ensuring every project reflects both beauty and
                  function.
                </p>

                <motion.div
                  className="pt-6"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center space-x-4 text-accent">
                    <div className="w-12 h-px bg-gradient-to-l from-primary"></div>

                    <span className="text-primary text-xl ">
                      Architect Karam Awada, Founder.
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
