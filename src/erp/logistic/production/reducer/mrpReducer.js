export const SEARCH_MRP_GETMRPLIST_SUCCESS = 'src/erp/logistic/Saga/SEARCH_MRP_GETMRPLIST_SUCCESS';

const initialState = {
    MrpGetList: []
};

const mrplist = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_MRP_GETMRPLIST_SUCCESS:
            return {
                ...state,
                MrpGetList: action.payload.gridRowJson
            };
        default:
            return state;
    }
};

export default mrplist;