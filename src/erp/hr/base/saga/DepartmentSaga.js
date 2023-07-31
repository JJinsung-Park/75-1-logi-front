import { takeEvery } from 'redux-saga/effects';
import createRequestSaga from "util/createRequestSaga";
import { createAction } from 'redux-actions';
import * as api from '../api';

export const DEPT_MANAGER_REQUEST = "src/erp/hr/Saga/Saga/DEPT_MANAGER";
export const UPDATE_DEPARTMENT_REQUEST= "src/erp/hr/Saga/Saga/UPDATE_DEPARTMENT";
export const DEPT_MEMBER_REQUEST = "src/erp/hr/Saga/Saga/DEPT_MEMBER";

export const departmentManagerRequest = createAction(DEPT_MANAGER_REQUEST);
export const departmentManageMemberRequest = createAction(DEPT_MEMBER_REQUEST);
export const updateDepartmentRequest=createAction(UPDATE_DEPARTMENT_REQUEST);

const deptManagerSaga = createRequestSaga(DEPT_MANAGER_REQUEST, api.deptListManage)
const updateDepartmentSaga= createRequestSaga(UPDATE_DEPARTMENT_REQUEST,api.deptListUpdate)
const deptMemberSaga = createRequestSaga(DEPT_MEMBER_REQUEST,api.deptMember)

export default function* department() {
    yield takeEvery(DEPT_MANAGER_REQUEST, deptManagerSaga);
    yield takeEvery(UPDATE_DEPARTMENT_REQUEST, updateDepartmentSaga);
    yield takeEvery(DEPT_MEMBER_REQUEST, deptMemberSaga);
}