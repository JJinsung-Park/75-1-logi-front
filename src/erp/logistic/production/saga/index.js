import { all } from 'redux-saga/effects';
import gatherlist from 'erp/logistic/production/saga/gatherSaga';
import mpslist from 'erp/logistic/production/saga/mpsSaga';
import mrplist from 'erp/logistic/production/saga/mrpSaga';
import mrpsimulatorlist from 'erp/logistic/production/saga/mrpSimulatorSaga';

export default function* ProductionSaga() {
    yield all([
        gatherlist(),
        mpslist(),
        mrplist(),
        mrpsimulatorlist()
    ]);
}