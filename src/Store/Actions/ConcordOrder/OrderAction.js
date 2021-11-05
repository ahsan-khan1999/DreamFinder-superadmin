/* eslint-disable */
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
  ORDER_CONSTANTS,
} from 'Store/Constant/Constants';



export const OrderAction = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CONSTANTS.ORDER_LOADING,
      payload: true,
    });

    let res = await apiServices.getorder();

    if (res?.data?.response_code === 200) {
      dispatch({
        type: ORDER_CONSTANTS.ORDER_LOADING,
        payload: false,
      });
      dispatch({
        type: ORDER_CONSTANTS.ORDER_SUCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: ORDER_CONSTANTS.ORDER_ERROR,
        payload: [],
      });
    }
  } catch {}
};

export const getUsers = (uid,user) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const head = { "x-session-key": token.token, "x-session-type": token.type };
   
    if (user === "sm") {
      dispatch({
        type: ORDER_CONSTANTS.ORDER_GET_USER_LOADER,
        payload: true,
      });
    }
    else if (user === "rsm") {
      dispatch({
        type: ORDER_CONSTANTS.ORDER_GET_USER_RSM_LOADER,
        payload: true,
      });
    }
    else if (user === "am"){
      dispatch({
        type: ORDER_CONSTANTS.ORDER_GET_USER_AM_LOADER,
        payload: true,
      });
    }
    else if (user === "mpo"){
      dispatch({
        type: ORDER_CONSTANTS.ORDER_GET_USER_MPO_LOADER,
        payload: true,
      });
    }
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/users/read/${user}?manager_uid=${uid}`,
      { headers: head }
    );
    if (response?.data?.response_code === 200) {
      if (user === "sm") {
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER,
          payload: response?.data?.response_data,
        });
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_LOADER,
          payload: false,
        });
      }
      else if (user === "rsm") {
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_RSM,
          payload: response?.data?.response_data,
        });
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_RSM_LOADER,
          payload: false,
        });
      }
      else if (user === "am"){
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_AM,
          payload: response?.data?.response_data,
        });
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_AM_LOADER,
          payload: false,
        });
      }
      else if (user === "mpo"){
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_MPO,
          payload: response?.data?.response_data,
        });
        
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_MPO_LOADER,
          payload: false,
        });
      }
      
      else{
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER,
          payload: response?.data?.response_data,
        });
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_LOADER,
          payload: false,
        });
      }

     
    }
  } catch (error) {
    return "Fail";
  }
};


export const getCustomer = (uid) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const head = { "x-session-key": token.token, "x-session-type": token.type };
    dispatch({
      type: ORDER_CONSTANTS.ORDER_GET_CUSTOMER_LOADER,
      payload: true,
    });
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/customers/read?child_uid=${uid}`,
      { headers: head }
    );
    if (response?.data?.response_code === 200) {
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_CUSTOMER,
          payload: response?.data?.response_data,
        });
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_CUSTOMER_LOADER,
          payload: false,
        });
    }
  } catch (error) {
    dispatch({
      type: ORDER_CONSTANTS.ORDER_GET_CUSTOMER_LOADER,
      payload: false,
    });
    return "Fail";
  }
};


export const getStockProductMedicine = (uid) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const head = { "x-session-key": token.token, "x-session-type": token.type };
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/stocks/read/medicine?child_uid=${uid}`,
      { headers: head }
    );
    if (response?.data?.response_code === 200) {
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_STOCK_MEDICINE,
          payload: response?.data?.response_data,
        });
    }
  } catch (error) {
    return "Fail";
  }
};


export const StaticDataGet = () => async (dispatch) => {
    try {
      let res = await apiServices.staticdataconcord();
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: ORDER_CONSTANTS.STATIC_DATA,
          payload: res?.data?.response_data,
        });
      } 
    } catch {
      return "Fail";
    }
  };
  

  export const CreateOrder = (data) => async (dispatch) => {
    try {
      dispatch({
        type: ORDER_CONSTANTS.ORDER_LOADING_All,
        payload: true,
      });
      
      let res = await apiServices.createorder(data);
      dispatch({
        type: ORDER_CONSTANTS.CREATE_ORDER_LOADING,
        payload: true
      })
  
      if (res?.data?.response_code === 200) {
        dispatch({
          type: ORDER_CONSTANTS.CREATE_ORDER_SUCCESS,
          payload: res
        })
        dispatch({
          type: ORDER_CONSTANTS.ORDER_LOADING_All,
          payload: false,
        });    
        return true
      } else {
        dispatch({
          type: ORDER_CONSTANTS.CREATE_ORDER_ERROR,
          payload: res?.data?.response_code
        })
        NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
        dispatch({
          type: ORDER_CONSTANTS.ORDER_LOADING_All,
          payload: false,
        });    
        return false
  
      }
  } catch (error) {
    dispatch({
      type: ORDER_CONSTANTS.ORDER_LOADING_All,
      payload: true,
    });
      throw error.response
    }
  };


  export const statusChange = (data) => async (dispatch) => {
    dispatch({
      type: ORDER_CONSTANTS.ORDER_LOADING_All,
      payload: true,
    });
    const response = await apiServices.statusChanges(data);
    
    if (response?.response_code === 200) {
      dispatch({
        type: ORDER_CONSTANTS.ORDER_LOADING_All,
        payload: false,
      });
      return true
    } else {
      dispatch({
        type: ORDER_CONSTANTS.ORDER_LOADING_All,
        payload: false,
      });
      NotificationManager.error(response?.data?.response_message, "error", 5000, null, '');
      return false
    }
  };