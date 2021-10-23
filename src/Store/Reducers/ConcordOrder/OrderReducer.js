/* eslint-disable */
import { ORDER_CONSTANTS } from '../../Constant/Constants';

const initialState = {
  loading: false,
  order: [],
  usersm: [],
  userrsm: [],
  useram: [],
  usermpo: [],
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

    case ORDER_CONSTANTS.ORDER_ERROR:
        return { ...state, order: payload };
    
    case ORDER_CONSTANTS.ORDER_GET_USER:
        return { ...state, usersm: payload };

    case ORDER_CONSTANTS.ORDER_GET_USER_RSM:
        return { ...state, userrsm: payload };

    case ORDER_CONSTANTS.ORDER_GET_USER_AM:
        return { ...state, useram: payload };

    case ORDER_CONSTANTS.ORDER_GET_USER_MPO:
        return { ...state, usermpo: payload };

    default:
      return state;
  }
};
