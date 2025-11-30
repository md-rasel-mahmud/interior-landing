import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="flex justify-between items-center bg-white sticky top-0 z-50 p-4 border-b">
      <SidebarTrigger />

      <div className="flex items-center gap-4">
        <Button>
          <Link href="/" className="flex items-center gap-2 ">
            <Home /> Home Page
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
