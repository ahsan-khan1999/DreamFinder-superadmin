/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
  VIEW_DCP_CONSTANT,
  CREATE_DCP_CONSTANT,
  VIEW_SCHEDULE_CONSTANT,
  VIEW_DCR_CONSTANT,
  SUSPAND_DCP_DCR_CONSTANT,
  SUSPAND_SCHEDULE_CONSTANT,
  EDIT_SCHEDULE_CONSTANT
} from 'Store/Constant/Constants';

export const ViewDcpAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_DCP_CONSTANT.VIEW_DCP_LOADING,
      payload: true,
    });

    let res = await apiServices.readDcps();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_DCP_CONSTANT.VIEW_DCP_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_DCP_CONSTANT.VIEW_DCP_SUCCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_DCP_CONSTANT.VIEW_DCP_ERROR,
        payload: false,
      });
    }
  } catch {}
};

export const ViewDcrAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_DCR_CONSTANT.VIEW_DCR_LOADING,
      payload: true,
    });

    let res = await apiServices.readDcr();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_DCR_CONSTANT.VIEW_DCR_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_DCR_CONSTANT.VIEW_DCR_SUCCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_DCR_CONSTANT.VIEW_DCR_ERROR,
        payload: false,
      });
    }
  } catch {}
};
export const SuspandDcpDcrAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUSPAND_DCP_DCR_CONSTANT.SUSPAND_DCP_DCR_LOADING,
      payload: true,
    });

    let res = await apiServices.suspandDcr(data);
    // console.log(res);
    if (res?.response_code === 200) {
      dispatch({
        type: SUSPAND_DCP_DCR_CONSTANT.SUSPAND_DCP_DCR_LOADING,
        payload: false,
      });
      dispatch({
        type: SUSPAND_DCP_DCR_CONSTANT.SUSPAND_DCP_DCR_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: SUSPAND_DCP_DCR_CONSTANT.SUSPAND_DCP_DCR_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.repsonse_message,'Error',5000,null,'')
      return false;
    }
  } catch {}
};
export const SuspandDcpAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUSPAND_DCP_DCR_CONSTANT.SUSPAND_DCP_DCR_LOADING,
      payload: true,
    });

    let res = await apiServices.suspandDcp(data);
    console.log(res);
    if (res?.response_code === 200) {
      dispatch({
        type: SUSPAND_DCP_DCR_CONSTANT.SUSPAND_DCP_DCR_LOADING,
        payload: false,
      });
      dispatch({
        type: SUSPAND_DCP_DCR_CONSTANT.SUSPAND_DCP_DCR_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: SUSPAND_DCP_DCR_CONSTANT.SUSPAND_DCP_DCR_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.repsonse_message,'Error',5000,null,'')
      return false;
    }
  } catch {}
};

export const CreateDcpAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_DCP_CONSTANT.CREATE_DCP_LOADING,
      payload: true,
    });

    let res = await apiServices.CreateDcp(data);
    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_DCP_CONSTANT.CREATE_DCP_LOADING,
        payload: true,
      });
      dispatch({
        type: CREATE_DCP_CONSTANT.CREATE_DCP_SUCCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: CREATE_DCP_CONSTANT.CREATE_DCP_ERROR,
        payload: false,
      });
    }
  } catch {}
};
export const ReadScheduleAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_SCHEDULE_CONSTANT.VIEW_SCHEDULE_LOADING,
      payload: true,
    });

    let res = await apiServices.readSchedule();
    
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_SCHEDULE_CONSTANT.VIEW_SCHEDULE_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_SCHEDULE_CONSTANT.VIEW_SCHEDULE_SUCCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_SCHEDULE_CONSTANT.VIEW_SCHEDULE_ERROR,
        payload: false,
      });
    }
  } catch {}
};


export const SuspandScheduleAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUSPAND_SCHEDULE_CONSTANT.SUSPAND_SCHEDULE_LOADING,
      payload: true,
    });

    let res = await apiServices.suspandSchedule(data);
    
    if (res?.response_code === 200) {
      dispatch({
        type: SUSPAND_SCHEDULE_CONSTANT.SUSPAND_SCHEDULE_LOADING,
        payload: false,
      });
      dispatch({
        type: SUSPAND_SCHEDULE_CONSTANT.SUSPAND_SCHEDULE_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true
    } else {
      dispatch({
        type: SUSPAND_SCHEDULE_CONSTANT.SUSPAND_SCHEDULE_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.repsonse_message,'Error',5000,null,'')
      return false
    }
  } catch {}
};

export const EditScheduleAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: EDIT_SCHEDULE_CONSTANT.EDIT_SCHEDULE_LOADING,
      payload: true,
    });

    let res = await apiServices.editSchedule(data);
    
    if (res?.response_code === 200) {
      dispatch({
        type: EDIT_SCHEDULE_CONSTANT.EDIT_SCHEDULE_LOADING,
        payload: false,
      });
      dispatch({
        type: EDIT_SCHEDULE_CONSTANT.EDIT_SCHEDULE_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true
    } else {
      dispatch({
        type: EDIT_SCHEDULE_CONSTANT.EDIT_SCHEDULE_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.repsonse_message,'Error',5000,null,'')
      return false
    }
  } catch {}
};
