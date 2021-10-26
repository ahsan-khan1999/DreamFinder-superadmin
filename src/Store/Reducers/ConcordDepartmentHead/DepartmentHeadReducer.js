import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

import { DEPARTMENT_HEAD_CONSTANT } from '../../Constant/Constants';

const initialState = {
  loading: false,
  loader: false,
  departmentheadcenter: [],
  createdepartmenthead: [],
  updatedepartmenthead: [],
};
export const OrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_LOADING:
      return { ...state, loading: payload, departmentheadcenter: [] };

    case DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_SUCESS:
      return { ...state, departmentheadcenter: payload };

    case DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_ERROR:
      return { ...state, departmentheadcenter: payload };

    case DEPARTMENT_HEAD_CONSTANT.CREATE_DEPARTMENT_HEAD_LOADING:
      return { ...state, createdepartmenthead: true }

    case DEPARTMENT_HEAD_CONSTANT.CREATE_DEPARTMENT_HEAD_SUCCESS:
      return { ...state, createdepartmenthead: payload }

    case DEPARTMENT_HEAD_CONSTANT.CREATE_DEPARTMENT_HEAD_ERROR:
      return { ...state, createdepartmenthead: true }


    case DEPARTMENT_HEAD_CONSTANT.UPDATE_DEPARTMENT_HEAD_LOADING:
      return { ...state, updatedepartmenthead: true }

    case DEPARTMENT_HEAD_CONSTANT.UPDATE_DEPARTMENT_HEAD_SUCCESS:
      return { ...state, updatedepartmenthead: payload }

    case DEPARTMENT_HEAD_CONSTANT.UPDATE_DEPARTMENT_HEAD_ERROR:
      return { ...state, updatedepartmenthead: true }


    case DEPARTMENT_HEAD_CONSTANT.DEPARTMENT_HEAD_LOADING_All:
      return { ...state, loader: payload};


    default:
      return state;
  }
};
