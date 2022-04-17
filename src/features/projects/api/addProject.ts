import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { useSWRConfig } from 'swr'
import { Project, ProjectDTO } from '../types';

interface Props {
    projectData: ProjectDTO
    userId: string
}

const addProject = ({ projectData, userId }: Props): Promise<Project[]> => {
    return apiCall.post(`/user/${userId}/project/add`, projectData);
};

export const useAddProject = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function addProjectFn(projectData : ProjectDTO) {
        try {
            dispatch(clearError());
            await addProject({ projectData, userId })
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
        addProjectFn
    }
}


