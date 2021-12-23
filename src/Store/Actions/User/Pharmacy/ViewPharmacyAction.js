/* eslint-disable */
import { VIEW_PHARMACY_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_PHARMACY_CONSTANT } from '../../../Constant/Constants';

import apiServices from '../../../../services/requestHandler';
import localStoreUtil from '../../../../Utils/localstore.util';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';

export const ViewPharmacyAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_PHARMACY_CONSTANT.VIEW_PHARMACY_LOADING,
      payload: true,
    });

  let response  = await apiServices.getPharmacyUser();
  // console.log(response);
 

    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_PHARMACY_CONSTANT.VIEW_PHARMACY_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_PHARMACY_CONSTANT.VIEW_PHARMACY_SUCESS,
        payload: response?.data?.response_data?.pharmacy,
      });
      return true;
    } else {
      dispatch({
        type: VIEW_PHARMACY_CONSTANT.VIEW_PHARMACY_ERROR,
        payload: [],
      });
      return false;
    }
  } catch {}

};
export const ViewCurrentPharmacyAction = (data,view) => async (dispatch) => {
  try{
    dispatch({
      type:VIEW_CURRENT_PHARMACY_CONSTANT.VIEW_CURRENT_PHARMACY_LOADING,
      payload:{}
    })
    if(data !== null){
      dispatch({
        type:VIEW_CURRENT_PHARMACY_CONSTANT.VIEW_CURRENT_PHARMACY_SUCESS,
        payload:data
      })
    }else{
      dispatch({
        type:VIEW_CURRENT_PHARMACY_CONSTANT.VIEW_CURRENT_PHARMACY_ERROR,
        payload:{}
      })
    }


  }catch{

  }
} 
