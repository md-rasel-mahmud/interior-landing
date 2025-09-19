import LeftRightScroll from "@/components/common/LeftRightScroll";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TaglineSection from "@/components/sections/TaglineSection";
import TeamSection from "@/components/sections/TeamSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <TaglineSection />
      <AboutSection />
      <TeamSection />
      <ServicesSection />
      <ProcessSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
