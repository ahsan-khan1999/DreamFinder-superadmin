/* eslint-disable */

import { VIEW_PHARMACY_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_PHARMACY_CONSTANT } from '../../../Constant/Constants';

const initial_state = {
  pharmacy: [],
  loading:false
};
const state_doctor = {
  currentPharmacy: [],
//   isEdit: false,
  view: false,
};

export const ViewPharmacyReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_PHARMACY_CONSTANT.VIEW_PHARMACY_LOADING:
      return { ...state, loading: action?.payload ,pharmacy:[]};

    case VIEW_PHARMACY_CONSTANT.VIEW_PHARMACY_SUCESS:
      return { ...state, pharmacy: action?.payload };

    case VIEW_PHARMACY_CONSTANT.VIEW_PHARMACY_ERROR:
      return { ...state, pharmacy: action?.payload };

    default:
      return state;
  }
};
export const ViewCurrentPharmacyReducer = (state = state_doctor, action) => {
  switch (action.type) {
    case VIEW_CURRENT_PHARMACY_CONSTANT.VIEW_CURRENT_PHARMACY_LOADING:
      return { ...state, currentPharmacy: action?.payload, view: true };

    case VIEW_CURRENT_PHARMACY_CONSTANT.VIEW_CURRENT_PHARMACY_SUCESS:
      return { ...state, currentPharmacy: action?.payload, view: true };

    case VIEW_CURRENT_PHARMACY_CONSTANT.VIEW_CURRENT_PHARMACY_ERROR:
      return { ...state, currentPharmacy: action?.payload, view: true };

    default:
      return state;
  }
};

