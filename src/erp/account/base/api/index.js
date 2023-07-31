import accountApi from 'api/accountApi';

//******************************* 2021-03-16 송화준 **************************************


//계정과목조회
export const searchAccountList = (action) => accountApi.get('/operate/parentaccountlist', {});

//계정세부과목조회
export const searchDetailAccount = (action) => accountApi.get('/operate/detailaccountlist',{
    params : {
        code : action.params.code
    }
});

//사업장조회
export const searchWorkPlace = (action) => accountApi.get('/operate/deptlist', {});

//회계기수번호 조회(날짜)
export const searchPeriodNo = () => accountApi.get('/settlement/periodNoList', {});

//부서조회
export const searchDeptList = (action) =>
    accountApi.get('/operate/detaildeptlist', {
        params: {
            workplaceCode: action.params.workplaceCode
        }
    });

//예산신청계정과목조회
export const searchBudget = (action) => accountApi.get('/operate/parentbudgetlist', {});

//예산신청세부계정과목조회
export const searchDetailBudget = (action) =>
    accountApi.get('/operate/detailbudgetlist', {
        params: {
            code: action.params.code
        }
    });

export const searchCurrentBudget = (action) =>
    accountApi.get('/budget/currentbudget', {
        params: {
            deptCode: action.params.deptCode,
            workplaceCode: action.params.workplaceCode,
            accountPeriodNo: action.params.accountPeriodNo,
            accountInnerCode: action.params.accountInnerCode
        }
    });

export const searchPreBudget = (action) =>
    accountApi.get('budget/budget', {
        params: {
            deptCode: action.params.deptCode,
            workplaceCode: action.params.workplaceCode,
            accountPeriodNo: action.params.accountPeriodNo,
            accountInnerCode: action.params.accountInnerCode
        }
    });

export const insertBudget = (action) =>
    accountApi.post('/budget/budgetlist', {
        params: {
            deptCode: action.params.deptCode,
            workplaceCode: action.params.workplaceCode,
            accountPeriodNo: action.params.accountPeriodNo,
            accountInnerCode: action.params.accountInnerCode,
            m1Budget: action.params.m1Budget,
            m2Budget: action.params.m2Budget,
            m3Budget: action.params.m3Budget,
            m4Budget: action.params.m4Budget,
            m5Budget: action.params.m5Budget,
            m6Budget: action.params.m6Budget,
            m7Budget: action.params.m7Budget,
            m8Budget: action.params.m8Budget,
            m9Budget: action.params.m9Budget,
            m10Budget: action.params.m10Budget,
            m11Budget: action.params.m11Budget,
            m12Budget: action.params.m12Budget
        }
    });

export const searchCustomer = (action) =>
    accountApi.get('/operate/customers',{})

export const searchCreditCard = (action) =>
    accountApi.get('/operate/creditCard',{})