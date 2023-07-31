import { createAction } from 'redux-actions';
import * as types from 'erp/logistic/sales/action/SalesActionType';

/***************************** 납품 관리 *********************************/
export const deliveryCompleteRequest = createAction(types.DELIVERY_COMPLETE_REQUEST);
//export const deliveryCompleteSuccess = createAction(types.DELIVERY_COMPLETE_SUCCESS);
//export const deliveryCompleteFailure = createAction(types.DELIVERY_COMPLETE_FAILURE);
export const deliveryDivisionStart = createAction(types.DELIVERY_DIVISON_START);
export const deliveryDivisionFailure = createAction(types.DELIVERY_DIVISON_FAILURE);



/***************************** 발주 관리 *********************************/
export const orderCompleteRequest = createAction(types.ORDER_COMPLETE_REQUEST);
export const orderDivisionStart = createAction(types.ORDER_DIVISON_START);
export const orderDivisionFailure = createAction(types.ORDER_DIVISON_FAILURE);

/***************************** 공정 계획 관리 *********************************/
export const contractDataListInMpsAvailableRequest = createAction(types.CONTRACT_DETAIL_LIST_IN_MPS_AVAILABLE_REQUEST);
export const contractDataListInMpsAvailableSuccess = createAction(types.CONTRACT_DETAIL_LIST_IN_MPS_AVAILABLE_SUCCESS);
export const contractDataListInMpsAvailableFailure = createAction(types.CONTRACT_DETAIL_LIST_IN_MPS_AVAILABLE_FAILURE);