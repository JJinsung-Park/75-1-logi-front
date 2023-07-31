/* eslint-disable no-unused-vars */

export const CLASS_BRIEF_SUCCESS = "CLASS_BRIEF_REQUEST_SUCCESS";
export const CLASS_BRIEF_FAILURE = "CLASS_BRIEF_REQUEST_FAILURE";

export const ATTENDEE_LIST_SUCCESS = "ATTENDEE_LIST_REQUEST_SUCCESS";
export const ATTENDEE_LIST_FAILURE = "ATTENDEE_LIST_REQUEST_FAILURE";

export const SELECT_ATTENDEE_SUCCESS = "SELECT_ATTENDEE_REQUEST_SUCCESS";
export const SELECT_ATTENDEE_FAILURE = "SELECT_ATTENDEE_REQUEST_FAILURE";

export const UPDATE_ATTENDEE_SUCCESS = "UPDATE_ATTENDEE_REQUEST_SUCCESS";
export const UPDATE_ATTENDEE_FAILURE = "UPDATE_ATTENDEE_REQUEST_FAILURE";

export const INSERT_ATTENDEE_SUCCESS = "INSERT_ATTENDEE_REQUEST_SUCCESS";
export const INSERT_ATTENDEE_FAILURE = "INSERT_ATTENDEE_REQUEST_FAILURE";

export const DELETE_ATTENDEE_SUCCESS = "DELETE_ATTENDEE_REQUEST_SUCCESS";
export const DELETE_ATTENDEE_FAILURE = "DELETE_ATTENDEE_REQUEST_FAILURE";

const initialState={
    attendeeData:[],
    attendeeList:[],
    classList:[],
    errorCode:"",
    errorMsg:""
}


const EduAttendee=(state=initialState, action)=>{
    switch(action.type){
        case CLASS_BRIEF_SUCCESS :

            return {
                ...state,
                classList:action.payload.gridRowJson,
            }

        case CLASS_BRIEF_FAILURE :
            return {
                ...state,
                error: action.error,
            }

        case ATTENDEE_LIST_SUCCESS :
 
            return {
                ...state,
                attendeeList:action.payload.gridRowJson,
            }

        case ATTENDEE_LIST_FAILURE :
            return {
                ...state,
                error: action.error,
            }

        case SELECT_ATTENDEE_SUCCESS :
            return {
                ...state,
            }

        case SELECT_ATTENDEE_FAILURE :
            return {
                ...state,
                error: action.error,
            }

        case UPDATE_ATTENDEE_SUCCESS :

            return {
                ...state,
                ATTENDEEList:[]
            }

        case UPDATE_ATTENDEE_FAILURE :
            return {
                ...state,
                error: action.error,
            }
        
        case INSERT_ATTENDEE_SUCCESS :
 
            return {
                ...state,
                ATTENDEEList:[],
            }

        case INSERT_ATTENDEE_FAILURE :
            return {
                ...state,
                error: action.error,
            }
        
        case DELETE_ATTENDEE_SUCCESS :

            return {
                ...state,
                attendeeList:action.payload.gridRowJson
            }

        case DELETE_ATTENDEE_FAILURE :
            return {
                ...state,
                error: action.error,
            }

        default:
            return state;
    }
}

export default EduAttendee;