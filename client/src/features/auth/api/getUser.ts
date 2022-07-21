import { apiCall } from '@/lib/axios';
import { AxiosPromise } from 'axios';
import { UserResponse } from '../types';

export const getUser = (userId: string): AxiosPromise<UserResponse> => {
	return apiCall.get(`/user/me`, {
		withCredentials: true,
	});
};
