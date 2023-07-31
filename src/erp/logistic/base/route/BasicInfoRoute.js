import React from 'react';
import { Route } from 'react-router-dom';

//************************************************기본정보 관리 ********************************************************
import { default as CompanyInfo } from 'erp/logistic/base/page/CompanyInfo'; // 2020-11-19 이숭규 회사관리
import { default as WorkplaceInfo } from 'erp/logistic/base/page/WorkplaceInfo'; // 2020-11-19 이숭규 회사관리
import { default as DeptInfo } from 'erp/logistic/base/page/DeptInfo/DeptInfo'; // 2020-11-19 최지은 부서관리
import { default as ClientInfo } from 'erp/logistic/base/page/ClientInfo/ClientInfo';
import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout"; //2020-11-27 거래처 관리

// function BasicInfoRoute() {
//     return (
//         <>
//             {/* 기본 정보 관리  */}
//             <Route path="/app/logistic/base/companyInfo" element={CompanyInfo} />{' '}
//             {/*2020-11-18 이숭규 */}
//             <Route path="/app/logistic/base/workplaceInfo" element={WorkplaceInfo} />{' '}
//             {/*2020-11-18 이숭규 */}
//             <Route path="/app/logistic/base/deptInfo" element={DeptInfo} />
//             {/*2020-11-18 최지은 */}
//             <Route path="/app/logistic/base/clientInfo" element={ClientInfo} />
//             {/*2020-11-18 박민호 */}
//         </>
//     );
// }
//
// export default BasicInfoRoute;

const BasicInfoRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/app/logistic/base/companyInfo',
            element: <CompanyInfo />
        },
        {
            path: '/app/logistic/base/workplaceInfo',
            element: <WorkplaceInfo />
        },
        {
            path: '/app/logistic/base/deptInfo',
            element: <DeptInfo />
        },
        {
            path: '/app/logistic/base/clientInfo',
            element: <ClientInfo />
        }
    ]
};

export default BasicInfoRoute;
