import React, { FC, useState } from "react";
import { ProjectsList } from "../components/ProjectsList";
import { ProjectForm } from "../components/ProjectForm";
import { ProjectProps } from "../types";
import { ContentLayout } from "@/components/Layout";
import { useLocation } from "react-router-dom";

type ComponentMapProps = {
  [x: string]: FC<ProjectProps>;
};

interface LocationState {
  pathname: "form" | "list";
}

export const Projects = () => {
  const location = useLocation();
  const pathname = location.state
    ? (location.state as LocationState).pathname
    : "";
  const [currentState, setCurrentState] = useState<"form" | "list">(
    pathname ? pathname : "list"
  );

  const COMPONENT_MAP: ComponentMapProps = {
    list: ProjectsList,
    form: ProjectForm,
  };

  const Component = COMPONENT_MAP[currentState];

  return (
    <ContentLayout title="Projects">
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Component setCurrentState={setCurrentState} />
      </div>
    </ContentLayout>
  );
};
