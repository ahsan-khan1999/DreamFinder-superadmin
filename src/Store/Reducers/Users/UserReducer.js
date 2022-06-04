/* eslint-disable */

import {
  VIEW_ADMIN_CONSTANT,
  VIEW_DIRECTOR_CONSTANT,
  VIEW_DEPO_CONSTANT,
  VIEW_DELIVERYSTAFF_CONSTANT,
  VIEW_AM_CONSTANT,
  VIEW_RSM_CONSTANT,
  VIEW_SM_CONSTANT,
  VIEW_MPO_CONSTANT,
  CREATE_ADMIN_CONSTANT,
  CREATE_DIRECTOR_CONSTANT,
  CREATE_DEPO_CONSTANT,
  CREATE_DELIVERYSTAFF_CONSTANT,
  CREATE_AM_CONSTANT,
  CREATE_RSM_CONSTANT,
  CREATE_SM_CONSTANT,
  CREATE_MPO_CONSTANT,
  UPDATE_ADMIN_CONSTANT,
  UPDATE_DIRECTOR_CONSTANT,
  UPDATE_DEPO_CONSTANT,
  UPDATE_DELIVERYSTAFF_CONSTANT,
  UPDATE_AM_CONSTANT,
  UPDATE_RSM_CONSTANT,
  UPDATE_SM_CONSTANT,
  UPDATE_MPO_CONSTANT,
  VIEW_ROLE_CONSTANT,
  VIEW_CATEGORY_CONSTANT,
  CREATE_CATEGORY__CONSTANT,
  UPDATE_CATEGORY__CONSTANT,
  VIEW_STATIC_CONSTANT,
  GET_USER_CONSTANT,
} from 'Store/Constant/Constants';

const initial_state = {
  admin: [],
  director: [],
  depoManager: [],
  deliveryStaff: [],
  salesManager: [],
  areaManager: [],
  regionalSalesManager: [],
  mpo: [],
  roles: [],
  createUser: [],
  loading: false,
  loadingCreate: false,
  updateUser: {},
  staticData: {},
  userSpecific: {},
  // loadingUpdate:false
};

export const ViewUserReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_ADMIN_CONSTANT.VIEW_ADMIN_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_ADMIN_CONSTANT.VIEW_ADMIN_SUCCESS:
      return { ...state, admin: action.payload };
    case VIEW_ADMIN_CONSTANT.VIEW_ADMIN_ERROR:
      return { ...state, loading: action.payload };
    
    case UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_LOADING:
      return { ...state, loadingCreate: action.payload };
    case UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_SUCCESS:
      return { ...state, updateUser: action.payload };
    case UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_ERROR:
      return { ...state, loadingCreate: action.payload };
   
    case VIEW_STATIC_CONSTANT.VIEW_STATIC_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_STATIC_CONSTANT.VIEW_STATIC_SUCCESS:
      return { ...state, staticData: action.payload };
    case VIEW_STATIC_CONSTANT.VIEW_STATIC_ERROR:
      return { ...state, loading: action.payload };
    case GET_USER_CONSTANT.GET_USER_LOADING:
      return { ...state, loading: action.payload };
    case GET_USER_CONSTANT.GET_USER_SUCCESS:
      return { ...state, userSpecific: action.payload };
    case GET_USER_CONSTANT.GET_USER_ERROR:
      return { ...state, loading: action.payload };
    default:
      return { ...state };
  }
};
