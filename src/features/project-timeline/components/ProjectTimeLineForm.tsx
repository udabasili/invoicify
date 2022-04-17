import {
  CustomHeader,
  CustomProps,
} from "@/components/CustomHeader/CustomHeader";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TodoListContainer } from "./index.style";
import { Project } from "@/features/projects/types";
import CreateGanttChart from "./CreateGantChart";


type ProjectTimeLineFormProps = {
  setProjectId: (e: string) => void;
  projectId: string;
  projectList: Project[];

} & CustomProps

export const ProjectTimeLineForm = ({ setCurrentState, projectId }: ProjectTimeLineFormProps) => {


  return (
    <TodoListContainer>
      <CustomHeader
        title="Add Project Timeline"
        startIcon={<IoMdArrowRoundBack />}
        setCurrentState={setCurrentState}
        nextType="list"
        buttonText="Go back"
      />
      <CreateGanttChart
        setCurrentState={setCurrentState}
        projectId={projectId}     />
    </TodoListContainer>
  );
};

export default ProjectTimeLineForm;
