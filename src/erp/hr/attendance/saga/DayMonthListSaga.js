import { takeEvery, takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

//===========일근태=============
export const SEARCH_DAY_ATTD_LIST_REQUEST = 'daymonthlist/SEARCH_DAY_ATTD_LIST_REQUEST'; //일근태관리 이름+날짜+N상태만 검색 하인봉
export const DAY_ATTD_LIST_UPDATE = 'daymonthlist/DAY_ATTD_LIST_UPDATE';
export const SEARCH_MONTH_ATTD_LIST_REQUEST = 'daymonthlist/SEARCH_MONTH_ATTD_LIST_REQUEST';
//===========월근태=============
export const MONTH_ATTD_LIST_UPDATE = 'daymonthlist/MONTH_ATTD_LIST_UPDATE';

//===========일근태=============
export const SearchDayAttdListRequest = createAction(SEARCH_DAY_ATTD_LIST_REQUEST);
export const updateDayAttdList = createAction(DAY_ATTD_LIST_UPDATE);
//===========월근태=============
export const updateMonthAttdMgtList = createAction(MONTH_ATTD_LIST_UPDATE);
export const searchMonthAttdMgtList = createAction(SEARCH_MONTH_ATTD_LIST_REQUEST);


const dayAttdSearch = createRequestSaga(SEARCH_DAY_ATTD_LIST_REQUEST, api.DayAttdSSaga);
const dayAttdUpdate = createRequestSaga(DAY_ATTD_LIST_UPDATE, api.dayAttdUpdate);

//===========================재영 월근태관리=======================//
const monthAttdSearch = createRequestSaga(
    SEARCH_MONTH_ATTD_LIST_REQUEST,     // daylist/SEARCH_MONTH_ATTD_LIST_REQUEST
    api.monthAttdSearch
);
const monthAttdUpdate = createRequestSaga(MONTH_ATTD_LIST_UPDATE, api.monthAttdUpdate);

export default function* daylist() {
    yield takeEvery(SEARCH_DAY_ATTD_LIST_REQUEST, dayAttdSearch); //재영 일근태관리
    yield takeLatest(DAY_ATTD_LIST_UPDATE, dayAttdUpdate); //재영 일근태관리
    yield takeLatest(SEARCH_MONTH_ATTD_LIST_REQUEST, monthAttdSearch); //재영 월근태관리
    yield takeLatest(MONTH_ATTD_LIST_UPDATE, monthAttdUpdate); //재영 월근태관리
}
