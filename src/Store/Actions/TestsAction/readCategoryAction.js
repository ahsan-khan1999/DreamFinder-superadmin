/* eslint-disable */
import { READR_CATEGORY_CONSTANT } from 'Store/Constant/Constants';
import apiServices from 'services/requestHandler';
import { NotificationManager } from 'components/common/react-notifications';

export const ReadCategory = () => async (dispatch) => {
  try {
    dispatch({
      type:READR_CATEGORY_CONSTANT.READR_CATEGORY_LOADING,
      payload:true
    })
    let res = await apiServices.readCategory();
    // console.log(res);

    if (res?.data?.response_code === 200) {
      dispatch({
        type:READR_CATEGORY_CONSTANT.READR_CATEGORY_LOADING,
        payload:false
      })
      dispatch({
        type: READR_CATEGORY_CONSTANT.READR_CATEGORY_SUCESS,
        payload: res?.data?.response_data?.category,
      });
      return true;
    } else {
      dispatch({
        type: READR_CATEGORY_CONSTANT.READR_CATEGORY_ERROR,
        payload: false,
      });
      return false;
    }
  } catch {}
};
