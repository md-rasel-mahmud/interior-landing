import LeftRightScroll from "@/components/common/LeftRightScroll";
import AboutSection from "@/components/sections/AboutSection";
import GetInTouch from "@/components/sections/GetInTouch";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TaglineSection from "@/components/sections/TaglineSection";
import TeamSection from "@/components/sections/TeamSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* <LeftRightScroll direction="left">
        <TaglineSection />
        <HeroSection />
      </LeftRightScroll>

      <LeftRightScroll>
        <AboutSection />
        <TeamSection />
      </LeftRightScroll>

      <LeftRightScroll direction="left">
        <ProcessSection />
        <ServicesSection />
      </LeftRightScroll> */}

      <HeroSection />
      <TaglineSection />

      <AboutSection />
      <TeamSection />

      {/* <ProcessSection /> */}
      <ServicesSection />

      <GetInTouch />
    </div>
  );
}
