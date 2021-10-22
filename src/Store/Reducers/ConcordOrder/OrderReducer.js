/* eslint-disable */
import { ORDER_CONSTANTS } from '../../Constant/Constants';

const initialState = {
  loading: false,
  order: [],
  currentorder: [],
};
export const OrderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ORDER_CONSTANTS.ORDER_LOADING:
      return { ...state, loading: payload, order: [] };

    case ORDER_CONSTANTS.ORDER_SUCESS:
      return { ...state, order: payload };

    case ORDER_CONSTANTS.ORDER_ERROR:
      return { ...state, order: payload };

    default:
      return state;
  }
};
