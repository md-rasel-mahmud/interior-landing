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
    <Link href={href}>
      <Button
        variant="outline"
        className="text-primary border-primary/10 hover:bg-white/50 hover:text-primary/90"
        size="lg"
      >
        {children}
      </Button>
    </Link>
  );
};

export default NavigateButton;
