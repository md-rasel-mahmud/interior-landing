import ContactFormSection from "@/components/sections/ContactFormSection";
import ContactUsSection from "@/components/sections/ContactUsSection";
import GetInTouch from "@/components/sections/GetInTouch";

const GetInTouchPage = () => {
  return (
    <div className="pt-20">
      {/* <ContactUsSection /> */}
      <GetInTouch isPage />
      <ContactFormSection />
    </div>
  );
};

export default GetInTouchPage;
