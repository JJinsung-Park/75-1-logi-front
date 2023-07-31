//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//===============================<급여조회>  월급여조회 박미노==========================================================
export const SEARCH_MONTH_SALARY_LIST_REQUEST =
  'searchmonthsal/SEARCH_MONTH_SALARY_LIST_REQUEST';  //리듀서에서 사용한다.
export const SEARCH_MONTH_SALARY_LIST_SUCCESS =
  'searchmonthsal/SEARCH_MONTH_SALARY_LIST_REQUEST_SUCCESS';
export const SEARCH_MONTH_SALARY_LIST_FAILURE =
  'searchmonthsal/SEARCH_MONTH_SALARY_LIST_REQUEST_FAILURE'; 

const initialState = {
  monthSalary: []
};

const searchmonthsal = (state = initialState, action) => {
  switch (action.type) {
    //미노
    // case SEARCH_MONTH_SALARY_LIST_REQUEST:
    //   return {
    //     ...state,
    //     monthSalary: action.data
    //   };
    case SEARCH_MONTH_SALARY_LIST_SUCCESS:
      return {
        ...state,
        monthSalary: action.payload.FullTimeSalaryList
      };
    case SEARCH_MONTH_SALARY_LIST_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };
  
    default:
      return state;
  }
};

export default searchmonthsal;