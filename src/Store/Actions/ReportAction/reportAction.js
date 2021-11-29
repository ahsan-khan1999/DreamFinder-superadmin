/* eslint-disable */

import { VIEW_REPORT_CONSTANT } from '../../Constant/Constants';
import apiServices from 'services/requestHandler';

export const ViewReportAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_REPORT_CONSTANT.VIEW_REPORT_LOADING,
      payload: true,
    });
    let res = await apiServices.ReadReports();
    // console.log(res);
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_REPORT_CONSTANT.VIEW_REPORT_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_REPORT_CONSTANT.VIEW_REPORT_SUCCESS,
        payload: res?.data?.response_data?.test_report,
      });
      return true
    } else {
      dispatch({
        type: VIEW_REPORT_CONSTANT.VIEW_REPORT_ERROR,
        payload: true,
      });
      return false
    }
  } catch {}
};
