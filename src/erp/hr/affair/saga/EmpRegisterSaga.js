import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

export const SEARCH_DIVISION_CODE_REQUEST = 'src/erp/hr/Saga/Saga/SEARCH_DIVISION_CODE_REQUEST';
export const EMP_REGISTER_REQUEST = 'src/erp/hr/Saga/Saga/EMP_REGISTER_REQUEST';

export const SearchDivisionCodeRequest = createAction(SEARCH_DIVISION_CODE_REQUEST);
export const EmpResisterRequest = createAction(EMP_REGISTER_REQUEST);

const divisionSaga = createRequestSaga(SEARCH_DIVISION_CODE_REQUEST, api.divisionSaga);
const registerEmp = createRequestSaga(EMP_REGISTER_REQUEST, api.registerEmp);

export function* onEmpRegist() {
    yield takeLatest(SEARCH_DIVISION_CODE_REQUEST, divisionSaga); //성훈 사원등록
    yield takeLatest(EMP_REGISTER_REQUEST, registerEmp);
}

export default function* empregister() {
    yield all([
        call(onEmpRegist)
    ]);
}
