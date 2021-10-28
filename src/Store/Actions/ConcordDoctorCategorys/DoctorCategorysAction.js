/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
    DOCTOR_CATEGORY_CONSTANT,
} from 'Store/Constant/Constants';



// DOCTOR CATEGORYS
export const GetDoctorCategory = () => async (dispatch) => {
    try {
      dispatch({
        type: DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_LOADING,
        payload: true,
      });
  
      let res = await apiServices.getdoctorcategorys();
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_LOADING,
          payload: false,
        });
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_SUCESS,
          payload: res?.data?.response_data,
        });
      } else {
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_ERROR,
          payload: [],
        });
      }
    } catch {}
  };


  export const CreateDoctorCategory = (data) => async (dispatch) => {
    try {
      dispatch({
        type: DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_LOADING_All,
        payload: true,
      });
      
      let res = await apiServices.createdoctorcategorys(data);
      dispatch({
        type: DOCTOR_CATEGORY_CONSTANT.CREATE_DOCTOR_CATEGORY_LOADING,
        payload: true
      })
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.CREATE_DOCTOR_CATEGORY_SUCCESS,
          payload: res
        })
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_LOADING_All,
          payload: false,
        });    
        return true
      } else {
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.CREATE_DOCTOR_CATEGORY_ERROR,
          payload: res?.data?.response_code
        })
        NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_LOADING_All,
          payload: false,
        });    
        return false
  
      }
  } catch (error) {
    dispatch({
      type: DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_LOADING_All,
      payload: true,
    });
      throw error.response
    }
  };


  export const UpdateDoctorCategory = (data) => async (dispatch) => {
    try {
      dispatch({
        type: DOCTOR_CATEGORY_CONSTANT.UPDATE_DOCTOR_CATEGORY_LOADING,
        payload: true,
      });
      let res = await apiServices.updatedoctorcategorys(data);
      console.log(res);
      if (res?.response_code === 200) {
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.UPDATE_DOCTOR_CATEGORY_LOADING,
          payload: false,
        });
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.UPDATE_DOCTOR_CATEGORY_SUCCESS,
          payload: true,
        });
        return true;
      } else {
        dispatch({
          type: DOCTOR_CATEGORY_CONSTANT.UPDATE_DOCTOR_CATEGORY_ERROR,
          payload: true,
        });
        NotificationManager.error(res?.response_message, 'Error', 5000, '');
        return false;
      }
    } catch {}
  };
  