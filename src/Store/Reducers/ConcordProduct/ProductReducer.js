/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

import { PRODUCT_CONSTANT } from '../../Constant/Constants';

const initialState = {
  loading: false,
  loader: false,
  updateproductloading: false,
  product: [],
  createproduct: [],
  updateproduct: [],
  getProductCategory:[],
};
export const ProductReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_CONSTANT.PRODUCT_LOADING:
      return { ...state, loading: payload, product: [] };

    case PRODUCT_CONSTANT.PRODUCT_SUCESS:
      return { ...state, product: payload };

    case PRODUCT_CONSTANT.PRODUCT_ERROR:
      return { ...state, product: payload };

    case PRODUCT_CONSTANT.CREATE_PRODUCT_LOADING:
      return { ...state, createproduct: true }

    case PRODUCT_CONSTANT.CREATE_PRODUCT_SUCCESS:
      return { ...state, createproduct: payload }

    case PRODUCT_CONSTANT.CREATE_PRODUCT_ERROR:
      return { ...state, createproduct: true }


    case PRODUCT_CONSTANT.UPDATE_PRODUCT_LOADING:
      return { ...state, updateproductloading: payload }

    case PRODUCT_CONSTANT.UPDATE_PRODUCT_SUCCESS:
      return { ...state, updateproduct: payload }

    case PRODUCT_CONSTANT.UPDATE_PRODUCT_ERROR:
      return { ...state, updateproduct: true }


    case PRODUCT_CONSTANT.PRODUCT_GET_CATEGORY:
      return { ...state, getProductCategory: payload };
  

    case PRODUCT_CONSTANT.PRODUCT_LOADING_All:
      return { ...state, loader: payload};


    default:
      return state;
  }
};
