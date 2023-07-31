import { put, takeEvery, takeLatest, all, call } from "redux-saga/effects";
import { createAction } from 'redux-actions';
import createRequestSaga from "util/createRequestSaga"
import * as api from "../api"

//===============================월별급여조회 박미노==========================================================
export const SEARCH_MONTH_SALARY_LIST_REQUEST =
  'searchmonthsal/SEARCH_MONTH_SALARY_LIST_REQUEST';

//============================미노 월별 급여조회================================================
export const monthSalaryRequest = createAction(SEARCH_MONTH_SALARY_LIST_REQUEST); //월별 급여조회

const searchMonthSalary = createRequestSaga(SEARCH_MONTH_SALARY_LIST_REQUEST, api.searchMonthSalary);

export default function* searchmonthsal() { //미노 
  yield takeLatest(SEARCH_MONTH_SALARY_LIST_REQUEST, searchMonthSalary);
}