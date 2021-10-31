/* eslint-disable */
import axios from 'axios';
import {
  REGION_CLASSIFICAION_CONSTANT,
  READ_REGION_CONSTANT,
  UPDATE_REGION_CLASSIFICAION_CONSTANT
} from '../../Constant/Constants';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

export const CreateRegionAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REGION_CLASSIFICAION_CONSTANT.CREATE_REGION_CLASSIFICAION_LOADING,
      payload: true,
    });


    
    let res = await apiServices.addRegion(data);

    if (res?.data?.response_code === 200) {
      dispatch(ReadRegionAction())

      dispatch({
        type: REGION_CLASSIFICAION_CONSTANT.CREATE_REGION_CLASSIFICAION_LOADING,
        payload: false,
      });
      dispatch({
        type: REGION_CLASSIFICAION_CONSTANT.CREATE_REGION_CLASSIFICAION_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: REGION_CLASSIFICAION_CONSTANT.CREATE_REGION_CLASSIFICAION_ERROR,
        payload: true,
      });
      NotificationManager.error(
        response?.data?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch {}
};

export const ReadRegionAction = () => async (dispatch) => {
  try {
    dispatch({
      type: READ_REGION_CONSTANT.READ_REGION_LOADING,
      payload: true,
    });

    
    let res = await apiServices.readRegion()

    if (res?.data?.response_code === 200) {
      dispatch({
        type: READ_REGION_CONSTANT.READ_REGION_LOADING,
        payload: false,
      });
      dispatch({
        type: READ_REGION_CONSTANT.READ_REGION_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: READ_REGION_CONSTANT.READ_REGION_ERROR,
        payload: true,
      });
      NotificationManager.error(
        response?.data?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch {}
};

export const UpdateRegionClassificationAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_REGION_CLASSIFICAION_CONSTANT.UPDATE_REGION_CLASSIFICAION_LOADING,
      payload: true,
    });

    let res = await apiServices.deleteRegion(data);
    // console.log(res,"response");
    if (res?.response_code === 200) {
      dispatch(ReadRegionAction())

      dispatch({
        type: UPDATE_REGION_CLASSIFICAION_CONSTANT.UPDATE_REGION_CLASSIFICAION_LOADING,
        payload: false,
      });
      dispatch({
        type: UPDATE_REGION_CLASSIFICAION_CONSTANT.UPDATE_REGION_CLASSIFICAION_SUCCESS,
        payload: res?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_REGION_CLASSIFICAION_CONSTANT.UPDATE_REGION_CLASSIFICAION_ERROR,
        payload: true,
      });
      NotificationManager.error(
        res?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch {}
};
export const UpdateRegionClassificationActionTest = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_REGION_CLASSIFICAION_CONSTANT.UPDATE_REGION_CLASSIFICAION_LOADING,
      payload: true,
    });

    let res = await apiServices.EditRegion(data);
    // console.log(res,"response");
    if (res?.response_code === 200) {
      dispatch(ReadRegionAction())

      dispatch({
        type: UPDATE_REGION_CLASSIFICAION_CONSTANT.UPDATE_REGION_CLASSIFICAION_LOADING,
        payload: false,
      });
      dispatch({
        type: UPDATE_REGION_CLASSIFICAION_CONSTANT.UPDATE_REGION_CLASSIFICAION_SUCCESS,
        payload: res?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_REGION_CLASSIFICAION_CONSTANT.UPDATE_REGION_CLASSIFICAION_ERROR,
        payload: true,
      });
      NotificationManager.error(
        res?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch {}
};