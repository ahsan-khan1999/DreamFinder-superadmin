/* eslint-disable */
import {
  VIEW_PERORITY_CONSTANT,
  CREATE_PERORITY_CONSTANT,
  UPDATE_PERORITY_CONSTANT,
  SUSPAND_PERORITY_CONSTANT,
  VIEW_DOCTOR_PERORITY_CONSTANT,
  GET_MPO_CUSTOMER_CONSTANT,
  GET_MPO_DOCTOR_CONSTANT,
} from 'Store/Constant/Constants';

const initail_state = {
  list: [],
  doctorList: [],
  createList: {},
  loading: false,
  customers: [],
  loadingCustomers: false,
  doctor:[],
  loadingDoctor:false

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
    case GET_MPO_CUSTOMER_CONSTANT.GET_MPO_CUSTOMER_LOADING:
      return { ...state, loadingCustomers: action.payload };
    case GET_MPO_CUSTOMER_CONSTANT.GET_MPO_CUSTOMER_SUCCESS:
      return { ...state, customers: action.payload };
    case GET_MPO_CUSTOMER_CONSTANT.GET_MPO_CUSTOMER_ERROR:
      return { ...state, loadingCustomers: action.payload };
    case GET_MPO_DOCTOR_CONSTANT.GET_MPO_DOCTOR_LOADING:
      return { ...state, loadingDoctor: action.payload };
    case GET_MPO_DOCTOR_CONSTANT.GET_MPO_DOCTOR_SUCCESS:
      return { ...state, doctor: action.payload };
    case GET_MPO_DOCTOR_CONSTANT.GET_MPO_DOCTOR_ERROR:
      return { ...state, loadingDoctor: action.payload };
    default:
      return state;
  }
};
