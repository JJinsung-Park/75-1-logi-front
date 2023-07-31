import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

//@@@@@@@@@@@@@@@@@@@@@@@@@21.12.13 최예솔 saga action type, function 분리하기@@@@@@@@@@@@@@

//@@@@@@@@@@@@@@@@@@@@@@@@@@@saga  actionType@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export const EMPDETAILED_INFO_REQUEST = 'src/erp/hr/Saga/Saga/EMPDETAILED_INFO_REQUEST';
export const EMP_UPDATE_REQUEST = 'src/erp/hr/Saga/Saga/EMP_UPDATE_REQUEST'; 

export const SEARCH_EMP_ASSIGN_REQUEST = 'src/erp/hr/Saga/Saga/SEARCH_EMP_ASSIGN_REQUEST';// O

export const SEARCH_DIVISION_CODE_REQUEST = 'src/erp/hr/Saga/Saga/SEARCH_DIVISION_CODE_REQUEST'; // O
export const EMP_REGISTER_REQUEST = 'src/erp/hr/Saga/Saga/EMP_REGISTER_REQUEST'; // O

export const SEARCH_EMPLOYMENT_MANAGE_REQUEST = // O
    'src/erp/hr/Saga/Saga/SEARCH_EMPLOYMENT_MANAGE_REQUEST';
export const UPDATE_EMPLOYMENT_MANAGE_REQUEST = // O
    'src/erp/hr/Saga/Saga/UPDATE_EMPLOYMENT_MANAGE_REQUEST';

export const POSITION_LIST_REQUEST = 'src/erp/hr/Saga/Saga/POSITION_LIST_REQUEST';// O

//@@@@@@@@@@@@@@@@@@@@@@@@@saga action function@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export const EmpDetailedInfoRequest = createAction(EMPDETAILED_INFO_REQUEST); //유주 사원정보 상세조회(완성)
export const EmpUpdateRequest = createAction(EMP_UPDATE_REQUEST); // 유주 사원정보 수정(진행중)
export const searchEmpAssignList = createAction(SEARCH_EMP_ASSIGN_REQUEST);
export const EmpResisterRequest = createAction(EMP_REGISTER_REQUEST);
export const searchEmploymentManageList = createAction(SEARCH_EMPLOYMENT_MANAGE_REQUEST);
export const updateEmploymentManageList = createAction(UPDATE_EMPLOYMENT_MANAGE_REQUEST);
export const PositionListRequest = createAction(POSITION_LIST_REQUEST); //유주 직급리스트를 가지고 옴(완성)



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-end-@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
const empDetailedSaga = createRequestSaga(EMPDETAILED_INFO_REQUEST, api.empDetailedSaga);
const empUpdateSaga = createRequestSaga(EMP_UPDATE_REQUEST, api.empUpdateSaga);

export function* onEmpDetailedInfoRequest() {
    //유주 사원상세정보검색(사원상세)
    yield takeLatest(EMPDETAILED_INFO_REQUEST, empDetailedSaga);
}

export function* onEmpUpdateRequest() {
    //유주 사원정보수정업데이트(사원상세)
    yield takeLatest(EMP_UPDATE_REQUEST, empUpdateSaga);
}

// *********************** 재직증명관리 시작 _종료 ***********************
const searchEmploymentManage = createRequestSaga(
    SEARCH_EMPLOYMENT_MANAGE_REQUEST,
    api.searchEmploymentManage
);
const updateEmploymentManage = createRequestSaga(
    UPDATE_EMPLOYMENT_MANAGE_REQUEST,
    api.updateEmploymentManage
);
// *********************** 재직증명관리  종료 _동욱 ***********************

export function* onEmploymentManage() {
    //동욱
    yield takeLatest(SEARCH_EMPLOYMENT_MANAGE_REQUEST, searchEmploymentManage);
}
export function* onUpdateEmploymentManage() {
    //동욱
    yield takeLatest(UPDATE_EMPLOYMENT_MANAGE_REQUEST, updateEmploymentManage);
}

/////////////////////// 유주 사가 시작 //////////////////////////////////////////////
const positionListSaga = createRequestSaga(POSITION_LIST_REQUEST, api.positionListSaga);
/////////////////////////////// 유주 사가 종료 /////////////////////////////////////////

export function* onPositionListRequest() {
    //유주 직급리스트(사원상세)
    yield takeLatest(POSITION_LIST_REQUEST, positionListSaga);
}

//**************************************************08-26 손유찬 시작******************************************************* */
const registerEmp = createRequestSaga(EMP_REGISTER_REQUEST, api.registerEmp);
//**************************************************08-26 손유찬 종료******************************************************* */

export function* onEMPRegist() {
    yield takeLatest(SEARCH_DIVISION_CODE_REQUEST, divisionSaga); //성훈 사원등록
    yield takeLatest(EMP_REGISTER_REQUEST, registerEmp);
}

//===========================================사원등록 성훈 시작=======================================//
const divisionSaga = createRequestSaga(SEARCH_DIVISION_CODE_REQUEST, api.divisionSaga);
//=================================일근태 관리 원구 종료 ======================================//

//  ==================================================== 발령 시작

export function* onEmpAssign() {
    yield takeLatest(SEARCH_EMP_ASSIGN_REQUEST, assignEmp);
}

const assignEmp = createRequestSaga(SEARCH_EMP_ASSIGN_REQUEST, api.assignEmp);
//  ==================================================== 발령 종료

export default function* EmpSaga() {
    yield all([
        call(onEmploymentManage), //동욱 재직증명서 관리
        call(onUpdateEmploymentManage), //동욱 재직증명서 업데이트
        call(onEmpDetailedInfoRequest), //유주
        call(onEmpUpdateRequest), //사원정보 수정
        call(onPositionListRequest), //유주
        call(onEMPRegist),
        call(onEmpAssign)
    ]);
}
