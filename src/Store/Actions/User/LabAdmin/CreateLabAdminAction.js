/* eslint-disable */
import apiServices from '../../../../services/requestHandler';
import {
  CREATE_LABADMIN_CONSTANT,
  UPDATE_LABADMIN_CONSTANT,
} from '../../../Constant/Constants';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
export const CreateLabAdmin = (data) => async (dispatch) => {

  try {
    let res = await apiServices.createLabAdmin(data);
    // console.log(res);

    //  Api Call

    dispatch({
      type: CREATE_LABADMIN_CONSTANT.CREATE_LABADMIN_LOADING,
      payload: true
    })

    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_LABADMIN_CONSTANT.CREATE_LABADMIN_SUCESS,
        payload: res
      })
      return true
    } else {
      dispatch({
        type: CREATE_LABADMIN_CONSTANT.CREATE_LABADMIN_ERROR,
        payload: res?.data?.response_code
      })
      NotificationManager.error(res?.data?.response_message, "error", 5000, null, '');
      return false

    }


  } catch (error) {
    throw error.response
  }
};

export const UpdateLabAdminAction = (data) => async (dispatch) => {
  try {
    let res = await apiServices.updateAdmin(data)
    // console.log(res);
    //  Api Call
    dispatch({
      type: UPDATE_LABADMIN_CONSTANT.UPDATE_LABADMIN_LOADING,
      payload: true
    })

    if (res?.response_data?.user[1] === 200) {
      dispatch({
        type: UPDATE_LABADMIN_CONSTANT.UPDATE_LABADMIN_SUCESS,
        payload: res
      })
      return true
    }
    else {
      dispatch({
        type: UPDATE_LABADMIN_CONSTANT.UPDATE_LABADMIN_ERROR,
        payload: res?.response_data?.user[2]
      })
      NotificationManager.error(res?.response_data?.user[2], "Error", 5000, null, '');

      return false;
    }
  } catch (error) {
    throw error.response
  }
};


// dispatch({
//   type: CREATE_DOCTOR_CONSTANT.CREATE_DOCTOR_LOADING,
//   payload: true,
// });
// // const response = await apiServices.reg_doctor(data);
// // console.log(response);
// let token = await getToken();
// console.log(token);
// let res = await axios.post(
//   'https://dmfr-backend.herokuapp.com/api/v1/user/create',
//   data,
//   {
//     headers: {
//       '"x-session-key"': token,
//       '"x-session-type"': 'super_admin',
//     },
//   }
// );
// console.log(res);


// let token = await getToken();
//     console.log(token);
//     let res = await axios.put(
//       'https://dmfr-backend.herokuapp.com/api/v1/doctor/update-info',
//       data,
//       {
//         headers: {
//           '"x-session-key"': token,
//           '"x-session-type"': 'super_admin',
//         },
//       }
//     );
//     console.log(res);