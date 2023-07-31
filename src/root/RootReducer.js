// --- redux-saga
import { combineReducers } from 'redux';

import {
    menuListReducer,
    logInOutReducer,
    sideBarReducer,
    dashReducer,
    Auth
} from 'common/reducer/commonReducer';
import hr from 'erp/hr/root/RootReducer';
import AccReducer from 'erp/account/root/RootReducer';
import logistic from 'erp/logistic/root/RootReducer';
/*--------------------------------------------------------------------*/
const RootReducers = combineReducers({
    menuListReducer, // RouteMenuComponents
    logInOutReducer,
    sideBarReducer,
    hr,
    AccReducer,
    logistic,
    dashReducer,
    Auth,
});

export default RootReducers;
