import Loading from "@/components/common/Loading";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import React, { Suspense } from "react";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navigation />
      </Suspense>
      {children}
      <Footer />
    </>
  );
};

export default LandingLayout;
