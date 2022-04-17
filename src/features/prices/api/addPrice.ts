import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { useSWRConfig } from 'swr'
import { Price, PriceDTO } from '../types';

interface Props {
    priceData: PriceDTO
    userId: string
}

const addPrice = ({ priceData, userId }: Props): Promise<Price[]> => {
    return apiCall.post(`/user/${userId}/product/add`, priceData);
};

export const useAddPrice = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function addPriceFn(priceData : PriceDTO) {
        try {
            dispatch(clearError());
            await addPrice({ priceData, userId })
            mutate(`/user/${userId}/prices`)
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
        addPriceFn
    }
}


