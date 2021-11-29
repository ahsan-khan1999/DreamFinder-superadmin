import { CREATE_DOCTOR_CONSTANT,UPDATE_DOCTOR_CONSTANT } from "../../../Constant/Constants";
/* eslint-disable */

const initial_state = {
    doctor:{},
};

export const CreateDoctorReducer = (state=initial_state,action) => {
    switch(action.type){
        case CREATE_DOCTOR_CONSTANT.CREATE_DOCTOR_LOADING:
            return {...state,doctor:action.payload}
        case CREATE_DOCTOR_CONSTANT.CREATE_DOCTOR_SUCESS:
            return {...state,doctor:action.payload}
        case CREATE_DOCTOR_CONSTANT.CREATE_DOCTOR_ERROR:
            return {...state,doctor:action.payload}
        default:
            return state;    
    }

}
export const UpdateDoctorReducer = (state=initial_state,action) => {
    switch(action.type){
        case UPDATE_DOCTOR_CONSTANT.UPDATE_DOCTOR_LOADING:
            return {...state,doctor:action.payload}
        case UPDATE_DOCTOR_CONSTANT.UPDATE_DOCTOR_SUCESS:
            return {...state,doctor:action.payload}
        case UPDATE_DOCTOR_CONSTANT.UPDATE_DOCTOR_ERROR:
            return {...state,doctor:action.payload}
        default:
            return state;    
    }
}
