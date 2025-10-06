import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";

const NavigateButton = ({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) => {
  return (
    // <Link href={href}>
    //   <Button
    //     variant="outline"
    //     className="text-primary border-primary/10 hover:bg-white/50 hover:text-primary/90"
    //     size="lg"
    //   >
    //     {children}
    //   </Button>
    // </Link>

    <Link href={href} className="relative font-bold text-primary group">
      <span className="relative z-10">{children}</span>
      <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-primary transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

export default NavigateButton;
