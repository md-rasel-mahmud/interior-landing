import ContactFormSection from "@/components/sections/ContactFormSection";
import GetInTouch from "@/components/sections/GetInTouch";

import React from "react";

const ContactPage = () => {
  return (
    <div className="pt-20">
      <GetInTouch isPage />
      <ContactFormSection />
    </div>
  );
};

export default ContactPage;
