import { put, takeEvery, takeLatest, all, call } from 'redux-saga/effects';
import createRequestSaga from "util/createRequestSaga";
import * as actions from '../reducer/BaseCodeReducer';
import * as types from '../reducer/BaseCodeReducer';
import { createAction } from 'redux-actions';
import * as api from '../api';
import axios from 'axios';

// const SEARCH_CODE = "src/erp/hr/Saga/Saga/SEARCH_CODE";
// const SEARCH_COMPANY_CODE ="src/erp/hr/Saga/Saga/SEARCH_COMPANY_CODE";
// const SEARCH_WORKPLACE_CODE = "src/erp/hr/Saga/Saga/SEARCH_WORKPLACE_CODE";

// export const searchCode = createAction(SEARCH_CODE);
// export const searchCompanyCode = createAction(SEARCH_COMPANY_CODE);
// export const searchWorkplaceCode = createAction(SEARCH_WORKPLACE_CODE);

//const searchCompanyCodeSaga = createRequestSaga(SEARCH_COMPANY_CODE, api.searchCompany) 
//const searchWorkPlaceCodeSaga = createRequestSaga(SEARCH_WORKPLACE_CODE, api.searchWorkplace) 


function* codeSaga(action) {
    try {
        if (action.payload.type === 'companyCode') {
            const { data } = yield axios.get('http://localhost:8282/hr/company/searchCompany');
            yield put(actions.searchCompanyCode(data.gridRowJson));
        } else if (action.payload.type === 'workplaceCode') {
            const { data } = yield axios.get(
                'http://localhost:8282/hr/company/searchWorkplace',
                {
                    params: {
                        companyCode: action.payload.companyCode
                    }
                }
            );
            yield put(actions.searchWorkplaceCode(data.gridRowJson));
        }
    } catch (error) {

        action.payload.history.put('/error');
    }
}

export function* onCodeSearch() {
    yield takeEvery(types.SEARCH_CODE, codeSaga);
}

export default function* basecode() {
    yield all([
    //takeEvery(SEARCH_COMPANY_CODE, searchCompanyCodeSaga),
    //takeEvery(SEARCH_WORKPLACE_CODE, searchWorkPlaceCodeSaga),
    call(onCodeSearch)
    ]);
}