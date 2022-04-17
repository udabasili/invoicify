import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { useSWRConfig } from 'swr'
import { Invoice, InvoiceDTO } from '../type';

interface Props {
    invoiceData: InvoiceDTO
    userId: string
}

const addInvoice = ({ invoiceData, userId }: Props): Promise<Invoice[]> => {
    return apiCall.post(`/user/${userId}/invoice/add`, invoiceData);
};

export const useAddInvoice = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function addInvoiceFn(invoiceData : InvoiceDTO) {
        try {
            dispatch(clearError());
            await addInvoice({ invoiceData, userId })
            mutate(`/user/${userId}/invoices`)
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
        addInvoiceFn
    }
}


