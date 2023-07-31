import { createAction } from 'redux-actions';
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@최 예 솔@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// ************************* 시회 보장 action type *************************
export const INSURE_LIST_REQUEST = 'insure/INSURE';   //리듀서에서만 사용
// ************************* 시회 보장 action 생성 함수 *************************
export const insureList = createAction(INSURE_LIST_REQUEST);

const initialState = {
  insureList: []
};

const insure = (state = initialState, action) => {

  switch (action.type) {
    case INSURE_LIST_REQUEST:

      return {
        ...state,
        insureList: action.payload.baseInsureList
      };
    default:
      return state;
  }
};

export default insure;