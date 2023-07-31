import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';

const SEARCH_GATHER_LIST_SAGA = 'src/erp/logistic/Saga/SEARCH_GATHER_LIST';
const INSERT_GATHER_LIST_REQUEST = 'src/erp/logistic/Saga/INSERT_GATHER_LIST';

export const searchGatherList = createAction(SEARCH_GATHER_LIST_SAGA);
export const GatherInsert = createAction(INSERT_GATHER_LIST_REQUEST);

const searchGatherListSaga = createRequestSaga(SEARCH_GATHER_LIST_SAGA, api.searchGatherList);
const gatherInsertSaga = createRequestSaga(INSERT_GATHER_LIST_REQUEST, api.gatherInsert);

export default function* gatherlist() {
    yield takeEvery(SEARCH_GATHER_LIST_SAGA, searchGatherListSaga);
    yield takeEvery(INSERT_GATHER_LIST_REQUEST, gatherInsertSaga);
}