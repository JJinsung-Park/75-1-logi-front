import { all } from 'redux-saga/effects';
import dayattd from './DayAttdSaga';
import elastic from './ElasticSaga';
import searchEmploy from './SearchEmploySaga';
import daymonthlist from './DayMonthListSaga';
import rest from './RestSaga';
import appl from './ApplSaga'
import classList from './CorporateEduSaga';
import attendeeList from './EduAttendeeSaga';
import ExcusedAttd from './ExcusedAttdSaga'
import travelAttd from './TravelSaga'

export default function* HrRootSaga() {
    // all 함수는 여러 사가를 합쳐주는 역할을 합니다.
    yield all([dayattd(), elastic(),searchEmploy(),daymonthlist(),rest(),appl(),classList(),attendeeList(),ExcusedAttd(),travelAttd()]);
}
