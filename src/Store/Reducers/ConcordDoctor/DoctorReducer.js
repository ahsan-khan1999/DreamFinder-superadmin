/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

import { DOCTOR_CONSTANT } from '../../Constant/Constants';

const initialState = {
  loading: false,
  loader: false,
  doctor: [],
  createdoctor: [],
  updatedoctor: [],
};
export const DoctorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DOCTOR_CONSTANT.DOCTOR_LOADING:
      return { ...state, loading: payload, doctor: [] };

    case DOCTOR_CONSTANT.DOCTOR_SUCESS:
      return { ...state, doctor: payload };

    case DOCTOR_CONSTANT.DOCTOR_ERROR:
      return { ...state, doctor: payload };

    case DOCTOR_CONSTANT.CREATE_DOCTOR_LOADING:
      return { ...state, createdoctor: true }

    case DOCTOR_CONSTANT.CREATE_DOCTOR_SUCCESS:
      return { ...state, createdoctor: payload }

    case DOCTOR_CONSTANT.CREATE_DOCTOR_ERROR:
      return { ...state, createdoctor: true }


    case DOCTOR_CONSTANT.UPDATE_DOCTOR_LOADING:
      return { ...state, updatedoctor: true }

    case DOCTOR_CONSTANT.UPDATE_DOCTOR_SUCCESS:
      return { ...state, updatedoctor: payload }

    case DOCTOR_CONSTANT.UPDATE_DOCTOR_ERROR:
      return { ...state, updatedoctor: true }


    case DOCTOR_CONSTANT.DOCTOR_LOADING_All:
      return { ...state, loader: payload};


    default:
      return state;
  }
};
