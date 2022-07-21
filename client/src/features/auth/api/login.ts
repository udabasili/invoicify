import { apiCall } from '@/lib/axios';
import { AxiosPromise } from 'axios';
import { LoginCredentialsDTO, UserResponse } from '../types';

export const login = (data: LoginCredentialsDTO): AxiosPromise<UserResponse> => {
	return apiCall.post('/auth/login', data);
};
