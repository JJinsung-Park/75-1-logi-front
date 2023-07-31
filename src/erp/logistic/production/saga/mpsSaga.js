import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';

const SEARCH_MPS_LIST_REQUEST = 'src/erp/logistic/Saga/SEARCH_MPS';

export const searchMpsList = createAction(SEARCH_MPS_LIST_REQUEST);

const searchMpsListSaga = createRequestSaga(SEARCH_MPS_LIST_REQUEST, api.searchMpsList);

export default function* mpslist() {
    yield takeEvery(SEARCH_MPS_LIST_REQUEST, searchMpsListSaga);
}