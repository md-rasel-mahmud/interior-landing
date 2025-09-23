import LeftRightScroll from "@/components/common/LeftRightScroll";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ProjectCategorySection from "@/components/sections/ProjectCategorySection";
import ServicesSection from "@/components/sections/ServicesSection";
import TaglineSection from "@/components/sections/TaglineSection";
import TeamSection from "@/components/sections/TeamSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <LeftRightScroll>
        <HeroSection />
        <TaglineSection />
      </LeftRightScroll>

      <LeftRightScroll direction="left">
        <TeamSection />
        <AboutSection />
      </LeftRightScroll>

      <LeftRightScroll>
        <ServicesSection />
        <ProcessSection />
      </LeftRightScroll>

      <LeftRightScroll direction="left">
        <ContactSection />
        <ProjectCategorySection />
      </LeftRightScroll>
    </div>
  );
}
