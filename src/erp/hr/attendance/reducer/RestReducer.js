
//*************************외출 및 조퇴 신청 시작 _준서 _20.08.24 *************************
export const REST_ATTD_REQUEST = 'rest/REST_ATTD_REQUEST';   //리듀서에 존재한다.
export const REST_ATTD_SUCCESS = 'rest/REST_ATTD_REQUEST_SUCCESS';
export const REST_ATTD_FAILURE = 'rest/REST_ATTD_REQUEST_FAILURE';
//*************************외출 및 조퇴 신청 종료 _준서 _20.08.24 *************************
const initialState = {
};

const rest = (state = initialState, action) => {
    switch (action.type) {
       
        //*************************외출 및 조퇴 신청 시작 _준서 _20.08.25 *************************
        case REST_ATTD_REQUEST:

            return {
                ...state
            };
        //*************************외출 및 조퇴 신청 종료 _준서 _20.08.25 *************************


        default:
            return state;
    }
};

export default rest;