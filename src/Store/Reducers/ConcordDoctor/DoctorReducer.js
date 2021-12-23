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
  updatedoctorloading:false,
  hierarchy_region: [],
  hierarchy_area: [],
  hierarchy_thana: [],
  hierarchy_territory: [],
  hierarchy_market: [],
  hierarchy_region_loader: false,
  hierarchy_area_loader: false,
  hierarchy_thana_loader: false,
  hierarchy_territory_loader: false,
  hierarchy_market_loader: false,
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
      return { ...state, updatedoctorloading: payload }

    case DOCTOR_CONSTANT.UPDATE_DOCTOR_SUCCESS:
      return { ...state, updatedoctor: payload }

    case DOCTOR_CONSTANT.UPDATE_DOCTOR_ERROR:
      return { ...state, updatedoctor: true }


    case DOCTOR_CONSTANT.DOCTOR_LOADING_All:
      return { ...state, loader: payload };


    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_REGION:
      return { ...state, hierarchy_region: payload };
    
    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_REGION_LOADER:
      return { ...state, hierarchy_region_loader: payload };

    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_AREA:
      return { ...state, hierarchy_area: payload };
    
    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_AREA_LOADER:
      return { ...state, hierarchy_area_loader: payload };

    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_THANA:
      return { ...state, hierarchy_thana: payload };
    
    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_THANA_LOADER:
      return { ...state, hierarchy_thana_loader: payload };

    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_TERRITORY:
      return { ...state, hierarchy_territory: payload };
   
    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_TERRITORY_LOADER:
      return { ...state, hierarchy_territory_loader: payload };

    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_MARKET:
      return { ...state, hierarchy_market: payload };

    case DOCTOR_CONSTANT.DOCTOR_GET_HIERARCHY_MARKET_LOADER:
      return { ...state, hierarchy_market_loader: payload };


    default:
      return state;
  }
};
