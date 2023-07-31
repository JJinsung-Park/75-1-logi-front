//==================일근태 관리 인봉 ==============================시작 ==============================
export const SEARCH_DAY_ATTD_LIST_SUCCESS =
    'daymonthlist/SEARCH_DAY_ATTD_LIST_REQUEST_SUCCESS'; //일근태관리 이름+날짜+N상태만 검색 하인봉
export const SEARCH_DAY_ATTD_LIST_FAILURE =
    'daymonthlist/SEARCH_DAY_ATTD_LIST_REQUEST_FAILURE'; //일근태관리 이름+날짜+N상태만 검색 하인봉

export const SEARCH_DAY_ATTD_LIST_All = 'daymonthlist/SEARCH_DAY_ATTD_LIST_All'; 
//리듀서에서 사용한다. 일근태관리 날짜~날짜 사이 모두 검색 하인봉
export const SEARCH_DAY_ATTD_LIST_All_SUCCESS =
    'daymonthlist/SEARCH_DAY_ATTD_LIST_All_SUCCESS'; // 일근태관리 날짜~날짜 사이 모두 검색 하인봉
export const SEARCH_DAY_ATTD_LIST_All_FAILURE =
    'daymonthlist/SEARCH_DAY_ATTD_LIST_All_FAILURE'; //일근태관리 날짜~날짜 사이 모두 검색 하인봉

export const DAY_ATTD_DEADLINE_REGISTER = 'daymonthlist/DAY_ATTD_DEADLINE_REGISTER'; 
//일근태관리 마감 날짜~날짜 사이 모두 검색 하인봉   리듀서에서 사용한다.
export const DAY_ATTD_DEADLINE_REGISTER_SUCCESS =
    'daymonthlist/DAY_ATTD_DEADLINE_REGISTER_SUCCESS'; //일근태관리  마감 날짜~날짜 사이 모두 검색 하인봉
export const DAY_ATTD_DEADLINE_REGISTER_FAILURE =
    'daymonthlist/DAY_ATTD_DEADLINE_REGISTER_FAILURE'; //일근태관리 마감 날짜~날짜 사이 모두 검색 하인봉

export const DAY_ATTD_DEADLINE_CANCEL = 'daymonthlist/DAY_ATTD_DEADLINE_CANCEL'; //일근태관리 마감취소 날짜~날짜 사이 모두 검색 하인봉

export const SEARCH_RESTATTENDANCE_TYPE = 'daymonthlist/SEARCH_RESTATTENDANCE_TYPE'; //근태외관리 근태외구분 정보 가져오기

export const SEARCH_MONTH_ATTD_LIST_SUCCESS =
    'daymonthlist/SEARCH_MONTH_ATTD_LIST_REQUEST_SUCCESS';
export const MONTH_ATTD_LIST_UPDATE_SUCCESS = 'daymonthlist/MONTH_ATTD_LIST_UPDATE_SUCCESS';
export const MONTH_ATTD_LIST_FAILURE = 'daymonthlist/MONTH_ATTD_LIST_FAILURE';

const initialState = { 
    errorMsg: '',
    errorCode: '',
    dayAttdMgtList: [],
    monthAttdMgtList: []
};

const daymonthlist = (state = initialState, action) => {
    switch (action.type) {
         //==========================================재영 월근태관리===================================//
         case SEARCH_MONTH_ATTD_LIST_SUCCESS:
            return {
                ...state,
                monthAttdMgtList: action.payload.monthAttdMgtList
            };
        case MONTH_ATTD_LIST_UPDATE_SUCCESS:
            return {
                ...state,
                monthAttdMgtList: []
            };
        case MONTH_ATTD_LIST_FAILURE:
            return {
                ...state,
                errorMsg: action.e.errorMsg
            };
        //==========================================재영 일근태관리===================================//
        case SEARCH_DAY_ATTD_LIST_SUCCESS:
           
            return {
                ...state,
                dayAttdMgtList: action.payload.DayAttdTO,
                errorCode: action.payload.errorCode
            };
               case SEARCH_DAY_ATTD_LIST_FAILURE:
            return {
                ...state,
                error: action.error
            };

       
        //************************* 결제승인관리 종료 재영 20-09-04 *************************

        //===================인봉=====================================일근태관리
        case SEARCH_DAY_ATTD_LIST_All:
            return {
                ...state,
                startDate: action.data.startDate,
                endDate: action.data.endDate
            };
        case SEARCH_DAY_ATTD_LIST_All_SUCCESS:
            return {
                ...state,
                dayAttdMgtList: action.data.dayAttdMgtList
            };
        case SEARCH_DAY_ATTD_LIST_All_FAILURE:
            return {
                ...state,
                error: action.error
            };

        case DAY_ATTD_DEADLINE_REGISTER:
            return {
                ...state,
                empCodeList: action.data.empCodeList,
                applyDaymonthList: action.data.applyDaymonthList
            };
        case DAY_ATTD_DEADLINE_REGISTER_SUCCESS:
            return {
                ...state,
                dayAttdMgtList: action.data.dayAttdMgtList
            };

        //===================인봉=====================================일근태관리

       
        default:
            return state;
    }
};

export default daymonthlist;