import { apiCall } from '@/lib/axios';

export const signOut = (): Promise<void> => {
	return apiCall.get('/auth/logout');
};
