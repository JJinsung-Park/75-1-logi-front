import { createAction } from "redux-actions";

export const HOLIDAY_LIST_SUCCESS = "src/erp/hr/Saga/Saga/HOLIDAY_LIST_REQUEST_SUCCESS";
export const HOLIDAY_LIST_FAILURE = "src/erp/hr/Saga/Saga/HOLIDAY_LIST_REQUEST_FAILURE";

export const UPDATE_HOLIDAY_SUCCESS = "src/erp/hr/Saga/Saga/UPDATE_HOLIDAY_REQUEST_SUCCESS";
export const UPDATE_HOLIDAY_FAILURE = "src/erp/hr/Saga/Saga/UPDATE_HOLIDAY_REQUEST_FAILURE";

const initialState={
    holidayList:[],
    errorCode:"",
    errorMsg:"",
}

const holiday=(state=initialState, action)=>{
    switch(action.type){
        case HOLIDAY_LIST_SUCCESS :

        return {
            ...state,
            holidayList:action.payload.holidayList,
        }
        case HOLIDAY_LIST_FAILURE :
        return {
            ...state,
            error: action.error,
        }
        case UPDATE_HOLIDAY_SUCCESS :
        return {
            ...state,
        }
        case UPDATE_HOLIDAY_FAILURE :
        return {
            ...state,
            error: action.error,
        }
        default:
            return state;
    }
}

export default holiday;