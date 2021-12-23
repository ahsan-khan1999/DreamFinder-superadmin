/* eslint-disable */
import { VIEW_LABADMIN_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_LABADMIN_CONSTANT } from '../../../Constant/Constants';

import apiServices from '../../../../services/requestHandler';
import localStoreUtil from '../../../../Utils/localstore.util';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';

export const ViewLabAdminAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_LABADMIN_CONSTANT.VIEW_LABADMIN_LOADING,
      payload: true,
    });

    let response = await apiServices.getLabAdmin();
    // console.log(response, 'response');

    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_LABADMIN_CONSTANT.VIEW_LABADMIN_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_LABADMIN_CONSTANT.VIEW_LABADMIN_SUCESS,
        payload: response?.data?.response_data?.laboratory_admin,
      });

      return true;
    } else {
      dispatch({
        type: VIEW_LABADMIN_CONSTANT.VIEW_LABADMIN_ERROR,
        payload: [],
      });
      return false;
    }
  } catch {}
};
export const ViewCurrentLabAdminAction = (data, view) => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_CURRENT_LABADMIN_CONSTANT.VIEW_CURRENT_LABADMIN_LOADING,
      payload: {},
    });
    if (data !== null) {
      dispatch({
        type: VIEW_CURRENT_LABADMIN_CONSTANT.VIEW_CURRENT_LABADMIN_SUCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: VIEW_CURRENT_LABADMIN_CONSTANT.VIEW_CURRENT_LABADMIN_ERROR,
        payload: {},
      });
    }
  } catch {}
};
