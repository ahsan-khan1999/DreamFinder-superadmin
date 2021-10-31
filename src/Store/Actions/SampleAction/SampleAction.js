/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
  CREATE_SAMPLE_CONSTANT,
  UPDATE_SAMPLE_CONSTANT,
  SUSPAND_SAMPLE_CONSTANT,
  VIEW_SAMPLE_CONSTANT,
  VIEW_SAMPLE_TRANSACTION_CONSTANT,
  CREATE_SAMPLE_TRANSACTION_CONSTANT,
  SUSPAND_SAMPLE_TRANSACTION_CONSTANT,
} from 'Store/Constant/Constants';

export const ViewSampleAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_SAMPLE_CONSTANT.VIEW_SAMPLE_LOADING,
      payload: true,
    });
    let res = await apiServices.ReadSample();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_SAMPLE_CONSTANT.VIEW_SAMPLE_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_SAMPLE_CONSTANT.VIEW_SAMPLE_SUCCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_SAMPLE_CONSTANT.VIEW_SAMPLE_ERROR,
        payload: false,
      });
    }
  } catch {}
};
export const CreateSampleAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SAMPLE_CONSTANT.CREATE_SAMPLE_LOADING,
      payload: true,
    });
    let res = await apiServices.CreateSample(data);
    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_SAMPLE_CONSTANT.CREATE_SAMPLE_LOADING,
        payload: true,
      });
      dispatch({
        type: CREATE_SAMPLE_CONSTANT.CREATE_SAMPLE_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_SAMPLE_CONSTANT.CREATE_SAMPLE_ERROR,
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

export const UpdateSampleAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_SAMPLE_CONSTANT.UPDATE_SAMPLE_LOADING,
      payload: true,
    });
    let res = await apiServices.UpdateSample(data);
    if (res?.response_code === 200) {
      dispatch({
        type: UPDATE_SAMPLE_CONSTANT.UPDATE_SAMPLE_LOADING,
        payload: true,
      });
      dispatch({
        type: UPDATE_SAMPLE_CONSTANT.UPDATE_SAMPLE_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_SAMPLE_CONSTANT.UPDATE_SAMPLE_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.response_message, 'Error', 5000, null, '');
      return false;
    }
  } catch {}
};

export const SuspandSampleAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUSPAND_SAMPLE_CONSTANT.SUSPAND_SAMPLE_LOADING,
      payload: true,
    });
    let res = await apiServices.SuapandSample(data);
    if (res?.response_code === 200) {
      dispatch({
        type: SUSPAND_SAMPLE_CONSTANT.SUSPAND_SAMPLE_LOADING,
        payload: false,
      });
      dispatch({
        type: SUSPAND_SAMPLE_CONSTANT.SUSPAND_SAMPLE_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: SUSPAND_SAMPLE_CONSTANT.SUSPAND_SAMPLE_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.response_message, 'Error', 5000, null, '');
      return false;
    }
  } catch {}
};
export const CreateSampleTransactionAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SAMPLE_TRANSACTION_CONSTANT.CREATE_SAMPLE_TRANSACTION_LOADING,
      payload: true,
    });
    let res = await apiServices.CreateSampleTransaction(data);
    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_SAMPLE_TRANSACTION_CONSTANT.CREATE_SAMPLE_TRANSACTION_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_SAMPLE_TRANSACTION_CONSTANT.CREATE_SAMPLE_TRANSACTION_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_SAMPLE_TRANSACTION_CONSTANT.CREATE_SAMPLE_TRANSACTION_ERROR,
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

export const ViewSampleTransactionAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_SAMPLE_TRANSACTION_CONSTANT.VIEW_SAMPLE_TRANSACTION_LOADING,
      payload: true,
    });
    let res = await apiServices.ReadSampleTransaction();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_SAMPLE_TRANSACTION_CONSTANT.VIEW_SAMPLE_TRANSACTION_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_SAMPLE_TRANSACTION_CONSTANT.VIEW_SAMPLE_TRANSACTION_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: VIEW_SAMPLE_TRANSACTION_CONSTANT.VIEW_SAMPLE_TRANSACTION_ERROR,
        payload: false,
      });
      // NotificationManager.error(
      //   res?.data?.response_message,
      //   'Error',
      //   5000,
      //   null,
      //   ''
      // );
      return false;
    }
  } catch {}
};
export const SuspandSampleTransactionAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUSPAND_SAMPLE_TRANSACTION_CONSTANT.SUSPAND_SAMPLE_TRANSACTION_LOADING,
      payload: true,
    });
    let res = await apiServices.SuspandSampleTransaction(data);
    if (res?.response_code === 200) {
      dispatch({
        type: SUSPAND_SAMPLE_TRANSACTION_CONSTANT.SUSPAND_SAMPLE_TRANSACTION_LOADING,
        payload: false,
      });
      dispatch({
        type: SUSPAND_SAMPLE_TRANSACTION_CONSTANT.SUSPAND_SAMPLE_TRANSACTION_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: SUSPAND_SAMPLE_TRANSACTION_CONSTANT.SUSPAND_SAMPLE_TRANSACTION_ERROR,
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
