/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

import { CUSTOMER_CONSTANT } from '../../Constant/Constants';

const initialState = {
  loading: false,
  loader: false,
  customer: [],
  createcustomer: [],
  updatecustomer: [],
  updatecustomerloader:false
};
export const CustomerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CUSTOMER_CONSTANT.CUSTOMER_LOADING:
      return { ...state, loading: payload, customer: [] };

    case CUSTOMER_CONSTANT.CUSTOMER_SUCESS:
      return { ...state, customer: payload };

    case CUSTOMER_CONSTANT.CUSTOMER_ERROR:
      return { ...state, customer: payload };

    case CUSTOMER_CONSTANT.CREATE_CUSTOMER_LOADING:
      return { ...state, createcustomer: true }

    case CUSTOMER_CONSTANT.CREATE_CUSTOMER_SUCCESS:
      return { ...state, createcustomer: payload }

    case CUSTOMER_CONSTANT.CREATE_CUSTOMER_ERROR:
      return { ...state, createcustomer: true }


    case CUSTOMER_CONSTANT.UPDATE_CUSTOMER_LOADING:
      return { ...state, updatecustomerloader:payload }

    case CUSTOMER_CONSTANT.UPDATE_CUSTOMER_SUCCESS:
      return { ...state, updatecustomer: payload }

    case CUSTOMER_CONSTANT.UPDATE_CUSTOMER_ERROR:
      return { ...state, updatecustomer: true }


    case CUSTOMER_CONSTANT.CUSTOMER_LOADING_All:
      return { ...state, loader: payload};


    default:
      return state;
  }
};
