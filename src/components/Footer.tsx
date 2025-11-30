"use client";
import { navItems } from "@/constants/nav-menu";
import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import logo from "@/assets/logo.svg";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  const router = useRouter();
  const pathname = usePathname();

  const handleGoToHome = () => {
    if (pathname !== "/") {
      router.push("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background border-t border-border/20">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-24 mb-12">
          {/* Logo & Description */}
          <div>
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
          </div>

          {/* Footer Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * 2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <ul className="flex justify-center flex-wrap gap-3">
              {[
                ...navItems,
                {
                  name: "Career",
                  href: "/career",
                },
              ].map((link, linkIndex) => (
                <motion.li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-inter text-foreground/70 hover:text-accent transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </Link>{" "}
                  {linkIndex < navItems.length && (
                    <span className="mx-2 text-foreground/50">|</span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * 5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-primary/20 border border-primary/60 rounded-full flex items-center justify-center text-primary hover:bg-accent hover:text-background transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div> */}
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        {/* Bottom Footer */}
        <motion.div
          className="flex flex-col md:flex-row justify-center items-center space-y-3 md:space-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="font-inter text-foreground/60 text-sm">
            © {new Date().getFullYear()} Platonic. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
