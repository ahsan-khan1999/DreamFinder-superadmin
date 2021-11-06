/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

import { STOCKS_CONSTANT } from '../../Constant/Constants';

const initialState = {
  loading: false,
  loader: false,
  updatestockloading: false,
  stock: [],
  createstock: [],
  updatestock: [],
  getstockCategory:[],
  getstockCategoryloader:false,
};
export const StockReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STOCKS_CONSTANT.STOCKS_LOADING:
      return { ...state, loading: payload, stock: [] };

    case STOCKS_CONSTANT.STOCKS_SUCESS:
      return { ...state, stock: payload };

    case STOCKS_CONSTANT.STOCKS_ERROR:
      return { ...state, stock: payload };

    case STOCKS_CONSTANT.CREATE_STOCKS_LOADING:
      return { ...state, createstock: true }

    case STOCKS_CONSTANT.CREATE_STOCKS_SUCCESS:
      return { ...state, createstock: payload }

    case STOCKS_CONSTANT.CREATE_STOCKS_ERROR:
      return { ...state, createstock: true }


    case STOCKS_CONSTANT.UPDATE_STOCKS_LOADING:
      return { ...state, updatestockloading: payload }

    case STOCKS_CONSTANT.UPDATE_STOCKS_SUCCESS:
      return { ...state, updatestock: payload }

    case STOCKS_CONSTANT.UPDATE_STOCKS_ERROR:
      return { ...state, updatestock: true }


    case STOCKS_CONSTANT.STOCKS_LOADING_All:
      return { ...state, loader: payload};


    case STOCKS_CONSTANT.STOCKS_GET_PRODUCT_CATEGORY:
      return { ...state, getstockCategory: payload };
 
    case STOCKS_CONSTANT.STOCKS_GET_PRODUCT_CATEGORY_LOADER:
      return { ...state, getstockCategoryloader: payload };
  

    default:
      return state;
  }
};
