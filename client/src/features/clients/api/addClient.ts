import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr'
import { Client, ClientDTO } from '../types';

interface Props {
    clientData: ClientDTO
    userId: string
}

const addClient = ({ clientData, userId }: Props): Promise<Client[]> => {
    return apiCall.post(`/user/${userId}/client/add`, clientData);
};

export const useAddClient = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function addClientFn(clientData : ClientDTO) {
        try {
            dispatch(clearError());
            await addClient({ clientData, userId })
            mutate(`/user/${userId}/clients`)
            toast.success('New Client Added')
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
        addClientFn
    }
}


