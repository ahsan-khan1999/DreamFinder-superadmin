/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

import { DOCTOR_CATEGORY_CONSTANT } from '../../Constant/Constants';

const initialState = {
  loading: false,
  loader: false,
  doctorcategory: [],
  createdoctorcategory: [],
  updatedoctorcategory: [],
};
export const DoctorCategoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_LOADING:
      return { ...state, loading: payload, doctorcategory: [] };

    case DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_SUCESS:
      return { ...state, doctorcategory: payload };

    case DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_ERROR:
      return { ...state, doctorcategory: payload };

    case DOCTOR_CATEGORY_CONSTANT.CREATE_DOCTOR_CATEGORY_LOADING:
      return { ...state, loading: true }

    case DOCTOR_CATEGORY_CONSTANT.CREATE_DOCTOR_CATEGORY_SUCCESS:
      return { ...state, createdoctorcategory: payload }

    case DOCTOR_CATEGORY_CONSTANT.CREATE_DOCTOR_CATEGORY_ERROR:
      return { ...state, createdoctorcategory: true }


    case DOCTOR_CATEGORY_CONSTANT.UPDATE_DOCTOR_CATEGORY_LOADING:
      return { ...state, loading: true }

    case DOCTOR_CATEGORY_CONSTANT.UPDATE_DOCTOR_CATEGORY_SUCCESS:
      return { ...state, updatedoctorcategory: payload }

    case DOCTOR_CATEGORY_CONSTANT.UPDATE_DOCTOR_CATEGORY_ERROR:
      return { ...state, updatedoctorcategory: true }


    case DOCTOR_CATEGORY_CONSTANT.DOCTOR_CATEGORY_LOADING_All:
      return { ...state, loader: payload};


    default:
      return state;
  }
};
