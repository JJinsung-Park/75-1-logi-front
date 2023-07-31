/* eslint-disable no-unused-vars */

export const CLASS_LIST_SUCCESS = "CLASS_LIST_REQUEST_SUCCESS";
export const CLASS_LIST_FAILURE = "CLASS_LIST_REQUEST_FAILURE";

export const SELECT_CLASS_SUCCESS = "SELECT_CLASS_REQUEST_SUCCESS";
export const SELECT_CLASS_FAILURE = "SELECT_CLASS_REQUEST_FAILURE";

export const UPDATE_CLASS_SUCCESS = "UPDATE_CLASS_REQUEST_SUCCESS";
export const UPDATE_CLASS_FAILURE = "UPDATE_CLASS_REQUEST_FAILURE";

export const INSERT_CLASS_SUCCESS = "INSERT_CLASS_REQUEST_SUCCESS";
export const INSERT_CLASS_FAILURE = "INSERT_CLASS_REQUEST_FAILURE";

export const DELETE_CLASS_SUCCESS = "DELETE_CLASS_REQUEST_SUCCESS";
export const DELETE_CLASS_FAILURE = "DELETE_CLASS_REQUEST_FAILURE";

const initialState={
    classData:[],
    classList:[],
    errorCode:"",
    errorMsg:""
}

const CorporateEdu=(state=initialState, action)=>{
    switch(action.type){

        case CLASS_LIST_SUCCESS :

            return {
                ...state,
                classList:action.payload.gridRowJson,
            }

        case CLASS_LIST_FAILURE :
            return {
                ...state,
                error: action.error,
            }

        case SELECT_CLASS_SUCCESS :
            return {
                ...state,
            }

        case SELECT_CLASS_FAILURE :
            return {
                ...state,
                error: action.error,
            }

        case UPDATE_CLASS_SUCCESS :
  
            return {
                ...state,
                classList:[]
            }

        case UPDATE_CLASS_FAILURE :
            return {
                ...state,
                error: action.error,
            }
        
        case INSERT_CLASS_SUCCESS :

            return {
                ...state,
                classList:[],
            }

        case INSERT_CLASS_FAILURE :
            return {
                ...state,
                error: action.error,
            }
        
        case DELETE_CLASS_SUCCESS :
  
            return {
                ...state,
                classList:action.payload.gridRowJson
            }

        case DELETE_CLASS_FAILURE :
            return {
                ...state,
                error: action.error,
            }

        default:
            return state;
    }
}

export default CorporateEdu;