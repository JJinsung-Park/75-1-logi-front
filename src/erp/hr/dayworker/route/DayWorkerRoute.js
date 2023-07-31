import React from 'react';
import { Route, withRouter } from 'react-router-dom';
//@@@@@@@@@@@@@@@@@@@@@@@@최예솔@@@@@@@@@@@@@@@@@@@@@

//==================일용직 사원=======================
import { default as DayWorkerContainer } from '../page/dayworker/DayWorkerContainer'; // 2021-12-21 최예솔
import { default as DayWorkerSalaryContainer } from '../page/dayworkersalary/DayWorkerSalaryContainer'; // 2021-12-21 최예솔

const DayWorkerRoute = () => {
    return (
        <>
        {/*******************2021-12-21 최예솔 *************************/}
              {/*일용직 사원등록/조회*/}
            <Route
                exact
                path="/app/hr/dayworker/dayworkerlist"
                component={DayWorkerContainer}
            />
        {/*******************2021-12-21 최예솔 *************************/}
            
              {/*일용직  급여입력 및 계산*/}
            <Route
                exact 
                path="/app/hr/dayworker/dayworkersalary"
                component={DayWorkerSalaryContainer}
            />
        </>
      );
    };
    
export default DayWorkerRoute;
    