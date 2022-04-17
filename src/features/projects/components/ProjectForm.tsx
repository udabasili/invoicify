import { CustomHeader } from "@/components/CustomHeader/CustomHeader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { z } from "zod";
import { useAddProject } from "../api/addProject";
import { ProjectDTO, ProjectProps } from "../types";
import { CustomForm } from "./CustomForm";
import { ProjectListContainer } from "./project.styles";

const initialValues = {
  projectName: "",
  summary: "",
  dueDate: new Date(),
};
const schema = z.object({
  projectName: z.string(),
  summary: z.string(),
  dueDate: z.date(),
});

export const ProjectForm = ({ setCurrentState }: ProjectProps) => {

  const { addProjectFn } = useAddProject();


  return (
    <ProjectListContainer>
      <CustomHeader
        title="Add Project"
        startIcon={<IoMdArrowRoundBack />}
        setCurrentState={setCurrentState}
        nextType="list"
        buttonText="Go back"
      />
      <CustomForm<ProjectDTO, typeof schema>
        schema={schema}
        onSubmitHandler={addProjectFn}
        onSuccessFunction={async () => setCurrentState('list')}
        initialValues={initialValues}
      />
    </ProjectListContainer>
  );
};
