import AdminSettingPageClient from "@/app/(admin)/admin/setting/AdminSettingPageClient";
import Loading from "@/components/common/Loading";
import { Suspense } from "react";

const AdminSettingPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <AdminSettingPageClient />
    </Suspense>
  );
};

export default AdminSettingPage;
