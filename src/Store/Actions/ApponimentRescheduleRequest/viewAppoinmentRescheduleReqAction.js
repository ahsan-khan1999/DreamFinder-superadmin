/* eslint-disable */
// http://localhost:3000/user/forgot-password
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from '../../../services/requestHandler';
import {
  VIEW_RESCHEDULE_REQUEST,
  UPDATE_RESCHEDULE_REQUEST,
  VIEW_CURRENT_APPOINMTENT_REQUEST_CONSTANTS,
  CANCAL_APPOINTMENT_REQEUEST
} from '../../Constant/Constants';

export const ViewAppoinmentRescheduleRequestAction = () => async (dispatch) => {
  dispatch({
    type: VIEW_RESCHEDULE_REQUEST.VIEW_RESCHEDULE_REQUEST_LOADING,
    payload: true,
  });
  const res = await apiServices.getAppoinmentsRescheduleRequest();

  if (res?.data?.response_code === 200) {
    dispatch({
      type: VIEW_RESCHEDULE_REQUEST.VIEW_RESCHEDULE_REQUEST_SUCESS,
      payload: res?.data?.response_data?.request,
    });
    return true;
  } else {
    dispatch({
      type: VIEW_RESCHEDULE_REQUEST.VIEW_RESCHEDULE_REQUEST_ERROR,
      payload: false,
    });
    return false;
  }
};
export const getCurrentRequest = (data) => async (dispatch) => {
  try {
    //   let res = await apiServices.getDoctorRequests();
    // console.log(res);

    dispatch({
      type: VIEW_CURRENT_APPOINMTENT_REQUEST_CONSTANTS.VIEW_CURRENT_APPOINMTENT_REQUEST_LOADING,
      payload: [],
    });
    if (data !== null) {
      dispatch({
        type: VIEW_CURRENT_APPOINMTENT_REQUEST_CONSTANTS.VIEW_CURRENT_APPOINMTENT_REQUEST_SUCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: VIEW_CURRENT_APPOINMTENT_REQUEST_CONSTANTS.VIEW_CURRENT_APPOINMTENT_REQUEST_ERROR,
        payload: [],
      });
    }
  } catch {}
};

export const RejectAppointmentReschedule = () => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_LOADING,
      payload: true,
    });

    let res = await apiServices.getDoctorRequests();
    // console.log(res);

    if (res?.data?.response_code === 200) {
      dispatch({
        type: UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_SUCESS,
        payload: false,
      });
      dispatch({
        type: UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_SUCESS,
        payload: res?.data?.response_data?.request,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_ERROR,
        payload: res?.data?.response_code,
      });
      return false;
    }
  } catch {}
};

export const AcceptAppointmentAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_LOADING,
      payload: true,
    });

    let res = await apiServices.requestApproval(data);

    if (res?.response_code === 200) {
      dispatch({
        type: UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_SUCESS,
        payload: res?.response_data?.request,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_ERROR,
        payload: res?.response_code,
      });

      NotificationManager.error(res?.response_message, 'Error', 5000, null, '');
      return false;
    }
  } catch {}
};

export const cancalAppointmentAction = (data) => async(dispatch) => {
  try{
    dispatch({
      type:CANCAL_APPOINTMENT_REQEUEST.CANCAL_APPOINTMENT_REQEUEST_LOADING,
      payload:true
    })
    let response = await apiServices.cancalAppointment(data)
    // console.log(response);

    if(response?.response_code === 200) {
      dispatch({
        type:CANCAL_APPOINTMENT_REQEUEST.CANCAL_APPOINTMENT_REQEUEST_LOADING,
        payload:false
      })
      dispatch({
        type:CANCAL_APPOINTMENT_REQEUEST.CANCAL_APPOINTMENT_REQEUEST_SUCESS,
        payload:response?.response_data
      })
      return true
    }else{
      dispatch({
        type:CANCAL_APPOINTMENT_REQEUEST.CANCAL_APPOINTMENT_REQEUEST_ERROR,
        payload:response?.response_message
      })
      NotificationManager.error(response?.response_message,"error",5000,'','')
      return;
    }
  }catch{

  }

}