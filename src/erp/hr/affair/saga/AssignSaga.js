import { takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';

export const SEARCH_EMP_ASSIGN_REQUEST = 'src/erp/hr/Saga/Saga/SEARCH_EMP_ASSIGN_REQUEST';

export const searchEmpAssignList = createAction(SEARCH_EMP_ASSIGN_REQUEST);

const assignEmp = createRequestSaga(SEARCH_EMP_ASSIGN_REQUEST, api.assignEmp);

export default function* assign() {
    yield takeLatest(SEARCH_EMP_ASSIGN_REQUEST, assignEmp);
}