import { Project, ProjectProps } from "../types";
import { ProjectListContainer } from "./project.styles";
import { IoMdAdd } from "react-icons/io";
import { CustomHeader } from "@/components/CustomHeader/CustomHeader";
import { useGetProjects } from "../api/getProjects";
import Loader from "@/components/Elements/Loaders/Loader";
import { ProjectItem } from "./ProjectItem";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";
import "./project.css";

export const ProjectsList = ({ setCurrentState }: ProjectProps) => {
  const { data, isLoading, isError } = useGetProjects<Project[]>();

  let component: JSX.Element = <></>;
  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!data || data?.length === 0 || isError) {
    console.log(data?.length);
    component = (
      <div
        role="list"
        aria-label="comments"
        className="bg-white text-gray-500 h-40 flex justify-center items-center flex-col"
      >
        <GiEmptyMetalBucketHandle className="h-10 w-10" />
        <h4>No Project Found</h4>
      </div>
    );
  }

  if (data?.length) {
    component = (
      <table className="w-full grid grid-cols-2 lg:bg-white rounded-lg overflow-hidden lg:shadow-lg my-5 lg:table">
        <thead className="col-start-1 col-end-2 ">
          {data?.map((item) => (
            <tr className="flex flex-col flex-no wrap lg:table-row bg-green-100 dark:bg-green-700 mb-3 ">
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left dark:text-white">
                Completed
              </th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left dark:text-white">
                Project
              </th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left dark:text-white">
                Status
              </th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left dark:text-white">
                Budget
              </th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left dark:text-white">
                Due Date
              </th>
              <th className="py-3 px-6 text-xs font-medium tracking-wider text-left dark:text-white">
                Action
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="lg:contents col-start-2 col-end-3 flex-col">
          {data?.map((item) => (
            <ProjectItem key={item.projectId} {...item} />
          ))}
        </tbody>
      </table>
    );
  }

  
  return (
    <ProjectListContainer>
      <CustomHeader
        title="Project"
        startIcon={<IoMdAdd />}
        setCurrentState={setCurrentState}
        buttonText="Add Project"
        nextType="form"
      />
      {component}
    </ProjectListContainer>
  );
};
