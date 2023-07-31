import { takeEvery, all, call } from 'redux-saga/effects';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 타입@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//============탄력근무 조회,신청,삭제=============
export const SEARCH_ELASTIC_SELECT_TYPE = 'elastic/SEARCH_ELASTIC_SELECT_TYPE';
export const ELASTIC_INSERT_TYPE = 'elastic/ELASTIC_INSERT_TYPE';
export const ELASTIC_DELETE_TYPE = 'elastic/ELASTIC_DELETE_TYPE';


//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@액션 생성 함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
//============탄력근무 조회,신청,삭제=============
export const selectElastic = createAction(SEARCH_ELASTIC_SELECT_TYPE);
export const insertElastic = createAction(ELASTIC_INSERT_TYPE);
export const delElastic = createAction(ELASTIC_DELETE_TYPE);

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@SAGA함수@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//


//*********************탄력근무 조회 범석 20210906 ***************************/
const searchElasticSaga = createRequestSaga(SEARCH_ELASTIC_SELECT_TYPE, api.searchElasticSaga);

export function* onSearchElasticSaga() {
  
    //범석 탄력근무 조회
    yield takeEvery(SEARCH_ELASTIC_SELECT_TYPE, searchElasticSaga);
}
//*********************탄력근무 조회 종료 범석 20210907 ***************************/

//*********************탄력근무 신청 범석 20210908 ***************************/
const insertElasticSaga = createRequestSaga(ELASTIC_INSERT_TYPE, api.insertElasticSaga);

export function* onInsertElasticSaga() {

    //범석 탄력근무 신청
    yield takeEvery(ELASTIC_INSERT_TYPE, insertElasticSaga);
}
//*********************탄력근무 신청 종료 범석 20210909 ***************************/

//*********************탄력근무 삭제 범석 20210908 ***************************/
const deleteElasticSaga = createRequestSaga(ELASTIC_DELETE_TYPE, api.deleteElasticSaga);

export function* onDeleteElasticSaga() {
  
    //범석 탄력근무 삭제
    yield takeEvery(ELASTIC_DELETE_TYPE, deleteElasticSaga);
}
//*********************탄력근무 삭제 종료 범석 20210909 ***************************/

export default function* elastic() {
    yield all([
        call(onSearchElasticSaga),  // 범석 탄력근무 조회
        call(onInsertElasticSaga),  // 범석 탄력근무 신청
        call(onDeleteElasticSaga),  // 범석 탄력근무 삭제
    ]);
}