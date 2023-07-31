import { createAction } from 'redux-actions';

export const EMPDETAILED_INFO_SUCCESS = 'src/erp/hr/Saga/Saga/EMPDETAILED_INFO_REQUEST_SUCCESS';
export const EMPDETAILED_INFO_FAILURE = 'src/erp/hr/Saga/Saga/EMPDETAILED_INFO_REQUEST_FAILURE';

export const EmpDetailedInfoSuccess = createAction(EMPDETAILED_INFO_SUCCESS);
export const EmpDetailedInfoFailure = createAction(EMPDETAILED_INFO_FAILURE);


const initialState = {
    empDetailedInfo: [],
    errorMsg: '',
    error: ''
};

const empDetailedInfo = (state = initialState, action) => {
    switch (action.type) {
        
        case EMPDETAILED_INFO_SUCCESS:
           
            return {
                ...state,
                empDetailedInfo: action.payload.gridRowJson
            };

        case EMPDETAILED_INFO_FAILURE:
            return {
                ...state,
                errorMsg: action.payload
            };
        default:
            return state;
    }
};

export default empDetailedInfo;
