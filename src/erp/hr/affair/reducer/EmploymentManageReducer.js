import { createAction } from 'redux-actions';

//*************************  재직증명관리 **********************************/

export const SEARCH_EMPLOYMENT_MANAGE_SUCCESS =
    'src/erp/hr/Saga/Saga/SEARCH_EMPLOYMENT_MANAGE_REQUEST_SUCCESS';
export const SEARCH_EMPLOYMENT_MANAGE_FAILURE =
    'src/erp/hr/Saga/Saga/SEARCH_EMPLOYMENT_MANAGE_REQUEST_FAILURE';

export const UPDATE_EMPLOYMENT_MANAGE_SUCCESS =
    'src/erp/hr/Saga/Saga/UPDATE_EMPLOYMENT_MANAGE_REQUEST_SUCCESS';
export const UPDATE_EMPLOYMENT_MANAGE_FAILURE =
    'src/erp/hr/Saga/Saga/UPDATE_EMPLOYMENT_MANAGE_REQUEST_FAILURE';


export const searchEmploymentManageSuccess = createAction(SEARCH_EMPLOYMENT_MANAGE_SUCCESS);
export const searchEmploymentManageFailure = createAction(SEARCH_EMPLOYMENT_MANAGE_FAILURE);

export const updateEmploymentManageSuccess = createAction(UPDATE_EMPLOYMENT_MANAGE_SUCCESS);
export const updateEmploymentManageFailure = createAction(UPDATE_EMPLOYMENT_MANAGE_FAILURE);

const initialState = {
    employmentManageList: [],
    error: ''
};

const employmentManage = (state = initialState, action) => {
    switch (action.type) {
        //*************************  재직증명관리 **********************************/
        case SEARCH_EMPLOYMENT_MANAGE_SUCCESS:
            
            return {
                ...state,
                employmentManageList: action.payload.certificateList
            };
        case UPDATE_EMPLOYMENT_MANAGE_SUCCESS:
            
            return {
                ...state,
                employmentManageList: action.payload.certificateList
            };
        case SEARCH_EMPLOYMENT_MANAGE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
};

export default employmentManage;
