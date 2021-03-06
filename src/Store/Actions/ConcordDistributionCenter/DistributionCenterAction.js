/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { BASEURL } from 'services/HttpProvider';
import apiServices from 'services/requestHandler';
import {
    DISTRIBUTION_CENTER_CONSTANT,
} from 'Store/Constant/Constants';


// Distribution Center

export const GetDistributionCenter = () => async (dispatch) => {
  try {
    dispatch({
      type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING,
      payload: true,
    });

    let res = await apiServices.getdistributionCentres();

    if (res?.data?.response_code === 200) {
   
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_SUCESS,
        payload: res?.data?.response_data,
      });
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING,
        payload: false,
      });
    } else {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_ERROR,
        payload: [],
      });
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING,
        payload: false,
      });
    }
  } catch {
    dispatch({
      type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING,
      payload: false,
    });
  }
};


export const CreateDistributionCenter = (data) => async (dispatch) => {
  try {
    dispatch({
      type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING_All,
      payload: true,
    });
    
    let res = await apiServices.createdistributionCentres(data);
    dispatch({
      type: DISTRIBUTION_CENTER_CONSTANT.CREATE_DISTRIBUTION_CENTER_LOADING,
      payload: true
    })

    if (res?.data?.response_code === 200) {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.CREATE_DISTRIBUTION_CENTER_SUCCESS,
        payload: res
      })
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING_All,
        payload: false,
      });    
      return true
    } else {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.CREATE_DISTRIBUTION_CENTER_ERROR,
        payload: res?.data?.response_code
      })
      NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING_All,
        payload: false,
      });    
      return false

    }
} catch (error) {
  dispatch({
    type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING_All,
    payload: true,
  });
    throw error.response
  }
};


export const UpdateDistributionCenter = (data) => async (dispatch) => {
  try {
    dispatch({
      type: DISTRIBUTION_CENTER_CONSTANT.UPDATE_DISTRIBUTION_CENTER_LOADING,
      payload: true,
    });
    let res = await apiServices.updatedistributionCentres(data);
    if (res?.response_code === 200) {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.UPDATE_DISTRIBUTION_CENTER_LOADING,
        payload: false,
      });
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.UPDATE_DISTRIBUTION_CENTER_SUCCESS,
        payload: true,
      });
      return true;
    } else {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.UPDATE_DISTRIBUTION_CENTER_ERROR,
        payload: true,
      });
      NotificationManager.error(res?.response_message, 'Error', 5000, '');
      return false;
    }
  } catch {}
};



export const GetDistributionCenterRegions = () => async (dispatch) => {
  try {
    dispatch({
      type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_REGION_LOADING,
      payload: true,
    });

    let res = await apiServices.regiondistributionCentres();

    if (res?.data?.response_code === 200) {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_REGION_LOADING,
        payload: false,
      });
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_REGION_SUCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_REGION_ERROR,
        payload: [],
      });
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_REGION_LOADING,
        payload: false,
      });
    }
  } catch {}
};

export const getDepoManagerAssigneds = () => async (dispatch) => {
  try {
    dispatch({
      type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_VIEW_DEPO_LOADING,
      payload: true,
    });

    let response = await apiServices.getDepoManagerAssigned();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_VIEW_DEPO_LOADING,
        payload: false,
      });
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_VIEW_DEPO_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_VIEW_DEPO_ERROR,
        payload: true,
      });
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_VIEW_DEPO_LOADING,
        payload: false,
      });
    }
  } catch {}
};



export const getAreas = (uid) => async (dispatch) => {
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const head = { "x-session-key": token.token, "x-session-type": token.type };
    dispatch({
      type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_GET_AREAS_LOADER,
      payload: true,
    });
    const response = await axios.get(
      BASEURL+`/region-classifications/read/area?parent_uid=${uid}&assigned_to_dc=0`,
      { headers: head }
    );
    if (response?.data?.response_code === 200) {
        dispatch({
          type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_GET_AREAS,
          payload: response?.data?.response_data,
        });
        dispatch({
          type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_GET_AREAS_LOADER,
          payload: false,
        });
    }
    else{
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_GET_AREAS_LOADER,
        payload: false,
      });
    }
  } catch (error) {
    return "Fail";
  }
};