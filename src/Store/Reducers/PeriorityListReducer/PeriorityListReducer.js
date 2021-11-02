/* eslint-disable */
import {
  VIEW_PERORITY_CONSTANT,
  CREATE_PERORITY_CONSTANT,
  UPDATE_PERORITY_CONSTANT,
  SUSPAND_PERORITY_CONSTANT,
  VIEW_DOCTOR_PERORITY_CONSTANT,
} from 'Store/Constant/Constants';

const initail_state = {
  list: [],
  doctorList: [],
  createList:{},
  loading: false,
};

export const ViewPeriorityRedcuer = (state = initail_state, action) => {
  switch (action.type) {
    case VIEW_PERORITY_CONSTANT.VIEW_PERORITY_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_PERORITY_CONSTANT.VIEW_PERORITY_SUCCESS:
      return { ...state, list: action.payload };
    case VIEW_PERORITY_CONSTANT.VIEW_PERORITY_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_DOCTOR_PERORITY_CONSTANT.VIEW_DOCTOR_PERORITY_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_DOCTOR_PERORITY_CONSTANT.VIEW_DOCTOR_PERORITY_SUCCESS:
      return { ...state, doctorList: action.payload };
    case VIEW_DOCTOR_PERORITY_CONSTANT.VIEW_DOCTOR_PERORITY_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_PERORITY_CONSTANT.CREATE_PERORITY_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_PERORITY_CONSTANT.CREATE_PERORITY_SUCCESS:
      return { ...state, createList: action.payload };
    case CREATE_PERORITY_CONSTANT.CREATE_PERORITY_ERROR:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
