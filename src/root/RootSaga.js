// --- redux-saga
import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { watchLogInOutSaga } from 'common/saga/commonSaga';
import { watchMenuListSaga } from 'common/saga/commonSaga';
import LogiRootSaga from 'erp/logistic/root/RootSaga';
import HrRootSaga from 'erp/hr/root/RootSaga';
import AccRootSaga from 'erp/account/root/RootSaga';
import { checkAuthoritySaga } from 'common/saga/commonSaga';

function* RootSaga() {
    // all 함수는 여러 사가를 합쳐주는 역할을 합니다.
    yield all([
        checkAuthoritySaga(),
        watchLogInOutSaga(),
        watchMenuListSaga(),
        HrRootSaga(),
        AccRootSaga(),
        LogiRootSaga()
    ]);
}

export default RootSaga;
