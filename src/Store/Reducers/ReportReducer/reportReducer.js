/* eslint-disable */

import { VIEW_REPORT_CONSTANT } from '../../Constant/Constants';

const initial_state = {
  reports: [],
  loading: false,
};
export const ViewReportReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_REPORT_CONSTANT.VIEW_REPORT_LOADING:
      return { ...state, loading: action.payload, requests: [] };
    case VIEW_REPORT_CONSTANT.VIEW_REPORT_SUCCESS:
      return { ...state, reports: action.payload };
    case VIEW_REPORT_CONSTANT.VIEW_REPORT_ERROR:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
