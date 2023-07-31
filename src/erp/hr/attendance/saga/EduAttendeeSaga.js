import { takeEvery, all } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import { createAction } from 'redux-actions';
import * as api from '../api';

const CLASS_BRIEF_REQUEST = "CLASS_BRIEF_REQUEST";
const ATTENDEE_LIST_REQUEST = "ATTENDEE_LIST_REQUEST";
const SELECT_ATTENDEE_REQUEST = "SELECT_ATTENDEE_REQUEST";
const UPDATE_ATTENDEE_REQUEST = "UPDATE_ATTENDEE_REQUEST";
const INSERT_ATTENDEE_REQUEST = "INSERT_ATTENDEE_REQUEST";
const DELETE_ATTENDEE_REQUEST = "DELETE_ATTENDEE_REQUEST";

export const classBriefRequest = createAction(CLASS_BRIEF_REQUEST);
export const attendeeListRequest = createAction(ATTENDEE_LIST_REQUEST);
export const updateAttendeeRequest = createAction(UPDATE_ATTENDEE_REQUEST);
export const selectAttendeeRequest = createAction(SELECT_ATTENDEE_REQUEST);
export const insertAttendeeRequest = createAction(INSERT_ATTENDEE_REQUEST);
export const deleteAttendeeRequest = createAction(DELETE_ATTENDEE_REQUEST);

const classBriefSaga = createRequestSaga(CLASS_BRIEF_REQUEST, api.getClassList);
const attendeeListSaga = createRequestSaga(ATTENDEE_LIST_REQUEST, api.getAttendeeList);
const selectAttendeeSaga = createRequestSaga(SELECT_ATTENDEE_REQUEST, api.getAttendee);
const updateAttendeeSaga = createRequestSaga(UPDATE_ATTENDEE_REQUEST, api.modifyAttendee);
const insertAttendeeSaga = createRequestSaga(INSERT_ATTENDEE_REQUEST, api.addAttendee);
const deleteAttendeeSaga = createRequestSaga(DELETE_ATTENDEE_REQUEST, api.removeAttendee);

export default function* attendeeList() {
    yield all([
        takeEvery(CLASS_BRIEF_REQUEST, classBriefSaga),
        takeEvery(ATTENDEE_LIST_REQUEST, attendeeListSaga),
        takeEvery(SELECT_ATTENDEE_REQUEST, selectAttendeeSaga),
        takeEvery(UPDATE_ATTENDEE_REQUEST, updateAttendeeSaga),
        takeEvery(INSERT_ATTENDEE_REQUEST, insertAttendeeSaga),
        takeEvery(DELETE_ATTENDEE_REQUEST, deleteAttendeeSaga),

    ])
}