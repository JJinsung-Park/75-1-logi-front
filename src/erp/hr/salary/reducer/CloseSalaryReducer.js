import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//*************************  지원 담당  시작********************************** */

export const SALARY_LIST_SUCCESS = 'closesalary/SALARY_LIST_REQUEST_SUCCESS';
export const SALARY_LIST_FAILURE = 'closesalary/SALARY_LIST_REQUEST_FAILURE';


export const CLOSE_SALARY_WITH_SLIP_SUCCESS =
  'closesalary/CLOSE_SALARY_WITH_SLIP_REQUEST_SUCCESS';
export const CLOSE_SALARY_WITH_SLIP_FAILURE =
  'closesalary/CLOSE_SALARY_WITH_SLIP_REQUEST_FAILURE';
//*************************  지원 담당  종료********************************** */


const initialState = {
    salaryList: [],
    errorMsg:"",
    flag: false
  };
  
  const closesalary = (state = initialState, action) => {
    switch (action.type) {
      case SALARY_LIST_SUCCESS:
        return {
          ...state,
          salaryList: action.payload.monthSalary.result
        };
  
      case SALARY_LIST_FAILURE:
        return {
          ...state,
          errorMsg: action.payload
        };
  
      case CLOSE_SALARY_WITH_SLIP_SUCCESS:
        return {
          ...state,
          salaryList: [], //받을게 없지만 일단 넣었다.
          flag: true
        };
  
      case CLOSE_SALARY_WITH_SLIP_FAILURE:
        return {
          ...state,
          errorMsg: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default closesalary;