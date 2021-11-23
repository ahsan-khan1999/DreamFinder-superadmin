/* eslint-disable */
import {
  LOGIN_CONSTANTS,
  LOGOUT_USER,
  SET_USER_FROM_LOCAL,
  CHANGE_PASSWORD_CONSTANT,
  FORGOT_CONSTANTS,
} from '../../Constant/Constants';
import apiServices from '../../../services/requestHandler';
import localStoreUtil from '../../../Utils/localstore.util';
import { getToken, saveUser, setToken } from '../../../Utils/auth.util';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { NotificationManager } from 'components/common/react-notifications';

export const Login_action = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_CONSTANTS.LOGIN_LOADING,
      payload: true,
    });

    // AhsanKhan017
    // ripple123
    const response = await apiServices.login(data);

    // console.log(response);
    if (response?.data?.response_code === 200) {
      const dataObj = {
        user: response?.data?.response_data?.token?.user,
        token: response?.data?.response_data?.token?.access_token,
      };
      setToken({
        token: response?.data?.response_data?.token?.access_token,
        type: response?.data?.response_data?.token?.user?.role?.name,
      });
      saveUser(response?.data?.response_data?.token?.user);
      dispatch({
        type: LOGIN_CONSTANTS.LOGIN_LOADING,
        payload: false,
      });
      dispatch({
        type: LOGIN_CONSTANTS.LOGIN_SUCESS,
        payload: dataObj,
      });

      return true;
    } else {
      dispatch({
        type: LOGIN_CONSTANTS.LOGIN_LOADING,
        payload: false,
      });
      dispatch({
        type: LOGIN_CONSTANTS.LOGIN_ERROR,
        payload: response?.data?.response_code,
      });
      NotificationManager.error(
        response?.data?.response_message,
        'Login Error',
        3000,
        null,
        null,
        ''
      );
      return false;
    }
  } catch {}
};
export const logOutUser = () => async (dispatch) => {
  try {
    let res = await apiServices.logout();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: LOGOUT_USER,
        payload: true,
      });
      return true;
    } else {
      dispatch({
        type: LOGOUT_USER,
        payload: false,
      });
      NotificationManager.error(res?.data?.response_message, 'Error', 5000, '');

      return false;
    }
  } catch {}
};

export const setUserFromLocal = (data) => async (dispatch) => {
  // alert("set action")
  dispatch({
    type: SET_USER_FROM_LOCAL,
    payload: data,
  });
};
export const ChangePasswordAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_LOADING,
      payload: true,
    });

    let res = await apiServices.changePassword(data);

    if (res?.response_code === 200) {
      dispatch({
        type: CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_LOADING,
        payload: false,
      });
      dispatch({
        type: CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_SUCESS,
        payload: res,
      });
      return true;
    } else {
      dispatch({
        type: CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_ERROR,
        payload: res?.response_code,
      });
      NotificationManager.error(res?.response_message, 'Error', 3000, null, '');

      return false;
    }
  } catch {}

  //   const res = await apiServices.changePassword(data)
  //   console.log(res);
};

// payload: response?.data?.response_data?.static_data,
export const ForgotAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_CONSTANTS.FORGOT_LOADING,
      payload: true,
    });
    const res = await apiServices.forgotPassword(data);

    if (res?.data?.response_code === 200) {
      dispatch({
        type: FORGOT_CONSTANTS.FORGOT_LOADING,
        payload: false,
      });
      dispatch({
        type: FORGOT_CONSTANTS.FORGOT_SUCESS,
        payload: true,
      });
      return true;
    } else {
      dispatch({
        type: FORGOT_CONSTANTS.FORGOT_ERROR,
        payload: false,
      });
      return false;
    }
  } catch {}
};

export const resetPasswordAction = (data) => async (dispatch) => {
  try {
    const response = await apiServices.resetPassword(data);
    if (response?.response_code === 200) {
      NotificationManager.success(
        'Successful Password Reset',
        'Success',
        5000,
        ''
      );

      return true;
    } else {
      NotificationManager.success(
        response?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch (error) {
    toast.error(error);
  }
};
