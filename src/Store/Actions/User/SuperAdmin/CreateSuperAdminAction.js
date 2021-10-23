/* eslint-disable */

import apiServices from '../../../../services/requestHandler';
import {
  CREATE_SUPERADMIN_CONSTANT,
  UPDATE_SUPERADMIN_CONSTANT,
} from '../../../Constant/Constants';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
export const CreateSuperAdminAction = (data) => async (dispatch) => {

  try{

    let res = await apiServices.createPharmacyUser(data);
    // console.log(res);
//  Api Call

    dispatch({
      type:CREATE_SUPERADMIN_CONSTANT.CREATE_SUPERADMIN_LOADING,
      payload:true
    })

    if(res?.data?.response_code === 200){
      dispatch({
        type:CREATE_SUPERADMIN_CONSTANT.CREATE_SUPERADMIN_SUCESS,
        payload:res
      })
      return true
    }else{
      dispatch({
        type:CREATE_SUPERADMIN_CONSTANT.CREATE_SUPERADMIN_ERROR,
        payload:res?.data?.response_code
      })
      NotificationManager.warning(res?.data?.response_message,
        'Error',
        5000,
        null,
        ''
      );
      return false
    }


  }catch(error) {
      throw error.response
    }

  



};

export const UpdateSuperAdminAction = (data) => async (dispatch) => {
  try {
//  Api Call
    let res = await apiServices.updateSuperAdmin(data);
    // console.log(res);
    dispatch({
      type:UPDATE_SUPERADMIN_CONSTANT.UPDATE_SUPERADMIN_LOADING,
      payload:true
    })

    if(res?.response_data?.user[1] === 200){
      dispatch({
        type:UPDATE_SUPERADMIN_CONSTANT.UPDATE_SUPERADMIN_SUCESS,
        payload:res
      })
      return true
    }
    else{
      dispatch({
        type:UPDATE_SUPERADMIN_CONSTANT.UPDATE_SUPERADMIN_ERROR,
        payload:res?.response_data?.user[1]
      })
      NotificationManager.warning(res?.response_data?.user[2],
        'Error',
        5000,
        null,
        ''
      );
      return false
    }
  } catch(error) {
    throw error.response
  }
};


