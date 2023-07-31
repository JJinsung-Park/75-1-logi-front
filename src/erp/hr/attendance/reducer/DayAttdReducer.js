import { createAction } from 'redux-actions';
import createRequestSaga from 'util/createRequestSaga';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최락창@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// createRequestSaga.js를 거친다음에 
// action.type = loading/FINISH_LOADING
// action.payload = dayattd/SELECT_DAY_ATTD_START


//*********************************일근태 crud***************************/
export const INSERT_DAY_ATTD_SUCCESS = 'dayattd/INSERT_DAY_ATTD_START_SUCCESS';
export const INSERT_DAY_ATTD_FAILURE = 'dayattd/INSERT_DAY_ATTD_START_FAILURE';
export const SELECT_DAY_ATTD_SUCCESS = 'dayattd/SELECT_DAY_ATTD_START_SUCCESS';
export const SELECT_DAY_ATTD_FAILURE = 'dayattd/SELECT_DAY_ATTD_START_FAILURE';
export const DELETE_DAY_ATTD_FAILURE = 'dayattd/DELETE_DAY_ATTD_START_FAILURE';

// export const SELECT_DAY_ATTD_START = 'dayattd/SELECT_DAY_ATTD_START';

const initialState = {
    attdData: [],
    errorMsg: '',
    errorCode: '',
 
};

const dayattd = (state = initialState, action) => {

    switch (action.type) {
        case INSERT_DAY_ATTD_SUCCESS:
            return {
                ...state,
                attdData: []
            };
        case INSERT_DAY_ATTD_FAILURE:
            return {
                ...state
            };
        // case SELECT_DAY_ATTD_START:

        //     return {
        //         ...state,
        //         attdData: action.payload
        //     };

        case SELECT_DAY_ATTD_SUCCESS:

            return {
                ...state,
                attdData: action.payload
            };
            
        case SELECT_DAY_ATTD_FAILURE:
            return {
                ...state
            };
        case DELETE_DAY_ATTD_FAILURE:
            return {
                ...state,
                errorMsg: action.payload
            };
        default:
           return state;
            }
        };
       
export default dayattd;