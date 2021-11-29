import { CREATE_PHARMACY_CONSTANT,UPDATE_PHARMACY_CONSTANT } from "../../../Constant/Constants";
/* eslint-disable */

const initial_state = {
    pharmacy:{},
};

export const CreatePharmacyReducer = (state=initial_state,action) => {
    switch(action.type){
        case CREATE_PHARMACY_CONSTANT.CREATE_PHARMACY_LOADING:
            return {...state,pharmacy:true}
        case CREATE_PHARMACY_CONSTANT.CREATE_PHARMACY_SUCESS:
            return {...state,pharmacy:action.payload}
        case CREATE_PHARMACY_CONSTANT.CREATE_PHARMACY_ERROR:
            return {...state,pharmacy:true}
        default:
            return state;    
    }

}
export const UpdatePharmacyReducer = (state=initial_state,action) => {
    switch(action.type){
        case UPDATE_PHARMACY_CONSTANT.UPDATE_PHARMACY_ERROR:
            return {...state,pharmacy:true}
        case UPDATE_PHARMACY_CONSTANT.UPDATE_PHARMACY_SUCESS:
            return {...state,pharmacy:action.payload}
        case UPDATE_PHARMACY_CONSTANT.UPDATE_PHARMACY_ERROR:
            return {...state,pharmacy:true}
        default:
            return state;    
    }
}
