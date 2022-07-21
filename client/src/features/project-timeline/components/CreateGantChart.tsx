import { CustomProps } from "@/components/CustomHeader/CustomHeader";
import { tasks } from "@/data/data";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAddGanttChartTask } from "../api/addGantTask";
import { useGetGanttChartTasks } from "../api/getGantTasks";
import { GanttChartTask, GanttChartTaskDTO } from "../types";
import GanttChart from "./GanttChart";

type TaskProps = {
  color: any;
  end: Date;
  progress: number;
  start: Date;
  title: string;
};

type DependenciesProps = {
  id: number;
  predecessorId: number;
  successorId: number;
  type: number;
};

type GanttChartProps = {
  projectId: string;
};
 

const CreateGanttChart = ({
  projectId,
  setCurrentState,
}: GanttChartProps & CustomProps) => {

  const { addGanttChartTaskFn } = useAddGanttChartTask();
  const [isLoading, setLoading] = useState(false)  
  const { data,  isError, errorMessage } = useGetGanttChartTasks<GanttChartTask[]>(projectId);


  async function handleSubmit(ganttData: GanttChartTask[], updatedDependencies: DependenciesProps[]) {
    try {
      setLoading(true);
      const data = ganttData.map((d) => {
        return {
          ...d,
          projectId,
          successorId:
            updatedDependencies.filter(
              (dependency) => dependency.predecessorId === d.id
            )[0] !== undefined
              ? updatedDependencies.filter(
                  (dependency) => dependency.predecessorId === d.id
                )[0].successorId
              : undefined,
        };
      });

      const response = await addGanttChartTaskFn(data, projectId);
      if (response === "success" && setCurrentState) {
        setCurrentState("list");
      }
      setLoading(false)

    } catch (error) {
      setLoading(false)
      const errorObject = error as AxiosError;
      if (errorObject.isAxiosError) {
        toast.error(errorObject.response?.data.message);
        return;
      }
      toast.error(errorObject.message);
    }
  }

  return (
    <GanttChart
      tasks={tasks}
      editable={true}
      projectId={projectId}
      isLoading={isLoading}
      setCurrentState={setCurrentState} 
      handleSubmit={handleSubmit}    />
  );
};

export default CreateGanttChart;
