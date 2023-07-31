import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

    //직급리스트(사원상세)
export const POSITION_LIST_REQUEST = 'src/erp/hr/Saga/Saga/POSITION_LIST_REQUEST';

export const PositionListRequest = createAction(POSITION_LIST_REQUEST); 

const positionListSaga = createRequestSaga(POSITION_LIST_REQUEST, api.positionListSaga);

export default function* position() {
    yield takeLatest(POSITION_LIST_REQUEST, positionListSaga);
}

