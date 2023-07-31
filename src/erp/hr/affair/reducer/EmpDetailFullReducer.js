import { createAction } from 'redux-actions';

//************************* 시원정보조회 **************************
export const SELECT_EMPDETAILFULLLIST = 'src/erp/hr/Reducer/HR_Reducer/SELECT_EMPDETAILFULLLIST';

export const selectEmpDeailFullList = createAction(SELECT_EMPDETAILFULLLIST);

const initialState = {
    empDetailFullList: [],
    errorMsg: '',
    error: ''
};

const empDetailFull = (state = initialState, action) => {
    switch (action.type) {
        //************************* 사원정보조회 *************************
        case SELECT_EMPDETAILFULLLIST:
            return {
                ...state,
                empDetailFullList: action.payload.select
            };

        default:
            return state;
    }
};

export default empDetailFull;
