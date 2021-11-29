/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { BASEURL } from 'services/HttpProvider';
import apiServices from 'services/requestHandler';
import {
    STOCKS_TRANSACTION_CONSTANT,
} from 'Store/Constant/Constants';



// StocksTransaction
export const GetStocksTransaction = () => async (dispatch) => {
    try {
      dispatch({
        type: STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_LOADING,
        payload: true,
      });
  
      let res = await apiServices.getstockstransaction();
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_LOADING,
          payload: false,
        });
        dispatch({
          type: STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_SUCESS,
          payload: res?.data?.response_data,
        });
      } else {
        dispatch({
          type: STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_ERROR,
          payload: [],
        });
      }
    } catch {}
  };


  export const CreateStocksTransaction = (data) => async (dispatch) => {
    try {
      dispatch({
        type: STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_LOADING_All,
        payload: true,
      });
      
      dispatch({
        type: STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_LOADING,
        payload: true
      })
      let res = await apiServices.createstockstransaction(data);
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: STOCKS_TRANSACTION_CONSTANT.CREATE_STOCKS_TRANSACTION_SUCCESS,
          payload: res
        })
        dispatch({
          type: STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_LOADING,
          payload: false,
        });    
        return true
      } else {
        dispatch({
          type: STOCKS_TRANSACTION_CONSTANT.CREATE_STOCKS_TRANSACTION_ERROR,
          payload: res?.data?.response_code
        })
        
        
        NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
        dispatch({
          type: STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_LOADING,
          payload: false,
        });    
        return false
  
      }
  } catch (error) {
    dispatch({
      type: STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_LOADING_All,
      payload: true,
    });
      throw error.response
    }
  };



  export const getCategoryDistributionCenter = (uid,category) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const head = { "x-session-key": token.token, "x-session-type": token.type };
      dispatch({
        type: STOCKS_TRANSACTION_CONSTANT.STOCK_DISTRIBUTION_CENTER_CATEGORY_LOADER,
        payload: true,
      });
      const response = await axios.get(
        BASEURL+`/stocks/read/${category}?distribution_center_uid=${uid}`,
        { headers: head }
      );
      if (response?.data?.response_code === 200) {
          dispatch({
            type: STOCKS_TRANSACTION_CONSTANT.STOCK_DISTRIBUTION_CENTER_CATEGORY,
            payload: response?.data?.response_data,
          });
          dispatch({
            type: STOCKS_TRANSACTION_CONSTANT.STOCK_DISTRIBUTION_CENTER_CATEGORY_LOADER,
            payload: false,
          });
      }
    } catch (error) {
      dispatch({
        type: STOCKS_TRANSACTION_CONSTANT.STOCK_DISTRIBUTION_CENTER_CATEGORY_LOADER,
        payload: false,
      });
      return "Fail";
    }
  };
