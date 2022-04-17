import { lazyImport } from '@/utils/lazyImport';
import { Navigate } from 'react-router-dom';

const { AuthRoute } = lazyImport(() => import('@/features/auth/routes'), "AuthRoute");

export const publicRoutes = [
    {
        path: '/auth/*',
        element: <AuthRoute/>
    },
    { path: '*', element: <Navigate to="/auth/login" /> },

]
