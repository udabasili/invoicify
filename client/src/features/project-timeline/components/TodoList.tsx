import {
  CustomHeader,
  CustomProps,
} from "@/components/CustomHeader/CustomHeader";
import Loader from "@/components/Elements/Loaders/Loader";
import { Project } from "@/features/projects/types";
import { HiOutlineArchive } from "react-icons/hi";
import { IoMdAdd } from "react-icons/io";
import { useGetGanttChartTasks } from "../api/getGantTasks";
import { GanttChartTask } from "../types";
import { TodoItem } from "./TodoItem";
import { FiEdit2 } from "react-icons/fi";
import { TodoListContainer } from "./index.style";

type TodoListProps = {
  setProjectId: (e: string) => void;
  projectId: string;
  projectList: Project[];
} & CustomProps;

export const TodoList = ({ setCurrentState, projectId }: TodoListProps) => {
  const { data, isLoading, isError } = useGetGanttChartTasks<GanttChartTask[]>(projectId);

  let component: JSX.Element = <></>;
  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (!data || data?.length === 0 || isError) {

    component = (
      <div
        role="list"
        aria-label="comments"
        className="bg-white text-gray-500 h-40 flex justify-center items-center flex-col  my-5"
      >
        <HiOutlineArchive className="h-10 w-10" />
        <h4>No Todo Items Found</h4>
      </div>
    );
  }

  if (data?.length) {
    component = (
      <div className="min-w-full flex flex-col  my-5">
        {data
          ?.filter((item: GanttChartTask) => item.parentId !== 0)
          .map((item: GanttChartTask) => (
            <TodoItem key={item.ganttTaskId} {...item} />
          ))}
      </div>
    );
  }
  return (
    <TodoListContainer>
      {data?.length ? (
        <CustomHeader
          title="Todo "
          startIcon={<FiEdit2 />}
          setCurrentState={setCurrentState}
          buttonText="Edit Gantt Chart"
          nextType="form"
        />
      ) : (
        <CustomHeader
          title="Todo "
          startIcon={<IoMdAdd />}
          setCurrentState={setCurrentState}
          buttonText="Create Gantt Chart"
          nextType="form"
        />
      )}

      {component}
    </TodoListContainer>
  );
};
