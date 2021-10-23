/* eslint-disable */

import { GET_AVILABLE_SLOTS } from '../../Constant/Constants';
const initial_state = {
  slots: [],
  loading:false
};
export const GetAvilableSlotsReducer = (state = initial_state, action) => {
  switch (action.type) {
    case GET_AVILABLE_SLOTS.GET_AVILABLE_SLOTS_LOADING:
      return { ...state, loading: action.payload,slots:[] };
    case GET_AVILABLE_SLOTS.GET_AVILABLE_SLOTS_SUCESS:
      return { ...state, slots: action.payload, loading: false };
    case GET_AVILABLE_SLOTS.GET_AVILABLE_SLOTS_ERROR:
      return { ...state, slots: action.payload, loading: false };
    default:
      return state;
  }
};
