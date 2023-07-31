//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//*************************  일용직 관리 조회 최예솔_211221********************************** */
export const SEARCH_DAY_WORKER_SELECT_TYPE_SUCCESS = 'dayworker/SEARCH_DAY_WORKER_SELECT_TYPE_SUCCESS';
export const SEARCH_DAY_WORKER_SELECT_TYPE_FAILURE = 'dayworker/SEARCH_DAY_WORKER_SELECT_TYPE_FAILURE';
//*************************  일용직 관리 조회 종료********************************** */

// 일용직 등록의 경우 DB에 바로 데이터를 넣는 것이기 때문에 REDUCER에서 처리할 필요가 없다. 

//*************************  일용직 관리 삭제 최예솔_211221********************************** */
export const DAY_WORKER_DELETE_TYPE_SUCEESS = 'dayworker/DAY_WORKER_DELETE_TYPE_SUCEESS';
export const DAY_WORKER_DELETE_TYPE_FAILURE = 'dayworker/DAY_WORKER_DELETE_TYPE_FAILURE';
//*************************  일용직 관리 삭제 종료********************************** */

const initialState = {
    dayworkerData: [],
    errorMsg: '',
    errorCode: ''
};

const dayworker = (state = initialState, action) => {
    switch (action.type) {
        //**********일용직 관리 조회 시작 최예솔 2021-12-21*******************************************
        case SEARCH_DAY_WORKER_SELECT_TYPE_SUCCESS:

            return {
                ...state,
                dayworkerData: action.payload.dayWorkerList   //CONTROLLER에 있는 이름이다.
            }
        // case SEARCH_DAY_WORKER_SELECT_TYPE_FAILURE:
        //     return {
        //         ...state,
        //         errorCode:2,
        //         errorMsg: '요청값을 받아오는데 실패하였습니다.'
        //     }
       
        default:
            return state;
    }
};

export default dayworker;