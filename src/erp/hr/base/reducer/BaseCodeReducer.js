import { createAction } from "redux-actions";

export const SEARCH_CODE = "src/erp/hr/Saga/Saga/SEARCH_CODE";
export const SEARCH_COMPANY_CODE ="src/erp/hr/Saga/Saga/SEARCH_COMPANY_CODE";
export const SEARCH_WORKPLACE_CODE = "src/erp/hr/Saga/Saga/SEARCH_WORKPLACE_CODE";

export const searchCode = createAction(SEARCH_CODE);
export const searchCompanyCode = createAction(SEARCH_COMPANY_CODE);
export const searchWorkplaceCode = createAction(SEARCH_WORKPLACE_CODE);

const initialState = {
  company: [],
  workplace:[],
  errorCode: "",
  errorMsg:"",
};

const basecode = (state = initialState, action) => {

  switch (action.type) {
    
    case SEARCH_COMPANY_CODE:
      return {
        ...state,
        company: action.payload,
      };

    case SEARCH_WORKPLACE_CODE:
      return {
        ...state,
        workplace: action.payload,
      };

    // case SEARCH_WORKPLACE_CODE:
    //   return {
    //     ...state,
    //     workplace: action.payload,
    //   };
      
    default:
      return state;
    }
}

export default basecode;