import AdminCategoryClient from "@/app/(admin)/admin/AdminCategoryClient";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

const AdminCategoryPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Skeleton className="h-10 w-40" />
        </div>
      }
    >
      <AdminCategoryClient />
    </Suspense>
  );
};

export default AdminCategoryPage;
