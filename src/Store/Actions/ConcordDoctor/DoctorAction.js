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


  export const CreateDoctorsRecord = (data) => async (dispatch) => {
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
        dispatch({
          type: DOCTOR_CONSTANT.UPDATE_DOCTOR_LOADING,
          payload: false,
        });
        NotificationManager.error(res?.response_message, 'Error', 5000, '');
        return false;
      }
    } catch {}
  };
  

  export const GetMarketsData = (uid,hierarchy) => async (dispatch) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const head = { "x-session-key": token.token, "x-session-type": token.type };
      if (hierarchy === "region") {
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_REGION_LOADER,
          payload: true,
        });

      }
      else if (hierarchy === "area") {
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_AREA_LOADER,
          payload: true,
        });
      }
      else if (hierarchy === "thana"){
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_THANA_LOADER,
          payload: true,
        });
      }
      else if (hierarchy === "territory"){
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_TERRITORY_LOADER,
          payload: true,
        });
      }
      else if (hierarchy === "market"){
        dispatch({
          type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_MARKET_LOADER,
          payload: true,
        });
      }    
      const response = await axios.get(
        `https://concord-backend-m2.herokuapp.com/api/region-classifications/read/${hierarchy}?parent_uid=${uid}`,
        { headers: head }
      );
      if (response?.data?.response_code === 200) {
        if (hierarchy === "region") {
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_REGION,
            payload: response?.data?.response_data,
          });
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_REGION_LOADER,
            payload: false,
          });
        }
        else if (hierarchy === "area") {
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_AREA,
            payload: response?.data?.response_data,
          });
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_AREA_LOADER,
            payload: false,
          });
        }
        else if (hierarchy === "thana"){
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_THANA,
            payload: response?.data?.response_data,
          });
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_THANA_LOADER,
            payload: false,
          });
        }
        else if (hierarchy === "territory"){
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_TERRITORY,
            payload: response?.data?.response_data,
          });
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_TERRITORY_LOADER,
            payload: false,
          });
        }
        else if (hierarchy === "market"){
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_MARKET,
            payload: response?.data?.response_data,
          });
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_MARKET_LOADER,
            payload: false,
          });
        }      
        else{
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_REGION,
            payload: response?.data?.response_data,
          });
          dispatch({
            type: DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_REGION_LOADER,
            payload: false,
          });
        }
      }
    } catch (error) {
      return "Fail";
    }
  };
  