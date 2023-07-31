import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최락창@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// createRequestSaga.js를 거친다음에 
// action.type = loading/FINISH_LOADING
// action.payload = travel/SELECT_TRAVEL_START


//*********************************일근태 crud***************************/
export const INSERT_TRAVEL_SUCCESS = 'travel/INSERT_TRAVEL_START_SUCCESS';
export const INSERT_TRAVEL_FAILURE = 'travel/INSERT_TRAVEL_START_FAILURE';
export const SELECT_TRAVEL_SUCCESS = 'travel/SELECT_TRAVEL_START_SUCCESS';
export const SELECT_TRAVEL_FAILURE = 'travel/SELECT_TRAVEL_START_FAILURE';
export const DELETE_TRAVEL_FAILURE = 'travel/DELETE_TRAVEL_START_FAILURE';

// export const SELECT_TRAVEL_START = 'travel/SELECT_TRAVEL_START';

const initialState = {
    restAttdList: [],
    errorMsg: '',
    errorCode: '',
};

const travel = (state = initialState, action) => {


    switch (action.type) {
        case INSERT_TRAVEL_SUCCESS:
            return {
                ...state,
                attdData: []
            };
        case INSERT_TRAVEL_FAILURE:
            return {
                ...state
            };

        case SELECT_TRAVEL_SUCCESS:
            return {
                ...state,
                attdData: action.payload
            };
            
        case SELECT_TRAVEL_FAILURE:
            return {
                ...state
            };
        case DELETE_TRAVEL_FAILURE:
            return {
                ...state,
                errorMsg: action.payload
            };
        default:
           return state;
            }
        };
       
export default travel;