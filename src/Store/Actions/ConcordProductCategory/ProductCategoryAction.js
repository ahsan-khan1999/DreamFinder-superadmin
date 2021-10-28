/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
    PRODUCT_CATEGORY_CONSTANT,
} from 'Store/Constant/Constants';



// Products Categorys
export const GetProductCategory = () => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_LOADING,
        payload: true,
      });
  
      let res = await apiServices.getproductcategory();
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_LOADING,
          payload: false,
        });
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_SUCESS,
          payload: res?.data?.response_data,
        });
      } else {
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_ERROR,
          payload: [],
        });
      }
    } catch {}
  };


  export const CreateProductCategory = (data) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_LOADING_All,
        payload: true,
      });
      
      let res = await apiServices.createproductcategory(data);
      dispatch({
        type: PRODUCT_CATEGORY_CONSTANT.CREATE_PRODUCT_CATEGORY_LOADING,
        payload: true
      })
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.CREATE_PRODUCT_CATEGORY_SUCCESS,
          payload: res
        })
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_LOADING_All,
          payload: false,
        });    
        return true
      } else {
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.CREATE_PRODUCT_CATEGORY_ERROR,
          payload: res?.data?.response_code
        })
        NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_LOADING_All,
          payload: false,
        });    
        return false
  
      }
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_LOADING_All,
      payload: true,
    });
      throw error.response
    }
  };


  export const UpdateProductCategory = (data) => async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_CATEGORY_CONSTANT.UPDATE_PRODUCT_CATEGORY_LOADING,
        payload: true,
      });
      let res = await apiServices.updateproductcategory(data);
      console.log(res);
      if (res?.response_code === 200) {
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.UPDATE_PRODUCT_CATEGORY_LOADING,
          payload: false,
        });
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.UPDATE_PRODUCT_CATEGORY_SUCCESS,
          payload: true,
        });
        return true;
      } else {
        dispatch({
          type: PRODUCT_CATEGORY_CONSTANT.UPDATE_PRODUCT_CATEGORY_ERROR,
          payload: true,
        });
        NotificationManager.error(res?.response_message, 'Error', 5000, '');
        return false;
      }
    } catch {}
  };
