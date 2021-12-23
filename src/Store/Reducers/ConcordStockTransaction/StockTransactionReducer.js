/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';

import { STOCKS_TRANSACTION_CONSTANT } from '../../Constant/Constants';

const initialState = {
  loading: false,
  loader: false,
  stocktransaction: [],
  createstocktransaction: [],
  get_stock_transaction_distribution_category:[],
  get_stock_transaction_distribution_category_loader:false
};
export const StockTransactionReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_LOADING:
      return { ...state, loading: payload, stocktransaction: [] };

    case STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_SUCESS:
      return { ...state, stocktransaction: payload };

    case STOCKS_TRANSACTION_CONSTANT.STOCKS_TRANSACTION_ERROR:
      return { ...state, stocktransaction: payload };

    case STOCKS_TRANSACTION_CONSTANT.CREATE_STOCKS_TRANSACTION_LOADING:
      return { ...state, createstocktransaction: true }

    case STOCKS_TRANSACTION_CONSTANT.CREATE_STOCKS_TRANSACTION_SUCCESS:
      return { ...state, createstocktransaction: payload }

    case STOCKS_TRANSACTION_CONSTANT.CREATE_STOCKS_TRANSACTION_ERROR:
      return { ...state, createstocktransaction: true }

    case STOCKS_TRANSACTION_CONSTANT.STOCK_DISTRIBUTION_CENTER_CATEGORY:
      return { ...state, get_stock_transaction_distribution_category: payload }

      case STOCKS_TRANSACTION_CONSTANT.STOCK_DISTRIBUTION_CENTER_CATEGORY_LOADER:
      return { ...state, get_stock_transaction_distribution_category_loader: payload }

    default:
      return state;
  }
};
