import Loading from "@/components/common/Loading";
import ProjectsSection from "@/components/sections/ProjectsSection";

import React, { Suspense } from "react";

const ProjectsPage = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const { categorySlug } = params;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <ProjectsSection isPage categorySlug={categorySlug} />
      </Suspense>
    </>
  );
};

export default ProjectsPage;
