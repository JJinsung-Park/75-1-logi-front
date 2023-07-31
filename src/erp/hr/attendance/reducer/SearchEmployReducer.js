
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//************************* 재직증명조회 시작 경윤 **************************
export const SEARCH_EMPLOYMENT_SUCCESS = 'search/SEARCH_EMPLOYMENT_SUCCESS';
export const SEARCH_EMPLOYMENT_FAILURE = 'search/SEARCH_EMPLOYMENT_FAILURE';
//************************* 재직증명조회 종료 경윤 **************************


const initialState = {
    errorMsg: '',
    errorCode: '',
    certificateList:[]
};

const searchEmployment = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_EMPLOYMENT_SUCCESS:

            return {
                ...state,
                certificateList: action.payload.certificateList
            };
            default:
                return state;
        }
    };
    
    export default searchEmployment;