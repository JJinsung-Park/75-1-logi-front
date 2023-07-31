import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Auth from '../../../../util/auth';

// 급 여 조 회 =========================================================================================================================
import { default as MonthSalaryContainer } from '../page/MonthSalary/MonthSalaryContainer'; //2020-08-20 63기 손유찬 -- 월별 급여조회

// 급 여 관 리 =========================================================================================================================
import { default as BaseExtSalContainer } from '../page/BaseExtSalManage/BaseExtSalContainer'; //2020-08-22 63기 손유찬 -- 초과수당관리
import { default as BaseDeductionContainer } from '../page/BaseDeductionManage/BaseDeductionContainer'; //2020-08-26 63기 손유찬 -- 공제기준관리
import { default as BaseSalaryContainer } from '../page/BaseSalaryManage/BaseSalaryContainer'; //2020-11-20 64기 정준혁 -- 급여기준관리
import { default as CloseSalaryContainer } from '../page/SalaryManage/CloseSalaryContainer'; //2020-08-20 63기 손유찬수정 --월급여 조회마감

import { default as SocialInsureContainer } from '../page/SocialInsure/SocialInsure'; // 2021-09-02 67기 react팀 --사회보험정보관리

import { default as SeverancePayContainer } from '../page/SeverancePay/SeverancePayContainer'; // 2021-09-09 67기 고범석 -- 퇴직금 관리 
import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout"; //2021-02-08 65기 임동하 --기본근무시간관리
import { default as SalaryAwardsContainer} from '../page/salaryAwards/salaryAwardsContainer';
import BoardContainer from '../page/Boarddd/BoardContainer';

// const SalaryRoute = () => {
//     return (
//         <>
//             {/*---------------- 급여조회 ----------------*/}
//             {/**  월급여 조회 */}
//             {/*******************2020-08-20 손유찬 시작*************************/}
//             <Route exact path="/app/hr/Salary/monthSalary" component={MonthSalaryContainer} />{' '}
//             {/*******************2020-08-20 손유찬 종료*************************/}


//             {/*----------------- 급여관리---------------- */}
//             {/* 급여기준관리  */}
//             {/*******************2020-11-20 정준혁 시작************************/}
//             <Route
//                 exact
//                 path="/app/hr/salary/baseSalaryManage"
//                 component={BaseSalaryContainer}
//             />{' '}
//             {/*******************2020-11-20 정준혁 종료*************************/}


//             {/* 공제기준관리 */}
//             {/*******************2020-08-26 정준혁 시작*************************/}
//             <Route
//                 exact
//                 path="/app/hr/salary/baseDeductionManage"
//                 component={BaseDeductionContainer}
//             />{' '}
//             {/*******************2020-08-26 정준혁 종료*************************/}


//             {/* 초과수당관리 */}
//             {/*******************2020-08-26 정준혁 시작*************************/}
//             <Route
//                 exact
//                 path="/app/hr/salary/baseExtSalManage"
//                 component={BaseExtSalContainer}
//             />{' '}
//             {/*******************2020-08-26 정준혁 종료*************************/}


//             {/** 월급여마감 */}
//             {/*******************2020-08-22 손유찬 시작*************************/}
//             <Route
//                 exact
//                 path="/app/hr/salary/closeSalary"
//                 component={Auth(CloseSalaryContainer, '/app/hr/salary/closeSalary')}
//             />{' '}
//             {/*******************2020-08-22 손유찬 종료*************************/}
//             {/*----------------- 급여관리---------------- */}
//             {/*******************2020-11-18 손유찬 시작*************************/}


//             {/** 사회보장 */}
//             <Route
//                 exact
//                 path="/app/hr/salary/socialInsure"
//                 component={SocialInsureContainer}
//             //component={Auth(SocialInsureContainer, '/app/hr/salary/socialInsure')}
//             />{' '}
//             {/*----------------- 사회보장---------------- */}



//             {/*---------  2021/09/02   67기 고범석 ----------*/}
//             {/*---------  퇴직금 관리 ----------*/}
//             {/*---------  2021/09/02   67기 고범석 ----------*/}
//             <Route
//                 exact
//                 path="/app/hr/salary/severancePay"
//                 component={SeverancePayContainer}
//             />{' '}
//         </>

//     );
// };

const SalaryRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        /**  급여 조회 */
        {
            path: '/app/hr/Salary/monthSalary',
            element: <MonthSalaryContainer />
        },
        /* 상여금및성과급조회  */
         {
             path: '/app/hr/Salary/salaryAwards',
             element: <SalaryAwardsContainer/>
         }
        ,
        /* 퇴직금 */
        {
            path: '/app/hr/salary/severancePay',
            element: <SeverancePayContainer />
        },
           /* 급여기준 */
        {
            path: '/app/hr/salary/baseSalaryManage',
            element: <BaseSalaryContainer />
        },
         /** 초과수당 */
        {
            path: '/app/hr/salary/baseExtSalManage',
            element: <BaseExtSalContainer />
        },
         /** 사회보험 */
        {
            path: '/app/hr/salary/socialInsure',
            element: <SocialInsureContainer />
        },
        /*---------  퇴직금 관리 ----------*/
        {
            path: '/app/hr/Salary/monthSalary',
            element: <MonthSalaryContainer />
        },
        /*---------  게시판 관리 ----------*/
        {
            path: '/app/hr/Salary/monthSalary1',
            element: <BoardContainer/>
        }
    ]
};




export default SalaryRoute;
