/* eslint-disable */

import { VIEW_SUPERADMIN_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_SUPERADMIN_CONSTANT } from '../../../Constant/Constants';

const initial_state = {
  superAdmin: [],
  loading:false
};
const state_doctor = {
  currentSuperAdmin: [],
//   isEdit: false,
  view: false,
};

export const ViewSuperAdminReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_SUPERADMIN_CONSTANT.VIEW_SUPERADMIN_LOADING:
      return { ...state, loading: action?.payload,superAdmin:[] };

    case VIEW_SUPERADMIN_CONSTANT.VIEW_SUPERADMIN_SUCESS:
      return { ...state, superAdmin: action?.payload };

    case VIEW_SUPERADMIN_CONSTANT.VIEW_SUPERADMIN_ERROR:
      return { ...state, superAdmin: action?.payload };

    default:
      return state;
  }
};
export const ViewCurrentSuperAdminReducer = (state = state_doctor, action) => {
  switch (action.type) {
    case VIEW_CURRENT_SUPERADMIN_CONSTANT.VIEW_CURRENT_SUPERADMIN_LOADING:
      return { ...state, currentSuperAdmin: action?.payload, view: true };

    case VIEW_CURRENT_SUPERADMIN_CONSTANT.VIEW_CURRENT_SUPERADMIN_SUCESS:
      return { ...state, currentSuperAdmin: action?.payload, view: true };

    case VIEW_CURRENT_SUPERADMIN_CONSTANT.VIEW_CURRENT_SUPERADMIN_ERROR:
      return { ...state, currentSuperAdmin: action?.payload, view: true };

    default:
      return state;
  }
};

