import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { useSWRConfig } from 'swr'
import { GanttChartTask } from '../types';

interface Props {
    ganttTaskId: string
    userId: string
    projectId: number
}

const deleteGanttTask = ({ ganttTaskId, userId, projectId }: Props): Promise<GanttChartTask[]> => {
    return apiCall.delete(`/user/${userId}/project/${projectId}/gantt-tasks/${ganttTaskId}/delete`);
};


export const useDeleteGanttTask = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function deleteGanttTaskFn(ganttTaskId : string, projectId: number) {
        try {
            dispatch(clearError());
            await deleteGanttTask({ ganttTaskId, userId, projectId })
            mutate(`/user/${userId}/project/${projectId}/gantt-tasks`)
            return 'success';
        } catch (error) {
            const errorObject = error as AxiosError;
            if (errorObject.isAxiosError) {
                dispatch(setError(errorObject.response?.data.message));
                console.log(errorObject.response?.data.message);
                return
            }
            dispatch(setError(errorObject.message));
        }
    }

    return {
        deleteGanttTaskFn
    }
}


