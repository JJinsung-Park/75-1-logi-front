import React from 'react';
import { Route, withRouter } from 'react-router-dom';
// 인 사 관 리 =========================================================================================================================
import { default as EmpDetailedContainer } from '../page/EmpDetailed/SimpleEmpSearch/EmpDetailedContainer'; // 사원상세조회          //유주
import { default as EmpRegist } from '../page/EmpRegist/EmpRegist'; //사원등록     //성훈
import { default as EmploymentManage } from '../page/EmploymentManage/EmploymentManageContainer'; //2020-11-19 64rl동욱 재직증명서관리
import { default as EmploymentAssign } from '../page/EmpAssign/EmpAssignContainer';

const EmpRoute = () => {
    return (
        <>
            {/*** 사원상세조회 */}
            <Route exact path="/app/hr/affair/empDetailedView" elements={EmpDetailedContainer} />{' '}
            {/***   사원등록*/}
            <Route exact path="/app/hr/affair/empRegist" elements={EmpRegist} />
            {/*** 재직증명관리 */}
            <Route exact path="/app/hr/affair/EmploymentManage" elements={EmploymentManage} />
            {/*------------- 사원메뉴--------------- */}
            {/*** 인사발령 */}
            <Route exact path="/app/hr/affair/employmentAssign" elements={EmploymentAssign} />
        </>
    );
};

export default EmpRoute;
