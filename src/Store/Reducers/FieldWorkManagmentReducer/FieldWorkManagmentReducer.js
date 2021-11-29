/* eslint-disable */

import {
  VIEW_DCP_CONSTANT,
  CREATE_DCP_CONSTANT,
  VIEW_SCHEDULE_CONSTANT,
  VIEW_DCR_CONSTANT,
} from 'Store/Constant/Constants';
const initial_state = {
  dcp: [],
  create: [],
  loading: false,
  schedule: [],
  dcr: [],
};
export const DcpReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_DCP_CONSTANT.VIEW_DCP_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_DCP_CONSTANT.VIEW_DCP_SUCCESS:
      return { ...state, dcp: action.payload };
    case VIEW_DCP_CONSTANT.VIEW_DCP_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_DCP_CONSTANT.CREATE_DCP_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_DCP_CONSTANT.CREATE_DCP_SUCCESS:
      return { ...state, create: action.payload };
    case CREATE_DCP_CONSTANT.CREATE_DCP_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_SCHEDULE_CONSTANT.VIEW_SCHEDULE_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_SCHEDULE_CONSTANT.VIEW_SCHEDULE_SUCCESS:
      return { ...state, schedule: action.payload };
    case VIEW_SCHEDULE_CONSTANT.VIEW_SCHEDULE_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_DCR_CONSTANT.VIEW_DCR_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_DCR_CONSTANT.VIEW_DCR_SUCCESS:
      return { ...state, dcr: action.payload };
    case VIEW_DCR_CONSTANT.VIEW_DCR_ERROR:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
