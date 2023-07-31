import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createRequestSaga from "util/createRequestSaga";
import * as api from '../api';

const SELECT_BASE_WORK_TIME_LIST = "src/erp/hr/Saga/Saga/SELECT_BASE_WORK_TIME_LIST";
const INSERT_BASE_WORK_TIME_LIST = "baseworktime/INSERT_BASE_WORK_TIME_LIST";
const DELETE_BASE_WORK_TIME = "src/erp/hr/Saga/Saga/DELETE_BASE_WORK_TIME";
const BATCH_BASE_WORK_TIME = "src/erp/hr/Saga/Saga/BATCH_BASE_WORK_TIME";

export const selectBaseWorkTimeList = createAction(SELECT_BASE_WORK_TIME_LIST);
// export const insertBaseWorkTimeList = createAction(INSERT_BASE_WORK_TIME_LIST);
export const deleteBaseWorkTime = createAction(DELETE_BASE_WORK_TIME);
export const batchBaseWorkTime = createAction(BATCH_BASE_WORK_TIME);

const selectBaseWorkTimeListSaga = createRequestSaga(SELECT_BASE_WORK_TIME_LIST, api.getBaseWorkTimeList);
// const insertBaseWorkTimeListSaga = createRequestSaga(INSERT_BASE_WORK_TIME_LIST, api.insertBaseWorkTimeList);
const deleteBaseWorkTimeSaga = createRequestSaga(DELETE_BASE_WORK_TIME, api.deleteBaseWorkTime);
const batchBaseWorkTimeSaga = createRequestSaga(BATCH_BASE_WORK_TIME, api.batchBaseWorkTime);

export default function* baseworktime() {
    yield takeEvery(SELECT_BASE_WORK_TIME_LIST, selectBaseWorkTimeListSaga);
    // yield takeEvery(INSERT_BASE_WORK_TIME_LIST, insertBaseWorkTimeListSaga);
    yield takeEvery(DELETE_BASE_WORK_TIME, deleteBaseWorkTimeSaga);
    yield takeEvery(BATCH_BASE_WORK_TIME, batchBaseWorkTimeSaga);
  }
  