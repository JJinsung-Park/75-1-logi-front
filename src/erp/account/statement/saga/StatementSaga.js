import { takeEvery, takeLatest } from 'redux-saga/effects';
import * as types from '../reducer/StatementReducer';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';


export default function* StatementSaga() {
  yield takeLatest(types.SEARCH_DETAILTRIAL_REQUEST, searchDetailTrialSaga);

  yield takeEvery(types.SEARCH_ACCOUNT_LIST_REQUEST, selectAccountSaga);
  yield takeEvery(types.SEARCH_ACCOUNT_TINFO_REQUEST, searchAccountInfoSaga);

  yield takeLatest(types.SEARCH_CASHJOURNAL_REQUEST, searchCashJournalListSaga);

  yield takeLatest(types.SEARCH_JOURNAL_FROM_REQUEST, searchJournalFormListSaga);
  yield takeLatest(types.SEARCH_CUSTOMER_REQUEST, searchCustomerListSaga);
  yield takeEvery(types.SEARCH_FINANCIAL_REQUEST, searchFinancialSaga);
  yield takeEvery(types.SEARCH_TOTALTRIAL_REQUEST, searchTotalTrialSaga);
  yield takeEvery(types.SEARCH_INCOME_REQUEST, selectIncomeSaga);
  yield takeEvery(types.SEARCH_COST_REQUEST, selectCostSaga);
  yield takeEvery(types.SEARCH_CASHFLOW_REQUEST, selectCashFlowSaga);
  yield takeEvery(types.SEARCH_MONTH_INCOME_REQUEST, selectMonthIncomeSaga);

  yield takeEvery(types.SEARCH_PERIOD_NO_REQUEST, searchPeriodNoSaga);

  yield takeEvery(types.SEARCH_MONTH_DATA_REQUEST, searchMonthSaga)

  yield takeEvery(types.SEARCH_ACCOUNT_DATA_REQUEST, searchAccountSaga)

  yield takeLatest(types.SELECT_PREVIOUS_STATUS_REQUEST, searchPreviousStateSaga);
}

//********************************** 2021-03-16 송화준 **********************************

const searchFinancialSaga = createRequestSaga(types.SEARCH_FINANCIAL_REQUEST, api.searchFinancial);
const searchTotalTrialSaga = createRequestSaga(types.SEARCH_TOTALTRIAL_REQUEST, api.searchTotalTrial);
const selectIncomeSaga = createRequestSaga(types.SEARCH_INCOME_REQUEST, api.searchIncomeList);
const selectMonthIncomeSaga = createRequestSaga(types.SEARCH_MONTH_INCOME_REQUEST, api.searchMonthIncomeList);
const selectCostSaga = createRequestSaga(types.SEARCH_COST_REQUEST, api.selectCost);
const selectCashFlowSaga = createRequestSaga(types.SEARCH_CASHFLOW_REQUEST, api.selectCashFlow);
const searchCustomerListSaga = createRequestSaga(types.SEARCH_CUSTOMER_REQUEST, api.searchCustomerList);
const searchJournalFormListSaga = createRequestSaga(types.SEARCH_JOURNAL_FROM_REQUEST, api.searchJournalFormList);
const searchCashJournalListSaga = createRequestSaga(types.SEARCH_CASHJOURNAL_REQUEST, api.searchCashJournalList);
const searchDetailTrialSaga = createRequestSaga(types.SEARCH_DETAILTRIAL_REQUEST, api.searchDetailTrial);
const selectAccountSaga = createRequestSaga(types.SEARCH_ACCOUNT_LIST_REQUEST, api.selectAccount);
const searchAccountInfoSaga = createRequestSaga(types.SEARCH_ACCOUNT_TINFO_REQUEST, api.searchAccountInfo);

const searchPeriodNoSaga = createRequestSaga(types.SEARCH_PERIOD_NO_REQUEST, api.searchPeriodNo);

const searchMonthSaga = createRequestSaga(types.SEARCH_MONTH_DATA_REQUEST, api.searchMonth)

const searchPreviousStateSaga = createRequestSaga(types.SELECT_PREVIOUS_STATUS_REQUEST, api.searchPreviousState);

const searchAccountSaga = createRequestSaga(types.SEARCH_ACCOUNT_DATA_REQUEST, api.searchAccount)