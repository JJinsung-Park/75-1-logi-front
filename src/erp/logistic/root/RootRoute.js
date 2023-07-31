import React from 'react';
import BasicInfoRoute from 'erp/logistic/base/route/BasicInfoRoute';
import LogisticsInfoRoute from 'erp/logistic/base/route/LogisticsInfoRoute';
import ProductionRoute from 'erp/logistic/production/route/ProductionRoute';
import PurchaseRoute from 'erp/logistic/purchase/route/PurchaseRoute';
import SalesRoute from 'erp/logistic/sales/route/SalesRoute';
import OutsourcRoute from 'erp/logistic/outsourc/route/OutsourcRoute'
import TransportRoute from 'erp/logistic/transport/route/transportRoute';
import transportRoute from "erp/logistic/transport/route/transportRoute";

// function LogiRootRoute() {
//     return (
//         <>
//             <BasicInfoRoute />
//             <LogisticsInfoRoute />
//             <ProductionRoute />
//             <PurchaseRoute />
//             <SalesRoute />
//             <OutsourcRoute/>
//             <TransportRoute />
//         </>
//     );
// }
//
// export default LogiRootRoute;

const LogiRootRoute = [
    BasicInfoRoute,
    LogisticsInfoRoute,
    OutsourcRoute,
    ProductionRoute,
    PurchaseRoute,
    SalesRoute,
    transportRoute
]

export default LogiRootRoute;