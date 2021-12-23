/* eslint-disable */

import {
  CREATE_SAMPLE_CONSTANT,
  UPDATE_SAMPLE_CONSTANT,
  SUSPAND_SAMPLE_CONSTANT,
  VIEW_SAMPLE_CONSTANT,
  VIEW_SAMPLE_TRANSACTION_CONSTANT,
  CREATE_SAMPLE_TRANSACTION_CONSTANT,
  SUSPAND_SAMPLE_TRANSACTION_CONSTANT,
} from 'Store/Constant/Constants';

const initial_state = {
  sample: [],
  sampleTransaction: [],
  createSample: {},
  updateSample: {},
  loading: false,
};
export const SampleReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_SAMPLE_CONSTANT.VIEW_SAMPLE_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_SAMPLE_CONSTANT.VIEW_SAMPLE_SUCCESS:
      return { ...state, sample: action.payload };
    case VIEW_SAMPLE_CONSTANT.VIEW_SAMPLE_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_SAMPLE_TRANSACTION_CONSTANT.VIEW_SAMPLE_TRANSACTION_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_SAMPLE_TRANSACTION_CONSTANT.VIEW_SAMPLE_TRANSACTION_SUCCESS:
      return { ...state, sampleTransaction: action.payload };
    case VIEW_SAMPLE_TRANSACTION_CONSTANT.VIEW_SAMPLE_TRANSACTION_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_SAMPLE_CONSTANT.CREATE_SAMPLE_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_SAMPLE_CONSTANT.CREATE_SAMPLE_SUCCESS:
      return { ...state, createSample: action.payload };
    case CREATE_SAMPLE_CONSTANT.CREATE_SAMPLE_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_SAMPLE_CONSTANT.UPDATE_SAMPLE_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_SAMPLE_CONSTANT.UPDATE_SAMPLE_SUCCESS:
      return { ...state, updateSample: action.payload };
    case UPDATE_SAMPLE_CONSTANT.UPDATE_SAMPLE_ERROR:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
