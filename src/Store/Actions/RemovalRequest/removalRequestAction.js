/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
  VIEW_REMOVAL_REQUEST_CONSTANTS,
  VIEW_CURRENT_REMOVAL_REQUEST_CONSTANTS,
  ACCEPT_REMOVAL_REQUEST_CONSTANTS,
  UPDATE_RESCHEDULE_REQUEST
} from 'Store/Constant/Constants';
import { getToken } from 'Utils/auth.util';

export const RemovalRequestAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_REMOVAL_REQUEST_CONSTANTS.VIEW_REMOVAL_REQUEST_LOADING,
      payload: true,
    });
    
    let res = await apiServices.getDoctorRequests();
    // console.log(res);

    
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_REMOVAL_REQUEST_CONSTANTS.VIEW_REMOVAL_REQUEST_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_REMOVAL_REQUEST_CONSTANTS.VIEW_REMOVAL_REQUEST_SUCESS,
        payload: res?.data?.response_data?.request,
      });
      return true;
    } else {
      dispatch({
        type: VIEW_REMOVAL_REQUEST_CONSTANTS.VIEW_REMOVAL_REQUEST_ERROR,
        payload: res?.data?.response_code,
      });
      return false;
    }
  } catch {}
};

export const AcceptRemovalAction = (data) => async (dispatch) => {
  try {
    let token = await getToken()
    let res =await axios.put(
      'https://dmfr-backend.herokuapp.com/api/v1/request/approval',
      data,
      {
        headers: {
          "x-session-key": token?.token,
          "x-session-type": token?.type,
        },
      }
    );
    // let res = await apiServices.requestApproval(data);
    // console.log(res);

    dispatch({
      type:ACCEPT_REMOVAL_REQUEST_CONSTANTS.ACCEPT_REMOVAL_REQUEST_LOADING,
      payload:false
    })
    dispatch({
      type:ACCEPT_REMOVAL_REQUEST_CONSTANTS.ACCEPT_REMOVAL_REQUEST_LOADING,
      payload:false
    })
    if(res?.data?.response_code === 200){
      dispatch({
        type:ACCEPT_REMOVAL_REQUEST_CONSTANTS.ACCEPT_REMOVAL_REQUEST_SUCESS,
        payload:res?.data?.response_data
      })
      return true
    }
    else{
      dispatch({
        type:ACCEPT_REMOVAL_REQUEST_CONSTANTS.ACCEPT_REMOVAL_REQUEST_ERROR,
        payload:res.data.response_code
      })
      NotificationManager.warning(res?.data?.response_message , "Error", 5000, null, '');

      return true
    }
  } catch {}
};
export const getCurrentRequest = (data) => async (dispatch) => {
  try {
    //   let res = await apiServices.getDoctorRequests();
    // console.log(res);

    dispatch({
      type: VIEW_CURRENT_REMOVAL_REQUEST_CONSTANTS.VIEW_CURRENT_REMOVAL_REQUEST_LOADING,
      payload: [],
    });
    if (data !== null) {
      dispatch({
        type: VIEW_CURRENT_REMOVAL_REQUEST_CONSTANTS.VIEW_CURRENT_REMOVAL_REQUEST_SUCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: VIEW_CURRENT_REMOVAL_REQUEST_CONSTANTS.VIEW_CURRENT_REMOVAL_REQUEST_ERROR,
        payload: [],
      });
    }
  } catch {}
};
