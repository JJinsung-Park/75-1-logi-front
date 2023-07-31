import { createAction } from 'redux-actions';
import _ from 'lodash'; // https://lodash.com/docs/4.17.15 확인하자 라이브러리

export const START_PROJECT = 'common/dashboard/reducer_startPrj';
export const END_PROJECT = 'common/dashboard/reducer_endPrj';

export const startProjcet = createAction(START_PROJECT);
export const endProject = createAction(END_PROJECT);

const initialState = {
    startPrj: sessionStorage.getItem('dashboard_off'),
    status: 'INIT',
    empInfo: [],
    isLogin: false,
    errorCode: '',
    errorMsg: '',
    isAuthenticated: !!sessionStorage.getItem('id_token'), // 타입 맞춰 주려고 사용하는 문법 !! 불리언 값이 됨 ]
    currentMenuName: '',
    isSidebarOpened: true
};

const authInitialState = {
    status: 'INIT',
    empAuthority: [],
    errorCode: '',
    errorMsg: ''
};
export const AUTHORITY = 'AUTHORITY';
export const AUTHORITY_REQUEST = 'AUTHORITY_REQUEST';
export const AUTHORITY_SUCCESS = 'AUTHORITY_SUCCESS';
export const AUTHORITY_FAILURE = 'AUTHORITY_FAILURE';

//로그인
export const LOGIN = 'LOGIN'; //stuas
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'; // isLogin, empinfo
export const LOGIN_FAILURE = 'LOGIN_FAILURE'; // 에러
export const LOGOUT = 'LOGOUT'; //// isLoin, stus, empinf 리셋

export const RELOGIN_SUCCESS = 'RELOGIN_SUCCESS'; // 새로고침시 세션저장정보 값 활용하여 자동 재로그인

//import * as api  from 'api/loginApi';

//import axios from 'axios';

//액션 생성 함수
export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);

export const logInOutRequest = createAction(LOGIN_REQUEST);
export const authorityRequest = createAction(AUTHORITY_REQUEST);
export const authority = createAction(AUTHORITY);

export const authoritySuccess = empAuthority => ({
    type: AUTHORITY_SUCCESS,
    empAuthority
});

export const authorityFailure = error => ({
    type: AUTHORITY_FAILURE,
    error
});

export const reLoginSuccess = () => ({
    type: RELOGIN_SUCCESS
});

export const loginSuccess = empInfo => ({
    type: LOGIN_SUCCESS,
    empInfo
});

export const loginFailure = error => ({
    type: LOGIN_FAILURE,
    error
});

const reEmpinfo = {
    empId: sessionStorage.getItem('id_token'),
    password: sessionStorage.getItem('pw_token'),
    empName: sessionStorage.getItem('empNameInfo_token'),
    empCode: sessionStorage.getItem('empCodeInfo_token'),
    deptCode: sessionStorage.getItem('deptCodeInfo_token'),
    positionCode: sessionStorage.getItem('positionCodeInfo_token'),
    businessPlaceCode: sessionStorage.getItem('businessPlaceCodeInfo_token'),
    authorityCode: sessionStorage.getItem('authorityCodeInfo_token'),
    deptName: sessionStorage.getItem('deptNameInfo_token'),
    authorityLevel: sessionStorage.getItem('authorityLevel_token')
};

//menu
export const MENU_ALL_LIST = 'MENU_ALL_LIST';
export const MENU_HR_LIST = 'MENU_HR_LIST';
export const MENU_LOGI_LIST = 'MENU_LOGI_LIST';
export const MENU_ACCOUNT_LIST = 'MENU_ACCOUNT_LIST';
export const MENU_LIST_REQUEST = 'MENU_LIST_REQUEST';
//import * as api  from 'api/loginApi';

//import axios from 'axios';

//액션 생성 함수

export const menuListRequest = createAction(MENU_LIST_REQUEST);
/*
    const menuListRequest = () => {
        return {
            type : MENU_LIST_REQUEST
            payload :
        }
    }
*/

export const menuAll = menuList => ({
    type: MENU_ALL_LIST,
    menuList
});

export const menuAccount = menuList => ({
    type: MENU_ACCOUNT_LIST,
    menuList
});

export const menuHr = menuList => ({
    type: MENU_HR_LIST,
    menuList
});

export const menuLogi = menuList => ({
    type: MENU_LOGI_LIST,
    menuList
});

//Sidebar
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const Auth = (state = authInitialState, action) => {
    switch (action.type) {
        case AUTHORITY:
            return {
                ...state,
                status: 'WAITING'
            };
        case AUTHORITY_SUCCESS:
            return {
                ...state,
                empAuthority: action.empAuthority,
                status: 'SUCCESS'
            };
        case AUTHORITY_FAILURE:
            return {
                ...state,
                status: 'FAILURE',
                errorCode: action.error.errorCode,
                errorMsg: action.error.errorMsg
            };
        default:
            return state;
    }
};

export const dashReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_PROJECT:
            sessionStorage.setItem('dashboard_off', true);
            return {
                ...state,
                startPrj: sessionStorage.getItem('dashboard_off')
            };
        case END_PROJECT:
            sessionStorage.setItem('dashboard_off', false);
            return {
                ...state,
                startPrj: sessionStorage.getItem('dashboard_off')
            };
        default:
            return state;
    }
};

export const logInOutReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                status: 'WAITING'
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                status: 'SUCCESS',
                empInfo: action.empInfo,
                isLogin: true,
                isAuthenticated: true
            };

        case RELOGIN_SUCCESS:
            return {
                ...state,
                status: 'SUCCESS',
                empInfo: reEmpinfo,
                isLogin: true,
                isAuthenticated: true
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                status: 'FAILURE',
                errorCode: action.error.errorCode,
                errorMsg: action.error.errorMsg
            };

        case LOGOUT:
            return {
                ...state,
                status: 'INIT',
                isLogin: false,
                empInfo: '',
                errorCode: '',
                errorMsg: '',
                isAuthenticated: false
            };

        default:
            return state;
    }
};

export const menuListReducer = (state = initialState, action) => {
    switch (action.type) {
        case MENU_ALL_LIST:
            return {
                ...state,
                menuList: action.menuList
            };
        case MENU_HR_LIST:
            return {
                ...state,
                menuList: [_.mapKeys(action.menuList, 'menuCode').HR00]
            };
        case MENU_ACCOUNT_LIST:
            return {
                ...state,
                menuList: [_.mapKeys(action.menuList, 'menuCode').ACC00]
            };
        case MENU_LOGI_LIST:
            return {
                ...state,
                menuList: [_.mapKeys(action.menuList, 'menuCode').LOGI00]
            };
        default:
            return state;
    }
};

export const sideBarReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                isSidebarOpened: !state.isSidebarOpened
            };
        default:
            return state;
    }
};
