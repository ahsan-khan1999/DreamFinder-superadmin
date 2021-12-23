/* eslint-disable */

import { VIEW_DOCTOR_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_DOCTOR_CONSTANT } from '../../../Constant/Constants';



const initial_state = {
    doctor:[],
    laoding:false
};
const state_doctor = {
  currentDoctor:[],
  isEdit:false,
  view:false
};

export const ViewDoctorReducer = (state=initial_state,action ) => {
    switch (action.type) {
        case VIEW_DOCTOR_CONSTANT.VIEW_DOCTOR_LOADING:
          return { ...state, loading: action?.payload,doctor:[] };
    
        case VIEW_DOCTOR_CONSTANT.VIEW_DOCTOR_SUCESS:
          return { ...state, doctor: action?.payload };
    
        case VIEW_DOCTOR_CONSTANT.VIEW_DOCTOR_ERROR:
          return { ...state, doctor: action?.payload};
    
        default:
          return state;
      }

}
export const GetDoctorIsEdit = (state=state_doctor,action) => {
  switch (action.type) {
    case VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_LOADING:
      return { ...state, currentDoctor: action?.payload ,view:true};

    case VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_SUCESS:
      return { ...state, currentDoctor: action?.payload,view:true};

    case VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_ERROR:
      return { ...state, currentDoctor: action?.payload,view:true};

    default:
      return state;
  }
} 

// export const GetDoctorIsView = (state=state_doctor,action) => {
//   switch (action.type) {
//     case VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_LOADING:
//       return { ...state, currentDoctor: action?.payload ,view:true,isEdit:false};

//     case VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_SUCESS:
//       return { ...state, currentDoctor: action?.payload ,view:true,isEdit:false};

//     case VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_ERROR:
//       return { ...state, currentDoctor: action?.payload,view:true,isEdit:false};

//     default:
//       return state;
//   }
// } 
// export default ViewDoctorReducer; 