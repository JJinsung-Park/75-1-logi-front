import React from "react";

import { default as AccountForm } from "../page/AccountForm/AccountForm"; // 계정과목관리
import { default as WorkplaceManagement } from "../page/WorkplaceManagement/WorkplaceManagement";
import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout"; //거래처관리 ======  2020-08-31 조편백  추가 =======


const BaseRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/app/acc/account/accountForm',
            element: <AccountForm />
        },
        {
            path: '/app/acc/company/WorkplaceManagement',
            element: <WorkplaceManagement/>
        }
    ]
};

export default BaseRoute;
