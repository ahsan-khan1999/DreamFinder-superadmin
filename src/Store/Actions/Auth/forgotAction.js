/* eslint-disable */
// http://localhost:3000/user/forgot-password
import apiServices from '../../../services/requestHandler';
import { FORGOT_CONSTANTS } from '../../Constant/Constants';

export const ForgotAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: FORGOT_CONSTANTS.FORGOT_LOADING,
      payload: true,
    });
    const res = await apiServices.forgotPassword(data);
    // console.log(res);

    if (res?.data?.response_code === 200) {
      dispatch({
        type: FORGOT_CONSTANTS.FORGOT_LOADING,
        payload: false,
      });
      dispatch({
        type: FORGOT_CONSTANTS.FORGOT_SUCESS,
        payload: true,
      });
      return true;
    } else {
      dispatch({
        type: FORGOT_CONSTANTS.FORGOT_ERROR,
        payload: false,
      });
      return false;
    }
  } catch {}
};
