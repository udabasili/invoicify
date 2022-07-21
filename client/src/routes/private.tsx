import Loader from '@/components/Elements/Loaders/Loader';
import FullScreenLoader from '@/components/FullScreenLoader/FullScreenLoader';
import { MainLayout } from '@/components/Layout';
import { ViewGanttChart } from '@/features/project-timeline/components/ViewGanttChart';
import { lazyImport } from '@/utils/lazyImport';
import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const { ClientDetails } = lazyImport(() => import('@/features/clients/routes/ClientDetails'), 'ClientDetails');
const { Clients } = lazyImport(() => import('@/features/clients/routes/Clients'), 'Clients');
const { InvoiceDetails } = lazyImport(() => import('@/features/invoices/routes/InvoiceDetails'), 'InvoiceDetails');
const { Invoices } = lazyImport(() => import('@/features/invoices/routes/Invoices'), 'Invoices');
const { Prices } = lazyImport(() => import('@/features/prices/routes/Prices'), 'Prices');
const { Projects } = lazyImport(() => import('@/features/projects/routes/Projects'), 'Projects');
const { Todo } = lazyImport(() => import('@/features/project-timeline/routes/Todo'), 'Todo');

const App = () => {
	return (
		<MainLayout>
			<>
				<Outlet />
			</>
		</MainLayout>
	);
};

const protectedRoute = [
	{
		path: '/',
		element: <App />,
		children: [
			{ path: '/client', element: <Clients /> },
			{ path: '/client/:clientId', element: <ClientDetails /> },
			{ path: '/invoice', element: <Invoices /> },
			{ path: '/invoice/:invoiceId', element: <InvoiceDetails /> },
			{ path: '/price', element: <Prices /> },
			{ path: '/project', element: <Projects /> },
			{ path: '/project-timeline', element: <Todo /> },
			{ path: '/project-timeline/:projectId', element: <ViewGanttChart /> },
			{ path: '/', element: <Navigate to="/project" /> },
			{ path: '*', element: <Navigate to="." /> },
		],
	},
];

export default protectedRoute;
