import ServicesSection from "@/components/sections/ServicesSection";
import serviceChart from "@/assets/service-chart.svg";
import Image from "next/image";

const ServicesPage = () => {
  return (
    <div className="pt-20">
      <Image
        src={serviceChart}
        alt="Service Chart"
        className="mx-auto h-[70vh] w-full max-w-4xl"
        width={200}
        height={200}
      />

      <ServicesSection isPage />
    </div>
  );
};

export default ServicesPage;
