import React from 'react';
import { Route, withRouter } from 'react-router-dom';

// 시 스 템 관 리 =========================================================================================================================
// import { default as HolidayContainer } from '../page/Holiday/HolidayContainer';
// import { default as DepartmentManageContainer } from '../page/DepartmentManage/DepartmentManageContainer';
// import { default as BaseWorkTimeContainer } from '../page/BaseWorkTime/BaseWorkTimeContainer';
import { default as Container } from '../page/DayAttendance/DayAttendanceContainer';
import { default as DayAttdManagerContainer } from '../page/DayAttdManage/DayAttdManageContainer';
import { default as MonthAttdManagerContainer} from '../page/MonthAttendance/MonthAttdManageContainer';
import { default as ExcusedAttendanceContainer} from '../page/ExcusedAttnd/ExcusedAttendanceContainer';
import { default as AttdApprovalContainer} from '../page/AttdApproval/AttdApprovalContainer';
import { default as BreakAttendanceContainer} from '../page/BreakAttendance/BreakAttendanceContainer';
import { default as BreakAttdManageContainer} from '../page/BreakAttendanceManage/BreakAttdManageContainer';
import { default as EduAttendeeContainer} from '../page/CorporateEducation/EduAttendeeContainer';
import { default as TravelContainer} from '../page/Travel/TravelContainer';
import { default as OverWorkContainer} from '../page/OverWork/OverWorkContainer';


import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout";

const AttendanceRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
    //근태관리 TAB
        // 일근태 등록
        {
            path: '/app/hr/attd/dailyAttnd',
            element: <Container />

        },
        // 근태외 신청
        {
            path: '/app/hr/attd/excusedAttnd',
            element: <ExcusedAttendanceContainer />

        },
        // 연차신청
        {
            path: '/app/hr/attd/break',
            element: <BreakAttendanceContainer />
        },
        // 출장 / 교육신청
        {
            path: '/app/hr/attd/travel',
            element: <TravelContainer />
        },
        // 초과근무신청
        { 
            path: '/app/hr/attd/overwork',
            element: <OverWorkContainer />
        },
    //근태승인 TAB
        // 일근태관리
        {
            path: '/app/hr/attd/dailyAttndMgt',
            element: <DayAttdManagerContainer />
        },
        // 월근태관리
        {
            path: '/app/hr/attd/monthlyAttndMgt',
            element: <MonthAttdManagerContainer />
        },
        // 근태외 승인관리
        {
            path: '/app/hr/attd/attndApproval',
            element: <AttdApprovalContainer />
        },
        // 연차관리
        {
            path: '/app/hr/attd/annualLeaveMgt',
            element: <BreakAttdManageContainer />
        }
    ]
};

export default AttendanceRoute;

