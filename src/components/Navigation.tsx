"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/constants/nav-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { ChevronDown, MenuIcon, X } from "lucide-react";
import logo from "@/assets/logo.svg";
import logoWhite from "@/assets/logo-white.svg";
import useSWR from "swr";
import axiosInstance from "@/lib/axios.instanse";
import { CategoryTypeWithId } from "@/backend/models/category/category.dto";

// ================== MAIN NAVIGATION ==================
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: categoryList } = useSWR(
    `/category?${searchParams.toString()}`,
    (url) => axiosInstance.get(url).then((res) => res.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const parsedNavItems = navItems.map((item) => {
    if (item.name === "Service") {
      return {
        ...item,
        submenu: categoryList
          ? categoryList?.data?.map((cat: CategoryTypeWithId) => ({
              name: cat?.name,
              href: `/projects/${cat?._id}`,
            }))
          : [],
      };
    }
    return item;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoToHome = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled ? "active-nav-bg shadow-sm" : "bg-transparent"
      )}
    >
      <div className="px-6 lg:px-12 py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.button
            onClick={handleGoToHome}
            className="font-luxury text-2xl font-bold text-gradient-gold hover:scale-105 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={isScrolled || pathname !== "/" ? logo : logoWhite}
              alt="Logo"
              width={200}
              height={200}
              className="h-20 w-auto"
            />
          </motion.button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {parsedNavItems.map((item) =>
              item.submenu ? (
                // <DropdownMenu key={item.name}>
                //   <DropdownMenuTrigger asChild>
                //     <button
                // className={cn(
                //   "flex text-sm items-center gap-1 font-helvetica hover:opacity-80 transition-colors duration-300",
                //   isScrolled || pathname !== "/"
                //     ? "text-primary"
                //     : "text-background"
                // )}
                //     >
                //       {item.name}
                //       <ChevronDown className="w-4 h-4" />
                //     </button>
                //   </DropdownMenuTrigger>

                //   <DropdownMenuContent align="start" className="w-48">
                //     {item.submenu.map((subItem) => (
                //       <DropdownMenuItem key={subItem.name} asChild>
                //         <Link href={subItem.href} className="w-full">
                //           {subItem.name}
                //         </Link>
                //       </DropdownMenuItem>
                //     ))}
                //   </DropdownMenuContent>
                // </DropdownMenu>

                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    key={item.name}
                    className={cn(
                      "flex text-sm items-center font-medium gap-1 font-helvetica hover:opacity-80 transition-colors duration-300 relative",
                      isScrolled || pathname !== "/"
                        ? "text-primary"
                        : "text-background"
                    )}
                  >
                    {item.name}

                    <span
                      className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 bg-background transition-all duration-300 group-hover:w-full",
                        isScrolled || pathname !== "/"
                          ? "bg-primary"
                          : "bg-background"
                      )}
                    ></span>
                  </Link>

                  <div
                    className={cn(
                      "absolute mt-2 left-0 rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col min-w-[150px]",
                      isScrolled || pathname !== "/"
                        ? "text-primary bg-background"
                        : "text-background"
                    )}
                  >
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {item.submenu.map((subItem: any) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className={cn(
                          "block py-2 text-sm rounded-md relative w-max",
                          isScrolled || pathname !== "/"
                            ? "line-hover"
                            : "line-hover-light"
                        )}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm font-helvetica font-medium group hover:opacity-80 transition-opacity duration-300",
                    isScrolled || pathname !== "/"
                      ? "text-primary"
                      : "text-background"
                  )}
                >
                  {item.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-0 h-0.5 bg-background transition-all duration-300 group-hover:w-full",
                      isScrolled || pathname !== "/"
                        ? "bg-primary"
                        : "bg-background"
                    )}
                  ></span>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              className={cn(
                isScrolled || pathname !== "/"
                  ? "text-primary"
                  : "text-background",
                "p-2 rounded-md hover:opacity-80 transition-all duration-300"
              )}
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="text-destructive" />
              ) : (
                <MenuIcon />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Accordion Menu */}
        {mobileMenuOpen && <MobileMenu setMobileMenuOpen={setMobileMenuOpen} />}
      </div>
    </motion.nav>
  );
};

// ================== MOBILE MENU ==================

const MobileMenu = ({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSubmenu = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="md:hidden mt-4 flex flex-col space-y-2 z-[999] p-5 bg-background rounded-lg"
    >
      {navItems.map((item, index) =>
        item.submenu ? (
          <div key={item.name} className="w-full">
            <button
              onClick={() => toggleSubmenu(index)}
              className="flex items-center justify-between w-full font-helvetica font-medium py-2"
            >
              {item.name}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>

            {/* Submenu with animation */}
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden pl-4 flex flex-col"
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="py-1 text-sm hover:underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-helvetica font-medium py-2 hover:underline"
          >
            {item.name}
          </Link>
        )
      )}
    </motion.div>
  );
};

export default Navigation;
