//@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import { combineReducers } from 'redux';
import dayworker from './DayWorkerReducer';
import dayworkersalary from './DayWorkerSalaryReducer';

const dayworkerandsalary = combineReducers({
    dayworker,
    dayworkersalary
});

export default dayworkerandsalary;
