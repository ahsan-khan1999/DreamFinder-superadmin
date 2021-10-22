/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
  VIEW_ORDER_CONSTANTS,
  VIEW_CURRENT_ORDER_CONSTANTS,
  UPDATE_ORDER_CONSTANT,
} from 'Store/Constant/Constants';

export const ViewOrderAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_ORDER_CONSTANTS.VIEW_ORDER_LOADING,
      payload: false,
    });


    let res = await apiServices.getOrders();

    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_ORDER_CONSTANTS.VIEW_ORDER_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_ORDER_CONSTANTS.VIEW_ORDER_SUCESS,
        payload: res?.data?.response_data?.order,
      });
    } else {
      alert('in else');
      dispatch({
        type: VIEW_ORDER_CONSTANTS.VIEW_ORDER_ERROR,
        payload: [],
      });
    }
  } catch {}
};
export const ViewCurrentOrderAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_CURRENT_ORDER_CONSTANTS.VIEW_CURRENT_ORDER_LOADING,
      payload: [],
    });

    if (data !== null) {
      dispatch({
        type: VIEW_CURRENT_ORDER_CONSTANTS.VIEW_CURRENT_ORDER_SUCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: VIEW_CURRENT_ORDER_CONSTANTS.VIEW_CURRENT_ORDER_ERROR,
        payload: [],
      });
    }
  } catch {}
};

export const updateOrderAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ORDER_CONSTANT.UPDATE_ORDER_LOADING,
      payload: true,
    });
    let res = await apiServices.changeDeliveryStatus(data);

    if (res?.response_code === 200) {
      dispatch({
        type: UPDATE_ORDER_CONSTANT.UPDATE_ORDER_SUCESS,
        payload: res?.response_data?.order,
      });
      return true
    }
    else{
      dispatch({
        type: UPDATE_ORDER_CONSTANT.UPDATE_ORDER_ERROR,
        payload: res?.response_message,
      });
      NotificationManager.error(res?.response_message , "Error", 5000, null, '');

      return false

    }
  } catch {}
};
