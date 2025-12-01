import Loading from "@/components/common/Loading";
import ProjectsSection from "@/components/sections/ProjectsSection";
import React, { Suspense } from "react";

const ProjectsPage = async () => {
  return (
    <div className="pt-20">
      <Suspense fallback={<Loading />}>
        <ProjectsSection isPage />
      </Suspense>
    </div>
  );
};

export default ProjectsPage;
