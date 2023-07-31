import { takeEvery, put, takeLatest, delay, fork } from 'redux-saga/effects';
import * as types from '../reducer/BaseReducer';
import Axios from 'axios';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';
import {SEARCH_CUSTOMER_REQUEST} from "../reducer/BaseReducer";

//================================== 2020-11-28 계정과목관리 유길현  시작  =====================================
function* batchAccountList(action) {
    
    try {
        if (action.division === 'delete') {
            yield Axios.get('http://localhost:8282/acc/account/deleteAccountList', {
                params: { accountInnerCode: action.params.accountInnerCode }
            });
           
        }
        if (action.division === 'save') {
            yield Axios.post(
                'http://localhost:8282/acc/account/batchAccountList',
                { accountList: action.params.accountList },
                { headers: { 'Content-Type': 'application/json' } }
            );
           
        }
    } catch (error) {
        yield put({ type: types.BATCH_ACCOUNT_LIST_FAILURE, error });
    }
}
//================================== 2020-11-28 계정과목관리 유길현  끝  =====================================

//================================== 2020-09-01 거래처 관리 조편백  시작=====================================
function* batchCustormerProcess(action) {
    
    try {
        if (action.division === 'delete') {
            yield Axios.get('http://localhost:8282/acc/base/deleteNormalCustormer', {
                params: { customerCode: action.params.customerCode }
            });
          
        }
        if (action.division === 'save') {
            yield Axios.post(
                'http://localhost:8282/acc/base/batchCustormerProcess',
                { customerList: action.params.customerList },
                { headers: { 'Content-Type': 'application/json' } }
            );
            
        }
    } catch (error) {
        yield put({ type: types.BATCH_ACCOUNT_FAILURE, error });
    }
}

export default function* BaseSaga() {
    //사업장조회
    yield takeEvery(types.SEARCH_WORKPLACE_REQUEST, searchWorkPlaceSaga);
    //전체 기수 조회
    yield takeEvery(types.SEARCH_PERIOD_NO_REQUEST, searchPeriodNoSaga);

    //계정과목 조회
    yield takeLatest(types.SEARCH_ACCOUNT_REQUEST, searchAccountListSaga);
    yield takeEvery(types.BATCH_ACCOUNT_LIST_REQUEST, batchAccountList);
    yield takeEvery(types.BATCH_ACCOUNT_REQUEST, batchCustormerProcess);

    //부서 조회
    yield takeEvery(types.SEARCH_DEPT_REQUEST, searchDeptSaga);

    //계정과목조회
    yield takeEvery(types.SEARCH_BUDGETLIST_REQUEST, searchBudgetSaga);
    //세부계정과목조회
    yield takeEvery(types.SEARCH_DETAIL_BUDGETLIST_REQUEST, searchDetailSaga);

    //당기 예산신청그리드 조회
    yield takeEvery(types.SEARCH_CURRENT_BUDGET_REQUEST, searchCurrentBudgetSaga);

    //전기 예산신청그리드 조회
    yield takeEvery(types.SEARCH_BUDGET_REQUEST, searchPreBudgetSaga);

    //예산신청 INSERT
    yield takeEvery(types.INSERT_BUDGET_REQUEST, insertBudgetSaga);

    //계정세부과목 관리
    yield takeEvery(types.SEARCH_DETAIL_ACCOUNT_REQUEST , searchDetailAccountSaga)

    //거래처관리
    yield takeEvery(types.SEARCH_CUSTOMERS_REQUEST , searchCustomerSaga)

    //신용카드조회
    yield takeEvery(types.SEARCH_CREDITCARD_REQUEST , searchCreditCardSaga)
}
const searchWorkPlaceSaga = createRequestSaga(types.SEARCH_WORKPLACE_REQUEST, api.searchWorkPlace);
const searchPeriodNoSaga = createRequestSaga(types.SEARCH_PERIOD_NO_REQUEST, api.searchPeriodNo);
const searchAccountListSaga = createRequestSaga(types.SEARCH_ACCOUNT_REQUEST, api.searchAccountList);
const searchDeptSaga = createRequestSaga(types.SEARCH_DEPT_REQUEST, api.searchDeptList);
const searchBudgetSaga = createRequestSaga(types.SEARCH_BUDGETLIST_REQUEST, api.searchBudget);
const searchDetailSaga = createRequestSaga(types.SEARCH_DETAIL_BUDGETLIST_REQUEST, api.searchDetailBudget);
const searchCurrentBudgetSaga = createRequestSaga(types.SEARCH_CURRENT_BUDGET_REQUEST, api.searchCurrentBudget);
const searchPreBudgetSaga = createRequestSaga(types.SEARCH_BUDGET_REQUEST, api.searchPreBudget);
const insertBudgetSaga = createRequestSaga(types.INSERT_BUDGET_REQUEST, api.insertBudget);
const searchDetailAccountSaga = createRequestSaga(types.SEARCH_DETAIL_ACCOUNT_REQUEST , api.searchDetailAccount)
const searchCustomerSaga = createRequestSaga(types.SEARCH_CUSTOMERS_REQUEST, api.searchCustomer)
const searchCreditCardSaga = createRequestSaga(types.SEARCH_CREDITCARD_REQUEST, api.searchCreditCard)