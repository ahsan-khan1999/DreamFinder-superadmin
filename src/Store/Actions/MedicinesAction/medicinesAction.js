/* eslint-disable */

import {
  VIEW_MEDICINE_CONSTANT,
  CREATE_MEDICINE_CONSTANT,
  UPDATE_MEDICINE_CONSTANT,
} from '../../Constant/Constants';
import apiServices from 'services/requestHandler';
import { NotificationManager } from 'components/common/react-notifications';

export const ViewMedicinesAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_MEDICINE_CONSTANT.VIEW_MEDICINES_LOADING,
      payload: true,
    });
    let res = await apiServices.getMedicines();
    // console.log(res);

    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_MEDICINE_CONSTANT.VIEW_MEDICINES_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_MEDICINE_CONSTANT.VIEW_MEDICINES_SUCESS,
        payload: res?.data?.response_data?.medicine,
      });
      return true;
    } else {
      dispatch({
        type: VIEW_MEDICINE_CONSTANT.VIEW_MEDICINES_ERROR,
        payload: false,
      });
      return false;
    }
  } catch {}
};

export const CreateMedicinesAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_MEDICINE_CONSTANT.CREATE_MEDICINES_LOADING,
      payload: true,
    });
    let res = await apiServices.CreateMedicines(data);
    // console.log(res);

    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_MEDICINE_CONSTANT.CREATE_MEDICINES_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_MEDICINE_CONSTANT.CREATE_MEDICINES_SUCESS,
        payload: res?.data?.response_data?.medicine,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_MEDICINE_CONSTANT.CREATE_MEDICINES_ERROR,
        payload: false,
      });
      NotificationManager.error(
        res?.data?.response_message,
        'Error',
        5000,
        null,
        ''
      );

      return false;
    }
  } catch {}
};

export const UpdateMedicinesAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_MEDICINE_CONSTANT.UPDATE_MEDICINES_LOADING,
      payload: true,
    });
    let res = await apiServices.updateMedicines(data);
    // console.log(res);

    if (res?.response_code === 200) {
      dispatch({
        type: UPDATE_MEDICINE_CONSTANT.UPDATE_MEDICINES_LOADING,
        payload: false,
      });
      dispatch({
        type: UPDATE_MEDICINE_CONSTANT.UPDATE_MEDICINES_SUCESS,
        payload: res?.response_data?.medicine,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_MEDICINE_CONSTANT.UPDATE_MEDICINES_ERROR,
        payload: false,
      });
      NotificationManager.error(
        res?.response_message,
        'Error',
        5000,
        null,
        ''
      );
      return false;
    }
  } catch {}
};
