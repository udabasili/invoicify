import React, { FC, useState } from "react";
import { CustomProps } from "@/components/CustomHeader/CustomHeader";
import { TodoList } from "../components/TodoList";
import ProjectTimeLineForm from "../components/ProjectTimeLineForm";
import { ContentLayout } from "@/components/Layout";
import Button from "@/components/Elements/Button/Button";
import { useGetProjects } from "@/features/projects/api/getProjects";
import { Project } from "@/features/projects/types";
import { useNavigate } from "react-router-dom";

type Props = {
  projectList: Project[];
  setProjectId: (e: string) => void;
  projectId: string;
};
type ComponentMapProps = {
  [x: string]: FC<CustomProps & Props>;
};


export const Todo = () => {
  const [currentState, setCurrentState] = useState<"form" | "list">("list");
  const [projectId, setProjectId] = useState("");
  const navigate = useNavigate();

  const COMPONENT_MAP: ComponentMapProps = {
    list: TodoList,
    form: ProjectTimeLineForm,
  };

  let projectList: Project[] = [];

  const { data } = useGetProjects<Project[]>();

  if (data?.length) {
    projectList = data;
  }

  const Component = COMPONENT_MAP[currentState];

  return (
    <ContentLayout title="Project TimeLine">
      <div className="min-h-screen bg-gray-50  justify-center py-12 sm:px-6 lg:px-8 ">
        {!projectId ? (
          <>
            <div className=" flex justify-center md:grid grid-cols-2 md:col-start-3 md:col-end-5">
              <select
                name="projectId"
                className="col-start-1 col-end-2 w-auto py-2 px-1  "
                defaultValue=""
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
              >
                <option value="" disabled hidden>
                  Choose the Project
                </option>
                {projectList.map((project) => (
                  <option
                    key={project.projectId}
                    value={project.projectId}
                    className="p-4"
                  >
                    {project.projectName}
                  </option>
                ))}
              </select>
              <Button
                type="button"
                onClick={() => navigate("/project", { state: {
                  pathname: 'form'
                } })}
                variant="dark"
                size="sm"
                className="justify-self-start  col-start-2 col-end-3 ml-6"
              >
                Add Project
              </Button>
            </div>
          </>
        ) : (
          <Component
            setCurrentState={setCurrentState}
            projectList={projectList}
            projectId={projectId}
            setProjectId={setProjectId}
          />
        )}
      </div>
    </ContentLayout>
  );
};
