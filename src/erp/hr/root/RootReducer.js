// --- redux-saga ㅅㄷㄴㅅ
import { combineReducers } from 'redux';
import attendance from 'erp/hr/attendance/reducer';
import base from 'erp/hr/base/reducer';
import salary from 'erp/hr/salary/reducer';
import affair from 'erp/hr/affair/reducer/index';
import dayworkerandsalary from '../dayworker/reducer';

const hr = combineReducers({
    attendance,
    base,
    salary,
    affair,
    dayworkerandsalary
});

export default hr;
