import { createAction } from 'redux-actions';

//사원등록
export const SEARCH_DIVISION_CODE_SUCCESS =
    'src/erp/hr/Saga/Saga/SEARCH_DIVISION_CODE_REQUEST_SUCCESS';
export const SEARCH_DIVISION_CODE_FAILURE =
    'src/erp/hr/Saga/Saga/SEARCH_DIVISION_CODE_REQUEST_FAILURE';
//사원추가
export const EMP_REGISTER_SUCCESS = 'src/erp/hr/Saga/Saga/EMP_REGISTER_REQUEST_SUCCESS';
export const EMP_REGISTER_FAILURE = 'src/erp/hr/Saga/Saga/EMP_REGISTER_REQUEST_FAILURE';
//사원정보수정
export const EMP_UPDATE_SUCCESS = 'src/erp/hr/Saga/Saga/EMP_UPDATE_REQUEST_SUCCESS';
export const EMP_UPDATE_FAILURE = 'src/erp/hr/Saga/Saga/EMP_UPDATE_REQUEST_FAILURE';

//사원등록
export const searchDivisionCodeSuccess = createAction(SEARCH_DIVISION_CODE_SUCCESS);
export const searchDivisionCodeFailure = createAction(SEARCH_DIVISION_CODE_FAILURE);
//사원추가
export const EmpResisterSuccess = createAction(EMP_REGISTER_SUCCESS);
export const EmpResisterFailure = createAction(EMP_REGISTER_FAILURE);
//사원정보수정
export const EmpUpdateSuccess = createAction(EMP_UPDATE_SUCCESS);
export const EmpUpdateFailure = createAction(EMP_UPDATE_FAILURE);


const initialState = {
    departmentList: [],
    error: ''
};

const departmentList = (state = initialState, action) => {
    switch (action.type) {
        //사원등록
        case EMP_REGISTER_SUCCESS:
            
            return {
                ...state
            };
        case EMP_REGISTER_FAILURE:
            return {
                ...state
            };

        //사원 수정
        case EMP_UPDATE_SUCCESS:
            return {
                ...state
            };
        case EMP_UPDATE_FAILURE:
            return {
                ...state
            };

        case SEARCH_DIVISION_CODE_SUCCESS:
            return {
                ...state,
                departmentList: action.payload.gridRowJson
            };
        case SEARCH_DIVISION_CODE_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state;
    }
};

export default departmentList;
