import React from 'react';
import { Route } from 'react-router-dom';
//************************************************생산 관리 ********************************************************
import { default as OrderContainer } from 'erp/logistic/outsourc/page/Order/OrderContainer'; //*****2020-12-04 정준혁 주생산계획(MPS)
import { default as ForwardContainer } from 'erp/logistic/outsourc/page/Forward/ForwardContainer'; //*****2020-12-04 정준혁 주생산계획(MPS)
import { default as InspectionContainer } from 'erp/logistic/outsourc/page/Inspection/InspectionContainer';
import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout";
import LogisticsInfoRoute from "../../base/route/LogisticsInfoRoute"; //*****2020-12-04 정준혁 주생산계획(MPS)

// function OutsourcRoute() {
//     return (
//         <>
//             <Route exact path="/app/logistic/outsourc/order" component={OrderContainer} />
//             <Route exact path="/app/logistic/outsourc/forward" component={ForwardContainer} />
//             <Route exact path="/app/logistic/outsourc/inspection" component={InspectionContainer} />
//         </>
//     );
// }
//
// export default OutsourcRoute;

const OutsourcRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/app/logistic/outsourc/order',
            element: <OrderContainer />
        },
        {
            path: '/app/logistic/outsourc/forward',
            element: <ForwardContainer />
        },
        {
            path: '/app/logistic/outsourc/inspection',
            element: <InspectionContainer />
        }
    ]
};

export default OutsourcRoute;