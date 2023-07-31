import { takeEvery, put, takeLatest, delay, fork } from 'redux-saga/effects';
import accountApi from 'api/accountApi';
import * as types from '../reducer/AccountReducer';
import createRequestSaga from 'util/createRequestSaga';
import * as api from '../api';


//------------일반전표------------------
//------------전표------------------
const selectSlipSaga = createRequestSaga(types.SELECT_SLIP_START, api.selectSlip);

const deleteSlipSaga = createRequestSaga(types.DELETE_SLIP_START, api.deleteSlip);

const updateSlipSaga = createRequestSaga(types.UPDATE_SLIP_START, api.updateSlip);

//------------분개------------------
const searchJournalSaga = createRequestSaga(types.SELECT_JOURNAL_START, api.searchJournal);

const deleteJournalSaga = createRequestSaga(types.DELETE_JOURNAL_START, api.deleteJournal);

const saveJournalSaga = createRequestSaga(types.SAVE_JOURNAL_START, api.saveJournal);

const updateJournalSaga = createRequestSaga(types.UPDATE_JOURNAL_START, api.updateJournal);

//------------분개상세------------------
const searchJournalDetailSaga = createRequestSaga(types.SELECT_JOURNAL_DETAIL_START, api.searchJournalDetail);

const saveJournalDetailSaga = createRequestSaga(types.SAVE_JOURNAL_DETAIL_START, api.saveJournalDetail);

const hrAddSlip = createRequestSaga(types.ADD_SALARY_SLIP_REQUEST, api.hrAddSlip);

//------------전표승인------------------
const amSlipRequest = createRequestSaga(types.SEARCH_AM_SLIP_REQUEST, api.amSlipRequest);

const amJournalRequest = createRequestSaga(types.SEARCH_AM_JOURNAL_REQUEST, api.amJournalRequest);

function* updateSlip(action) {
    try {
        yield accountApi.put('/account/approveSlip', {
            approvalData: action.params.approvalData
        });
        const { data } = yield accountApi.get('/account/findRangedSlipList', {
            params: {
                startDate: action.params.startDate,
                endDate: action.params.endDate,
                slipStatus: action.params.slipStatus
            }
        });
        yield put({ type: types.SEARCH_AM_SLIP_SUCCESS, data });
    } catch (error) {
        yield put({ type: types.UPDATE_AM_SLIP_FAILURE, error });
    }
}

const getJournalNo = createRequestSaga(types.SET_JOURNAL_NO_REQUEST, api.getJournalNo);

const selectGeneralAccountLedgerSaga = createRequestSaga(types.SELECT_GENERAL_ACCOUNT_LEDGER_START, api.selectGeneralAccountLedger);

const searchJournalDoubleSaga = createRequestSaga(types.SEARCH_JOURNAL_DOUBLE_REQUEST, api.searchJournalDouble);

//고정자산리스트 조회 수정 삭제 박민호====================================
const selectNonCurrentSaga = createRequestSaga(types.SEARCH_NON_CURRENT_REQUEST, api.selectNonCurrent);

const saveNonCurrentSaga = createRequestSaga(types.SAVE_NON_CURRENT_START, api.saveNonCurrent);

const deleteNonCurrentSaga = createRequestSaga(types.DELETE_NON_CURRENT_START, api.deleteNonCurrent);
//====================자산리스트 조회 수정 삭제 박민호====================================
const searchCurrentSaga = createRequestSaga(types.SEARCH_CURRENT_REQUEST, api.searchCurrent)

//==================== 세부자산리스트 =================================================
const searchAssetListSaga = createRequestSaga(types.SEARCH_ASSET_LIST_REQUEST, api.searchAssetList)

const searchAssetDtaSaga = createRequestSaga(types.SEARCH_ASSET_DTA_REQUEST , api.searchAssetDta)

const searchDeptSaga = createRequestSaga(types.SEARCH_DEPT_LIST_REQUEST, api.searchDept )

export default function* AccountSaga() {
    // <===============  2020-09-10 일반전표 시작 조편백  ================
    yield takeEvery(types.SELECT_SLIP_START, selectSlipSaga); //전표조회
    yield takeEvery(types.DELETE_SLIP_START, deleteSlipSaga); //전표삭제
    yield takeEvery(types.UPDATE_SLIP_START, updateSlipSaga); //전표 업데이트
    yield takeEvery(types.SELECT_JOURNAL_START, searchJournalSaga); //분개조회
    yield takeEvery(types.DELETE_JOURNAL_START, deleteJournalSaga); //분개삭제
    yield takeEvery(types.SAVE_JOURNAL_START, saveJournalSaga); //분개저장 insert
    yield takeEvery(types.UPDATE_JOURNAL_START, updateJournalSaga); //분개저장 update
    yield takeEvery(types.SELECT_JOURNAL_DETAIL_START, searchJournalDetailSaga); //분개상세 조회
    yield takeEvery(types.SAVE_JOURNAL_DETAIL_START, saveJournalDetailSaga); //분개상세저장
    yield takeLatest(types.ADD_SALARY_SLIP_REQUEST, hrAddSlip);
    // <===============  2020-09-10 일반전표 끝 조편백  ================

    // <===============  전표승인  ================
    yield takeLatest(types.SEARCH_AM_SLIP_REQUEST, amSlipRequest);
    yield takeLatest(types.SEARCH_AM_JOURNAL_REQUEST, amJournalRequest);
    yield takeLatest(types.UPDATE_AM_SLIP_REQUEST, updateSlip);

    yield takeEvery(types.SET_JOURNAL_NO_REQUEST, getJournalNo); // //*********** 2020-08-28 정대현 추가 **********
    yield takeEvery(types.SELECT_GENERAL_ACCOUNT_LEDGER_START, selectGeneralAccountLedgerSaga);
    //************************* 2020-12-04 분개장 시작 *************************
    yield takeEvery(types.SEARCH_JOURNAL_DOUBLE_REQUEST, searchJournalDoubleSaga);
    //************************* 2020-12-04 분개장 종료 *************************

    //고장자산 수정 삭제 조회 등록 박미노==========================================
    yield takeEvery(types.SEARCH_NON_CURRENT_REQUEST, selectNonCurrentSaga);
    yield takeEvery(types.SAVE_NON_CURRENT_START, saveNonCurrentSaga);
    yield takeEvery(types.DELETE_NON_CURRENT_START, deleteNonCurrentSaga);

    // 자산리스트 세부자산리스트
    yield takeEvery(types.SEARCH_CURRENT_REQUEST, searchCurrentSaga);

    yield takeEvery(types.SEARCH_ASSET_LIST_REQUEST, searchAssetListSaga)

    yield takeEvery(types.SEARCH_ASSET_DTA_REQUEST , searchAssetDtaSaga)

    yield takeEvery(types.SEARCH_DEPT_LIST_REQUEST , searchDeptSaga)
}

//********************************** 2021-02-24 이은기 **********************************
