/* eslint-disable */

import apiServices from '../../../../services/requestHandler';
import {
  CREATE_PATIENT_CONSTANT,
  UPDATE_PATIENT_CONSTANT,
} from '../../../Constant/Constants';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
export const CreatePatientAction = (data) => async (dispatch) => {

  try{

    
//  Api Call

    dispatch({
      type:CREATE_PATIENT_CONSTANT.CREATE_PATIENT_LOADING,
      payload:true
    })

    if(res.data.response_code === 200){
      dispatch({
        type:CREATE_PATIENT_CONSTANT.CREATE_PATIENT_SUCESS,
        payload:res
      })
    }else{
      dispatch({
        type:CREATE_PATIENT_CONSTANT.CREATE_PATIENT_ERROR,
        payload:res.data.response_code
      })
    }


  }catch(error) {
      throw error.response
    }

  



};

export const UpdatePatientAction = (data) => async (dispatch) => {
  try {
    let res = await apiServices.updatePatient(data)
    // console.log(res);
//  Api Call
    dispatch({
      type:UPDATE_PATIENT_CONSTANT.UPDATE_PATIENT_LOADING,
      payload:true
    })

    if(res?.response_code === 200){
      dispatch({
        type:UPDATE_PATIENT_CONSTANT.UPDATE_PATIENT_SUCESS,
        payload:res
      })
      return true
    }
    else{
      dispatch({
        type:UPDATE_PATIENT_CONSTANT.UPDATE_PATIENT_ERROR,
        payload:res?.response_code
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