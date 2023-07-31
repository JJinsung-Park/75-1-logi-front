import { all } from 'redux-saga/effects';
import assign from 'erp/hr/affair/saga/AssignSaga';
import empinfo from 'erp/hr/affair/saga/EmpInfoSaga';
import employmentmanage from 'erp/hr/affair/saga/EmploymentManageSaga';
import empregister from 'erp/hr/affair/saga/EmpRegisterSaga'
import position from 'erp/hr/affair/saga/PositionSaga'

export default function* affairSaga() {
    // all 함수는 여러 사가를 합쳐주는 역할을 합니다.
    yield all([assign(), empinfo(), employmentmanage(), empregister(), position()]);
}
