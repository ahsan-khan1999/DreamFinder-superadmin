/* eslint-disable */
import { NotificationManager } from 'components/common/react-notifications';
import { FormattedDisplayName } from 'react-intl';
import apiServices from 'services/requestHandler';
import { GET_AVILABLE_SLOTS } from 'Store/Constant/Constants';

export const AvilableSlotsAction = (data) =>async(dispatch) => {
  try {
    dispatch({
      type: GET_AVILABLE_SLOTS.GET_AVILABLE_SLOTS_LOADING,
      payload: true,
    });
    let res = await apiServices.getAllSlots(data);
    if (res?.data?.response_code === 200) {
      dispatch({
        type: GET_AVILABLE_SLOTS.GET_AVILABLE_SLOTS_LOADING,
        payload: false,
      });
      dispatch({
        type: GET_AVILABLE_SLOTS.GET_AVILABLE_SLOTS_SUCESS,
        payload: res?.data?.response_data?.slots,
      });
      return true
    } else {
      dispatch({
        type: GET_AVILABLE_SLOTS.GET_AVILABLE_SLOTS_ERROR,
        payload: [],
      });
    //   NotificationManager.error(res?.response_message,"Error",3000,null,null)
      return false
    }
  } catch {}
};
