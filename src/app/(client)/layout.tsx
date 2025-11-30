import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
