import { useAuth } from '@/lib/auth';
import useSwr from '@/lib/useSwr';

export const useGetProjects = <T>() => {
	const { isAuthenticated, currentUser } = useAuth();
	const userId = isAuthenticated ? currentUser?.userId : '';
	const { data, isLoading, isError, errorMessage } = useSwr<T>(isAuthenticated ? `/user/${userId}/projects` : null);

	return {
		data,
		isLoading,
		isError,
		errorMessage,
	};
};
