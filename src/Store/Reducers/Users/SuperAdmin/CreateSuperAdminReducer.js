import { CREATE_SUPERADMIN_CONSTANT,UPDATE_SUPERADMIN_CONSTANT } from "../../../Constant/Constants";
/* eslint-disable */

const initial_state = {
    superAdmin:{},
};

export const CreateSuperAdminReducer = (state=initial_state,action) => {
    switch(action.type){
        case CREATE_SUPERADMIN_CONSTANT.CREATE_SUPERADMIN_LOADING:
            return {...state,superAdmin:true}
        case CREATE_SUPERADMIN_CONSTANT.CREATE_SUPERADMIN_SUCESS:
            return {...state,superAdmin:action.payload}
        case CREATE_SUPERADMIN_CONSTANT.CREATE_SUPERADMIN_ERROR:
            return {...state,superAdmin:true}
        default:
            return state;    
    }

}
export const UpdateSuperAdminReducer = (state=initial_state,action) => {
    switch(action.type){
        case UPDATE_SUPERADMIN_CONSTANT.UPDATE_SUPERADMIN_LOADING:
            return {...state,superAdmin:true}
        case UPDATE_SUPERADMIN_CONSTANT.UPDATE_SUPERADMIN_SUCESS:
            return {...state,superAdmin:action.payload}
        case UPDATE_SUPERADMIN_CONSTANT.UPDATE_SUPERADMIN_ERROR:
            return {...state,superAdmin:true}
        default:
            return state;    
    }
}
