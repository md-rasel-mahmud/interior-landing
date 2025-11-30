import { categories } from "@/constants/category-list";

export type NavItem = {
  name: string;
  href: string;
  submenu?: NavItem[];
};

export const navItems: NavItem[] = [
  { name: "About", href: "/about" },
  { name: "Team", href: "/team" },
  {
    name: "Service",
    href: "/services",
    // submenu: categories.map((cat) => ({
    //   name: cat.name,
    //   href: `/projects/${cat.slug}`,
    // }))
    submenu: [],
  },
  { name: "Process", href: "/process" },
  { name: "Contact Us", href: "/contact" },
];
