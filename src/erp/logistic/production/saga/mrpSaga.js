import { takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';

const SEARCH_MRP_GETMRPLIST_REQUEST = 'src/erp/logistic/Saga/SEARCH_MRP_GETMRPLIST';

export const searchGetMrpList = createAction(SEARCH_MRP_GETMRPLIST_REQUEST);

const searchGetMpsListSaga = createRequestSaga(SEARCH_MRP_GETMRPLIST_REQUEST, api.searchGetMpsList);

export default function* mrplist() {
    yield takeEvery(SEARCH_MRP_GETMRPLIST_REQUEST, searchGetMpsListSaga);
}