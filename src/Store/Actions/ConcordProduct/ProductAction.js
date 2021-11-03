/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
    PRODUCT_CONSTANT,
} from 'Store/Constant/Constants';



// Products
export const GetProduct = (category,old_new) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const head = { "x-session-key": token.token, "x-session-type": token.type };
      dispatch({
        type: PRODUCT_CONSTANT.PRODUCT_LOADING,
        payload: true,
      });
      const response = await axios.get(
        `https://concord-backend-m2.herokuapp.com/api/products/read${category}${old_new}`,
        { headers: head }
      );
      if (response?.data?.response_code === 200) {
        dispatch({
          type: PRODUCT_CONSTANT.PRODUCT_LOADING,
          payload: false,
        });
        dispatch({
          type: PRODUCT_CONSTANT.PRODUCT_SUCESS,
          payload: response?.data?.response_data,
        });
      }
      else {
        dispatch({
          type: PRODUCT_CONSTANT.PRODUCT_ERROR,
          payload: [],
        });
      }
    } catch (error) {
      return "Fail";
    }
  };
  
  
  export const CreateProducts = (data) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CONSTANT.PRODUCT_LOADING_All,
        payload: true,
      });
      
      let res = await apiServices.createproducts(data);
      dispatch({
        type: PRODUCT_CONSTANT.CREATE_PRODUCT_LOADING,
        payload: true
      })
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: PRODUCT_CONSTANT.CREATE_PRODUCT_SUCCESS,
          payload: res
        })
        dispatch({
          type: PRODUCT_CONSTANT.PRODUCT_LOADING_All,
          payload: false,
        });    
        return true
      } else {
        dispatch({
          type: PRODUCT_CONSTANT.CREATE_PRODUCT_ERROR,
          payload: res?.data?.response_code
        })
        NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
        dispatch({
          type: PRODUCT_CONSTANT.PRODUCT_LOADING_All,
          payload: false,
        });    
        return false
  
      }
  } catch (error) {
    dispatch({
      type: PRODUCT_CONSTANT.PRODUCT_LOADING_All,
      payload: true,
    });
      throw error.response
    }
  };


  export const UpdateProduct = (data) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CONSTANT.UPDATE_PRODUCT_LOADING,
        payload: true,
      });
      let res = await apiServices.updateproducts(data);
      console.log(res);
      if (res?.response_code === 200) {
        dispatch({
          type: PRODUCT_CONSTANT.UPDATE_PRODUCT_LOADING,
          payload: false,
        });
        dispatch({
          type: PRODUCT_CONSTANT.UPDATE_PRODUCT_SUCCESS,
          payload: true,
        });
        return true;
      } else {
        dispatch({
          type: PRODUCT_CONSTANT.UPDATE_PRODUCT_ERROR,
          payload: true,
        });
        NotificationManager.error(res?.response_message, 'Error', 5000, '');
        return false;
      }
    } catch {}
  };



  export const getCategory = (category) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const head = { "x-session-key": token.token, "x-session-type": token.type };
      const response = await axios.get(
        `https://concord-backend-m2.herokuapp.com/api/product-categorys/read?category=${category}`,
        { headers: head }
      );
      if (response?.data?.response_code === 200) {
          dispatch({
            type: PRODUCT_CONSTANT.PRODUCT_GET_CATEGORY,
            payload: response?.data?.response_data,
          });
      }
    } catch (error) {
      return "Fail";
    }
  };