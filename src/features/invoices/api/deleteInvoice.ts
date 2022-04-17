import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr'
import { Invoice, InvoiceDTO } from '../type';

interface Props {
    invoiceId: string
    userId: string
}

const deleteInvoice = ({ invoiceId, userId }: Props): Promise<Invoice[]> => {
    return apiCall.delete(`/user/${userId}/invoice/${invoiceId}`);
};

export const useDeleteInvoice = () => {
    const { mutate } = useSWRConfig()
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const userId = isAuthenticated ? currentUser?.userId : ''

    async function deleteInvoiceFn(invoiceId : string) {
        try {
            dispatch(clearError());
            await deleteInvoice({ invoiceId, userId })
            mutate(`/user/${userId}/invoices`)
            toast.success(' Invoice Deleted')
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
        deleteInvoiceFn
    }
}


