import { takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 타입@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//

//==========교육/출장 신청=============
export const INSERT_TRAVEL_ATTD_START = 'travel/INSERT_TRAVEL_ATTD_START';


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 생성 함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
export const insertTravelAttdStart = createAction(INSERT_TRAVEL_ATTD_START);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@SAGA함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
const InestTravelAttdSaga = createRequestSaga(INSERT_TRAVEL_ATTD_START, api.insertTravel);

export default function* travelAttd() {
    yield takeLatest(INSERT_TRAVEL_ATTD_START, InestTravelAttdSaga);

}