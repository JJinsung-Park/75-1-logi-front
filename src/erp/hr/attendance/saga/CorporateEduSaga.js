import { takeEvery, all } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import { createAction } from 'redux-actions';
import * as api from '../api';

const CLASS_LIST_REQUEST = "CLASS_LIST_REQUEST";
const UPDATE_CLASS_REQUEST = "UPDATE_CLASS_REQUEST";
const INSERT_CLASS_REQUEST = "INSERT_CLASS_REQUEST";
const DELETE_CLASS_REQUEST = "DELETE_CLASS_REQUEST";

export const classListRequest = createAction(CLASS_LIST_REQUEST);
export const updateClassRequest = createAction(UPDATE_CLASS_REQUEST);
export const insertClassRequest = createAction(INSERT_CLASS_REQUEST);
export const deleteClassRequest = createAction(DELETE_CLASS_REQUEST);

const classListSaga = createRequestSaga(CLASS_LIST_REQUEST, api.getClassList);
const updateClassSaga = createRequestSaga(UPDATE_CLASS_REQUEST, api.modifyClass);
const insertClassSaga = createRequestSaga(INSERT_CLASS_REQUEST, api.addClass);
const deleteClassSaga = createRequestSaga(DELETE_CLASS_REQUEST, api.removeClass);

export default function* classList() {
    yield all([
        takeEvery(CLASS_LIST_REQUEST, classListSaga),
        takeEvery(UPDATE_CLASS_REQUEST, updateClassSaga),
        takeEvery(INSERT_CLASS_REQUEST, insertClassSaga),
        takeEvery(DELETE_CLASS_REQUEST, deleteClassSaga),

    ])
}