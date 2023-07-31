import { combineReducers } from "redux";
import AccountReducer from "erp/account/account/reducer/AccountReducer";
import StatementReducer from "erp/account/statement/reducer/StatementReducer";
import BaseReducer from "erp/account/base/reducer/BaseReducer";

const AccReducer = combineReducers({
    AccountReducer,
    StatementReducer,
    BaseReducer
});
export default AccReducer;
//********************************** 2021-02-24 이은기 **********************************
