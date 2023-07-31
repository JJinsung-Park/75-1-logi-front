import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//************************* 급여 기준 관리 시작 _준혁 *************************
export const BASE_SALARY_LIST_SUCCESS = 'basesalary/BASE_SALARY_LIST_REQUEST_SUCCESS';
export const BASE_SALARY_LIST_FAILURE = 'basesalary/BASE_SALARY_LIST_REQUEST_FAILURE';

export const UPDATE_BASE_SALARY_SUCCESS = 'basesalary/UPDATE_BASE_SALARY_SUCCESS';
export const UPDATE_BASE_SALARY_FAILURE = 'basesalary/UPDATE_BASE_SALARY_FAILURE';

const initialState = {
    salaryList: [],
    baseSalaryList:[]
  };
  
  const basesalary = (state = initialState, action) => {
    switch (action.type) {
      case BASE_SALARY_LIST_SUCCESS:
        return {
          ...state,
          baseSalaryList: action.payload.baseSalaryList
        };
      case BASE_SALARY_LIST_FAILURE:
        return {
          ...state,
          errorMsg: action.payload
        };
      case UPDATE_BASE_SALARY_SUCCESS:
        return {
          ...state
        };
      case UPDATE_BASE_SALARY_FAILURE:
        return {
          ...state,
          errorMsg: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default basesalary;