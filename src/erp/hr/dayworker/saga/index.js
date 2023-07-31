import { all } from "redux-saga/effects";
import dayworker from "./DayWorkerSaga";
import dayworkersalary from "./DayWorkerSalarySaga";


export default function* dayworkerandsalary() {
    yield all([
        dayworker(),
        dayworkersalary(),
    ]);
}