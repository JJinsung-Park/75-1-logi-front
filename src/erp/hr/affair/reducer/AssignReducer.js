import { createAction } from 'redux-actions';

// ************************ 발령  **********************
export const SEARCH_EMP_ASSIGN_SUCCESS = 'src/erp/hr/Saga/Saga/SEARCH_EMP_ASSIGN_REQUEST_SUCCESS';
export const SEARCH_EMP_ASSIGN_FAILURE = 'src/erp/hr/Saga/Saga/SEARCH_EMP_ASSIGN_REQUEST_FAILURE';

export const searchEmpAssignListSuccess = createAction(SEARCH_EMP_ASSIGN_SUCCESS);
export const searchEmpAssignListFailure = createAction(SEARCH_EMP_ASSIGN_FAILURE);

const initialState = {
    assign: [],
    error: ''
};

const assign = (state = initialState, action) => {
    switch (action.type) {
        // ================================= 발령
        case SEARCH_EMP_ASSIGN_SUCCESS:
            return {
                ...state,
                assign: action.payload.assignList
            };

        case SEARCH_EMP_ASSIGN_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
};

export default assign;
