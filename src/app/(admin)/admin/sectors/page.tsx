import AdminSectorComponent from "@/app/(admin)/admin/sectors/AdminSectorComponent";
import Loading from "@/components/common/Loading";
import React, { Suspense } from "react";

const AdminSectorPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <AdminSectorComponent />
      </Suspense>
    </div>
  );
};

export default AdminSectorPage;
