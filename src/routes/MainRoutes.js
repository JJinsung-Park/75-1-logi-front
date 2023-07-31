import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'template/layout/MainLayout';
import Loadable from 'template/ui-component/Loadable';
import CompanyInfo from "../erp/logistic/base/page/CompanyInfo";

// sample page routing
const SamplePage = Loadable(lazy(() => import('template/views/sample-page')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <SamplePage />
        },
        {
            path: '/sample-page',
            element: <SamplePage />
        }
    ]
};

export default MainRoutes;
