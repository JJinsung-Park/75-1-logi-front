//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//*************************  탄력근무 조회 고범석_210906********************************** */
export const SEARCH_ELASTIC_SELECT_TYPE_SUCCESS = 'elastic/SEARCH_ELASTIC_SELECT_TYPE_SUCCESS';
export const SEARCH_ELASTIC_SELECT_TYPE_FAILURE = 'elastic/SEARCH_ELASTIC_SELECT_TYPE_FAILURE';
//*************************  탄력근무 조회 종료********************************** */


//*************************  탄력근무 신청 고범석_210906********************************** */
export const ELASTIC_INSERT_TYPE_SUCEESS = 'elastic/ELASTIC_INSERT_TYPE_SUCEESS';
export const ELASTIC_INSERT_TYPE_FAILURE = 'elastic/ELASTIC_INSERT_TYPE_FAILURE';
//*************************  탄력근무 신청 종료********************************** */


//*************************  탄력근무 삭제 고범석_210909********************************** */
export const ELASTIC_DELETE_TYPE_SUCEESS = 'elastic/ELASTIC_DELETE_TYPE_SUCEESS';
export const ELASTIC_DELETE_TYPE_FAILURE = 'elastic/ELASTIC_DELETE_TYPE_FAILURE';
//*************************  탄력근무 삭제 종료********************************** */

const initialState = {
    elasticData: [], 
    errorMsg: '',
    errorCode: ''
};

const elastic = (state = initialState, action) => {
    switch (action.type) {
        //**********탄력근무제 조회 시작 범석 2021-09-07*******************************************
        // case SEARCH_ELASTIC_SELECT_TYPE:

        //     return {
        //         ...state,
        //         elasticList: action.payload.elasticData
        //     };
        case SEARCH_ELASTIC_SELECT_TYPE_SUCCESS:

            return {
                ...state,
                elasticData: action.payload.elasticList
            }

        //**********탄력근무제 신청 시작 범석 2021-09-07*******************************************
        case ELASTIC_INSERT_TYPE_SUCEESS:
   
            return {
                ...state,
                insertelData: []
            };
        case ELASTIC_INSERT_TYPE_FAILURE:
            return {
                ...state
            };


        default:
            return state;
    }
};

export default elastic;