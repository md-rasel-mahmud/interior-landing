import ProjectPageClient from "@/app/(admin)/admin/projects/ProjectsPageClient";
import Loading from "@/components/common/Loading";
import { Suspense } from "react";

const ProductPage = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProjectPageClient />
      </Suspense>
    </div>
  );
};

export default ProductPage;
