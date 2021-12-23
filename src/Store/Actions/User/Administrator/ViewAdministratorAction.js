/* eslint-disable */
import { VIEW_ADMINISTRATOR_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_ADMINISTRATOR_CONSTANT } from '../../../Constant/Constants';

import apiServices from '../../../../services/requestHandler';
import localStoreUtil from '../../../../Utils/localstore.util';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';

export const ViewAdministratorAction = () => async (dispatch) => {
  try {

    dispatch({
      type: VIEW_ADMINISTRATOR_CONSTANT.VIEW_ADMINISTRATOR_LOADING,
      payload: true,
    });
    let res = await apiServices.getAdministrator()
    // console.log(res);
   

    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_ADMINISTRATOR_CONSTANT.VIEW_ADMINISTRATOR_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_ADMINISTRATOR_CONSTANT.VIEW_ADMINISTRATOR_SUCESS,
        payload: res?.data?.response_data.administrator,
      });

      // return response?.data?.response_data.doctor;
    } else {
      dispatch({
        type: VIEW_ADMINISTRATOR_CONSTANT.VIEW_ADMINISTRATOR_ERROR,
        payload: [],
      });
      return false;
    }
  } catch {}

};
export const ViewCurrentAdminAction = (data) => async (dispatch) => {
  try{
    dispatch({
      type:VIEW_CURRENT_ADMINISTRATOR_CONSTANT.VIEW_CURRENT_ADMINISTRATOR_LOADING,
      payload:[]
    })
    if(data !== null){
      dispatch({
        type:VIEW_CURRENT_ADMINISTRATOR_CONSTANT.VIEW_CURRENT_ADMINISTRATOR_SUCESS,
        payload:data
      })
    }else{
      dispatch({
        type:VIEW_CURRENT_ADMINISTRATOR_CONSTANT.VIEW_CURRENT_ADMINISTRATOR_ERROR,
        payload:[]
      })
    }


  }catch{

  }
} 
