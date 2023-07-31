import { createAction } from 'redux-actions';

//*************************  유주 담당  시작********************************** */
export const POSITION_LIST_SUCCESS = 'src/erp/hr/Saga/Saga/POSITION_LIST_REQUEST_SUCCESS';
export const POSITION_LIST_FAILURE = 'src/erp/hr/Saga/Saga/POSITION_LIST_REQUEST_FAILURE';

export const EMPDETAILED_INFO_SUCCESS = 'src/erp/hr/Saga/Saga/EMPDETAILED_INFO_REQUEST_SUCCESS';
export const EMPDETAILED_INFO_FAILURE = 'src/erp/hr/Saga/Saga/EMPDETAILED_INFO_REQUEST_FAILURE';

export const EMP_UPDATE_REQUEST = 'src/erp/hr/Saga/Saga/EMP_UPDATE_REQUEST';  //리듀서에서도 사용한다.
export const EMP_UPDATE_SUCCESS = 'src/erp/hr/Saga/Saga/EMP_UPDATE_REQUEST_SUCCESS';
export const EMP_UPDATE_FAILURE = 'src/erp/hr/Saga/Saga/EMP_UPDATE_REQUEST_FAILURE';

//*************************  유주 담당  종료********************************** */

// ************************ 발령 타입 시작 **********************
export const SEARCH_EMP_ASSIGN_SUCCESS = 'src/erp/hr/Saga/Saga/SEARCH_EMP_ASSIGN_REQUEST_SUCCESS';
export const SEARCH_EMP_ASSIGN_FAILURE = 'src/erp/hr/Saga/Saga/SEARCH_EMP_ASSIGN_REQUEST_FAILURE';

// ************************ 발령 타입 종료 ************************

//============================== 사원 등록 성훈 시작===============================================//
// 부서번호 호출
export const SEARCH_DIVISION_CODE_REQUEST = 'src/erp/hr/Saga/Saga/SEARCH_DIVISION_CODE_REQUEST';
//리듀서에서 사용
export const SEARCH_DIVISION_CODE_SUCCESS =
    'src/erp/hr/Saga/Saga/SEARCH_DIVISION_CODE_REQUEST_SUCCESS';
export const SEARCH_DIVISION_CODE_FAILURE =
    'src/erp/hr/Saga/Saga/SEARCH_DIVISION_CODE_REQUEST_FAILURE';

//사원 추가
export const EMP_REGISTER_REQUEST = 'src/erp/hr/Saga/Saga/EMP_REGISTER_REQUEST'; //리듀서에서 사용
export const EMP_REGISTER_SUCCESS = 'src/erp/hr/Saga/Saga/EMP_REGISTER_REQUEST_SUCCESS';
export const EMP_REGISTER_FAILURE = 'src/erp/hr/Saga/Saga/EMP_REGISTER_REQUEST_FAILURE';

//============================== 사원 등록 성훈 종료===============================================//
export const EmpResisterRequest = createAction(EMP_REGISTER_REQUEST);
export const EmpResisterSuccess = createAction(EMP_REGISTER_SUCCESS);
export const EmpResisterFailure = createAction(EMP_REGISTER_FAILURE);

//*************************  유주 담당  시작********************************** */
export const PositionListSuccess = createAction(POSITION_LIST_SUCCESS);
export const PositionListFailure = createAction(POSITION_LIST_FAILURE);

export const EmpDetailedInfoSuccess = createAction(EMPDETAILED_INFO_SUCCESS);
export const EmpDetailedInfoFailure = createAction(EMPDETAILED_INFO_FAILURE);

export const EmpUpdateRequest = createAction(EMP_UPDATE_REQUEST); // 유주 사원정보 수정(진행중)
export const EmpUpdateSuccess = createAction(EMP_UPDATE_SUCCESS);
export const EmpUpdateFailure = createAction(EMP_UPDATE_FAILURE);

//*************************  유주 담당  종료 ********************************** */

//************************* 재직증명  관리 시작 동욱 **************************

export const SEARCH_EMPLOYMENT_MANAGE_SUCCESS =
    'src/erp/hr/Saga/Saga/SEARCH_EMPLOYMENT_MANAGE_REQUEST_SUCCESS';
export const SEARCH_EMPLOYMENT_MANAGE_FAILURE =
    'src/erp/hr/Saga/Saga/SEARCH_EMPLOYMENT_MANAGE_REQUEST_FAILURE';


export const UPDATE_EMPLOYMENT_MANAGE_SUCCESS =
    'src/erp/hr/Saga/Saga/UPDATE_EMPLOYMENT_MANAGE_REQUEST_SUCCESS';
export const UPDATE_EMPLOYMENT_MANAGE_FAILURE =
    'src/erp/hr/Saga/Saga/UPDATE_EMPLOYMENT_MANAGE_REQUEST_FAILURE';

//************************* 재직증명  관리 종료 동욱 **************************

//*************************  재직증명관리 시작 동욱_201120********************************** */
export const searchEmploymentManageSuccess = createAction(SEARCH_EMPLOYMENT_MANAGE_SUCCESS);
export const searchEmploymentManageFailure = createAction(SEARCH_EMPLOYMENT_MANAGE_FAILURE);

export const updateEmploymentManageSuccess = createAction(UPDATE_EMPLOYMENT_MANAGE_SUCCESS);
export const updateEmploymentManageFailure = createAction(UPDATE_EMPLOYMENT_MANAGE_FAILURE);
//*************************  재직증명관리 종료********************************** */

//************************* 시원코드조회 시작 은비 **************************
export const SELECT_EMPDETAILFULLLIST = 'src/erp/hr/Reducer/HR_Reducer/SELECT_EMPDETAILFULLLIST';
//************************* 시원코드조회 종료 은비 **************************

//*************************  사원조회 시작 은비_201206********************************** */
export const selectEmpDeailFullList = createAction(SELECT_EMPDETAILFULLLIST);
//*************************  사원조회 종료********************************** */

// ================================================ 발령 시작

export const searchEmpAssignListSuccess = createAction(SEARCH_EMP_ASSIGN_SUCCESS);
export const searchEmpAssignListFailure = createAction(SEARCH_EMP_ASSIGN_FAILURE);

// ================================================ 발령 종료

const initialState = {
    salaryList: [], // x
    monthSalary: [], // x
    empDetailFullList: [],
    EmploymentManageList: [],
    positionList: [],
    errorMsg: '',
    empDetailedInfo: [],
    workplaceCode: [], // x
    departmentList: [],
    error: '',
    assign: []
};

const affair = (state = initialState, action) => {
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

        //사원등록
        case EMP_REGISTER_REQUEST:
            
            return {
                ...state
            };
        case EMP_REGISTER_SUCCESS:
            return {
                ...state
            };
        case EMP_REGISTER_FAILURE:
            return {
                ...state
            };

        //사원 수정
        case EMP_UPDATE_REQUEST:
            return {
                ...state
            };
        case EMP_UPDATE_SUCCESS:
            return {
                ...state
            };
        case EMP_UPDATE_FAILURE:
            return {
                ...state
            };
        //======================사원등록  성훈종료==========================================//

        //======================사원등록  성훈시작==========================================//
        case SEARCH_DIVISION_CODE_REQUEST:
            return {
                ...state,
                workplaceCode: action.workplaceCode
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

        //************************* 재직증명서관리 시작 동욱 20-11-20 *************************
        case SEARCH_EMPLOYMENT_MANAGE_SUCCESS:
            
            return {
                ...state,
                EmploymentManageList: action.payload.certificateList
            };
        case UPDATE_EMPLOYMENT_MANAGE_SUCCESS:
            
            return {
                ...state,
                EmploymentManageList: action.payload.certificateList
            };
        case SEARCH_EMPLOYMENT_MANAGE_FAILURE:
            return {
                ...state,
                error: action.error
            };
        //************************* 재직증명서관리 종료 동욱 20-11-20 *************************

        //************************* 사원정보조회 시작 은비 20-12-06 *************************

        case SELECT_EMPDETAILFULLLIST:
            return {
                ...state,
                empDetailFullList: action.payload.select
            };

        //************************* 사원정보조회 종료 은비 20-12-06 *************************

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

        // ================================= 발령
        default:
            return state;
    }
};

export default affair;
