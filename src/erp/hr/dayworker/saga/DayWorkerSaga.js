import { takeEvery, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 타입@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//============일용직 관리 조회,신청,삭제=============
export const SEARCH_DAY_WORKER_SELECT_TYPE = 'dayworker/SEARCH_DAY_WORKER_SELECT_TYPE';
export const DAY_WORKER_INSERT_TYPE = 'dayworker/DAY_WORKER_INSERT_TYPE';
export const DAY_WORKER_DELETE_TYPE = 'dayworker/DAY_WORKER_DELETE_TYPE';


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 생성 함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//============일용직 관리 조회,신청,삭제=============
export const selectDayWorker = createAction(SEARCH_DAY_WORKER_SELECT_TYPE);
export const insertDayWorker = createAction(DAY_WORKER_INSERT_TYPE);
export const delDayWorker = createAction(DAY_WORKER_DELETE_TYPE);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@SAGA함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//


//*********************일용직 관리 조회 예솔 20211221 ***************************/
const searchDayWorkerSaga = createRequestSaga(SEARCH_DAY_WORKER_SELECT_TYPE, api.searchDayWorkerSaga);

export function* onSearchDayWorkerSaga() {

    //일용직 관리 조회
    yield takeEvery(SEARCH_DAY_WORKER_SELECT_TYPE, searchDayWorkerSaga);
}
//*********************일용직 관리 조회 예솔 20211221  ***************************/

//*********************일용직 관리 등록 예솔 20211221  ***************************/
const insertDayWorkerSaga = createRequestSaga(DAY_WORKER_INSERT_TYPE, api.insertDayWorkerSaga);

export function* onInsertDayWorkerSaga() {
   
    //일용직 관리 신청
    yield takeEvery(DAY_WORKER_INSERT_TYPE, insertDayWorkerSaga);
}
//*********************일용직 관리 등록 예솔 20211221 ***************************/

//*********************일용직 관리 삭제 예솔 20211221 ***************************/
const deleteDayWorkerSaga = createRequestSaga(DAY_WORKER_DELETE_TYPE, api.deleteDayWorkerSaga);

export function* onDeleteDayWorkerSaga() {

    //일용직 관리 삭제
    yield takeEvery(DAY_WORKER_DELETE_TYPE, deleteDayWorkerSaga);
}
//*********************일용직 관리 삭제 예솔 20211221 ***************************/

export default function* dayworker() {
    yield all([
        call(onSearchDayWorkerSaga),  
       call(onInsertDayWorkerSaga),  
        call(onDeleteDayWorkerSaga),  
    ]);
}