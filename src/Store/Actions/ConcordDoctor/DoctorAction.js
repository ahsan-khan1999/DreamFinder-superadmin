/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
    DOCTOR_CONSTANT,
} from 'Store/Constant/Constants';



// Doctors
export const GetDoctor = () => async (dispatch) => {
    try {
      dispatch({
        type: DOCTOR_CONSTANT.DOCTOR_LOADING,
        payload: true,
      });
  
      let res = await apiServices.getdoctors();
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_LOADING,
          payload: false,
        });
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_SUCESS,
          payload: res?.data?.response_data,
        });
      } else {
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_ERROR,
          payload: [],
        });
      }
    } catch {}
  };


  export const CreateDoctor = (data) => async (dispatch) => {
    try {
      dispatch({
        type: DOCTOR_CONSTANT.DOCTOR_LOADING_All,
        payload: true,
      });
      
      let res = await apiServices.createdoctors(data);
      dispatch({
        type: DOCTOR_CONSTANT.CREATE_DOCTOR_LOADING,
        payload: true
      })
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: DOCTOR_CONSTANT.CREATE_DOCTOR_SUCCESS,
          payload: res
        })
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_LOADING_All,
          payload: false,
        });    
        return true
      } else {
        dispatch({
          type: DOCTOR_CONSTANT.CREATE_DOCTOR_ERROR,
          payload: res?.data?.response_code
        })
        NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_LOADING_All,
          payload: false,
        });    
        return false
  
      }
  } catch (error) {
    dispatch({
      type: DOCTOR_CONSTANT.DOCTOR_LOADING_All,
      payload: true,
    });
      throw error.response
    }
  };


  export const UpdateDoctor = (data) => async (dispatch) => {
    try {
      dispatch({
        type: DOCTOR_CONSTANT.UPDATE_DOCTOR_LOADING,
        payload: true,
      });
      let res = await apiServices.updatedoctors(data);
      console.log(res);
      if (res?.response_code === 200) {
        dispatch({
          type: DOCTOR_CONSTANT.UPDATE_DOCTOR_LOADING,
          payload: false,
        });
        dispatch({
          type: DOCTOR_CONSTANT.UPDATE_DOCTOR_SUCCESS,
          payload: true,
        });
        return true;
      } else {
        dispatch({
          type: DOCTOR_CONSTANT.UPDATE_DOCTOR_ERROR,
          payload: true,
        });
        NotificationManager.error(res?.response_message, 'Error', 5000, '');
        return false;
      }
    } catch {}
  };
  