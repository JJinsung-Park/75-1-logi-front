import accountApi from 'api/accountApi';
import Axios from 'axios';

//***********************2021-03-16 송화준 ******************************
export const selectCost = (action) =>
    accountApi.get('/statement/costStatements', {
        params: {
            searchDate: action.params.searchDate
        }
    });

export const searchIncomeList = (action) =>
    accountApi.get('/settlement/incomestatement', {
        params: {
            accountPeriodNo: action.params.accountPeriodNo,
            callResult: action.params.callResult
        }
    });
///////////////월별손익계산서
export const searchMonthIncomeList = (action) =>
    accountApi.get('/settlement/monthIncomeStatements', {
        params: {
            searchDate: action.params.searchDate
        }
    });
//합계잔액시산표 조회
export const searchTotalTrial = (action) =>
    accountApi.get('/settlement/totaltrialbalance', {
        params: {
            accountPeriodNo: action.params.accountPeriodNo,
            callResult: action.params.callResult
        }
    });

export const searchFinancial = (action) =>
    accountApi.get('/settlement/financialposition', {
        params: {
            accountPeriodNo: action.params.accountPeriodNo,
            callResult: action.params.callResult
        }
    });

export const searchCustomerList = (action) =>
    accountApi.get('/basicInfo/searchCustomer', {
        params: {
            searchCondition: action.params.searchCondition,
            workplaceCode: action.params.workplaceCode
        }
    });

export const searchJournalFormList = (action) =>
    accountApi.get('/account/journal', {
        params: {
            startDate: action.params.startDate,
            endDate: action.params.endDate
        }
    });

export const searchCashJournalList = (action) =>
    accountApi.get(`/posting/cashjournal`, {
        params: {
            fromDate: action.params.fromDate,
            toDate: action.params.toDate
        }
    });

export const searchDetailTrial = (action) =>
    accountApi.get('/settlement/detailtrialbalance', {
        params: {
            fromDate: action.params.fromDate,
            toDate: action.params.toDate
        }
    });

export const selectAccount = (action) =>
    accountApi.get('/operate/account', {
        params: {
            accountName: action.params.accountName,
            accountCode: action.params.accountCode
        }
    });

export const searchAccountInfo = (action) =>
    accountApi.get('/posting/ledgers', {
        params: {
            startDate: action.params.startDate,
            endDate: action.params.endDate,
            accountCode: action.params.accountCode
        }
    });

export const searchPreviousState = (action) =>
    accountApi.get('/settlement/financialposition', {
        params: {
            accountPeriodNo: action.params.accountPeriodNo,
            callResult: action.params.callResult
        }
    });

export const selectCashFlow = (action) =>
    accountApi.get('/statement/cashFlowStatements', {
        params: {
            searchDate: action.params.searchDate
        }
    });

//회계기수번호 조회(날짜)
export const searchPeriodNo = () => accountApi.get('/settlement/periodNoList', {});


// 월별 조회 데이터 가져오기
export const searchMonth = (action) => accountApi.get('/settlement/monthData',{});

//계정전체 조회
export const searchAccount = (action) => accountApi.get ('/posting/CurrentAssetCode', {})
