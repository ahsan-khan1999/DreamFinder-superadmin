/* eslint-disable */
import { VIEW_SUPERADMIN_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_SUPERADMIN_CONSTANT } from '../../../Constant/Constants';

import apiServices from '../../../../services/requestHandler';
import localStoreUtil from '../../../../Utils/localstore.util';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';

export const ViewSuperAdminAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_SUPERADMIN_CONSTANT.VIEW_SUPERADMIN_LOADING,
      payload: true,
    });

    let res = await apiServices.getSuperAdmin();
    // console.log(res);
    

    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_SUPERADMIN_CONSTANT.VIEW_SUPERADMIN_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_SUPERADMIN_CONSTANT.VIEW_SUPERADMIN_SUCESS,
        payload: res?.data?.response_data?.super_admin,
      });
      return true;
    } else {
      dispatch({
        type: VIEW_SUPERADMIN_CONSTANT.VIEW_SUPERADMIN_ERROR,
        payload: [],
      });
      return false;
    }
  } catch {}

};
export const ViewCurrentSuperAdminAction = (data,view) => async (dispatch) => {
  try{
    dispatch({
      type:VIEW_CURRENT_SUPERADMIN_CONSTANT.VIEW_CURRENT_SUPERADMIN_LOADING,
      payload:{}
    })
    if(data !== null){
      dispatch({
        type:VIEW_CURRENT_SUPERADMIN_CONSTANT.VIEW_CURRENT_SUPERADMIN_SUCESS,
        payload:data
      })
    }else{
      dispatch({
        type:VIEW_CURRENT_SUPERADMIN_CONSTANT.VIEW_CURRENT_SUPERADMIN_ERROR,
        payload:{}
      })
    }


  }catch{

  }
} 
