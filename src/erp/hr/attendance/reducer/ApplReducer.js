
//************************* 결제승인관리 시작 _재영 *************************
export const SEARCH_ATTD_APPL_SUCCESS = 'appl/SEARCH_ATTD_APPL_REQUEST_SUCCESS';
export const SEARCH_ATTD_APPL_FAILURE = 'appl/SEARCH_ATTD_APPL_REQUEST_FAILURE';
export const UPDATE_ATTD_APPL_SUCCESS = 'appl/UPDATE_ATTD_APPL_REQUEST_SUCCESS';
export const UPDATE_ATTD_APPL_FAILURE = 'appl/UPDATE_ATTD_APPL_REQUEST_FAILURE';

//************************* 결제승인관리 종료 _재영 ***************************
const initialState = {
    attdApplList: [],
    errorCode:"",
    errorMsg:"",
    flag:false
 
};

const appl = (state = initialState, action) => {
    switch (action.type) {
        //************************* 결제승인관리 시작 재영 20-09-04 *************************
        case SEARCH_ATTD_APPL_SUCCESS:
           
            return {
                ...state,
                attdApplList: action.payload.restAttdList
            };
        case UPDATE_ATTD_APPL_SUCCESS:
            
            return {
                ...state,
                attdApplList: action.payload.restAttdList
            };




        default:
            return state;
    }
};

export default appl;