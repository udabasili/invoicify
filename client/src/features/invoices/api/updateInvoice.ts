import { clearError, setError } from '@/features/error/reducer/errorSlice';
import { apiCall } from '@/lib/axios';
import { useAppDispatch, useAppSelector } from '@/store';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useSWRConfig } from 'swr';
import { Invoice, InvoiceAttributes } from '../type';

interface Props {
	invoiceId: string;
	userId: string;
	updateInvoiceData: Partial<InvoiceAttributes>;
}

const updateInvoice = ({ invoiceId, userId, updateInvoiceData }: Props): Promise<Invoice[]> => {
	return apiCall.patch(`/user/${userId}/invoice/${invoiceId}`, updateInvoiceData);
};

export const useUpdateInvoice = () => {
	const { mutate } = useSWRConfig();
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
	const currentUser = useAppSelector((state) => state.user.currentUser);
	const userId = isAuthenticated ? currentUser?.userId : '';

	async function updateInvoiceFn(updateInvoiceData: Partial<InvoiceAttributes>) {
		try {
			const invoiceId = updateInvoiceData.invoiceId as string;
			delete updateInvoiceData.invoiceId;
			dispatch(clearError());
			await updateInvoice({ invoiceId, userId, updateInvoiceData });
			mutate(`/user/${userId}/invoices`);
			toast.success(' Invoice Updated');
			return 'success';
		} catch (error) {
			const errorObject = error as AxiosError;
			if (errorObject.isAxiosError) {
				dispatch(setError(errorObject.response?.data.message));
				return;
			}
			dispatch(setError(errorObject.message));
		}
	}

	return {
		updateInvoiceFn,
	};
};
