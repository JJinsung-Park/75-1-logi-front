import { all , fork } from "redux-saga/effects";
import AccountSaga from "erp/account/account/saga/AccountSaga";
import StatementSaga from "erp/account/statement/saga/StatementSaga";
import BaseSaga from "erp/account/base/saga/BaseSaga";

export default function* AccRootSaga() {
    yield all([
        fork(AccountSaga),
        fork(StatementSaga),
        fork(BaseSaga)
    ]);
}