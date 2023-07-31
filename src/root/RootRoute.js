import React from 'react';
import {Route, Switch, Redirect, withRouter, Routes} from 'react-router-dom';
import AccRoute from 'erp/account/root/RootRoute';
import HrRootRoute from 'erp/hr/root/RootRoute';
import LogiRootRoute from '../erp/logistic/root/RootRoute';
import Main from '../common/page/dashboard/components/Main';
import Covid19 from '../common/page/dashboard/covid/Covid19';
import CompanyMap from '../common/page/dashboard/map/CompanyMap';
import BasicInfoRoute from "../erp/logistic/base/route/BasicInfoRoute";
import LogisticsInfoRoute from "../erp/logistic/base/route/LogisticsInfoRoute";
import OutsourcRoute from "../erp/logistic/outsourc/route/OutsourcRoute";
import ProductionRoute from "../erp/logistic/production/route/ProductionRoute";
import PurchaseRoute from "../erp/logistic/purchase/route/PurchaseRoute";
import SalesRoute from "../erp/logistic/sales/route/SalesRoute";
import transportRoute from "../erp/logistic/transport/route/transportRoute";



// function RootRoute() {
//     return (
//         <>
//             <Routes>
//
//                 <AccRoute />
//
//                 <HrRootRoute />
//
//                 <LogiRootRoute />
//
//                 </Routes>
//         </>
//     );
// }
//
// export default RootRoute;

const RootRoute = [
    ...AccRoute,
    ...HrRootRoute,
    ...LogiRootRoute
]

export default RootRoute;