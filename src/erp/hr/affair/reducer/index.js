import { combineReducers } from 'redux';
import assign from 'erp/hr/affair/reducer/AssignReducer';
import empDetailFullList from 'erp/hr/affair/reducer/EmpDetailFullReducer';
import employmentManageList from 'erp/hr/affair/reducer/EmploymentManageReducer';
import positionList from 'erp/hr/affair/reducer/PositionReducer';
import empDetailedInfo from 'erp/hr/affair/reducer/EmpDetailedInfoReducer';
import department from 'erp/hr/affair/reducer/DepartmentReducer';

const AffairReducerCombine = combineReducers({
    assign,
    empDetailFullList,
    employmentManageList,
    positionList,
    empDetailedInfo,
    department
});

export default AffairReducerCombine;