/* eslint-disable */
import {
  LOGIN_CONSTANTS,
  SET_USER_FROM_LOCAL,
  FORGOT_CONSTANTS,
  CHANGE_PASSWORD_CONSTANT,
} from '../../Constant/Constants';
import { LOGOUT_USER } from 'Store/Constant/Constants';

const initial_state = {
  user: {},
  loading: false,
  forgot: {},
  logout: false,
  change_password_user: {},
};

export const LoginReducer = (state = initial_state, action) => {
  switch (action.type) {
    case LOGIN_CONSTANTS.LOGIN_LOADING:
      return { ...state, loading: action?.payload };

    case LOGIN_CONSTANTS.LOGIN_SUCESS:
      return { ...state, user: action?.payload };
    case SET_USER_FROM_LOCAL:
      return { ...state, user: action?.payload };

    case LOGIN_CONSTANTS.LOGIN_ERROR:
      return { ...state, user: action?.payload };
    case LOGOUT_USER:
      return { ...state, logout: true };
    case FORGOT_CONSTANTS.FORGOT_LOADING:
      return { ...state, forgot: action?.payload };
    case FORGOT_CONSTANTS.FORGOT_SUCESS:
      return { ...state, forgot: action?.payload };
    case FORGOT_CONSTANTS.FORGOT_ERROR:
      return { ...state, forgot: action?.payload };
    case CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_LOADING:
      return { ...state, change_password_user: action.payload };
    case CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_SUCESS:
      return { ...state, change_password_user: action.payload };
    case CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_ERROR:
      return { ...state, change_password_user: action.payload };
    default:
      return state;
  }
};

// payload: response?.data?.response_data?.static_data,
