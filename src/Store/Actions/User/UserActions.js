/* eslint-disable */

import apiServices from 'services/requestHandler';
import {
  VIEW_ADMIN_CONSTANT,
  VIEW_DIRECTOR_CONSTANT,
  VIEW_DEPO_CONSTANT,
  VIEW_DELIVERYSTAFF_CONSTANT,
  VIEW_AM_CONSTANT,
  VIEW_RSM_CONSTANT,
  VIEW_SM_CONSTANT,
  VIEW_MPO_CONSTANT,
} from 'Store/Constant/Constants';

export const ViewAdminAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_ADMIN_CONSTANT.VIEW_ADMIN_LOADING,
      payload: true,
    });

    let response = await apiServices.getUsers();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_ADMIN_CONSTANT.VIEW_ADMIN_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_ADMIN_CONSTANT.VIEW_ADMIN_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_ADMIN_CONSTANT.VIEW_ADMIN_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const ViewDirectorAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_LOADING,
      payload: true,
    });

    let response = await apiServices.getUsers();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const ViewDepoAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_DEPO_CONSTANT.VIEW_DEPO_LOADING,
      payload: true,
    });

    let response = await apiServices.getUsers();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_DEPO_CONSTANT.VIEW_DEPO_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_DEPO_CONSTANT.VIEW_DEPO_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_DEPO_CONSTANT.VIEW_DEPO_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const ViewDeliveryStaffAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_LOADING,
      payload: true,
    });

    let response = await apiServices.getUsers();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const ViewAreaManagerAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_AM_CONSTANT.VIEW_AM_LOADING,
      payload: true,
    });

    let response = await apiServices.getUsers();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_AM_CONSTANT.VIEW_AM_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_AM_CONSTANT.VIEW_AM_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_AM_CONSTANT.VIEW_AM_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const ViewRegionalSalesManagerManagerAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_RSM_CONSTANT.VIEW_RSM_LOADING,
      payload: true,
    });

    let response = await apiServices.getUsers();
    if (response?.data?.response_code === 200) {
      dispatch({
        type:  VIEW_RSM_CONSTANT.VIEW_RSM_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_RSM_CONSTANT.VIEW_RSM_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_RSM_CONSTANT.VIEW_RSM_ERROR,
        payload: true,
      });
    }
  } catch {}
};
export const ViewSalesManagerManagerAction = () => async (dispatch) => {
    try {
      dispatch({
        type: VIEW_SM_CONSTANT.VIEW_SM_LOADING,
        payload: true,
      });
  
      let response = await apiServices.getUsers();
      if (response?.data?.response_code === 200) {
        dispatch({
          type:  VIEW_SM_CONSTANT.VIEW_SM_LOADING,
          payload: false,
        });
        dispatch({
          type: VIEW_SM_CONSTANT.VIEW_SM_SUCCESS,
          payload: response?.data?.response_data,
        });
      } else {
        dispatch({
          type: VIEW_SM_CONSTANT.VIEW_SM_ERROR,
          payload: true,
        });
      }
    } catch {}
  };
  export const ViewMPOManagerAction = () => async (dispatch) => {
    try {
      dispatch({
        type: VIEW_MPO_CONSTANT.VIEW_MPO_LOADING,
        payload: true,
      });
  
      let response = await apiServices.getUsers();
      if (response?.data?.response_code === 200) {
        dispatch({
          type:  VIEW_MPO_CONSTANT.VIEW_MPO_LOADING,
          payload: false,
        });
        dispatch({
          type: VIEW_MPO_CONSTANT.VIEW_MPO_SUCCESS,
          payload: response?.data?.response_data,
        });
      } else {
        dispatch({
          type: VIEW_MPO_CONSTANT.VIEW_MPO_ERROR,
          payload: true,
        });
      }
    } catch {}
  };
  