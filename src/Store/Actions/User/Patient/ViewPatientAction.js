/* eslint-disable */
import { VIEW_PATIENT_CONSTANT } from '../../../Constant/Constants';
import { VIEW_CURRENT_PATIENT_CONSTANT } from '../../../Constant/Constants';

import apiServices from '../../../../services/requestHandler';
import localStoreUtil from '../../../../Utils/localstore.util';
import { getToken } from '../../../../Utils/auth.util';
import axios from 'axios';

export const ViewPatientAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_PATIENT_CONSTANT.VIEW_PATIENT_LOADING,
      payload: true,
    });
    let response = await apiServices.getPatient();
    // console.log(response);

    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_PATIENT_CONSTANT.VIEW_PATIENT_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_PATIENT_CONSTANT.VIEW_PATIENT_SUCESS,
        payload: response?.data?.response_data?.patient,
      });
      return true;
    } else {
      dispatch({
        type: VIEW_PATIENT_CONSTANT.VIEW_PATIENT_ERROR,
        payload: [],
      });
      return false;
    }
  } catch {}
};
export const ViewCurrentPatientAction = (data, view) => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_CURRENT_PATIENT_CONSTANT.VIEW_CURRENT_PATIENT_LOADING,
      payload: {},
    });
    if (data !== null) {
      dispatch({
        type: VIEW_CURRENT_PATIENT_CONSTANT.VIEW_CURRENT_PATIENT_SUCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: VIEW_CURRENT_PATIENT_CONSTANT.VIEW_CURRENT_PATIENT_ERROR,
        payload: {},
      });
    }
  } catch {}
};
