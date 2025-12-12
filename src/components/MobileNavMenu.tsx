"use client";
import { navItems } from "@/constants/nav-menu";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const MobileNavMenu = ({
  setMobileMenuOpen,
  parsedNavItems,
}: {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parsedNavItems: typeof navItems;
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
      {parsedNavItems.map((item, index) =>
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

export default MobileNavMenu;
