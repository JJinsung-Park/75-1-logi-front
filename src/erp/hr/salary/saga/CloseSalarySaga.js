import { put, takeEvery, takeLatest, all, call } from "redux-saga/effects";
import { createAction } from 'redux-actions';
import createRequestSaga from "util/createRequestSaga"
import * as api from "../api"

//*************************  지원 담당  시작********************************** */
export const SALARY_LIST_REQUEST = 'closesalary/SALARY_LIST_REQUEST';
export const CLOSE_SALARY_WITH_SLIP_REQUEST = 'closesalary/CLOSE_SALARY_WITH_SLIP_REQUEST';

//월급여 마감 페이지에서 사용하는 마감가능 급여리스트 조회 함수
export const salaryListRequest = createAction(SALARY_LIST_REQUEST);
//월급여 마감 페이지에서 사용하는 마감 및 전표 발행함수
export const closeSalaryWithSlipRequest = createAction(CLOSE_SALARY_WITH_SLIP_REQUEST);

const salaryListSaga = createRequestSaga(SALARY_LIST_REQUEST, api.salaryListSaga);
const closeSalary = createRequestSaga(CLOSE_SALARY_WITH_SLIP_REQUEST, api.closeSalary);
//**************************************************08-26 손유찬 종료******************************************************* */

////////////////////          지원 사가 종료                 /////////////////////

export function* onSalaryReqeust() {
  yield takeLatest(SALARY_LIST_REQUEST, salaryListSaga);
}

export function* oncloseSalaryRequest() {
  yield takeLatest(CLOSE_SALARY_WITH_SLIP_REQUEST, closeSalary);
}

export default function* closesalary() {
  yield all([
    call(onSalaryReqeust), //월급여 조회 지원
    call(oncloseSalaryRequest), //월급여 마감 지원
  ]);
}