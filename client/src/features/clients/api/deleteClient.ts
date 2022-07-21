import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr'
import { Client } from '../types';

interface Props {
    clientId: string
    userId: string
}

const deleteClient = ({ clientId, userId }: Props): Promise<Client[]> => {
    return apiCall.delete(`/user/${userId}/client/${clientId}/delete`);
};

export const useDeleteClient = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const errorMessage = useAppSelector(state => state.error.error)
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function deleteClientFn(clientId : string) {
        try {
            dispatch(clearError());
            await deleteClient({ clientId, userId })
            mutate(`/user/${userId}/clients`)
            toast.success(' Client Deleted')
            return 'success';
        } catch (error) {
            const errorObject = error as AxiosError;
            if (errorObject.isAxiosError) {
                dispatch(setError(errorObject.response?.data.message));
                return
            }
            dispatch(setError(errorObject.message));
            toast.error(errorMessage)
        }
    }

    return {
        deleteClientFn
    }
}


