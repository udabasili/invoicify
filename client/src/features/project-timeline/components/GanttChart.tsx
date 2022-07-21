import { useState } from "react";
import { dependencies } from "@/data/data";
import Gantt, {
  Tasks,
  Dependencies,
  Toolbar,
  Item,
  Column,
  Validation,
  Editing,
} from "devextreme-react/gantt";
import Button from "@/components/Elements/Button/Button";
import { useAddGanttChartTask } from "../api/addGantTask";
import { CustomProps } from "@/components/CustomHeader/CustomHeader";
import { GanttChartTaskDTO } from "../types";

type TaskProps = {
  color: any;
  end: Date;
  progress: number;
  start: Date;
  title: string;
};

type DependenciesProps = {
  predecessorId: number;
  successorId: number;
  type: number;
};

type GanttChartProps = {
  projectId: string;
  tasks: GanttChartTaskDTO[];
  editable: boolean;
  handleSubmit?: (...e: any) => void;
  isLoading?: boolean;
};

const GanttChart = ({
  projectId,
  setCurrentState,
  isLoading,
  handleSubmit,
  editable,
  tasks,
}: GanttChartProps & Partial<CustomProps>) => {
  const [ganttData, setGanttData] = useState<GanttChartTaskDTO[]>(tasks);
  const [updatedDependencies, setDependencies] = useState(dependencies);
  const { addGanttChartTaskFn } = useAddGanttChartTask();

  function handleTaskDelete(obj: TaskProps) {
    const updateData = ganttData.filter((data) => {
      if (data.title === obj.title) {
        return false;
      }
      return true;
    });
    setGanttData([...updateData]);
  }

  function handleDependedDelete(obj: DependenciesProps) {
    const updateData = updatedDependencies.filter((data) => {
      if (data.id === obj.successorId) {
        return false;
      }
      return true;
    });
    setDependencies([...updateData]);
  }

  function handleTaskChange(obj: TaskProps) {
    const updateData = ganttData.map((data) => {
      if (data.title === obj.title) {
        return {
          ...data,
          ...obj,
        };
      } else {
        return data;
      }
    });
    setGanttData([...updateData]);
  }

  function handleDependenciesChange(obj: DependenciesProps) {
    const updateData = updatedDependencies.map((data) => {
      if (data.id === obj.successorId) {
        return {
          ...data,
          ...obj,
        };
      } else {
        return data;
      }
    });
    setDependencies([...updateData]);
  }

  return (
    <div className="flex flex-col  my-5">
      {editable && handleSubmit ? (
        <>
          <Button
            type="button"
            variant="dark"
            size="lg"
            onClick={() => handleSubmit(ganttData, dependencies)}
            isLoading={isLoading}
            className="self-center"
          >
            Submit Gantt Chart
          </Button>
          <h5 className="font-medium leading-tight text-xl text-blue-600  my-5">
            Set Timeline Chart
          </h5>
          <p className="italic">
            Edit by clicking either the chart or the the table values
          </p>
        </>
      ) : null}

      <Gantt
        scaleType="months"
        onTaskUpdating={(e) => handleTaskChange(e.newValues)}
        onTaskDeleting={(e) => handleTaskDelete(e.values)}
        onDependencyDeleting={(e) => handleDependedDelete(e.values)}
        onDependencyInserting={(e) => handleDependenciesChange(e.values)}
        height={700}
      >
        <Tasks dataSource={ganttData} />
        <Dependencies dataSource={updatedDependencies} />
        <Toolbar>
          <Item name="undo" />
          <Item name="redo" />
          <Item name="separator" />
          <Item name="collapseAll" />
          <Item name="expandAll" />
          <Item name="separator" />
          <Item name="addTask" />
          <Item name="deleteTask" />
          <Item name="separator" />
          <Item name="zoomIn" />
          <Item name="zoomOut" />
        </Toolbar>

        <Column dataField="title" caption="Subject" width={300} />
        <Column dataField="start" caption="Start Date" />
        <Column dataField="end" caption="End Date" />

        <Validation autoUpdateParentTasks />
        <Editing enabled={editable} />
      </Gantt>
    </div>
  );
};

export default GanttChart;
