import { CustomHeader } from "@/components/CustomHeader/CustomHeader";
import Loader from "@/components/Elements/Loaders/Loader";
import { ContentLayout } from "@/components/Layout";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useGetGanttChartTasks } from "../api/getGantTasks";
import { GanttChartTask } from "../types";
import GanttChart from "./GanttChart";
import { TodoListContainer } from "./index.style";

export const ViewGanttChart = () => {
  let { projectId } = useParams();
  const { data, isLoading } = useGetGanttChartTasks<GanttChartTask[]>(
    projectId as string
  );
  let ganttChartData: GanttChartTask[] = [];
  const navigation = useNavigate();

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (data?.length) {
    ganttChartData = data;
  }

  return (
    <ContentLayout title="Project TimeLine">
      <div className="min-h-screen bg-gray-50  justify-center py-12 sm:px-6 lg:px-8 ">
        <TodoListContainer>
          <CustomHeader
            title={`Project Timeline`}
            startIcon={<IoMdArrowRoundBack />}
            nextType="list"
            buttonText="Go back"
            handleNavigation={() => navigation("/project-timeline/")}
          />
          <GanttChart
            projectId={projectId as string}
            editable={false}
            tasks={ganttChartData}
          />
        </TodoListContainer>
      </div>
    </ContentLayout>
  );
};
