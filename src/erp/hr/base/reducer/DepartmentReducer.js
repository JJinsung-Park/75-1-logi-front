import { createAction } from 'redux-actions';

export const DEPT_MANAGER_SUCCESS = 'src/erp/hr/Saga/Saga/DEPT_MANAGER_SUCCESS';
export const DEPT_MANAGER_FAILURE = 'src/erp/hr/Saga/Saga/DEPT_MANAGER_FAILURE';

export const UPDATE_DEPARTMENT_SUCCESS = 'src/erp/hr/Saga/Saga/UPDATE_DEPARTMENT_SUCCESS';
export const UPDATE_DEPARTMENT_FAILURE = 'src/erp/hr/Saga/Saga/UPDATE_DEPARTMENT_FAILURE';

export const DEPT_MEMBER_SUCCESS = 'src/erp/hr/Saga/Saga/DEPT_MEMBER_SUCCESS';
export const DEPT_MEMBER_FAILURE = 'src/erp/hr/Saga/Saga/DEPT_MEMBER_FAILURE';

const initialState = {
    memberList: [],
    list: [],
    errorCode: "",
    errorMsg: "",
};

const department = (state = initialState, action) => {
    switch (action.type) {
        case DEPT_MANAGER_SUCCESS:

            return {
                ...state,
                list: action.payload.list
            };

        case DEPT_MANAGER_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state
            };
        case UPDATE_DEPARTMENT_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case DEPT_MEMBER_SUCCESS:
   
            return {
                ...state,
                memberList: action.payload.list
            };

        case DEPT_MEMBER_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
};

export default department;
