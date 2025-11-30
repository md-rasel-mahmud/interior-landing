import { Package, ChartBar, Images, Landmark } from "lucide-react";

export const adminSidebarMenu = [
  {
    title: "Services",
    path: "/admin",
    icon: <ChartBar className="mr-2 h-4 w-4" />,
  },
  {
    title: "Projects",
    path: "/admin/projects",
    icon: <Package className="mr-2 h-4 w-4" />,
  },
  {
    title: "Sectors",
    path: "/admin/sectors",
    icon: <Landmark className="mr-2 h-4 w-4" />,
  },
  // {
  //   title: "Setting",
  //   path: "/admin/setting",
  //   icon: <Settings className="mr-2 h-4 w-4" />,
  // },
  {
    title: "Media",
    path: "/admin/media",
    icon: <Images className="mr-2 h-4 w-4" />,
  },
];
