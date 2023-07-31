import * as types from 'erp/logistic/sales/action/SalesActionType';

export const deliverySuccess = successData => ({
    type: types.DELIVERY_COMPLETE_SUCCESS,
    successData
});

export const orderSuccess = successData => ({
    type: types.ORDER_COMPLETE_SUCCESS,
    successData
});

const initialState = {
    deliveryCompleteData: [],
    orderCompleteData: [],
    isDeliveryOpen: false,
    ContractDetailListInMpsAvailable: []
};

const Sales = (state = initialState, action) => {
    switch (action.type) {
        case types.DELIVERY_COMPLETE_SUCCESS:
          
            return {
                ...state,
                deliveryCompleteData: action.payload
            };
        case types.DELIVERY_COMPLETE_FAILURE:
            return {
                ...state,
                deliveryCompleteData: action.error
            };
        case types.DELIVERY_DIVISON_FAILURE:
            return {
                ...state,
                deliveryCompleteData: action.error
            };
            
        case types.ORDER_COMPLETE_SUCCESS:
    
            return {
                ...state,
                orderCompleteData: action.payload
            };
        case types.ORDER_COMPLETE_FAILURE:
            return {
                ...state,
                orderCompleteData: action.error
            };
        case types.ORDER_DIVISON_FAILURE:
            return {
                ...state,
                orderCompleteData: action.error
            };
        case types.CONTRACT_DETAIL_LIST_IN_MPS_AVAILABLE_REQUEST:
            return {
                ...state,
                ContractDetailListInMpsAvailable: action.payload
            };
        case types.CONTRACT_DETAIL_LIST_IN_MPS_AVAILABLE_SUCCESS:
            return {
                ...state,
                ContractDetailListInMpsAvailable: action.error
            };
        case types.CONTRACT_DETAIL_LIST_IN_MPS_AVAILABLE_FAILURE:
            return {
                ...state,
                ContractDetailListInMpsAvailable: action.error
            };

        default:
            return state;
    }
};

export default Sales;
