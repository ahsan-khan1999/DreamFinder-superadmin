/* eslint-disable */

import {
  VIEW_TARGET_CONSTANT,
  CREATE_TARGET_CONSTANT,
  EDIT_TARGET_CONSTANT,
  ORDER_CONSTANTS,
  DISTRIBUTION_CENTER_CONSTANT,
} from 'Store/Constant/Constants';

const initial_state = {
  target: [],
  order: [],
  loading: false,
  distributionCenter: [],
  createTarget:{},
  updateTarget:{}
};

export const TargetReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_TARGET_CONSTANT.VIEW_TARGET_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_TARGET_CONSTANT.VIEW_TARGET_SUCCESS:
      return { ...state, target: action.payload };
    case VIEW_TARGET_CONSTANT.VIEW_TARGET_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_TARGET_CONSTANT.CREATE_TARGET_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_TARGET_CONSTANT.CREATE_TARGET_SUCCESS:
      return { ...state, createTarget: action.payload };
    case CREATE_TARGET_CONSTANT.CREATE_TARGET_ERROR:
      return { ...state, loading: action.payload };
    case EDIT_TARGET_CONSTANT.EDIT_TARGET_LOADING:
      return { ...state, loading: action.payload };
    case EDIT_TARGET_CONSTANT.EDIT_TARGET_SUCCESS:
      return { ...state, updateTarget: action.payload };
    case EDIT_TARGET_CONSTANT.EDIT_TARGET_ERROR:
      return { ...state, loading: action.payload };
    case DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING:
      return { ...state, loading: action.payload };
    case DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_SUCESS:
      return { ...state, distributionCenter: action.payload };
    case DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_ERROR:
      return { ...state, loading: action.payload };
    case ORDER_CONSTANTS.ORDER_LOADING:
      return { ...state, loading: action.payload };
    case ORDER_CONSTANTS.ORDER_SUCESS:
      return { ...state, order: action.payload };
    case ORDER_CONSTANTS.ORDER_ERROR:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
