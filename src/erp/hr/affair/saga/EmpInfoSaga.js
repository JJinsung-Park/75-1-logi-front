import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

export const EMPDETAILED_INFO_REQUEST = 'src/erp/hr/Saga/Saga/EMPDETAILED_INFO_REQUEST';
export const EMP_UPDATE_REQUEST = 'src/erp/hr/Saga/Saga/EMP_UPDATE_REQUEST'; 

export const EmpDetailedInfoRequest = createAction(EMPDETAILED_INFO_REQUEST); 
export const EmpUpdateRequest = createAction(EMP_UPDATE_REQUEST); 

const empDetailedSaga = createRequestSaga(EMPDETAILED_INFO_REQUEST, api.empDetailedSaga);
const empUpdateSaga = createRequestSaga(EMP_UPDATE_REQUEST, api.empUpdateSaga);

export function* onEmpDetailedInfoRequest() {
    yield takeLatest(EMPDETAILED_INFO_REQUEST, empDetailedSaga);
}

export function* onEmpUpdateRequest() {
    yield takeLatest(EMP_UPDATE_REQUEST, empUpdateSaga);
}

export default function* empinfo() {
    yield all([
        call(onEmpDetailedInfoRequest), //사원상세정보 검색
        call(onEmpUpdateRequest), //사원정보 수정
    ]);
}
