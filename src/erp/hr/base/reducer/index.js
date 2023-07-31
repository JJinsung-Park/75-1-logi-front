import { combineReducers } from "redux";
import basecode from "erp/hr/base/reducer/BaseCodeReducer";
import baseworktime from "erp/hr/base/reducer/BaseWorkTimeReducer";
import department from "erp/hr/base/reducer/DepartmentReducer";
import holiday from "erp/hr/base/reducer/HolidayReducer";

const base = combineReducers({
  basecode,
  baseworktime,
  department,
  holiday,
});

export default base;
