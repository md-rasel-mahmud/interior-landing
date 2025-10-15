"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navItems } from "@/constrain/nav-menu";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import logo from "@/assets/logo.svg";
import logoWhite from "@/assets/logo-white.svg";
import axiosInstance from "@/lib/axios.instanse";

// ================== MAIN NAVIGATION ==================
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenDesktopDropdown, setIsOpenDesktopDropdown] = useState(false);
  const [categories, setCategories] = useState([]);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {}, []);

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
      <div className="container mx-auto px-6 py-1">
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
            {navItems.map((item) =>
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
                  <button
                    key={item.name}
                    className={cn(
                      "flex text-sm items-center font-medium gap-1 font-helvetica hover:opacity-80 transition-colors duration-300",
                      isScrolled || pathname !== "/"
                        ? "text-primary"
                        : "text-background"
                    )}
                  >
                    {item.name}
                  </button>

                  <div
                    className={cn(
                      "absolute mt-2 left-0 rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col min-w-[150px]",
                      isScrolled || pathname !== "/"
                        ? "text-primary bg-background"
                        : "text-background"
                    )}
                  >
                    {item.submenu.map((subItem) => (
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
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* Mobile Accordion Menu */}
        {mobileMenuOpen && <MobileMenu />}
      </div>
    </motion.nav>
  );
};

// ================== MOBILE MENU ==================

const MobileMenu = () => {
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
            className="font-helvetica font-medium py-2"
          >
            {item.name}
          </Link>
        )
      )}
    </motion.div>
  );
};

export default Navigation;
