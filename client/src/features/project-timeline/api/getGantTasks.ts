import { useAuth } from '@/lib/auth';
import useSwr from '@/lib/useSwr';

export const useGetGanttChartTasks = <T>(projectId: string) => {
	const { isAuthenticated, currentUser } = useAuth();
	const userId = isAuthenticated ? currentUser?.userId : '';
	const { data, isLoading, isError, errorMessage } = useSwr<T>(
		isAuthenticated ? `/user/${userId}/project/${projectId}/gantt-tasks` : null
	);

	return {
		data,
		isLoading,
		isError,
		errorMessage,
	};
};
