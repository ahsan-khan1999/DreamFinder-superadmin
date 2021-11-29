/* eslint-disable */

import { VIEW_ADMINISTRATOR_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_ADMINISTRATOR_CONSTANT } from '../../../Constant/Constants';

const initial_state = {
  administrator: [],
  loading:false
};
const state_administrator = {
  currentAdministrator: [],
//   isEdit: false,
  view: false,
};

export const ViewAdministratorReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_ADMINISTRATOR_CONSTANT.VIEW_ADMINISTRATOR_LOADING:
      return { ...state, loading: action?.payload,administrator:[] };

    case VIEW_ADMINISTRATOR_CONSTANT.VIEW_ADMINISTRATOR_SUCESS:
      return { ...state, administrator: action?.payload };

    case VIEW_ADMINISTRATOR_CONSTANT.VIEW_ADMINISTRATOR_ERROR:
      return { ...state, administrator: action?.payload };

    default:
      return state;
  }
};
export const ViewCurrentAdministratorReducer = (state = state_administrator, action) => {
  switch (action.type) {
    case VIEW_CURRENT_ADMINISTRATOR_CONSTANT.VIEW_CURRENT_ADMINISTRATOR_LOADING:
      return { ...state, currentAdministrator: action?.payload, view: true };

    case VIEW_CURRENT_ADMINISTRATOR_CONSTANT.VIEW_CURRENT_ADMINISTRATOR_SUCESS:
      return { ...state, currentAdministrator: action?.payload, view: true };

    case VIEW_CURRENT_ADMINISTRATOR_CONSTANT.VIEW_CURRENT_ADMINISTRATOR_ERROR:
      return { ...state, currentAdministrator: action?.payload, view: true };

    default:
      return state;
  }
};

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
