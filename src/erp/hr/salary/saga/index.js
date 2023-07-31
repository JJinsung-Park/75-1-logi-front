import { all } from "redux-saga/effects";
import basesalary from "./BaseSalarySaga";
import closesalary from "./CloseSalarySaga";
//import insure from "./InsureSaga";
import searchmonthsal from "./SearchMonthSalSaga";

export default function* salary() {
    yield all([
        basesalary(),
        closesalary(),
        //insure(),
        searchmonthsal(),
    ]);
}