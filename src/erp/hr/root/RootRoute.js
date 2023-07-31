import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AttdRoute from '../attendance/route/AttdRoute';
import CommRoute from '../base/route/CommRoute';
import SalaryRoute from '../salary/route/SalaryRoute';
import EmpRoute from '../affair/route/EmpRoute';
import DayWorkerRoute from '../dayworker/route/DayWorkerRoute'
import BasicInfoRoute from "../../logistic/base/route/BasicInfoRoute";
import LogisticsInfoRoute from "../../logistic/base/route/LogisticsInfoRoute";
import OutsourcRoute from "../../logistic/outsourc/route/OutsourcRoute";
import ProductionRoute from "../../logistic/production/route/ProductionRoute";
import PurchaseRoute from "../../logistic/purchase/route/PurchaseRoute";
import SalesRoute from "../../logistic/sales/route/SalesRoute";
import transportRoute from "../../logistic/transport/route/transportRoute";

// const HrRootRoute = () => {
//     return (
//         <>
//             <AttdRoute />
//             <BaseRoute />
//             <SalaryRoute />
//             <EmpRoute />
//             <DayWorkerRoute />
//         </>
//     );
// };
//
// export default HrRootRoute;


const HrRootRoute = [
    CommRoute,
    AttdRoute,
    SalaryRoute,
    EmpRoute,
    DayWorkerRoute

]



export default HrRootRoute;