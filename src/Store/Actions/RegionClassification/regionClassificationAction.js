/* eslint-disable */
import axios from 'axios';
import {
  REGION_CLASSIFICAION_CONSTANT,
  READ_REGION_CONSTANT,
  EDIT_REGION_CLASSIFICATION
} from '../../Constant/Constants';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

export const CreateRegionAction = (data) => async (dispatch) => {
  try {
    alert('inactipon');
    dispatch({
      type: REGION_CLASSIFICAION_CONSTANT.CREATE_REGION_CLASSIFICAION_LOADING,
      payload: true,
    });

    const token = await JSON.parse(localStorage.getItem('token'));
    alert('inactipon after');

    console.log(token);
    // let res = await axios.post(
    //   'https://concord-backend-m1.herokuapp.com/api/region-classifications/create',
    //   data,
    //   {
    //     headers: {
    //       'x-session-key': token?.key,
    //       'x-session-type': token?.type,
    //     },
    //   }
    // );

    if (res?.data?.response_code === 200) {
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
