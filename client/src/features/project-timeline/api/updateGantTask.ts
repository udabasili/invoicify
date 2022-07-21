'/project/:projectId/gantt-tasks/:ganttTaskId/update';

import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { useSWRConfig } from 'swr';
import { GanttChartTask } from '../types';

export interface UpdateGanttChartTaskDTO {
	start?: Date;
	end?: Date;
	title?: string;
	completed?: boolean;
	parentId?: number;
}

interface Props {
	ganttChartTaskData: UpdateGanttChartTaskDTO;
	userId: string;
	projectId: string;
	ganttTaskId: string;
}

const updateGanttChartTask = ({
	ganttChartTaskData,
	userId,
	projectId,
	ganttTaskId,
}: Props): Promise<GanttChartTask> => {
	return apiCall.put(`/user/${userId}/project/${projectId}/gantt-tasks/${ganttTaskId}/update`, ganttChartTaskData);
};

export const useUpdatedGanttChartTask = () => {
	const { mutate } = useSWRConfig();
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
	const currentUser = useAppSelector((state) => state.user.currentUser);
	const userId = isAuthenticated ? currentUser?.userId : '';

	async function updateGanttChartTaskFn(
		ganttChartTaskData: UpdateGanttChartTaskDTO,
		projectId: string,
		ganttTaskId: string
	) {
		try {
			dispatch(clearError());
			await updateGanttChartTask({ ganttChartTaskData, userId, projectId, ganttTaskId });
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
		updateGanttChartTaskFn,
	};
};
