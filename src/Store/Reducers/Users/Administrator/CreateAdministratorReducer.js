import { CREATE_ADMINISTRATOR_CONSTANT,UPDATE_ADMINISTRATOR_CONSTANT } from "../../../Constant/Constants";
/* eslint-disable */

const initial_state = {
    administrator:{},
};

export const CreateAdministratorReducer = (state=initial_state,action) => {
    switch(action.type){
        case CREATE_ADMINISTRATOR_CONSTANT.CREATE_ADMINISTRATOR_LOADING:
            return {...state,administrator:true}
        case CREATE_ADMINISTRATOR_CONSTANT.CREATE_ADMINISTRATOR_SUCESS:
            return {...state,administrator:action.payload}
        case CREATE_ADMINISTRATOR_CONSTANT.CREATE_ADMINISTRATOR_ERROR:
            return {...state,administrator:true}
        default:
            return state;    
    }

}
export const UpdateAdministratorReducer = (state=initial_state,action) => {
    switch(action.type){
        case UPDATE_ADMINISTRATOR_CONSTANT.UPDATE_ADMINISTRATOR_LOADING:
            return {...state,administrator:true}
        case UPDATE_ADMINISTRATOR_CONSTANT.UPDATE_ADMINISTRATOR_SUCESS:
            return {...state,administrator:action.payload}
        case UPDATE_ADMINISTRATOR_CONSTANT.UPDATE_ADMINISTRATOR_ERROR:
            return {...state,administrator:true}
        default:
            return state;    
    }
}
