import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr'
import { Client, ClientDTO } from '../types';

interface Props {
    clientId: string
    userId: string
    updateClientData: ClientDTO
}

const updateClient = ({ clientId, userId, updateClientData }: Props): Promise<Client[]> => {
    return apiCall.patch(`/user/${userId}/client/${clientId}/update`, updateClientData);
};

export const useUpdateClient = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function updateClientFn(updateClientData: ClientDTO) {
        try {
            const clientId = updateClientData.userId as string
            delete updateClientData.userId
            dispatch(clearError());
            await updateClient({ clientId, userId, updateClientData })
            mutate(`/user/${userId}/clients`)
            toast.success(' Client Updated')
            return 'success';
        } catch (error) {
            const errorObject = error as AxiosError;
            if (errorObject.isAxiosError) {
                dispatch(setError(errorObject.response?.data.message));
                return
            }
            dispatch(setError(errorObject.message));
        }
    }

    return {
        updateClientFn
    }
}
