import architectureImg from "@/assets/categories/01.png";
export interface Category {
  slug: string;
  name: string;
  image: string;
}

// Category List
export const categories: Category[] = [
  {
    slug: "architecture",
    name: "Architecture",
    image: architectureImg.src,
  },
  {
    slug: "interior",
    name: "Interior",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
  },
  {
    slug: "fit-out",
    name: "Fit-out",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
  },
  {
    slug: "turnkey-solutions",
    name: "Turnkey Solutions",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
  },
];
