import { combineReducers } from "redux";
import basesalary from "./BaseSalaryReducer";
import searchmonthsal from "./SearchMonthSalReducer";
import closesalary from "./CloseSalaryReducer";
import insure from "./InsureReducer";

const salary = combineReducers({
    basesalary,
    searchmonthsal,
    closesalary,
    insure
});

export default salary;
