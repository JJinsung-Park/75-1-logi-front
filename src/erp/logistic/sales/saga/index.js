import { all } from 'redux-saga/effects';
import {deliverydata} from 'erp/logistic/sales/saga/deliveryCompleteSaga';
import {orderdata} from 'erp/logistic/sales/saga/orderCompleteSaga';

export default function* SalesSaga() {
    yield all([
        deliverydata(),
        orderdata(),
    ]);
}