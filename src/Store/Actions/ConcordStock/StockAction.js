/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
    STOCKS_CONSTANT,
} from 'Store/Constant/Constants';



// Stocks
export const GetStocks = () => async (dispatch) => {
    try {
      dispatch({
        type: STOCKS_CONSTANT.STOCKS_LOADING,
        payload: true,
      });
  
      let res = await apiServices.getstocks();
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: STOCKS_CONSTANT.STOCKS_LOADING,
          payload: false,
        });
        dispatch({
          type: STOCKS_CONSTANT.STOCKS_SUCESS,
          payload: res?.data?.response_data,
        });
      } else {
        dispatch({
          type: STOCKS_CONSTANT.STOCKS_ERROR,
          payload: [],
        });
      }
    } catch {}
  };


  export const CreateStocks = (data) => async (dispatch) => {
    try {
      dispatch({
        type: STOCKS_CONSTANT.STOCKS_LOADING_All,
        payload: true,
      });
      
      let res = await apiServices.createstocks(data);
      dispatch({
        type: STOCKS_CONSTANT.CREATE_STOCKS_LOADING,
        payload: true
      })
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: STOCKS_CONSTANT.CREATE_STOCKS_SUCCESS,
          payload: res
        })
        dispatch({
          type: STOCKS_CONSTANT.STOCKS_LOADING_All,
          payload: false,
        });    
        return true
      } else {
        dispatch({
          type: STOCKS_CONSTANT.CREATE_STOCKS_ERROR,
          payload: res?.data?.response_code
        })
        NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
        dispatch({
          type: STOCKS_CONSTANT.STOCKS_LOADING_All,
          payload: false,
        });    
        return false
  
      }
  } catch (error) {
    dispatch({
      type: STOCKS_CONSTANT.STOCKS_LOADING_All,
      payload: true,
    });
      throw error.response
    }
  };


  export const UpdateStocks = (data) => async (dispatch) => {
    try {
      dispatch({
        type: STOCKS_CONSTANT.UPDATE_STOCKS_LOADING,
        payload: true,
      });
      let res = await apiServices.updatestocks(data);
      console.log(res);
      if (res?.response_code === 200) {
        dispatch({
          type: STOCKS_CONSTANT.UPDATE_STOCKS_LOADING,
          payload: false,
        });
        dispatch({
          type: STOCKS_CONSTANT.UPDATE_STOCKS_SUCCESS,
          payload: true,
        });
        return true;
      } else {
        dispatch({
          type: STOCKS_CONSTANT.UPDATE_STOCKS_ERROR,
          payload: true,
        });
        dispatch({
          type: STOCKS_CONSTANT.UPDATE_STOCKS_LOADING,
          payload: false,
        });
        NotificationManager.error(res?.response_message, 'Error', 5000, '');
        return false;
      }
    } catch {
      dispatch({
        type: STOCKS_CONSTANT.UPDATE_STOCKS_LOADING,
        payload: false,
      });
    }
  };


  export const getStockProductCategory = (category) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const head = { "x-session-key": token.token, "x-session-type": token.type };
      dispatch({
        type: STOCKS_CONSTANT.STOCKS_GET_PRODUCT_CATEGORY_LOADER,
        payload: true,
      });
      const response = await axios.get(
        `https://concord-backend-m2.herokuapp.com/api/products/read/${category}`,
        { headers: head }
      );
      if (response?.data?.response_code === 200) {
          dispatch({
            type: STOCKS_CONSTANT.STOCKS_GET_PRODUCT_CATEGORY,
            payload: response?.data?.response_data,
          });
          dispatch({
            type: STOCKS_CONSTANT.STOCKS_GET_PRODUCT_CATEGORY_LOADER,
            payload: false,
          });
      }
      else{
        dispatch({
          type: STOCKS_CONSTANT.STOCKS_GET_PRODUCT_CATEGORY_LOADER,
          payload: false,
        });
      }
    } catch (error) {
      dispatch({
        type: STOCKS_CONSTANT.STOCKS_GET_PRODUCT_CATEGORY_LOADER,
        payload: false,
      });
      return "Fail";
    }
  };