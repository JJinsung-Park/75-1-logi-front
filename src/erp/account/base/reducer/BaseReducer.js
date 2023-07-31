import { createAction } from 'redux-actions';

//================================= 2021-03-16 송화준 =================================

//계정과목 조회
export const SEARCH_ACCOUNT_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT';
export const SEARCH_ACCOUNT_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_SUCCESS';
export const SEARCH_ACCOUNT_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_ACCOUNT_FAILURE';

//계정세부과목관리
export const SEARCH_DETAIL_ACCOUNT_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_DETAIL_ACCOUNT';
export const SEARCH_DETAIL_ACCOUNT_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_DETAIL_ACCOUNT_SUCCESS';
export const SEARCH_DETAIL_ACCOUNT_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_DETAIL_ACCOUNT_FAILURE';

//========================================= 2020-11-28 계정과목관리  유길현 시작 ==============================================
export const BATCH_ACCOUNT_LIST_REQUEST = 'src/erp/account/Saga/Saga/BATCH_ACCOUNT_LIST_REQUEST';
export const BATCH_ACCOUNT_LIST_FAILURE = 'src/erp/account/Saga/Saga/BATCH_ACCOUNT_LIST_FAILURE';


export const BATCH_ACCOUNT_REQUEST = 'src/erp/account/Saga/Saga/BATCH_ACCOUNT_REQUEST';
export const BATCH_ACCOUNT_FAILURE = 'src/erp/account/Saga/Saga/BATCH_ACCOUNT_FAILURE';

//***************************거래처관리****************************
export const SEARCH_CUSTOMERS_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_CUSTOMERS';
export const SEARCH_CUSTOMERS_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_CUSTOMERS_SUCCESS';
export const SEARCH_CUSTOMERS_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_CUSTOMERS_FAILURE';

//****************************신용카드 조회
export const SEARCH_CREDITCARD_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_CREDITCARD';
export const SEARCH_CREDITCARD_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_CREDITCARD_SUCCESS';
export const SEARCH_CREDITCARD_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_CREDITCARD_FAILURE';

//***************************사업장 조회***************************
export const SEARCH_WORKPLACE_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_WORKPLACE';
export const SEARCH_WORKPLACE_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_WORKPLACE_SUCCESS';
export const SEARCH_WORKPLACE_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_WORKPLACE_FAILURE';

//*******************회계 기수 조회*******************************************************
export const SEARCH_PERIOD_NO_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO';
export const SEARCH_PERIOD_NO_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO_SUCCESS';
export const SEARCH_PERIOD_NO_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_PERIOD_NO_FAILURE';

//*************************부서 조회***********************************
export const SEARCH_DEPT_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_DEPT';
export const SEARCH_DEPT_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_DEPT_SUCCESS';
export const SEARCH_DEPT_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_DEPT_FAILURE';

//**************************계정과목 그리드 조회***************************
export const SEARCH_BUDGETLIST_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_BUDGETLIST';
export const SEARCH_BUDGETLIST_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_BUDGETLIST_SUCCESS';
export const SEARCH_BUDGETLIST_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_BUDGETLIST_FAILURE';

//**************************계정과목 클릭시 세부계정 조회
export const SEARCH_DETAIL_BUDGETLIST_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_DETAIL_BUDGETLIST';
export const SEARCH_DETAIL_BUDGETLIST_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_DETAIL_BUDGETLIST_SUCCESS';
export const SEARCH_DETAIL_BUDGETLIST_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_DETAIL_BUDGETLIST_FAILURE';

//****************************당기예산신청 budget
export const SEARCH_CURRENT_BUDGET_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_CURRENT_BUDGET';
export const SEARCH_CURRENT_BUDGET_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_CURRENT_BUDGET_SUCCESS';
export const SEARCH_CURRENT_BUDGET_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_CURRENT_BUDGET_FAILURE';

//***************************전기예산신청 budget
export const SEARCH_BUDGET_REQUEST = 'src/erp/account/Saga/Saga/SEARCH_BUDGET';
export const SEARCH_BUDGET_SUCCESS = 'src/erp/account/Saga/Saga/SEARCH_BUDGET_SUCCESS';
export const SEARCH_BUDGET_FAILURE = 'src/erp/account/Saga/Saga/SEARCH_BUDGET_FAILURE';

export const INSERT_BUDGET_REQUEST = 'src/erp/account/Saga/Saga/INSERT_BUDGET';
export const INSERT_BUDGET_FAILURE = 'src/erp/account/Saga/Saga/INSERT_BUDGET_FAILURE';

export const setAccountList = createAction(SEARCH_ACCOUNT_REQUEST);

const initialState = {
    error: '',
    periodNoList: [],
    accountList: [],
    deptList: [],
    parentBudgetList: [],
    budgetList: [],
    currentBudgetList: [],
    preBudgetList: [],
    accountCodeList: [],
    accountDetailList : []
};

const BaseReducer = (state = initialState, action) => {
    switch (action.type) {
        // 계정과목 조회
        case SEARCH_ACCOUNT_SUCCESS:
            return {
                ...state,
                accountCodeList: action.payload.accountCodeList
            };
        case SEARCH_ACCOUNT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        //========================================= 2020-11-27 계정과목관리 유길현  시작  =============================
        case BATCH_ACCOUNT_LIST_FAILURE:
            return {
                ...state,
                error: action.error
            };
        //========================================= 2020-11-27 계정과목관리 유길현  끝  =============================
        case BATCH_ACCOUNT_FAILURE:
            return {
                ...state,
                error: action.error
            };


        //사업장조회
        case SEARCH_WORKPLACE_SUCCESS:
            return {
                ...state,
                deptList: action.payload
            };
        case SEARCH_WORKPLACE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        //회계 기수 조회
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
        case SEARCH_DEPT_SUCCESS:
            return {
                ...state,
                detailDeptList: action.payload.detailDeptList
            };
        case SEARCH_DEPT_FAILURE:
            return {
                ...state,
                error: action.error
            };

        //예산신청 계정과목조회
        case SEARCH_BUDGETLIST_SUCCESS:
            return {
                ...state,
                parentBudgetList: action.payload.parentBudgetList
            };
        case SEARCH_BUDGETLIST_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case SEARCH_DETAIL_BUDGETLIST_SUCCESS:
            return {
                ...state,
                budgetList: action.payload.budgetList
            };
        case SEARCH_DETAIL_BUDGETLIST_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case SEARCH_CURRENT_BUDGET_SUCCESS:
            return {
                ...state,
                currentBudgetList: action.payload.currentBudgetList
            };
        case SEARCH_CURRENT_BUDGET_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case SEARCH_BUDGET_SUCCESS:
            return {
                ...state,
                preBudgetList: action.payload.preBudgetList
            };
        case SEARCH_BUDGET_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case INSERT_BUDGET_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case SEARCH_DETAIL_ACCOUNT_SUCCESS:
            return {
                ...state,
                accountDetailList : action.payload
            }
        case SEARCH_DETAIL_ACCOUNT_FAILURE:
            return {
                ...state,
                error : action.error
            }
        case SEARCH_CUSTOMERS_SUCCESS:
            return {
                ...state,
                accountCustomerList : action.payload.accountCustomerList
            }
        case SEARCH_CUSTOMERS_FAILURE:
            return {
                ...state,
                error : action.error
            }
        case SEARCH_CREDITCARD_SUCCESS:
            return {
                ...state,
                creditCardList : action.payload.creditCardList
            }
        case SEARCH_CREDITCARD_FAILURE:
            return {
                ...state,
                error : action.error
            }
        default:
            return { ...state };
    }
};

export default BaseReducer;
{
    /* ///////////////////////// 2021-03-02 이은기  /////////////////////////// */
}