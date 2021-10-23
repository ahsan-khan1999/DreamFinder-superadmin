/* eslint-disable */
import { VIEW_DOCTOR_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_DOCTOR_CONSTANT } from '../../../Constant/Constants';

import apiServices from '../../../../services/requestHandler';
import localStoreUtil from '../../../../Utils/localstore.util';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';

export const View_Doctor = () => async (dispatch) => {
  try {
    // alert("In View Doctor action")
    dispatch({
      type: VIEW_DOCTOR_CONSTANT.VIEW_DOCTOR_LOADING,
      payload: true,
    });
    let response = await apiServices.getUsers();
    console.log(response);
    

    if (response?.data?.response_code === 200) {
        dispatch({
        type: VIEW_DOCTOR_CONSTANT.VIEW_DOCTOR_LOADING,
        payload: false,
      });
        dispatch({
        type: VIEW_DOCTOR_CONSTANT.VIEW_DOCTOR_SUCESS,
        payload: response?.data?.response_data,
      });

     
      return true;
    } else {
       dispatch({
        type: VIEW_DOCTOR_CONSTANT.VIEW_DOCTOR_ERROR,
        payload: [],
      });
      return false;
    }
  } catch {}

  //   alert('enter action');
};
export const getItemIsEdit = (data,view) => async (dispatch) => {
  try{
    dispatch({
      type:VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_LOADING,
      payload:{}
    })
    if(data !== null){
      dispatch({
        type:VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_SUCESS,
        payload:data
      })
    }else{
      dispatch({
        type:VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_SUCESS,
        payload:{}
      })
    }


  }catch{

  }
} 
// export const getItemIsView = (data) => async (dispatch) => {
//   try{
//     dispatch({
//       type:VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_LOADING,
//       payload:{}
//     })
//     if(data !== null){
//       dispatch({
//         type:VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_SUCESS,
//         payload:data
//       })
//     }else{
//       dispatch({
//         type:VIEW_CURRENT_DOCTOR_CONSTANT.VIEW_CURRENT_DOCTOR_SUCESS,
//         payload:{}
//       })
//     }


//   }catch{

//   }
// } 

// payload: response?.data?.response_data?.static_data,
