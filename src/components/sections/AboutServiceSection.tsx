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

const visionMissionCoreValues = {
  VISION:
    "To design and build spaces that inspire, believing every home tells a story, and our role is to bring that story to life with craftmanship, creativity, and care.",
  MISSION:
    "Our philosophy is simple: to blend creativity with precision, ensuring every project reflects both beauty and function for individuals, corporates, and developers.",
  "CORE VALUES":
    "We operate with transparency, collaboration, and a dedication to quality control and value engineering, ensuring client goals are always met.",
};

const sectors = [
  ["Residential", "Commercial"],
  ["Retail and F&B", "Healthcare"],
  ["Educational", "Governmental"],
];

export default function AboutServiceSection() {
  return (
    <section className="bg-background text-primary pb-16 mt-10">
      {/* <h2 className="py-4 text-3xl font-bold text-center">
        Vision | Mission | Core Values
      </h2> */}

      <div className="py-10">
        {Object.entries(visionMissionCoreValues).map(([key, value]) => (
          <div key={key} className="pb-6">
            <h3 className="font-semibold text-lg pb-4">{key}</h3>
            <p className="opacity-90">{value}</p>
          </div>
        ))}
      </div>

      {/* <h2 className="py-10 text-3xl font-bold text-center">Our Core Systems</h2> */}

      {/* <div className="lg:ml-10 grid md:grid-cols-2 gap-y-12 gap-x-16">
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
      </div> */}

      {/* Sectors */}
      {/* <div className="mt-16 text-center">
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
    </section>
  );
}
