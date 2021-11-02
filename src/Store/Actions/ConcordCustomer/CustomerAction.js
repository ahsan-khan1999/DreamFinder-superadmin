/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
    CUSTOMER_CONSTANT,
} from 'Store/Constant/Constants';



// Customers
export const GetCustomer = () => async (dispatch) => {
    try {
      dispatch({
        type: CUSTOMER_CONSTANT.CUSTOMER_LOADING,
        payload: true,
      });
  
      let res = await apiServices.getcustomers();
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: CUSTOMER_CONSTANT.CUSTOMER_LOADING,
          payload: false,
        });
        dispatch({
          type: CUSTOMER_CONSTANT.CUSTOMER_SUCESS,
          payload: res?.data?.response_data,
        });
      } else {
        dispatch({
          type: CUSTOMER_CONSTANT.CUSTOMER_ERROR,
          payload: [],
        });
      }
    } catch {}
  };


  export const CreateCustomerRecord = (data) => async (dispatch) => {
    try {
      dispatch({
        type: CUSTOMER_CONSTANT.CUSTOMER_LOADING_All,
        payload: true,
      });
      
      let res = await apiServices.createcustomers(data);
      dispatch({
        type: CUSTOMER_CONSTANT.CREATE_CUSTOMER_LOADING,
        payload: true
      })
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: CUSTOMER_CONSTANT.CREATE_CUSTOMER_SUCCESS,
          payload: res
        })
        dispatch({
          type: CUSTOMER_CONSTANT.CUSTOMER_LOADING_All,
          payload: false,
        });    
        return true
      } else {
        dispatch({
          type: CUSTOMER_CONSTANT.CREATE_CUSTOMER_ERROR,
          payload: res?.data?.response_code
        })
        NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
        dispatch({
          type: CUSTOMER_CONSTANT.CUSTOMER_LOADING_All,
          payload: false,
        });    
        return false
  
      }
  } catch (error) {
    dispatch({
      type: CUSTOMER_CONSTANT.CUSTOMER_LOADING_All,
      payload: true,
    });
      throw error.response
    }
  };


  export const UpdateCustomer = (data) => async (dispatch) => {
    try {
      dispatch({
        type: CUSTOMER_CONSTANT.UPDATE_CUSTOMER_LOADING,
        payload: true,
      });
      let res = await apiServices.updatecustomers(data);
      if (res?.response_code === 200) {
        dispatch({
          type: CUSTOMER_CONSTANT.UPDATE_CUSTOMER_LOADING,
          payload: false,
        });
        dispatch({
          type: CUSTOMER_CONSTANT.UPDATE_CUSTOMER_SUCCESS,
          payload: true,
        });
        return true;
      } else {
        dispatch({
          type: CUSTOMER_CONSTANT.UPDATE_CUSTOMER_ERROR,
          payload: true,
        });
        NotificationManager.error(res?.response_message, 'Error', 5000, '');
        return false;
      }
    } catch {}
  };
  