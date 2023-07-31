import { takeEvery } from 'redux-saga/effects';
import createRequestSaga from "util/createRequestSaga";
import { createAction } from 'redux-actions';
import * as api from '../api';

const HOLIDAY_LIST_REQUEST = "src/erp/hr/Saga/Saga/HOLIDAY_LIST_REQUEST";
const UPDATE_HOLIDAY_REQUEST = "src/erp/hr/Saga/Saga/UPDATE_HOLIDAY_REQUEST";

export const holidayListRequest = createAction(HOLIDAY_LIST_REQUEST);
export const updateHolidayRequest = createAction(UPDATE_HOLIDAY_REQUEST);

const holidayListSaga = createRequestSaga(HOLIDAY_LIST_REQUEST, api.holidaySearch)
const updateHolidaySaga = createRequestSaga(UPDATE_HOLIDAY_REQUEST, api.holidayUpdate)

export default function* holiday() {
    yield takeEvery(HOLIDAY_LIST_REQUEST, holidayListSaga);
    yield takeEvery(UPDATE_HOLIDAY_REQUEST, updateHolidaySaga);
}