import { apiCall } from '@/lib/axios';
import { AxiosPromise } from 'axios';
import { RegisterCredentialsDTO, UserResponse } from '../types';

export const register = (data: RegisterCredentialsDTO): AxiosPromise<UserResponse> => {
	delete data.confirmPassword;
	return apiCall.post('/auth/register', data);
};
