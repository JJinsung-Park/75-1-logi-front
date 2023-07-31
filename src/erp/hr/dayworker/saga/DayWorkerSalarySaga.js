import { takeEvery, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 타입@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//============일용직 급여관리 조회,신청=============
export const SEARCH_DAY_WORKER_SALARY_SELECT = 'dayworkersalary/SEARCH_DAY_WORKER_SALARY_SELECT';
export const DAY_WORKER_SALARY_INSERT = 'dayworkersalary/DAY_WORKER_SALARY_INSERT';
export const MONTH_WORKER_SALARY_INSERT = 'dayworkersalary/MONTH_WORKER_SALARY_INSERT';



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 생성 함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//============일용직 급여관리 조회,신청=============
export const selectDayWorkerSalary = createAction(SEARCH_DAY_WORKER_SALARY_SELECT);
export const insertDayWorkerSalary = createAction(DAY_WORKER_SALARY_INSERT);
export const insertMonthWorkerSalary = createAction(MONTH_WORKER_SALARY_INSERT);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@SAGA함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//


//*********************일용직 급여 관리 조회 예솔 20211224 ***************************/
const searchDayWorkerSalarySaga = createRequestSaga(SEARCH_DAY_WORKER_SALARY_SELECT, api.searchDayWorkerSalarySaga);

export function* onSearchDayWorkerSalarySaga() {
    //일용직 급여 관리 조회
    yield takeEvery(SEARCH_DAY_WORKER_SALARY_SELECT, searchDayWorkerSalarySaga);
}
//*********************일용직 급여 관리 조회 예솔 20211224***************************/

//*********************일용직  급여  관리 등록 예솔 20211224  ***************************/
const insertDayWorkerSalarySaga = createRequestSaga(DAY_WORKER_SALARY_INSERT, api.insertDayWorkerSalarySaga);

export function* onInsertDayWorkerSalarySaga() {
    //일용직 ///일급/// 
    yield takeEvery(DAY_WORKER_SALARY_INSERT, insertDayWorkerSalarySaga);
}
//*********************일용직  급여  관리 등록 예솔 20211224***************************/

//*********************일용직  급여  관리 등록 예솔 20211224  ***************************/
const insertMonthWorkerSalarySaga = createRequestSaga(MONTH_WORKER_SALARY_INSERT, api.insertMonthWorkerSaga);

export function* onInsertMonthWorkerSalarySaga() {
    //일용직 ///월급/// 
    yield takeEvery(MONTH_WORKER_SALARY_INSERT, insertMonthWorkerSalarySaga);
}
//*********************일용직  급여  관리 등록 예솔 20211224***************************/

export default function* dayworkersalary() {
    yield all([
        call(onSearchDayWorkerSalarySaga),  
        call(onInsertDayWorkerSalarySaga),  
        call(onInsertMonthWorkerSalarySaga),  
    ]);
}