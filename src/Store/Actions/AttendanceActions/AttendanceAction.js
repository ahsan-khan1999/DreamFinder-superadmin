/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { BASEURL } from 'services/HttpProvider';
import apiServices from 'services/requestHandler';
import {
  VIEW_ATTENDANCE_CONSTANT,
  CREATE_ATTENDANCE_CONSTANT,
  SUSPAND_ATTENDANCE_CONSTANT,
  VIEW_USER_CONSTANT,
  GET_OLD_CONSTANT,
  LOADER_CONSTANT,
} from 'Store/Constant/Constants';
import { getToken } from 'Utils/auth.util';

export const ViewAttendanceAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_LOADING,
      payload: true,
    });

    let res = await apiServices.readAttendance();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_SUCCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_ERROR,
        payload: false,
      });
    }
  } catch {}
};

export const SuspandAttendanceAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_LOADING,
      payload: true,
    });

    let res = await apiServices.suspandAttendance(data);
    if (res?.response_code === 200) {
      dispatch({
        type: SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_LOADING,
        payload: false,
      });
      dispatch({
        type: SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.response_message, 'Error', 5000, null, '');
      return false;
    }
  } catch {}
};

export const CreateAttendanceAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_LOADING,
      payload: true,
    });

    let res = await apiServices.createAttendance(data);
    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_ERROR,
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

export const getUsers = (uid, user) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem('token'));
  try {
    if (user == 'sm') {
      dispatch({
        type: LOADER_CONSTANT.SM_LOADING,
        payload: true,
      });
    } else if (user == 'rsm') {
      dispatch({
        type: LOADER_CONSTANT.RSM_LOADING,
        payload: true,
      });
    } else if (user == 'am') {
      dispatch({
        type: LOADER_CONSTANT.AM_LOADING,
        payload: true,
      });
    } else if (user == 'mpo') {
      dispatch({
        type: LOADER_CONSTANT.MPO_LOADING,
        payload: true,
      });
    }

    const head = { 'x-session-key': token.token, 'x-session-type': token.type };
    const response = await axios.get(
      BASEURL+`/users/read/${user}?manager_uid=${uid}`,
      { headers: head }
    );
    if (response?.data?.response_code === 200) {
      if (user === 'sm') {
        dispatch({
          type: LOADER_CONSTANT.SM_LOADING,
          payload: false,
        });

        dispatch({
          type: VIEW_USER_CONSTANT.GET_SM,
          payload: response?.data?.response_data,
        });
      } else if (user === 'rsm') {
        dispatch({
          type: LOADER_CONSTANT.RSM_LOADING,
          payload: false,
        });
        dispatch({
          type: VIEW_USER_CONSTANT.GET_RSM,
          payload: response?.data?.response_data,
        });
      } else if (user === 'am') {
        dispatch({
          type: LOADER_CONSTANT.AM_LOADING,
          payload: false,
        });
        dispatch({
          type: VIEW_USER_CONSTANT.GET_AM,
          payload: response?.data?.response_data,
        });
      } else if (user === 'mpo') {
        dispatch({
          type: LOADER_CONSTANT.MPO_LOADING,
          payload: false,
        });
        dispatch({
          type: VIEW_USER_CONSTANT.GET_MPO,
          payload: response?.data?.response_data,
        });
      } else {
        
        // dispatch({
        //   type: ORDER_CONSTANTS.ORDER_GET_USER,
        //   payload: response?.data?.response_data,
        // });
      }
    }
  } catch (error) {
    return 'Fail';
  }
};



export const GetOldGiftsAction = (uid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_OLD_CONSTANT.GET_OLD_LOADING,
      payload: true,
    });

    let token = await getToken();
    const res = await axios.get(
      BASEURL+`/fieldstaffs/read_gift?user_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );
    if (res?.data?.response_code === 200) {
      dispatch({
        type: GET_OLD_CONSTANT.GET_OLD_LOADING,
        payload: false,
      });
      dispatch({
        type: GET_OLD_CONSTANT.GET_OLD_SUCCESS,
        payload: res?.data?.response_data?.assigned_gifts,
      });
    } else {
      dispatch({
        type: GET_OLD_CONSTANT.GET_OLD_ERROR,
        payload: false,
      });
    }
  } catch {}
};
