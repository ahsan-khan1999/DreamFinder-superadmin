/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

import { PRODUCT_CATEGORY_CONSTANT } from '../../Constant/Constants';

const initialState = {
  loading: false,
  loader: false,
  productcategory: [],
  createproductcategory: [],
  updateproductcategory: [],
  updateproductcategoryloader:false,
};
export const ProductCategoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_LOADING:
      return { ...state, loading: payload, productcategory: [] };

    case PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_SUCESS:
      return { ...state, productcategory: payload };

    case PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_ERROR:
      return { ...state, productcategory: payload };

    case PRODUCT_CATEGORY_CONSTANT.CREATE_PRODUCT_CATEGORY_LOADING:
      return { ...state, createproductcategory: true }

    case PRODUCT_CATEGORY_CONSTANT.CREATE_PRODUCT_CATEGORY_SUCCESS:
      return { ...state, createproductcategory: payload }

    case PRODUCT_CATEGORY_CONSTANT.CREATE_PRODUCT_CATEGORY_ERROR:
      return { ...state, createproductcategory: true }


    case PRODUCT_CATEGORY_CONSTANT.UPDATE_PRODUCT_CATEGORY_LOADING:
      return { ...state, updateproductcategoryloader: payload }

    case PRODUCT_CATEGORY_CONSTANT.UPDATE_PRODUCT_CATEGORY_SUCCESS:
      return { ...state, updateproductcategory: payload }

    case PRODUCT_CATEGORY_CONSTANT.UPDATE_PRODUCT_CATEGORY_ERROR:
      return { ...state, updateproductcategory: true }


    case PRODUCT_CATEGORY_CONSTANT.PRODUCT_CATEGORY_LOADING_All:
      return { ...state, loader: payload};


    default:
      return state;
  }
};
