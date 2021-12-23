/* eslint-disable */

import {VIEW_CURRENT_ORDER_CONSTANTS, VIEW_ORDER_CONSTANTS} from '../../Constant/Constants'
const initial_state = {
    loading:false,
    order:[]
}
const viewCurrentOrder = {
    currentOrder :[],
    view:false

}
export const ViewOrderRedcuer = (state=initial_state,action) => {
    switch(action.type){
        case VIEW_ORDER_CONSTANTS.VIEW_ORDER_LOADING:
            return {...state,loading:action.payload,order:[]}
        case VIEW_ORDER_CONSTANTS.VIEW_ORDER_SUCESS:
            return {...state,order:action.payload}
        case VIEW_ORDER_CONSTANTS.VIEW_ORDER_ERROR:
            return {...state,order:action.payload}
        default:
            return state;
    }
}
export const ViewCurrentOrderRedcuer = (state=viewCurrentOrder,action) => {
    switch(action.type){
        case VIEW_CURRENT_ORDER_CONSTANTS.VIEW_CURRENT_ORDER_LOADING:
            return {...state,currentOrder:action.payload,view:false}
        case VIEW_CURRENT_ORDER_CONSTANTS.VIEW_CURRENT_ORDER_SUCESS:
            return {...state,currentOrder:action.payload,view:true}
        case VIEW_CURRENT_ORDER_CONSTANTS.VIEW_CURRENT_ORDER_ERROR:
            return {...state,currentOrder:action.payload,view:false}
        default:
            return state;
    }
}