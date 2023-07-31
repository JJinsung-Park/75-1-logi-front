import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'template/layout/MinimalLayout';
import NavMotion from 'template/layout/NavMotion';
import Loadable from 'template/ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('template/views/pages/authentication/Login3')));
const AuthRegister = Loadable(lazy(() => import('template/views/pages/authentication/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('template/views/pages/authentication/ForgotPassword3')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            path: '/',
            element: <AuthLogin />
        },
        {
            path: '/login',
            element: <AuthLogin />
        },
        {
            path: '/register',
            element: <AuthRegister />
        },
        {
            path: '/forgot',
            element: <AuthForgotPassword />
        }
    ]
};

export default LoginRoutes;
