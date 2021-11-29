/* eslint-disable */

import { VIEW_PATIENT_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_PATIENT_CONSTANT } from '../../../Constant/Constants';

const initial_state = {
  patient: [],
  loading:false
};
const state_doctor = {
  currentPatient: [],
//   isEdit: false,
  view: false,
};

export const ViewPatientReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_PATIENT_CONSTANT.VIEW_PATIENT_LOADING:
      return { ...state, loading: action?.payload,patient:[] };

    case VIEW_PATIENT_CONSTANT.VIEW_PATIENT_SUCESS:
      return { ...state, patient: action?.payload };

    case VIEW_PATIENT_CONSTANT.VIEW_PATIENT_ERROR:
      return { ...state, patient: action?.payload };

    default:
      return state;
  }
};
export const ViewCurrentPatientReducer = (state = state_doctor, action) => {
  switch (action.type) {
    case VIEW_CURRENT_PATIENT_CONSTANT.VIEW_CURRENT_PATIENT_LOADING:
      return { ...state, currentPatient: action?.payload, view: true };

    case VIEW_CURRENT_PATIENT_CONSTANT.VIEW_CURRENT_PATIENT_SUCESS:
      return { ...state, currentPatient: action?.payload, view: true };

    case VIEW_CURRENT_PATIENT_CONSTANT.VIEW_CURRENT_PATIENT_ERROR:
      return { ...state, currentPatient: action?.payload, view: true };

    default:
      return state;
  }
};

