/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
  VIEW_TARGET_CONSTANT,
  CREATE_TARGET_CONSTANT,
  EDIT_TARGET_CONSTANT,
  ORDER_CONSTANTS,
  SUSPAND_TARGET_CONSTANT,
  DISTRIBUTION_CENTER_CONSTANT
} from 'Store/Constant/Constants';
import { Check_Validation, Check_Validation_Update } from 'Utils/auth.util';
import { logOutUser } from '../Auth/Actions';

export const ViewTargetAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_TARGET_CONSTANT.VIEW_TARGET_LOADING,
      payload: true,
    });

    let res = await apiServices.readTarget();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_TARGET_CONSTANT.VIEW_TARGET_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_TARGET_CONSTANT.VIEW_TARGET_SUCCESS,
        payload: res?.data?.response_data,
      });

      return true;
    } else {
      dispatch({
        type: VIEW_TARGET_CONSTANT.VIEW_TARGET_ERROR,
        payload: true,
      });
      return false;
    }
  } catch {}
};
export const CreateTargetAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_TARGET_CONSTANT.CREATE_TARGET_LOADING,
      paylaod: true,
    });
    let res = await apiServices.createTarget(data);
    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_TARGET_CONSTANT.CREATE_TARGET_LOADING,
        paylaod: false,
      });
      dispatch({
        type: CREATE_TARGET_CONSTANT.CREATE_TARGET_SUCCESS,
        paylaod: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_TARGET_CONSTANT.CREATE_TARGET_ERROR,
        paylaod: false,
      });
      Check_Validation(res)
      // NotificationManager.error(
      //   res?.data?.response_message,
      //   'Error',
      //   5000,
      //   null,
      //   ''
      // );
      return false;
    }
  } catch {}
};
export const EditTargetAction = (data) => async (dispatch) => {
  try{
    dispatch({
      type:EDIT_TARGET_CONSTANT.EDIT_TARGET_LOADING,
      payload:true
    })
    let res = await apiServices.updateTarget(data)
    
    if(res?.response_code === 200){
      dispatch({
        type:EDIT_TARGET_CONSTANT.EDIT_TARGET_LOADING,
        payload:false
      })
      dispatch({
        type:EDIT_TARGET_CONSTANT.EDIT_TARGET_SUCCESS,
        payload:res?.response_data
      })
      return true
    }else{
      dispatch({
        type:EDIT_TARGET_CONSTANT.EDIT_TARGET_ERROR,
        payload:false
      })
      Check_Validation_Update(res)


      // NotificationManager.error(res?.response_message,'Error',5000,null,'')
      return false
    }
  }catch{

  }
};
export const SuspandTargetAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUSPAND_TARGET_CONSTANT.SUSPAND_TARGET_LOADING,
      payload: true,
    });

    let res = await apiServices.suspandTarget(data);
    if (res?.response_code === 200) {
      dispatch({
        type: SUSPAND_TARGET_CONSTANT.SUSPAND_TARGET_LOADING,
        payload: false,
      });
      dispatch({
        type: SUSPAND_TARGET_CONSTANT.SUSPAND_TARGET_SUCCESS,
        payload: false,
      });
      return true
    }else{
      dispatch({
        type: SUSPAND_TARGET_CONSTANT.SUSPAND_TARGET_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.response_message,'Error',5000,null,'')
      return false
    }
  } catch {}
};
export const OrderRead = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_CONSTANTS.ORDER_LOADING,
      payload: true,
    });
    let res = await apiServices.readOrder();
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

export const GetDistributionCenter = () => async (dispatch) => {
  try {

    dispatch({
      type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING,
      payload: true,
    });

    let res = await apiServices.ReadDistributionCenter();

    if (res?.data?.response_code === 200) {

      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING,
        payload: false,
      });
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_SUCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_ERROR,
        payload: [],
      });
    }
  } catch {}
};