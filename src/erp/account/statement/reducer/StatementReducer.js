import { createAction } from 'redux-actions';

//***********************2021-03-16 송화준 ******************************

//일(월)계표
export const SEARCH_DETAILTRIAL_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_DETAILTRIAL';
export const SEARCH_DETAILTRIAL_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_DETAILTRIAL_SUCCESS';
export const SEARCH_DETAILTRIAL_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_DETAILTRIAL_FAILURE';

//전체 계정 조회
export const SEARCH_ACCOUNT_DATA_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_DATA';
export const SEARCH_ACCOUNT_DATA_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_DATA_SUCCESS';
export const SEARCH_ACCOUNT_DATA_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_DATA_FAILURE';

//코드다이알로그조회
export const SEARCH_ACCOUNT_LIST_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_LIST';
export const SEARCH_ACCOUNT_LIST_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_LIST_SUCCESS';
export const SEARCH_ACCOUNT_LIST_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_LIST_FAILURE';

export const SEARCH_ACCOUNT_TINFO_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_TINFO';
export const SEARCH_ACCOUNT_TINFO_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_TINFO_SUCCESS';
export const SEARCH_ACCOUNT_TINFO_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_TINFO_FAILURE';

//현금출납장조회
export const SEARCH_CASHJOURNAL_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_CASHJOURNAL';
export const SEARCH_CASHJOURNAL_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_CASHJOURNAL_SUCCESS';
export const SEARCH_CASHJOURNAL_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_CASHJOURNAL_FAILURE';

//분개장조회
export const SEARCH_JOURNAL_FROM_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_JOURNAL_FROM';
export const SEARCH_JOURNAL_FROM_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_JOURNAL_FROM_SUCCESS';
export const SEARCH_JOURNAL_FROM_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_JOURNAL_FROM_FAILURE';

//회계기수번호 조회(날짜가져오기)
export const SEARCH_PERIOD_NO_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO';
export const SEARCH_PERIOD_NO_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO_SUCCESS';
export const SEARCH_PERIOD_NO_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO_FAILURE';

//거래처 조회
export const SEARCH_CUSTOMER_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_CUSTOMER';
export const SEARCH_CUSTOMER_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_CUSTOMER_SUCCESS';
export const SEARCH_CUSTOMER_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_CUSTOMER_FAILURE';

//재무상태표 조회
export const SEARCH_FINANCIAL_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_FINANCIAL';
export const SEARCH_FINANCIAL_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_FINANCIAL_SUCCESS';
export const SEARCH_FINANCIAL_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_FINANCIAL_FAILURE';

//합계잔액시산표 조회
export const SEARCH_TOTALTRIAL_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_TOTALTRIAL';
export const SEARCH_TOTALTRIAL_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_TOTALTRIAL_SUCCESS';
export const SEARCH_TOTALTRIAL_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_TOTALTRIAL_FAILURE';

//손익계산서 조회
export const SEARCH_INCOME_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_INCOME';
export const SEARCH_INCOME_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_INCOME_SUCCESS';
export const SEARCH_INCOME_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_INCOME_FAILURE';

//월별손익계산서 조회
export const SEARCH_MONTH_INCOME_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_MONTH_INCOME';
export const SEARCH_MONTH_INCOME_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_MONTH_INCOME_SUCCESS';
export const SEARCH_MONTH_INCOME_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_MONTH_INCOME_FAILURE';

//원가명세서 조회
export const SEARCH_COST_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_COST';
export const SEARCH_COST_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_COST_SUCCESS';
export const SEARCH_COST_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_COST_FAILURE';

//현금흐름표 조회
export const SEARCH_CASHFLOW_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_CASHFLOW';
export const SEARCH_CASHFLOW_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_CASHFLOW_SUCCESS';
export const SEARCH_CASHFLOW_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_CASHFLOW_FAILURE';

//************************* 2020-11-26 전기분재무상태표  최지은&노원찬 시작 *************************
export const SELECT_PREVIOUS_STATUS_REQUEST = 'src/erp/account/Saga/Saga/SELECT_PREVIOUS_STATUS';
export const SELECT_PREVIOUS_STATUS_SUCCESS = 'src/erp/account/Saga/Saga/SELECT_PREVIOUS_STATUS_SUCCESS';
export const SELECT_PREVIOUS_STATUS_FAILURE = 'src/erp/account/Saga/Saga/SELECT_PREVIOUS_STATUS_FAILURE';

//************************** 월별 데이터 조회 *************************
export const SEARCH_MONTH_DATA_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_MONTH_DATA';
export const SEARCH_MONTH_DATA_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_MONTH_DATA_SUCCESS';
export const SEARCH_MONTH_DATA_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_MONTH_DATA_FAILURE';

// 전기분재무상태표 시작 2020-11-26  최지은&노원찬 *************************
export const selectPreviousStatusRequest = createAction(SELECT_PREVIOUS_STATUS_REQUEST);
export const selectPreviousStatusSuccess = createAction(SELECT_PREVIOUS_STATUS_SUCCESS);
export const selectPreviousStatusFailure = createAction(SELECT_PREVIOUS_STATUS_FAILURE);

//***********************2021-03-16 송화준 ******************************
export const selectCostRequest = createAction(SEARCH_COST_REQUEST); //원가계산서조회
export const selectCostSuccess = createAction(SEARCH_COST_SUCCESS);
export const selectCostFailure = createAction(SEARCH_COST_FAILURE);

export const selectIncomeRequest = createAction(SEARCH_INCOME_REQUEST); //손익계산서조회
export const selectIncomeSuccess = createAction(SEARCH_INCOME_SUCCESS);
export const selectIncomeFailure = createAction(SEARCH_INCOME_FAILURE);

export const selectMonthIncomeRequest = createAction(SEARCH_MONTH_INCOME_REQUEST); //월별손익계산서조회
export const selectMonthIncomeSuccess = createAction(SEARCH_MONTH_INCOME_SUCCESS);
export const selectMonthIncomeFailure = createAction(SEARCH_MONTH_INCOME_FAILURE);

export const selectCashFlowRequest = createAction(SEARCH_CASHFLOW_REQUEST); //현금흐름표조회
export const selectCashFlowSuccess = createAction(SEARCH_CASHFLOW_SUCCESS);
export const selectCashFlowFailure = createAction(SEARCH_CASHFLOW_FAILURE);

export const selectTotaltrialRequest = createAction(SEARCH_TOTALTRIAL_REQUEST); //합계잔액시산표조회
export const selectTotaltrialSuccess = createAction(SEARCH_TOTALTRIAL_SUCCESS);
export const selectTotaltrialFailure = createAction(SEARCH_TOTALTRIAL_FAILURE);

export const selectFinancialRequest = createAction(SEARCH_FINANCIAL_REQUEST); //재무상태표조회
export const selectFinancialSuccess = createAction(SEARCH_FINANCIAL_SUCCESS);
export const selectFinancialFailure = createAction(SEARCH_FINANCIAL_FAILURE);

export const selectCustomerRequest = createAction(SEARCH_CUSTOMER_REQUEST); //거래처조회
export const selectCustomerSuccess = createAction(SEARCH_CUSTOMER_SUCCESS);
export const selectCustomerFailure = createAction(SEARCH_CUSTOMER_FAILURE);

export const selectJournalFromRequest = createAction(SEARCH_JOURNAL_FROM_REQUEST); //분개장조회
export const selectJournalFromSuccess = createAction(SEARCH_JOURNAL_FROM_SUCCESS);
export const selectJournalFromFailure = createAction(SEARCH_JOURNAL_FROM_FAILURE);

export const selectDetailTrialRequest = createAction(SEARCH_DETAILTRIAL_REQUEST); //일(월)계표
export const selectDetailTrialSuccess = createAction(SEARCH_DETAILTRIAL_SUCCESS);
export const selectDetailTrialFailure = createAction(SEARCH_DETAILTRIAL_FAILURE);

export const selectCashJournalRequest = createAction(SEARCH_CASHJOURNAL_REQUEST); //현금출납장조회
export const selectCashJournalSuccess = createAction(SEARCH_CASHJOURNAL_SUCCESS);
export const selectCashJournalFailure = createAction(SEARCH_CASHJOURNAL_FAILURE);

export const selectAccountListRequest = createAction(SEARCH_ACCOUNT_LIST_REQUEST); //코드다이알로그조회
export const selectAccountListSuccess = createAction(SEARCH_ACCOUNT_LIST_SUCCESS);
export const selectAccountListFailure = createAction(SEARCH_ACCOUNT_LIST_FAILURE);

export const selectAccountTinfoRequest = createAction(SEARCH_ACCOUNT_TINFO_REQUEST); //코드다이알로그조회
export const selectAccountTinfoSuccess = createAction(SEARCH_ACCOUNT_TINFO_SUCCESS);
export const selectAccountTinfoFailure = createAction(SEARCH_ACCOUNT_TINFO_FAILURE);

const initialState = {
    accountList: [],
    error: '',
    isLoading: false,
    cashJournalList: [],
    detailTrialBalanceList: [],
    journalDetailList: '',
    journalFormList: [],
    IncomeList: [],
    CostList: [],
    customerList: [],
    CashFlowList: [],
    MonthIncomeList: [],
    periodNoList: [],
    financialPositionList:[],
    monthList : [],
    basicAccountList :[],
    accountLedgerList:[]

};

const StatementReducer = (state = initialState, action) => {
    switch (action.type) {
        //일(월)계표
        case SEARCH_DETAILTRIAL_SUCCESS:
            return {
                ...state,
                detailTrialBalanceList: action.payload.detailTrialBalanceList
            };
        case SEARCH_DETAILTRIAL_FAILURE:
            return {
                ...state,
                error: action.error
            };

        //========기수 전체조회 성공========
        case SEARCH_PERIOD_NO_SUCCESS:
            return {
                ...state,
                periodNoList: action.payload.periodNoList
            };
        case SEARCH_PERIOD_NO_FAILURE:
            return {
                ...state,
                error: action.error
            };

        //==========코드 다이알로그 검색=======
        case SEARCH_ACCOUNT_LIST_SUCCESS: //코드조회 성공
            
            return {
                ...state,
                accountBean: action.payload
            };
        case SEARCH_ACCOUNT_LIST_FAILURE: //코드조회 실패
            return {
                ...state,
                error: action.error
            };
        //========== 계정별원장 조회
        case SEARCH_ACCOUNT_TINFO_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case SEARCH_ACCOUNT_TINFO_SUCCESS:
            return {
                ...state,
                isLoading: false,
                accountLedgerList: action.payload.accountLedgerList
            };
        case SEARCH_ACCOUNT_TINFO_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        // 현금출납장 조회
        case SEARCH_CASHJOURNAL_SUCCESS:
            return {
                ...state,
                cashJournalList: action.payload.cashJournalList
            };
        case SEARCH_CASHJOURNAL_FAILURE:
            return {
                ...state,
                error: action.error
            };

        // 분개장 조회
        case SEARCH_JOURNAL_FROM_SUCCESS:
            return {
                ...state,
                journalFormList: action.data
            };
        case SEARCH_JOURNAL_FROM_FAILURE:
            return {
                ...state,
                error: action.error
            };
        //재무상태표 조회
        case SEARCH_FINANCIAL_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case SEARCH_FINANCIAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                financialPositionList: action.payload.financialPositionList.financialPosition
            };
        case SEARCH_FINANCIAL_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        //합계잔액시산표 조회
        case SEARCH_TOTALTRIAL_SUCCESS:
            return {
                ...state,
                totaltrialList: action.payload.totaltrialList.totalTrialBalance
            };
        case SEARCH_TOTALTRIAL_FAILURE:
            return {
                ...state,
                error: action.error
            };

        //손익계산서
        case SEARCH_INCOME_SUCCESS:
            return {
                ...state,
                incomeList: action.payload.incomeList.incomeStatement
            };
        case SEARCH_INCOME_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        //월별손익계산서
        case SEARCH_MONTH_INCOME_SUCCESS:
            return {
                ...state,
                isLoading: false,
                monthIncomeList: action.payload.monthIncomeList.RESULT
            };
        case SEARCH_MONTH_INCOME_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        case SEARCH_COST_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case SEARCH_COST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                costList: action.payload.costList
            };
        case SEARCH_COST_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        case SEARCH_CASHFLOW_REQUEST:
            return {
                ...state,
                isLoading: true
            };

        case SEARCH_CASHFLOW_SUCCESS:
            return {
                ...state,
                isLoading: false,
                cashFlowList: action.payload.cashFlowList
            };
        case SEARCH_CASHFLOW_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };

        case SELECT_PREVIOUS_STATUS_SUCCESS:
            return {
                ...state,
                financialPositionList: action.payload.financialPositionList.financialPosition
            };

        case SELECT_PREVIOUS_STATUS_FAILURE:
            return {
                ...state,
                error: action.error
            };

        // 거래처목록 조회
        case SEARCH_CUSTOMER_SUCCESS:
            return {
                ...state,
                customerList: action.data
            };
        case SEARCH_CUSTOMER_FAILURE:
            return {
                ...state,
                error: action.error
            };

        //월별조회데이터
        case SEARCH_MONTH_DATA_SUCCESS:
            return {
                ...state,
                monthList: action.payload.monthList
            }
        case SEARCH_MONTH_DATA_FAILURE :
            return {
                ...state,
                error: action.error
            }
        case SEARCH_ACCOUNT_DATA_SUCCESS:
            return {
                ...state,
                accountList: action.payload
            }
        case SEARCH_ACCOUNT_DATA_FAILURE:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
};
export default StatementReducer;
