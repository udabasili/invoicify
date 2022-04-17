
import { useAuth } from '@/lib/auth';
import useSwr from '@/lib/useSwr';

export const useGetInvoice = <T>(invoiceId: string) => {
    const { isAuthenticated, currentUser } = useAuth()
    const userId = isAuthenticated ? currentUser?.userId : ''
    const {data, isLoading, isError, errorMessage, } = useSwr<T>(isAuthenticated ? `/user/${userId}/invoices/${invoiceId}`: null) 

    return {
        data, 
        isLoading,
        isError,
        errorMessage
    }
};

