//@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import { combineReducers } from 'redux';
import dayattd from './DayAttdReducer';
import elastic from './ElasticReducer';
import rest from './RestReducer';
import searchEmployment from './SearchEmployReducer';
import daymonthlist from './DayMonthListReducer';
import appl from './ApplReducer';
import CorporateEdu from './CorporateEduReducer';
import EduAttendee from './EduAttendeeReducer';
import excusedAttd from './ExcusedAttdReducer';
import travel from './TravelReducer';

const attendance = combineReducers({
    dayattd,
    daymonthlist,
    elastic,
    rest,
    searchEmployment,
    appl,
    CorporateEdu,
    EduAttendee,
    excusedAttd,
    travel,
});

export default attendance;
