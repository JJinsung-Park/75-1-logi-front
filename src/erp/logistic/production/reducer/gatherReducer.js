const SEARCH_GATHER_LIST_SUCCESS = 'src/erp/logistic/Saga/SEARCH_GATHER_LIST_SUCCESS';

const initialState = {
    GatherList: []
};

const gatherlist = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_GATHER_LIST_SUCCESS:
            return {
                ...state,
                GatherList: action.payload.gridRowJson
            };
        default:
            return state;
    }
};

export default gatherlist;