import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { useSWRConfig } from 'swr'
import { Project, ProjectDTO } from '../types';

interface Props {
    projectId: string
    userId: string
}

const deleteProject = ({ projectId, userId }: Props): Promise<Project[]> => {
    return apiCall.delete(`/user/${userId}/project/${projectId}/delete`);
};

export const useDeleteProject = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function deleteProjectFn(projectId : string) {
        try {
            dispatch(clearError());
            await deleteProject({ projectId, userId })
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
        deleteProjectFn
    }
}


