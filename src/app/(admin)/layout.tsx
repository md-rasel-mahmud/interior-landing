import AdminLayout from "@/components/common/AdminLayout";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminLayout>{children}</AdminLayout>
    </SidebarProvider>
  );
}
