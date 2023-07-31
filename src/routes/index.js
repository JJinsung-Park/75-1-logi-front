import { useRoutes } from 'react-router-dom';

// routes
import AuthenticationRotes from './AuthenticationRoutes';
import LoginRoutes from './LoginRoutes';
import MainRoutes from './MainRoutes';
import RootRoute from "../root/RootRoute";
import BasicInfoRoute from "../erp/logistic/base/route/BasicInfoRoute";
import LogiRootRoute from "../erp/logistic/root/RootRoute";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([LoginRoutes, AuthenticationRotes, MainRoutes, ...RootRoute]);
}
