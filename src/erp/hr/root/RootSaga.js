import { all } from 'redux-saga/effects';
import attdSaga from 'erp/hr/attendance/saga';
import baseSaga from 'erp/hr/base/saga/index';
import SalarySaga from 'erp/hr/salary/saga';
import EmpSaga from 'erp/hr/affair/saga/index';
import dayworkerandsalary from '../dayworker/saga';

export default function* HrRootSaga() {
    // all 함수는 여러 사가를 합쳐주는 역할을 합니다.
    yield all([attdSaga(), baseSaga(), SalarySaga(), EmpSaga(),dayworkerandsalary()]);
}
