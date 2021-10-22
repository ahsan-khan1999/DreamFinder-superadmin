/* eslint-disable */
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
  ORDER_CONSTANTS,
} from 'Store/Constant/Constants';



export const OrderAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CONSTANTS.ORDER_LOADING,
      payload: true,
    });

    let res = await apiServices.getorder();

    if (res?.data?.response_code === 200) {
      dispatch({
        type: ORDER_CONSTANTS.ORDER_LOADING,
        payload: false,
      });
      dispatch({
        type: ORDER_CONSTANTS.ORDER_SUCESS,
        payload: res?.data?.response_data,
      });
    } else {
      alert('in else');
      dispatch({
        type: ORDER_CONSTANTS.ORDER_ERROR,
        payload: [],
      });
    }
  } catch {}
};
