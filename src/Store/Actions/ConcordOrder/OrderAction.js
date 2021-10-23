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
      alert('in else');
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
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/users/read/${user}?manager_uid=${uid}`,
      { headers: head }
    );
    console.log("Api Response",response)
    if (response?.data?.response_code === 200) {
      if (role === "sm") {
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER,
          payload: response?.data?.response_data,
        });
      }
      else if (role === "rsm") {
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_RSM,
          payload: response?.data?.response_data,
        });
      }
      else if (role === "am"){
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_AM,
          payload: response?.data?.response_data,
        });
      }
      else if (role === "mpo"){
        dispatch({
          type: ORDER_CONSTANTS.ORDER_GET_USER_MPO,
          payload: response?.data?.response_data,
        });
      }
     
    }
  } catch (error) {
    return "Fail";
  }
};