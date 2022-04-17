import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { useSWRConfig } from 'swr';
import { Project } from '../types';

export type UpdateProjectDTO = {
  data: Partial<Project>;
  projectId: string;
  userId: string;
};

export const updateProject = ({
    data,
    projectId,
    userId
  }: UpdateProjectDTO): Promise<Project> => {
    return apiCall.patch(`/user/${userId}/project/${projectId}/update`, data);
};

export const useUpdateProject = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function updateProjectFn( data: Partial<Project>) {
        const projectId = data.projectId as string;
        try {
            dispatch(clearError());
            await updateProject({ data, projectId, userId })
            mutate(`/user/${userId}/projects`)
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
        updateProjectFn
    }
}


