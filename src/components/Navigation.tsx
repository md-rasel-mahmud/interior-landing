"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { navItems } from "@/constrain/nav-menu";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              src={logo}
              alt="Logo"
              width={200}
              height={200}
              className="h-20 w-auto"
            />
          </motion.button>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) =>
              item.submenu ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 focus:outline-none focus:border-none font-medium text-foreground hover:text-primary transition-colors duration-300">
                      {item.name}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {item.submenu.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link href={subItem.href} className="w-full">
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group font-helvetica text-sm font-medium drop-shadow-md text-gradient-gold hover:text-accent transition-colors duration-300"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              )
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-foreground"
            whileTap={{ scale: 0.95 }}
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
    </motion.nav>
  );
};

export default Navigation;
