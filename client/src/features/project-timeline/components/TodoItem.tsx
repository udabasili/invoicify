import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { GanttChartTask } from "../types";
import { DeleteGanttTask } from "./DeleteGanttTask";

export const TodoItem = (props: GanttChartTask) => {
  const { ganttTaskId, title, completed, projectId, end } = props;
  const navigation = useNavigate();
  const [checked, setChecked] = useState(completed);

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
  }

  return (
    <div className=" items-center grid grid-cols-[min-content_1fr_100px] py-4 border-b odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700 dark:border-gray-600">
      <input
        type="checkbox"
        className="mx-4"
        checked={checked}
        onChange={onChange}
      />
      <div>
        <h5
          className={clsx(
            "font-medium leading-tight text-md text-white",
            checked ? "line-through" : ""
          )}
        >
          {title}
        </h5>
        <span
          className={clsx(
            " text-sm text-white",
            checked ? "line-through" : "",
            new Date(end as Date) < new Date() ? "text-red-700" : ""
          )}
        >
          Due Date: {new Date(end as Date).toDateString()}
        </span>
      </div>
      <div className="py-4 flex justify-around px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
        <span title="View" className="mx-1">
          <AiFillEye
            fontSize="1.2rem"
            color="white"
            cursor="pointer"
            onClick={() => navigation(`/project-timeline/${projectId}`)}
          />
        </span>
        <span title="Delete" className="mx-1">
          <DeleteGanttTask
            triggerButton={
              <ImBin fontSize="1.2rem" color="red" cursor="pointer" />
            }
            ganttTaskId={ganttTaskId}
            projectId={projectId}
          />
        </span>
      </div>
    </div>
  );
};
