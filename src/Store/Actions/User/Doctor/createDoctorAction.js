/* eslint-disable */

import apiServices from '../../../../services/requestHandler';
import { NotificationManager } from 'components/common/react-notifications';

import {
  CREATE_DOCTOR_CONSTANT,
  UPDATE_DOCTOR_CONSTANT,
} from '../../../Constant/Constants';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';


export const CreateDoctor = (data) => async (dispatch) => {

  try{

    
    const res = await apiServices.reg_doctor(data);
    // console.log(res);

    dispatch({
      type:CREATE_DOCTOR_CONSTANT.CREATE_DOCTOR_LOADING,
      payload:true
    })
    // NotificationManager.warning(res?.data?.response_message , 3000, null, null, '');

    if(res?.data?.response_code === 200){
      dispatch({
        type:CREATE_DOCTOR_CONSTANT.CREATE_DOCTOR_SUCESS,
        payload:res
      })

      return "success"
      

    }else{
      dispatch({
        type:CREATE_DOCTOR_CONSTANT.CREATE_DOCTOR_ERROR,
        payload:res?.data?.response_message
      })
      NotificationManager.warning(res?.data?.response_message , "Error", 5000, null, '');
      return false
    }

  }catch(error) {
      throw error.response
    }

  



};

export const UpdateDoctorAction = (data) => async (dispatch) => {
  try {
    let res = await apiServices.updateDoctor(data)
    dispatch({
      type:UPDATE_DOCTOR_CONSTANT.UPDATE_DOCTOR_LOADING,
      payload:true
    })

    if(res?.response_data?.user[1] === 200){
      dispatch({
        type:UPDATE_DOCTOR_CONSTANT.UPDATE_DOCTOR_SUCESS,
        payload:res
      })

      return true
    }
    else{
      dispatch({
        type:UPDATE_DOCTOR_CONSTANT.UPDATE_DOCTOR_ERROR,
        payload:res?.response_data?.user[2]
      })
      NotificationManager.warning(res?.response_message , "Error", 5000, null, '');

      return false;
    }
  } catch(error) {
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