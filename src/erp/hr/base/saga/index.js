import { all } from "redux-saga/effects";
import baseworktime from "./BaseWorkTimeSaga";
import department from "./DepartmentSaga";
import holiday from "./HolidaySaga";
import basecode from "./BaseCodeSaga";

export default function* baseSaga() {
    yield all([
        basecode(),
        baseworktime(),
        department(),
        holiday(),
    ]);
}