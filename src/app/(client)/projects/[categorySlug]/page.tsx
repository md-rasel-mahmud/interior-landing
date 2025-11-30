import ProjectsSection from "@/components/sections/ProjectsSection";

import React from "react";

const ProjectsPage = async ({
  params,
}: {
  params: { categorySlug: string };
}) => {
  const { categorySlug } = params;

  return (
    <>
      <ProjectsSection isPage categorySlug={categorySlug} />
    </>
  );
};

export default ProjectsPage;
