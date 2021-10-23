/* eslint-disable */

import {VIEW_REMOVAL_REQUEST_CONSTANTS,VIEW_CURRENT_REMOVAL_REQUEST_CONSTANTS} from '../../Constant/Constants'
const initial_state={
    requests :[],
    loading:false
}
const currentRemovalRequest={
    currentRequst:[],
    view:false
}

export const ViewDoctorRemovalRequest = (state=initial_state,action) =>{
    switch(action.type){
        case VIEW_REMOVAL_REQUEST_CONSTANTS.VIEW_REMOVAL_REQUEST_LOADING:
            return {...state,loading:action.payload,requests:[]}
        case VIEW_REMOVAL_REQUEST_CONSTANTS.VIEW_REMOVAL_REQUEST_SUCESS:
            return {...state,requests:action.payload}
        case VIEW_REMOVAL_REQUEST_CONSTANTS.VIEW_REMOVAL_REQUEST_ERROR:
            return {...state,requests:action.payload}
        default:
            return state;
        }
}

export const ViewCurrentDoctorRemovalRequest = (state=currentRemovalRequest,action) =>{
    switch(action.type){
        case VIEW_CURRENT_REMOVAL_REQUEST_CONSTANTS.VIEW_CURRENT_REMOVAL_REQUEST_LOADING:
            return {...state,currentRequst:action.payload,view:false}
        case VIEW_CURRENT_REMOVAL_REQUEST_CONSTANTS.VIEW_CURRENT_REMOVAL_REQUEST_SUCESS:
            return {...state,currentRequst:action.payload,view:true}
        case VIEW_CURRENT_REMOVAL_REQUEST_CONSTANTS.VIEW_CURRENT_REMOVAL_REQUEST_ERROR:
            return {...state,currentRequst:action.payload,view:false}
        default:
            return state;
        }
}