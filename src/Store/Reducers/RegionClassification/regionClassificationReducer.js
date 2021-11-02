/* eslint-disable */

import {
  REGION_CLASSIFICAION_CONSTANT,
  READ_REGION_CONSTANT,
} from '../../Constant/Constants';

const initial_state = {
  loading: false,
  region: [],
  createRegion:{}
};

export const CreateRegionReducer = (state = initial_state, action) => {
  switch (action.type) {
    case REGION_CLASSIFICAION_CONSTANT.CREATE_REGION_CLASSIFICAION_LOADING:
      return { ...state, loading: action.payload };
    case REGION_CLASSIFICAION_CONSTANT.CREATE_REGION_CLASSIFICAION_SUCCESS:
      return { ...state, createRegion: action.payload };
    case REGION_CLASSIFICAION_CONSTANT.CREATE_REGION_CLASSIFICAION_ERROR:
      return { ...state, loading: action.payload };
    case READ_REGION_CONSTANT.READ_REGION_LOADING:
      return { ...state, loading: action.payload };
    case READ_REGION_CONSTANT.READ_REGION_SUCCESS:
      return { ...state, region: action.payload };
    case READ_REGION_CONSTANT.READ_REGION_ERROR:
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
