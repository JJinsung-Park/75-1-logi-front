import { takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

export const SEARCH_EMPLOYMENT = 'search/SEARCH_EMPLOYMENT';
export const searchEmployment = createAction(SEARCH_EMPLOYMENT);

const searchEmploymentSaga = createRequestSaga(SEARCH_EMPLOYMENT, api.searchEmploymentSaga);

export function* onSearchEmployment() {
    //경윤 재직증명조회
    yield takeLatest(SEARCH_EMPLOYMENT, searchEmploymentSaga);
}


export default function* searchEmploy() {
    yield all([     
        call(onSearchEmployment), //경윤 재직증명서 조회관리
    ]);
}