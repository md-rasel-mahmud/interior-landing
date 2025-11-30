import {
  Building2,
  Hammer,
  Home,
  Lightbulb,
  Palette,
  Ruler,
} from "lucide-react";

export type Service = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    icon: Home,
    title: "Residential Design",
    description:
      "Transform your home into a space that reflects your lifestyle and taste.",
  },
  {
    icon: Building2,
    title: "Commercial Spaces",
    description:
      "Design work environments that boost productivity and brand identity.",
  },
  {
    icon: Palette,
    title: "Color Consultation",
    description:
      "Select the perfect colors to set the mood and atmosphere of your space.",
  },
  {
    icon: Lightbulb,
    title: "Lighting Design",
    description:
      "Smart lighting solutions that enhance both ambiance and functionality.",
  },
  {
    icon: Hammer,
    title: "Full Renovation",
    description:
      "End-to-end renovation services from concept to final execution.",
  },
  {
    icon: Ruler,
    title: "Space Planning",
    description: "Optimize your space for maximum functionality and flow.",
  },
];
