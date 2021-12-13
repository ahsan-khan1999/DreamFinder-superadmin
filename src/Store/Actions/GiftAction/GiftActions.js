/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
  VIEW_GIFT_CONSTANT,
  CREATE_GIFT_CONSTANT,
} from 'Store/Constant/Constants';
import { Check_Validation, Check_Validation_Update } from 'Utils/auth.util';

export const CreateGift = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_GIFT_CONSTANT.CREATE_GIFT_LOADING,
      payload: true,
    });

    let res = await apiServices.AssignGift(data);
    if (res?.response_code === 200) {
      dispatch({
        type: CREATE_GIFT_CONSTANT.CREATE_GIFT_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_GIFT_CONSTANT.CREATE_GIFT_SUCCESS,
        payload: res?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_GIFT_CONSTANT.CREATE_GIFT_ERROR,
        payload: false,
      });
      Check_Validation_Update(res)
      // NotificationManager.error(res?.response_message, 'Error', 5000, null, '');
      return false;
    }
  } catch {}
};

export const ViewGiftAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_GIFT_CONSTANT.VIEW_GIFT_LOADING,
      payload: true,
    });

    let res = await apiServices.ReadAssignedGifts();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_GIFT_CONSTANT.VIEW_GIFT_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_GIFT_CONSTANT.VIEW_GIFT_SUCCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_GIFT_CONSTANT.VIEW_GIFT_ERROR,
        payload: false,
      });
    }
  } catch {}
};
