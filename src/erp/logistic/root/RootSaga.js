import { all, fork } from 'redux-saga/effects';

import BasicInfoSaga from 'erp/logistic/base/saga/BasicInfoSaga';
import LogisticsInfoSaga from 'erp/logistic/base/saga/LogisticsInfoSaga';
import ProductionSaga from 'erp/logistic/production/saga/index';
import SalesSaga from 'erp/logistic/sales/saga/SalesSaga';

export default function* LogiRootSaga() {
    yield all([
        fork(BasicInfoSaga),
        fork(LogisticsInfoSaga),
        fork(ProductionSaga),
        fork(SalesSaga)
    ]);
}
