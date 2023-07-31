import { takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 타입@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//==========외출 및 조퇴 신청===========
export const REST_ATTD_REQUEST = 'rest/REST_ATTD_REQUEST';  

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 생성 함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//==========외출 및 조퇴 신청===========
export const restAttdRequest = createAction(REST_ATTD_REQUEST);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@SAGA함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//*********************** 외출 조퇴 신청 시작 _준서 ***********************
const restAttdSaga = createRequestSaga(REST_ATTD_REQUEST, api.restAttdSaga);
// *********************** 외출 조퇴 신청 종료 _준서 ***********************

// *********************** 외출 조퇴 신청 시작 _준서 ***********************
export default function* rest() {
    yield takeLatest(REST_ATTD_REQUEST, restAttdSaga);
}
// *********************** 외출 조퇴 신청 종료 _준서 ***********************