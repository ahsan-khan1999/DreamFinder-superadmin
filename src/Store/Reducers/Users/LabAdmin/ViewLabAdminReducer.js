/* eslint-disable */

import { VIEW_LABADMIN_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_LABADMIN_CONSTANT } from '../../../Constant/Constants';

const initial_state = {
  labAdmin: [],
  loading:false
};
const state_doctor = {
  currentLabAdmin: [],
//   isEdit: false,
  view: false,
};

export const ViewLabAdminReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_LABADMIN_CONSTANT.VIEW_LABADMIN_LOADING:
      return { ...state, loading: action?.payload ,labAdmin:[]};

    case VIEW_LABADMIN_CONSTANT.VIEW_LABADMIN_SUCESS:
      return { ...state, labAdmin: action?.payload };

    case VIEW_LABADMIN_CONSTANT.VIEW_LABADMIN_ERROR:
      return { ...state, labAdmin: action?.payload };

    default:
      return state;
  }
};
export const ViewCurrentLabAdminReducer = (state = state_doctor, action) => {
  switch (action.type) {
    case VIEW_CURRENT_LABADMIN_CONSTANT.VIEW_CURRENT_LABADMIN_LOADING:
      return { ...state, currentLabAdmin: action?.payload, view: true };

    case VIEW_CURRENT_LABADMIN_CONSTANT.VIEW_CURRENT_LABADMIN_SUCESS:
      return { ...state, currentLabAdmin: action?.payload, view: true };

    case VIEW_CURRENT_LABADMIN_CONSTANT.VIEW_CURRENT_LABADMIN_ERROR:
      return { ...state, currentLabAdmin: action?.payload, view: true };

    default:
      return state;
  }
};


