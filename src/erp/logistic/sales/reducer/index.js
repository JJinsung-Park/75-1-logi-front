import { combineReducers } from 'redux';
import deliverycompletedata from 'erp/logistic/sales/reducer/deliveryCompleteReducer';
import ordercompletedata from 'erp/logistic/sales/reducer/orderCompleteReducer';

const SalesReducerCombine = combineReducers({
    deliverycompletedata,
    ordercompletedata
});

export default SalesReducerCombine;