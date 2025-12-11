"use client";

import Heading from "@/components/common/Heading";
import NavigateButton from "@/components/common/NavigateButton";
import { categories } from "@/constants/category-list";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import serviceChart from "@/assets/service-chart.svg";
import useSWR from "swr";
import axiosInstance from "@/lib/axios.instanse";
import { CategoryTypeWithId } from "@/backend/models/category/category.dto";
import Loading from "@/components/common/Loading";
import { SectorTypeWithId } from "@/backend/models/sector/sector.dto";

type ServiceCategory = {
  id: string;
  title: string;
  items?: string[];
  description?: string;
};

const serviceCategories: ServiceCategory[] = [
  {
    id: "01",
    title: "Design Services",
    items: [
      "Architectural Design",
      "Interior Design",
      "Structure Design",
      "Landscape Design",
      "M.E.P, F.F & L.V",
      "Branding Design",
    ],
  },
  {
    id: "02",
    title: "Construction Services",
    items: [
      "Turnkey Solutions",
      "Skeleton Construction",
      "Finishing Works",
      "Renovation Works",
    ],
  },
  {
    id: "03",
    title: "Project Delivery Systems",
    items: [
      "Project Management",
      "Supervision",
      "Financial Management",
      "Quality Control",
      "Value Engineering",
    ],
  },
  {
    id: "04",
    title: "Design-Build",
    description: "We provide design & execution services for all sectors.",
  },
];

const sectors = [
  ["Residential", "Commercial"],
  ["Retail and F&B", "Healthcare"],
  ["Educational", "Governmental"],
];

const detailsDescription = [
  {
    title: "Architecture",
    description:
      "We develop the project starting with an initial inspection and survey phase, then we prepare the necessary building permit documents. Once the executive design is developed, we oversee all construction phases, coordinating the necessary personnel for the project's completion.",
  },
  {
    title: "Interior design",
    description:
      "We design every detail of your home, starting with a general concept and developing a mood board with inspirational images. Once a design concept has been finalized, we take care of the lighting, finishes, and custom furniture design. We provide photorealistic renderings to immerse you in the space.",
  },
];

const ServicesSection = ({ isPage }: { isPage?: boolean }) => {
  const { data: categoryList, isLoading: categoryListLoading } = useSWR(
    `/category?page=1&limit=${isPage ? "100" : "3"}`,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: sectorList, isLoading: sectorListLoading } = useSWR(
    `/sector?page=1&limit=100`,
    (url: string) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (categoryListLoading || sectorListLoading) {
    return <Loading />;
  }

  return (
    <section
      className={cn(
        "pb-16 pt-3 min-h-screen flex flex-col justify-center w-full bg-background"
        // isPage ? "bg-background" : "bg-foreground"
      )}
    >
      <div className="">
        <div className="text-center">
          <Heading isDarkText={false}>Our Services</Heading>
        </div>

        {isPage && (
          <>
            {
              // Service Chart
            }
            <Image
              src={serviceChart}
              alt="Service Chart"
              className="mx-auto lg:h-[80vh] h-[40vh] object-cover w-full max-w-4xl"
              width={200}
              height={200}
            />

            {/* {
              // Service Categories
            }
            <div className="container mx-auto mt-16">
              <div className="grid md:grid-cols-2 gap-y-12 gap-x-16">
                {serviceCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-semibold text-lg mb-3">
                      {category.id} - {category.title}
                    </h3>

                    {category.items ? (
                      <ul className="space-y-1 opacity-90">
                        {category.items.map((item, index) => (
                          <li key={index}>- {item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="opacity-90">{category.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {
              // Sectors
            }
            <div className="mt-16 text-center mb-16">
              <h3 className="font-semibold text-lg mb-4">Sectors</h3>
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 opacity-90">
                {sectors.map((group, index) => (
                  <ul key={index}>
                    {group.map((sector, i) => (
                      <li key={i}>- {sector}</li>
                    ))}
                  </ul>
                ))}
              </div>
            </div> */}

            {
              // Service Categories
            }
            <div className="container mx-auto mt-20">
              <h2 className="text-2xl md:text-3xl font-semibold text-center mb-16 lg:mb-32">
                Our Service Categories
              </h2>

              <div className="grid md:grid-cols-2 gap-y-12 gap-x-16">
                {serviceCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-semibold text-lg mb-3">
                      {category.id} - {category.title}
                    </h3>

                    {category.items ? (
                      <ul className="space-y-1 opacity-90">
                        {category.items.map((item, index) => (
                          <li key={index}>- {item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="opacity-90">{category.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {
              // Sectors
            }
            <div className="mt-24 text-center mb-24">
              <h3 className="text-2xl md:text-3xl font-semibold mb-10">
                Sectors
              </h3>

              <div className="flex flex-wrap justify-center gap-x-14 gap-y-3 text-black/60 text-lg leading-relaxed">
                <ul className="text-left grid grid-cols-2 lg:grid-cols-4 gap-x-10">
                  {sectorList?.data?.map(
                    (singleSector: SectorTypeWithId, index: number) => (
                      <li
                        key={index}
                        className="hover:text-primary transition-colors duration-200"
                      >
                        • {singleSector?.name}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {
              // Details Description
            }
            {/* <div className="container mx-auto mb-16">
              {detailsDescription.map((detail, index) => (
                <div key={index} className="mb-10">
                  <h3 className="font-semibold text-xl mb-2">{detail.title}</h3>
                  <p className="opacity-90">{detail.description}</p>
                </div>
              ))}
            </div> */}
          </>
        )}

        {/* Grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2  gap-1 pt-5",
            isPage ? "lg:grid-cols-2" : "lg:grid-cols-3"
          )}
        >
          {categoryList?.data &&
            categoryList?.data.map(
              (category: CategoryTypeWithId, index: number) => (
                <Link key={category._id} href={`/projects/${category._id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    className="h-full"
                  >
                    <div className="relative border-none overflow-hidden shadow-none hover:shadow-xl transition-all duration-300 h-[25rem] group">
                      {/* Background Image */}
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-black/50" />

                      <div className="absolute inset-0 flex items-center justify-center gap-2">
                        <div className="relative">
                          <span className="text-background text-xl font-semibold z-10">
                            {category.name}
                          </span>

                          {/* Underline Animation */}
                          <span className="absolute bottom-1 left-0 w-full h-0.5 bg-background transition-all duration-300 group-hover:w-0"></span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )
            )}
        </div>

        {!isPage && (
          <div className="text-center mt-12">
            <NavigateButton href="/services">View All Services</NavigateButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
