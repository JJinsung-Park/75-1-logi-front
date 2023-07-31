//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
export const SEARCH_DAY_WORKER_SALARY_SELECT_TYPE = 'dayworkersalary/SEARCH_DAY_WORKER_SALARY_SELECT_TYPE';
//*************************  일용직 급여관리 조회 최예솔_211226********************************** */
export const SEARCH_DAY_WORKER_SALARY_SELECT_SUCCESS = 'dayworker/SEARCH_DAY_WORKER_SALARY_SELECT_SUCCESS';
export const SEARCH_DAY_WORKER_SALARY_SELECT_FAILURE = 'dayworker/SEARCH_DAY_WORKER_SALARY_SELECT_FAILURE';
//*************************  일용직 급여관리 조회 종료********************************** */


const initialState = {
    dayworkerSalaryData: [],
    errorMsg: '',
    errorCode: ''
};

const dayworkersalary = (state = initialState, action) => {
    switch (action.type) {
        //**********일용직 급여관리 조회 시작 최예솔 2021-12-26*******************************************
        case SEARCH_DAY_WORKER_SALARY_SELECT_SUCCESS:
  
            return {
                ...state,
                dayworkerSalaryData: action.payload.dayWorkerSalary  
            }

        default:
            return state;
    }
};

export default dayworkersalary;