import React from 'react';
import { Route, withRouter } from 'react-router-dom';

// 시 스 템 관 리 =========================================================================================================================
import { default as HolidayContainer } from '../page/Holiday/HolidayContainer';
import { default as DepartmentManageContainer } from '../page/DepartmentManage/DepartmentManageContainer';
import { default as BaseWorkTimeContainer } from '../page/BaseWorkTime/BaseWorkTimeContainerEx';
import AuthGuard from "../../../../utils/route-guard/AuthGuard";
import MainLayout from "../../../../template/layout/MainLayout";

const CommRoute = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/app/hr/sys/holidayManage',
            element: <HolidayContainer />

        },
        {
            path: '/app/hr/sys/deptManage',
            element: <DepartmentManageContainer />

        },
        {
            path: '/app/hr/sys/baseWorkTime',
            element: <BaseWorkTimeContainer />
        }
    ]
};

export default CommRoute;

