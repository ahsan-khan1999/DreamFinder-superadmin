/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
    DEPARTMENT_HEAD_CONSTANT,
} from 'Store/Constant/Constants';



// Department Head
export const GetDepartmentHead = () => async (dispatch) => {
    try {
      dispatch({
        type: DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_LOADING,
        payload: true,
      });
  
      let res = await apiServices.getdepartmentHead();
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_LOADING,
          payload: false,
        });
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_SUCESS,
          payload: res?.data?.response_data,
        });
      } else {
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_ERROR,
          payload: [],
        });
      }
    } catch {}
  };


  export const CreateDepartmentHead = (data) => async (dispatch) => {
    try {
      dispatch({
        type: DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_LOADING_All,
        payload: true,
      });
      
      let res = await apiServices.createdepartmentHead(data);
      dispatch({
        type: DEPARTMENT_HEAD_CONSTANT.CREATE_DEPARTMENT_HEAD_LOADING,
        payload: true
      })
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.CREATE_DEPARTMENT_HEAD_SUCCESS,
          payload: res
        })
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_LOADING_All,
          payload: false,
        });    
        return true
      } else {
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.CREATE_DEPARTMENT_HEAD_ERROR,
          payload: res?.data?.response_code
        })
        NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_LOADING_All,
          payload: false,
        });    
        return false
  
      }
  } catch (error) {
    dispatch({
      type: DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_LOADING_All,
      payload: true,
    });
      throw error.response
    }
  };


  export const UpdateDepartmentHead = (data) => async (dispatch) => {
    try {
      dispatch({
        type: DEPARTMENT_HEAD_CONSTANT.UPDATE_DEPARTMENT_HEAD_LOADING,
        payload: true,
      });
      let res = await apiServices.updatedepartmentHead(data);
      console.log(res);
      if (res?.response_code === 200) {
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.UPDATE_DEPARTMENT_HEAD_LOADING,
          payload: false,
        });
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.UPDATE_DEPARTMENT_HEAD_SUCCESS,
          payload: true,
        });
        return true;
      } else {
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.UPDATE_DEPARTMENT_HEAD_ERROR,
          payload: true,
        });
        dispatch({
          type: DEPARTMENT_HEAD_CONSTANT.UPDATE_DEPARTMENT_HEAD_LOADING,
          payload: true,
        });
        NotificationManager.error(res?.response_message, 'Error', 5000, '');
        return false;
      }
    } catch {}
};
  