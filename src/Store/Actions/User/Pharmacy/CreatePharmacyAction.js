/* eslint-disable */

import apiServices from '../../../../services/requestHandler';
import {
  CREATE_PHARMACY_CONSTANT,
  UPDATE_PHARMACY_CONSTANT,
} from '../../../Constant/Constants';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
export const CreatePharmacyAction = (data) => async (dispatch) => {
  try {
    alert("in aaction")
    let res = await apiServices.createLabAdmin(data);
    alert("in aaction after")

    // console.log(res);

    //  Api Call

    dispatch({
      type: CREATE_PHARMACY_CONSTANT.CREATE_PHARMACY_LOADING,
      payload: true,
    });

    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_PHARMACY_CONSTANT.CREATE_PHARMACY_SUCESS,
        payload: res,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_PHARMACY_CONSTANT.CREATE_PHARMACY_ERROR,
        payload: res?.data?.response_code,
      });
      NotificationManager.warning(
        res?.data?.response_message,
        'Error',
        5000,
        null,
        ''
      );
      return false;
    }
  } catch (error) {
    throw error.response;
  }
};

export const UpdatePharmacyAction = (data) => async (dispatch) => {
  try {
    //  Api Call
    let res = await apiServices.updateAdmin(data);
    // console.log(res);

    dispatch({
      type: UPDATE_PHARMACY_CONSTANT.UPDATE_PHARMACY_LOADING,
      payload: true,
    });

    if (res?.response_data?.user[1] === 200) {
      dispatch({
        type: UPDATE_PHARMACY_CONSTANT.UPDATE_PHARMACY_SUCESS,
        payload: res,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_PHARMACY_CONSTANT.UPDATE_PHARMACY_ERROR,
        payload: res?.response_data?.user[1],
      });
      NotificationManager.warning(
        res?.response_data?.user[2],
        'Error',
        5000,
        null,
        ''
      );
      return false;
    }
  } catch (error) {
    throw error.response;
  }
};
