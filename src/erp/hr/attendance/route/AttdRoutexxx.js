import React from 'react';
import { Route, withRouter } from 'react-router-dom';
// 사 원 관 리 =========================================================================================================================
import { default as DayAttendance } from '../page/DayAttendance/DayAttendanceContainer'; // 2020-08-26 일근태 조회 기록 재영//
import RestAttdContainer from '../page/RestAttendance/RestAttdContainer'; //외출 및 조퇴 시작 _준서 _20.08.24

// 근 태 관 리 =========================================================================================================================
import { default as DayAttdManageContainer } from '../page/DayAttdManage/DayAttdManageContainer'; // 2020-08-23 일 근태 관리   재영
import { default as MonthAttdManageContainer } from '../page/MonthAttendance/MonthAttdManageContainer'; // 2020-08-21 월 근태 관리  재영
import { default as AttendanceApploval } from '../page/AttendanceApploval/AttdApplContainer'; // 결재승인관리 _재영

// 사 원 관 리 =========================================================================================================================
import { default as Break } from '../page/Break/Break'; //휴가 신청/조회 시작 _재영 _20.08.31
import { default as Travel } from '../page/Travel/Travel'; //2020-08-31 손유찬 --출장/교육신청
import { default as OverWork } from '../page/OverWork/OverWork'; //2020-08-31 손유찬 --초과근무신청
import { default as Employment } from '../page/Employment/Employment'; //2020-11-19 황경윤 --재직증명서신청
import { default as BonusRandomBoxContainer } from '../page/BonusRandomBox/BonusRandomBoxContainer'; //2020-11-24 정준혁 --상여금 랜덤박스
import { default as AnnualVacationComp } from '../page/AnnualVacationManage/AnnualVacationComp';
import { default as Node } from '../page/Node/Node'; //2020-11-24 정준혁 --상여금 랜덤박스
import { default as ElasticWorkContainer } from '../page/ElasticWork/ElasticWorkContainer'; // 2021-09-03 고범석 --탄력근무제
import { default as BestEmpContainer } from '../page/BestEmp/BestEmpContainer'; //2021-09-27 고범석 --이달의 BEST 사원
import { default as CoEduContainer } from '../page/CorporateEducation/CoEduContainer'; //2021-12-30 김슬기 --사내교육 관리
import { default as EduAttendeeContainer } from '../page/CorporateEducation/EduAttendeeContainer'; //2021-12-30 김슬기 --사내교육 수강사원 관리

const AttdRoute = () => {
    return (
        <>
            {/* 일근태기록조회 */}
            {/************************** 일근태기록조회 _재영 _20.08.26 */}
            <Route exact path="/app/hr/attendance/dayAttendance" component={DayAttendance} />{' '}
            {/************************** 일근태기록조회 _재영 _20.08.26 */}
            {/* 근태외신청/조회 */}
            {/************************** 근태외신청/조회 시작 _준서 _20.08.25 */}
            <Route
                exact
                path="/app/hr/attendance/restAttendance"
                component={RestAttdContainer}
            />{' '}
            {/************************** 근태외신청/조회 종료 _준서 _20.08.25 */}
            {/*------------ 근태관리--------------- */}
            {/************************** 일근태관리 _재영 _20.08.21 */}
            <Route
                exact
                path="/app/hr/attendance/dayAttendanceManage"
                component={DayAttdManageContainer}
            />{' '}
            {/************************** 일근태관리 _재영 _20.08.21 */}
            {/************************** 월근태관리 _재영 _20.08.23 */}
            <Route
                exact
                path="/app/hr/attendance/monthAttendanceManage"
                component={MonthAttdManageContainer}
            />{' '}
            {/************************** 월근태관리 _재영 _20.08.23 */}
            {/************************** 결재승인관리 시작 _준서 */}
            <Route
                exact
                path="/app/hr/attendance/attendanceApploval"
                component={AttendanceApploval}
            />{' '}
            {/************************** 결재승인관리 종료 _준서 */}
            {/************************** 근태외신청/조회 종료 _준서 _20.08.25 */}
            {/* 휴가 신청/조회 */}
            {/************************** 휴가 신청/조회 시작 _재영 _20.08.31 */}
            <Route exact path="/app/hr/attendance/break" component={Break} />{' '}
            {/************************** 휴가 신청/조회 종료 _재영 _20.08.31 */}
            {/* 출장/교육 신청 */}
            {/************************** 출장/교육 신청 시작 2020-08-31 손유찬 */}
            <Route exact path="/app/hr/attendance/travel" component={Travel} />{' '}
            {/************************** 출장/교육 신청 시작 2020-08-31 손유찬 *************************/}
            {/* 초과근무 신청 */}
            {/************************** 초과근무 신청 시작 2020-08-31 손유찬 */}
            <Route exact path="/app/hr/attendance/overWork" component={OverWork} />{' '}
            {/************************** 초과근무 신청 시작 2020-08-31 손유찬 *************************/}
            {/* 재직증명서 신청 */}
            {/************************** 재직증명서 신청 시작 2020-11-19 황경윤 */}
            <Route exact path="/app/hr/attendance/employment" component={Employment} />{' '}
            {/************************** 재직증명서 신청 시작 2020-11-19 황경윤 *************************/}
            {/*******************2020-11-27 정준혁 *************************/}
            {/*사원메뉴/상여금랜덤박스*/}
            <Route
                exact
                path="/app/hr/attendance/bonusRandomBox"
                component={BonusRandomBoxContainer}
            />{' '}
            {/*******************2020-11-27 정준혁 *************************/}
            {/* 연차관리 */}
            {/************************** 연차관리 시작 */}
            <Route
                exact
                path="/app/hr/attendance/AnnualVacationComp"
                component={AnnualVacationComp}
            />{' '}
            {/* 연차관리 */}
          
            {/*******************2021-06-16 김예진 *************************/}
            {/*탄력근무제 신청/ 조회    고범석*/}
            <Route
                exact
                path="/app/hr/attendance/elasticWork"
                component={ElasticWorkContainer}
            />{' '}
            {/*******************2021-09-03 고범석 *************************/}
            {/*이달의 BEST 사원    고범석*/}
            <Route
                exact
                path="/app/hr/attendance/bestEmp"
                component={BestEmpContainer}
            />{' '}
            {/*******************2021-09-27 고범석 *************************/}

            {/* 사내교육  김슬기*/}
            <Route
                exact
                path="/app/hr/attendance/corporateEducation"
                component={CoEduContainer}
            />{' '}
             <Route
                exact
                path="/app/hr/attendance/eduactionAttendee"
                component={EduAttendeeContainer}
            />{' '}
            {/*******************2021-12-30 김슬기 *************************/}
        </>
    );
};

export default AttdRoute;
