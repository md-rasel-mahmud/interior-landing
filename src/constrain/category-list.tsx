import architectureImg from "@/assets/categories/01.png";
import fitOutImg from "@/assets/categories/03.png";
import turnkeySolutionImg from "@/assets/categories/04.png";
import interiorImg from "@/assets/categories/02.jpg";

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
    image: interiorImg.src,
  },
  {
    slug: "fit-out",
    name: "Fit-out",
    image: fitOutImg.src,
  },
  {
    slug: "turnkey-solutions",
    name: "Turnkey Solutions",
    image: turnkeySolutionImg.src,
  },
];
