import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import AccountRoute from '../account/route/AccountRoute';
import StatementRoute from '../statement/route/StatementRoute';
import BaseRoute from '../base/route/BaseRoute';
import BasicInfoRoute from "../../logistic/base/route/BasicInfoRoute";
import LogisticsInfoRoute from "../../logistic/base/route/LogisticsInfoRoute";
import OutsourcRoute from "../../logistic/outsourc/route/OutsourcRoute";
import ProductionRoute from "../../logistic/production/route/ProductionRoute";
import PurchaseRoute from "../../logistic/purchase/route/PurchaseRoute";
import SalesRoute from "../../logistic/sales/route/SalesRoute";
import transportRoute from "../../logistic/transport/route/transportRoute";

// const AccRootRoute = () => {
//     return(
//         <>
//             <AccountRoute/>
//             <StatementRoute/>
//             <BaseRoute/>
//         </>
//     );
// }
// export default AccRootRoute;
// {/* ///////////////////////// 2021-02-23 이은기  /////////////////////////// */}

// const AccRootRoute = [
//     AccountRoute,
//     StatementRoute,
//     BaseRoute
// ];
//
// export default AccRootRoute;

const AccRootRoute = [
    AccountRoute,
    StatementRoute,
    BaseRoute
];

export default AccRootRoute;