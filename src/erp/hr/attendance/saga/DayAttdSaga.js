import { takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 타입@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//==========일근태 조회,기록=============
export const INSERT_DAY_ATTD_START = 'dayattd/INSERT_DAY_ATTD_START';
export const SELECT_DAY_ATTD_START = 'dayattd/SELECT_DAY_ATTD_START';
export const DELETE_DAY_ATTD_START = 'dayattd/DELETE_DAY_ATTD_START';


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 생성 함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//==========일근태 조회,기록=============
export const selectDayAttdStart = createAction(SELECT_DAY_ATTD_START);
export const deleteDayAttdStart = createAction(DELETE_DAY_ATTD_START);
export const insertDayAttdStart = createAction(INSERT_DAY_ATTD_START);


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@SAGA함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//=========================================재영 2020-08-27 일근태 기록 시작====================================//
const DayAttdSaga = createRequestSaga(INSERT_DAY_ATTD_START, api.DayAttdSaga);
//=========================================재영 2020-08-27 일근태 기록 종료====================================//
export function* onInsertDayAttd() {
    yield takeLatest(INSERT_DAY_ATTD_START, DayAttdSaga);
}

//**************************************2020-08-27 재영 일근태조회 사가**************************************************
const DayAttdSSaga = createRequestSaga(SELECT_DAY_ATTD_START, api.DayAttdSSaga);
//**************************************2020-08-27 재영 일근태조회 사가**************************************************
export function* onSelectDayAttd() {
    yield takeLatest(SELECT_DAY_ATTD_START, DayAttdSSaga);
}

//**********************************2020-09-03 재영 일근태 삭제 시작 *******************************************/
const deleteAttdSaga = createRequestSaga(DELETE_DAY_ATTD_START, api.deleteAttdSaga);
//=================================일근태 관리 원구 종료 ======================================//
export function* onDeleteDayAttd() {
    yield takeLatest(DELETE_DAY_ATTD_START, deleteAttdSaga);
}

export default function* dayattd() {
    yield all([
        call(onInsertDayAttd), // 원구
        call(onSelectDayAttd), // 원구
       call(onDeleteDayAttd), // 재영
  
    ]);
}