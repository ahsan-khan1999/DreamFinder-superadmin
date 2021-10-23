/* eslint-disable */

import {
  VIEW_MEDICINE_CONSTANT,
  CREATE_MEDICINE_CONSTANT,
  UPDATE_MEDICINE_CONSTANT,
} from 'Store/Constant/Constants';

const initail_state = {
  medicines: [],
  loading: false,
  createMedicine: [],
  updateMedicines: [],
};
export const ViewMedicinesReducer = (state = initail_state, action) => {
  switch (action.type) {
    case VIEW_MEDICINE_CONSTANT.VIEW_MEDICINES_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_MEDICINE_CONSTANT.VIEW_MEDICINES_SUCESS:
      return { ...state, medicines: action.payload };
    case VIEW_MEDICINE_CONSTANT.VIEW_MEDICINES_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_MEDICINE_CONSTANT.CREATE_MEDICINES_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_MEDICINE_CONSTANT.CREATE_MEDICINES_SUCESS:
      return { ...state, createMedicine: action.payload };
    case CREATE_MEDICINE_CONSTANT.CREATE_MEDICINES_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_MEDICINE_CONSTANT.UPDATE_MEDICINES_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_MEDICINE_CONSTANT.UPDATE_MEDICINES_SUCESS:
      return { ...state, updateMedicines: action.payload };
    case UPDATE_MEDICINE_CONSTANT.UPDATE_MEDICINES_ERROR:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
