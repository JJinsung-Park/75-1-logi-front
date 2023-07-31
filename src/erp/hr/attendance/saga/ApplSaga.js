import { takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

//===========결제승인관리 ==============
export const UPDATE_ATTD_APPL_REQUEST = 'appl/UPDATE_ATTD_APPL_REQUEST';
export const SEARCH_ATTD_APPL_REQUEST = 'appl/SEARCH_ATTD_APPL_REQUEST';

//===========결제승인관리 ==============
export const searchAttdApplList = createAction(SEARCH_ATTD_APPL_REQUEST);
export const updateAttdApplList = createAction(UPDATE_ATTD_APPL_REQUEST);


// *********************** 결재승인관리 확정 시작 _재영 2020-09-04 ***********************
const updateAttdApplSaga = createRequestSaga(UPDATE_ATTD_APPL_REQUEST, api.updateAttdApplSaga
    );
    // *********************** 결재승인관리 확정 종료 _재영 2020-09-04***********************
    
    // *********************** 결재승인관리 확정 시작 _재영 ***********************
    export function* onAttdApplSaga() {
        yield takeLatest(UPDATE_ATTD_APPL_REQUEST, updateAttdApplSaga);
    }
    // *********************** 결재승인관리 확정 종료 _재영**********************

    //************************ 결제 승인 관리 조회 _ 재영 2020-09-04 ******************//
const searchAttdAppl = createRequestSaga(SEARCH_ATTD_APPL_REQUEST, api.searchAttdAppl);

export function* onAttdAppl() {
    yield takeLatest(SEARCH_ATTD_APPL_REQUEST, searchAttdAppl);
}

export default function* appl() {
    yield all([
        call(onAttdApplSaga), // 준서
        call(onAttdAppl), //재영
  
    ]);
}