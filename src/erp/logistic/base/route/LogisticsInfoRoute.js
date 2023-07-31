import React from 'react';
import { Route } from 'react-router-dom';
//************************************************물류정보 관리 ********************************************************
import { default as CodeInfo } from 'erp/logistic/base/page/CodeInfo/CodeInfo'; //*****2020-11-28 이숭규 코드관리
import { default as ItemInfo } from 'erp/logistic/base/page/ItemInfo/ItemInfo'; //*****2020-11-28 황경윤 품목관리
import { default as WarehouseInfo } from 'erp/logistic/base/page/WareHouseInfo/WareHouseInfo';
import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout"; //*****2020-11-28 노원찬 창고관리

// function LogisticsInfoRoute() {
//     return (
//         <>
//             {/* 물류 정보 관리 */}
//             <Route path="/app/logistic/base/codeInfo" elements={CodeInfo} />
//             {/*2020-11-18 이숭규 */}
//             <Route path="/app/logistic/base/itemInfo" elements={ItemInfo} />
//             {/*2020-11-28 황경윤 */}
//             <Route path="/app/logistic/base/wareHouseInfo" elements={WarehouseInfo} />
//         </>
//     );
// }
//
// export default LogisticsInfoRoute;

const LogisticsInfoRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/app/logistic/base/codeInfo',
            element: <CodeInfo />
        },
        {
            path: '/app/logistic/base/itemInfo',
            element: <ItemInfo />
        },
        {
            path: '/app/logistic/base/deptInfo',
            element: <deptInfo />
        },
        {
            path: '/app/logistic/base/wareHouseInfo',
            element: <WarehouseInfo />
        }
    ]
};

export default LogisticsInfoRoute;