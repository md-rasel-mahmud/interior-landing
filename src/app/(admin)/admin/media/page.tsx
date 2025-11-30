import AdminMediaClient from "@/app/(admin)/admin/media/AdminMediaClient";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

const AdminUnitPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <Skeleton className="h-10 w-40" />
        </div>
      }
    >
      <AdminMediaClient />
    </Suspense>
  );
};

export default AdminUnitPage;
