/* eslint-disable */
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from '../../../services/requestHandler';
import { getToken } from '../../../Utils/auth.util';
import { CHANGE_PASSWORD_CONSTANT } from '../../Constant/Constants';

export const ChangePasswordFromSuperAdmin = (data) => async (dispatch) => {
  try {
    let token = await getToken();
    let res = await axios.patch(
      'https://dmfr-backend-herokuapp.com/api/v1/user/change-password/super-admin',
      data,
      {
        headers: {
          'x-session-key': token?.token,
          'x-session-type': token?.type,
        },
      }
    );
    // console.log(res);

    // dispatch({
    //   type: CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_LOADING,
    //   payload: true,
    // });
    // let res = await apiServices.changePasswordSuperAdmin(data);
    // console.log(res);
    // if (res?.data?.response_code === 200) {
    //   dispatch({
    //     type: CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_SUCESS,
    //     payload: res,
    //   });
    //   return true;
    // } else {
    //   dispatch({
    //     type: CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_ERROR,
    //     payload: res?.data?.response_code,
    //   });
    //   NotificationManager.error(
    //     res?.data?.response_message,
    //     'Error',
    //     3000,
    //     null,
    //     ''
    //   );

    //   return false;
    // }
  } catch {}
};
