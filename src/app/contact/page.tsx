import ContactFormSection from "@/components/sections/ContactFormSection";
import ContactUsSection from "@/components/sections/ContactUsSection";
import GetInTouch from "@/components/sections/GetInTouch";

import React from "react";

const GetInTouchPage = () => {
  return (
    <div className="pt-20">
      <GetInTouch isPage />
      <ContactUsSection />
      <ContactFormSection />
    </div>
  );
};

export default GetInTouchPage;
