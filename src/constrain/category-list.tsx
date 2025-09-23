export interface Category {
  slug: string;
  name: string;
  image: string;
}

// Category List
export const categories: Category[] = [
  {
    slug: "residential",
    name: "Residential",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop",
  },
  {
    slug: "commercial",
    name: "Commercial",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop",
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
  },
];
