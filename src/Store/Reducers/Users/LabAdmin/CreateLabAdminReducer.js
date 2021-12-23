import { CREATE_LABADMIN_CONSTANT,UPDATE_LABADMIN_CONSTANT } from "../../../Constant/Constants";
/* eslint-disable */

const initial_state = {
    labAdmin:{},
};

export const CreateLabAdminReducer = (state=initial_state,action) => {
    switch(action.type){
        case CREATE_LABADMIN_CONSTANT.CREATE_LABADMIN_LOADING:
            return {...state,labAdmin:true}
        case CREATE_LABADMIN_CONSTANT.CREATE_LABADMIN_SUCESS:
            return {...state,labAdmin:action.payload}
        case CREATE_LABADMIN_CONSTANT.CREATE_LABADMIN_ERROR:
            return {...state,labAdmin:true}
        default:
            return state;    
    }

}
export const UpdateLabAdminReducer = (state=initial_state,action) => {
    switch(action.type){
        case UPDATE_LABADMIN_CONSTANT.UPDATE_LABADMIN_LOADING:
            return {...state,labAdmin:true}
        case UPDATE_LABADMIN_CONSTANT.UPDATE_LABADMIN_SUCESS:
            return {...state,labAdmin:action.payload}
        case UPDATE_LABADMIN_CONSTANT.UPDATE_LABADMIN_ERROR:
            return {...state,labAdmin:true}
        default:
            return state;    
    }
}
