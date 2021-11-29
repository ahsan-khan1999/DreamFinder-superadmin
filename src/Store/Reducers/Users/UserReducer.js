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
    case VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_SUCCESS:
      return { ...state, director: action.payload };
    case VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_DEPO_CONSTANT.VIEW_DEPO_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_DEPO_CONSTANT.VIEW_DEPO_SUCCESS:
      return { ...state, depoManager: action.payload };
    case VIEW_DEPO_CONSTANT.VIEW_DEPO_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_SUCCESS:
      return { ...state, deliveryStaff: action.payload };
    case VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_AM_CONSTANT.VIEW_AM_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_AM_CONSTANT.VIEW_AM_SUCCESS:
      return { ...state, areaManager: action.payload };
    case VIEW_AM_CONSTANT.VIEW_AM_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_RSM_CONSTANT.VIEW_RSM_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_RSM_CONSTANT.VIEW_RSM_SUCCESS:
      return { ...state, regionalSalesManager: action.payload };
    case VIEW_RSM_CONSTANT.VIEW_RSM_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_SM_CONSTANT.VIEW_SM_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_SM_CONSTANT.VIEW_SM_SUCCESS:
      return { ...state, salesManager: action.payload };
    case VIEW_SM_CONSTANT.VIEW_SM_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_MPO_CONSTANT.VIEW_MPO_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_MPO_CONSTANT.VIEW_MPO_SUCCESS:
      return { ...state, mpo: action.payload };
    case VIEW_MPO_CONSTANT.VIEW_MPO_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_ADMIN_CONSTANT.CREATE_ADMIN_LOADING:
      return { ...state, loadingCreate: action.payload };
    case CREATE_ADMIN_CONSTANT.CREATE_ADMIN_SUCCESS:
      return { ...state, createUser: action.payload };
    case CREATE_ADMIN_CONSTANT.CREATE_ADMIN_ERROR:
      return { ...state, loadingCreate: action.payload };
    case CREATE_DIRECTOR_CONSTANT.CREATE_DIRECTOR_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_DIRECTOR_CONSTANT.CREATE_DIRECTOR_SUCCESS:
      return { ...state, loading: action.payload };
    case CREATE_DIRECTOR_CONSTANT.CREATE_DIRECTOR_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_DEPO_CONSTANT.CREATE_DEPO_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_DEPO_CONSTANT.CREATE_DEPO_SUCCESS:
      return { ...state, loading: action.payload };
    case CREATE_DEPO_CONSTANT.CREATE_DEPO_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_DELIVERYSTAFF_CONSTANT.CREATE_DELIVERYSTAFF_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_DELIVERYSTAFF_CONSTANT.CREATE_DELIVERYSTAFF_SUCCESS:
      return { ...state, loading: action.payload };
    case CREATE_DELIVERYSTAFF_CONSTANT.CREATE_DELIVERYSTAFF_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_AM_CONSTANT.CREATE_AM_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_AM_CONSTANT.CREATE_AM_SUCCESS:
      return { ...state, loading: action.payload };
    case CREATE_AM_CONSTANT.CREATE_AM_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_RSM_CONSTANT.CREATE_RSM_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_RSM_CONSTANT.CREATE_RSM_SUCCESS:
      return { ...state, loading: action.payload };
    case CREATE_RSM_CONSTANT.CREATE_RSM_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_SM_CONSTANT.CREATE_SM_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_SM_CONSTANT.CREATE_SM_SUCCESS:
      return { ...state, loading: action.payload };
    case CREATE_SM_CONSTANT.CREATE_SM_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_MPO_CONSTANT.CREATE_MPO_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_MPO_CONSTANT.CREATE_MPO_SUCCESS:
      return { ...state, loading: action.payload };
    case CREATE_MPO_CONSTANT.CREATE_MPO_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_LOADING:
      return { ...state, loadingCreate: action.payload };
    case UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_SUCCESS:
      return { ...state, updateUser: action.payload };
    case UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_ERROR:
      return { ...state, loadingCreate: action.payload };
    case UPDATE_DIRECTOR_CONSTANT.UPDATE_DIRECTOR_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_DIRECTOR_CONSTANT.UPDATE_DIRECTOR_SUCCESS:
      return { ...state, loading: action.payload };
    case UPDATE_DIRECTOR_CONSTANT.UPDATE_DIRECTOR_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_DEPO_CONSTANT.UPDATE_DEPO_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_DEPO_CONSTANT.UPDATE_DEPO_SUCCESS:
      return { ...state, depoManager: action.payload };
    case UPDATE_DEPO_CONSTANT.UPDATE_DEPO_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_DELIVERYSTAFF_CONSTANT.UPDATE_DELIVERYSTAFF_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_DELIVERYSTAFF_CONSTANT.UPDATE_DELIVERYSTAFF_SUCCESS:
      return { ...state, deliveryStaff: action.payload };
    case UPDATE_DELIVERYSTAFF_CONSTANT.UPDATE_DELIVERYSTAFF_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_AM_CONSTANT.UPDATE_AM_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_AM_CONSTANT.UPDATE_AM_SUCCESS:
      return { ...state, areaManager: action.payload };
    case UPDATE_AM_CONSTANT.UPDATE_AM_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_RSM_CONSTANT.UPDATE_RSM_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_RSM_CONSTANT.UPDATE_RSM_SUCCESS:
      return { ...state, regionalSalesManager: action.payload };
    case UPDATE_RSM_CONSTANT.UPDATE_RSM_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_SM_CONSTANT.UPDATE_SM_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_SM_CONSTANT.UPDATE_SM_SUCCESS:
      return { ...state, salesManager: action.payload };
    case UPDATE_SM_CONSTANT.UPDATE_SM_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_MPO_CONSTANT.UPDATE_MPO_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_MPO_CONSTANT.UPDATE_MPO_SUCCESS:
      return { ...state, mpo: action.payload };
    case UPDATE_MPO_CONSTANT.UPDATE_MPO_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_ROLE_CONSTANT.VIEW_ROLE_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_ROLE_CONSTANT.VIEW_ROLE_SUCCESS:
      return { ...state, roles: action.payload };
    case VIEW_ROLE_CONSTANT.VIEW_ROLE_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_STATIC_CONSTANT.VIEW_STATIC_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_STATIC_CONSTANT.VIEW_STATIC_SUCCESS:
      return { ...state, staticData: action.payload };
    case VIEW_STATIC_CONSTANT.VIEW_STATIC_ERROR:
      return { ...state, loading: action.payload };
    default:
      return { ...state };
  }
};

