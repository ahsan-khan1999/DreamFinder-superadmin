/* eslint-disable */

import { VIEW_GIFT_CONSTANT } from 'Store/Constant/Constants';

const initital_state = {
  gifts: [],
  loading: false,
};
export const GiftReducer = (state = initital_state, action) => {
  switch (action.type) {
    case VIEW_GIFT_CONSTANT.VIEW_GIFT_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_GIFT_CONSTANT.VIEW_GIFT_SUCCESS:
      return { ...state, gifts: action.payload };
    case VIEW_GIFT_CONSTANT.VIEW_GIFT_ERROR:
      return { ...state, loading: action.payload };

    default:
      return {...state};
  }
};
