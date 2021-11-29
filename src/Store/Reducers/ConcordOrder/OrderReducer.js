/* eslint-disable */
import { ORDER_CONSTANTS } from '../../Constant/Constants';

const initialState = {
  loading: false,
  updatingloader: false,

  loader: false,
  order: [],
  usersm: [],
  userrsm: [],
  useram: [],
  usermpo: [],
  getCustomerOrder: [],
  stockproductmedicine: [],
  staticdata: [],
  createorder: [],
  getCustomerOrderloader:false,
  usersmloader:false,
  userrsmloader:false,
  useramloader:false,
  usermpoloader:false,
};
export const OrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_CONSTANTS.ORDER_LOADING:
      return { ...state, loading: payload, order: [] };

    case ORDER_CONSTANTS.ORDER_SUCESS:
      return { ...state, order: payload };

    case ORDER_CONSTANTS.ORDER_ERROR:
      return { ...state, order: payload };

 
    case ORDER_CONSTANTS.ORDER_GET_USER:
      return { ...state, usersm: payload };
      
    case ORDER_CONSTANTS.ORDER_GET_USER_LOADER:
      return { ...state, usersmloader: payload };

    case ORDER_CONSTANTS.ORDER_GET_USER_RSM:
      return { ...state, userrsm: payload };
   
    case ORDER_CONSTANTS.ORDER_GET_USER_RSM_LOADER:
      return { ...state, userrsmloader: payload };

    case ORDER_CONSTANTS.ORDER_GET_USER_AM:
      return { ...state, useram: payload };
    
    case ORDER_CONSTANTS.ORDER_GET_USER_AM_LOADER:
      return { ...state, useramloader: payload };

    case ORDER_CONSTANTS.ORDER_GET_USER_MPO:
      return { ...state, usermpo: payload };

    case ORDER_CONSTANTS.ORDER_GET_USER_MPO_LOADER:
      return { ...state, usermpoloader: payload };



    case ORDER_CONSTANTS.ORDER_GET_CUSTOMER:
      return { ...state, getCustomerOrder: payload };

    case ORDER_CONSTANTS.ORDER_GET_CUSTOMER_LOADER:
      return { ...state, getCustomerOrderloader: payload };

    
    
    case ORDER_CONSTANTS.ORDER_GET_STOCK_MEDICINE:
      return { ...state, stockproductmedicine: payload };

    case ORDER_CONSTANTS.STATIC_DATA:
      return { ...state, staticdata: payload };

    case ORDER_CONSTANTS.CREATE_ORDER_LOADING:
      return { ...state, createorder: true }

    case ORDER_CONSTANTS.CREATE_ORDER_SUCCESS:
      return { ...state, createorder: payload }

    case ORDER_CONSTANTS.CREATE_ORDER_ERROR:
      return { ...state, createorder: true }


    case ORDER_CONSTANTS.ORDER_LOADING_All:
      return { ...state, loader: payload};


    default:
      return state;
  }
};
