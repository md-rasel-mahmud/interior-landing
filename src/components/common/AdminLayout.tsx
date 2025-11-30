"use client";

import React, { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  // useSidebar,
} from "@/components/ui/sidebar";

import { adminSidebarMenu } from "@/constants/admin-sidebar-menu";
import { cn } from "@/lib/utils";
import AdminNavbar from "@/components/common/AdminNavbar";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { setOpenMobile } = useSidebar();

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });

    // For this example, we'll just redirect to the login page
    router.push("/login");
    setOpenMobile(false);
  };

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      {
        // This is the top navigation bar, which can be a separate component if needed
      }

      <Sidebar className="h-screen border-r bg-white backdrop-blur-md">
        <SidebarContent className="bg-white h-full">
          <SidebarGroup>
            <SidebarGroupLabel className="my-4">
              <Link href="/" className="text-2xl p-3 font-semibold">
                Admin Panel
              </Link>
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {adminSidebarMenu.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="my-1">
                      <Link
                        href={item.path}
                        className={cn(
                          "flex items-center gap-2 p-5 rounded-none-none transition-colors",
                          pathname === item.path
                            ? "bg-primary/20 hover:bg-primary/40 border border-primary text-primary font-bold"
                            : "text-muted-foreground hover:bg-primary/40 hover:text-black"
                        )}
                        onClick={() => setOpenMobile(false)}
                      >
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="my-1">
                    <div
                      className={cn(
                        "flex items-center gap-2 p-5 rounded-none-none transition-colors bg-destructive/20 hover:bg-destructive/40 border border-destructive text-destructive font-bold"
                        // pathname === item.path
                        //   ? "bg-primary/20 hover:bg-primary/40 border border-primary text-primary font-bold"
                        //   : "text-muted-foreground hover:bg-primary/40 hover:text-black"
                      )}
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {
        // This is the main content area where children components will be rendered
      }
      <main className="flex-1">
        <AdminNavbar />

        <div className="p-2 lg:p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
