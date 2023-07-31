import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { AUTHORITY_REQUEST, LOGIN_REQUEST } from '../reducer/commonReducer';
import {
    loginSuccess,
    loginFailure,
    login,
    logout,
    authority,
    authorityFailure,
    authoritySuccess
} from '../reducer/commonReducer';
import { MENU_LIST_REQUEST } from '../reducer/commonReducer';
import { menuAll, menuAccount, menuHr, menuLogi } from '../reducer/commonReducer';
import history from 'util/history';

function* logInOutSaga(action) {
    try {
        if (!!sessionStorage.getItem('id_token')) {
            yield put(logout());
            sessionStorage.clear();
        } else {
            yield put(login());

            const { data } = yield axios.post(`http://localhost:4000/erp/sys/login`, {
                empCode: action.payload.empCode,
                password: action.payload.password,
                companyCode: action.payload.companyCode,
                workplaceCode: action.payload.workplaceCode
            });

            const empInfo = data.empInfo;

            if (!empInfo) {
                yield put(loginFailure(data));
            } else {
                yield put(loginSuccess(empInfo));
                //sessionStorage.clear();
                sessionStorage.setItem('id_token', action.payload.empCode);
                sessionStorage.setItem('pw_token', action.payload.password);
                sessionStorage.setItem('companyCode_token', action.payload.companyCode);
                sessionStorage.setItem('workplaceCode_token', action.payload.workplaceCode);
                sessionStorage.setItem('empNameInfo_token', empInfo.empName);
                sessionStorage.setItem('empCodeInfo_token', empInfo.empCode);
                sessionStorage.setItem('deptCodeInfo_token', empInfo.deptCode);
                sessionStorage.setItem('positionCodeInfo_token', empInfo.positionCode);
                sessionStorage.setItem('businessPlaceCodeInfo_token', empInfo.businessPlaceCode);
                sessionStorage.setItem('authorityCodeInfo_token', empInfo.authorityCode);
                sessionStorage.setItem('workPlace_token', empInfo.workplaceName);
                sessionStorage.setItem('deptNameInfo_token', empInfo.deptName);
                sessionStorage.setItem('authorityLevel_token', empInfo.authorityLevel);
            }
        }
    } catch (error) {
        action.payload.history.put('/error');
    }
}

function* authoritySaga(action) {
    try {
        yield put(authority());

        const { data } = yield axios.post(`http://localhost:4000/erp/sys/auth`, {
            empCode: action.payload.empCode,
            companyCode: action.payload.companyCode,
            workplaceCode: action.payload.workplaceCode
        });

        const empAuthority = data.empAuthority;
        if (!empAuthority) {
            yield put(authorityFailure(data));
        } else {
            yield put(authoritySuccess(empAuthority));
        }
    } catch (error) {
        action.payload.history.put('/error');
    }
}

export function* watchLogInOutSaga() {
    yield takeEvery(LOGIN_REQUEST, logInOutSaga);
}

export function* checkAuthoritySaga() {
    yield takeEvery(AUTHORITY_REQUEST, authoritySaga);
}

function* menuListSaga(action) {
    try {
        const { data } = yield axios.get('http://localhost:8282/sys/findMenuList');
        if (action.payload.authorityCode === 'SYSTEM') {
            yield put(menuAll(data));
        } else if (action.payload.authorityCode === 'ACCOUNT') {
            yield put(menuAccount(data));
        } else if (action.payload.authorityCode === 'HR') {
            yield put(menuHr(data));
        } else if (action.payload.authorityCode === 'LOGI') {
            yield put(menuLogi(data));
        }
    } catch (error) {
        history.put('/error');
    }
}

export function* watchMenuListSaga() {
    yield takeEvery(MENU_LIST_REQUEST, menuListSaga);
}
