import { takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

export const SEARCH_EMPLOYMENT_MANAGE_REQUEST = 'src/erp/hr/Saga/Saga/SEARCH_EMPLOYMENT_MANAGE_REQUEST';
export const UPDATE_EMPLOYMENT_MANAGE_REQUEST = 'src/erp/hr/Saga/Saga/UPDATE_EMPLOYMENT_MANAGE_REQUEST';

export const searchEmploymentManageList = createAction(SEARCH_EMPLOYMENT_MANAGE_REQUEST);
export const updateEmploymentManageList = createAction(UPDATE_EMPLOYMENT_MANAGE_REQUEST);

const searchEmploymentManage = createRequestSaga(
    SEARCH_EMPLOYMENT_MANAGE_REQUEST,
    api.searchEmploymentManage
);
const updateEmploymentManage = createRequestSaga(
    UPDATE_EMPLOYMENT_MANAGE_REQUEST,
    api.updateEmploymentManage
);

export function* onEmploymentManage() {
    yield takeLatest(SEARCH_EMPLOYMENT_MANAGE_REQUEST, searchEmploymentManage);
}
export function* onUpdateEmploymentManage() {
    yield takeLatest(UPDATE_EMPLOYMENT_MANAGE_REQUEST, updateEmploymentManage);
}

export default function* employmentmanage() {
    yield all([
        call(onEmploymentManage), //동욱 재직증명서 관리
        call(onUpdateEmploymentManage), //동욱 재직증명서 업데이트
    ]);
}
