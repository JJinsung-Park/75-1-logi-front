import { put, takeEvery, takeLatest, all, call } from "redux-saga/effects";
import { createAction } from 'redux-actions';
import createRequestSaga from "util/createRequestSaga"
import * as api from "../api"

//************************* 급여 기준 관리 시작 _준혁 *************************
export const BASE_SALARY_LIST_REQUEST = 'basesalary/BASE_SALARY_LIST_REQUEST';
export const UPDATE_BASE_SALARY_REQUEST = 'basesalary/UPDATE_BASE_SALARY_REQUEST';
//export const board_list = 'basesalary/board_list';

//*************************급여기준 CRUD 시작 _준혁 __20.11.18 *************************
export const baseSalaryListRequest = createAction(BASE_SALARY_LIST_REQUEST);
export const updateBaseSalaryRequest = createAction(UPDATE_BASE_SALARY_REQUEST);
//export const boardlistyRequest = createAction(board_list);


const baseSalarySearch = createRequestSaga(BASE_SALARY_LIST_REQUEST, api.baseSalarySearch);
const baseSalaryUpdate = createRequestSaga(UPDATE_BASE_SALARY_REQUEST, api.baseSalaryUpdate);
//const baseboardlist = createRequestSaga(board_list, api.board_list);

export default function* basesalary() {
  yield takeEvery(BASE_SALARY_LIST_REQUEST, baseSalarySearch);
  yield takeEvery(UPDATE_BASE_SALARY_REQUEST, baseSalaryUpdate);
}
