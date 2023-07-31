import { createAction } from 'redux-actions';

//*************************  유주 담당  시작********************************** */
export const POSITION_LIST_SUCCESS = 'src/erp/hr/Saga/Saga/POSITION_LIST_REQUEST_SUCCESS';
export const POSITION_LIST_FAILURE = 'src/erp/hr/Saga/Saga/POSITION_LIST_REQUEST_FAILURE';


//*************************  유주 담당  시작********************************** */
export const PositionListSuccess = createAction(POSITION_LIST_SUCCESS);
export const PositionListFailure = createAction(POSITION_LIST_FAILURE);

const initialState = {
    positionList: [],
    errorMsg: '',
    error: ''
};

const positionList = (state = initialState, action) => {
    switch (action.type) {
        case POSITION_LIST_SUCCESS:
            
            return {
                ...state,
                positionList: action.payload.gridRowJson
            };

        case POSITION_LIST_FAILURE:
            return {
                ...state,
                errorMsg: action.payload
            };
        default:
            return state;
    }
};

export default positionList;
