import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { useSWRConfig } from 'swr';
import { GanttChartTask, GanttChartTaskDTO } from '../types';

interface Props {
	ganttChartTaskData: GanttChartTaskDTO[];
	userId: string;
	projectId: string;
}

const addGanttChartTask = ({ ganttChartTaskData, userId, projectId }: Props): Promise<GanttChartTask[]> => {
	return apiCall.post(`/user/${userId}/project/${projectId}/gantt-tasks/add`, ganttChartTaskData);
};

export const useAddGanttChartTask = () => {
	const { mutate } = useSWRConfig();
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
	const currentUser = useAppSelector((state) => state.user.currentUser);
	const userId = isAuthenticated ? currentUser?.userId : '';

	async function addGanttChartTaskFn(ganttChartTaskData: GanttChartTaskDTO[], projectId: string) {
		try {
			dispatch(clearError());
			await addGanttChartTask({ ganttChartTaskData, userId, projectId });
			mutate(`/user/${userId}/project/${projectId}/gantt-tasks`);
			return 'success';
		} catch (error) {
			const errorObject = error as AxiosError;
			if (errorObject.isAxiosError) {
				dispatch(setError(errorObject.response?.data.message));
				return;
			}
			dispatch(setError(errorObject.message));
		}
	}

	return {
		addGanttChartTaskFn,
	};
};
