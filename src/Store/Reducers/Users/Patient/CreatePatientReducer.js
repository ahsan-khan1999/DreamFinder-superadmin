import { 
    CREATE_PATIENT_CONSTANT,
    UPDATE_PATIENT_CONSTANT
 } from "../../../Constant/Constants";
/* eslint-disable */

const initial_state = {
    patient:{},
};

export const CreatePatientReducer = (state=initial_state,action) => {
    switch(action.type){
        case CREATE_PATIENT_CONSTANT.CREATE_PATIENT_LOADING:
            return {...state,patient:true}
        case CREATE_PATIENT_CONSTANT.CREATE_PATIENT_SUCESS:
            return {...state,patient:action.payload}
        case CREATE_PATIENT_CONSTANT.CREATE_PATIENT_ERROR:
            return {...state,patient:true}
        default:
            return state;    
    }

}
export const UpdatePatientReducer = (state=initial_state,action) => {
    switch(action.type){
        case UPDATE_PATIENT_CONSTANT.UPDATE_PATIENT_LOADING:
            return {...state,patient:action.payload}
        case UPDATE_PATIENT_CONSTANT.UPDATE_PATIENT_SUCESS:
            return {...state,patient:action.payload}
        case UPDATE_PATIENT_CONSTANT.UPDATE_PATIENT_ERROR:
            return {...state,patient:action.payload}
        default:
            return state;    
    }
}
