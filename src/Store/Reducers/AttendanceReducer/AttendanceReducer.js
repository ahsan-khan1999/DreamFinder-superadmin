/* eslint-disable */

import {
  VIEW_ATTENDANCE_CONSTANT,
  CREATE_ATTENDANCE_CONSTANT,
  VIEW_USER_CONSTANT,
  SUSPAND_ATTENDANCE_CONSTANT,
  LOADER_CONSTANT,
  GET_OLD_CONSTANT,
  GET_PARENT_CONSTANT,
} from 'Store/Constant/Constants';
const initial_state = {
  attendance: [],
  create: [],
  loading: false,
  sm: null,
  rsm: [],
  am: [],
  mpo: [],
  loadingSm: false,
  loadingAm: false,
  loadingRsm: false,
  loadingMpo: false,
  loadingGift: false,
  oldGifts: [],
  parents: [],
};
export const AttendanceReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_SUCCESS:
      return { ...state, attendance: action.payload };
    case VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_SUCCESS:
      return { ...state, create: action.payload };
    case CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_ERROR:
      return { ...state, loading: action.payload };
    case VIEW_USER_CONSTANT.GET_SM:
      return { ...state, sm: action.payload };
    case VIEW_USER_CONSTANT.GET_RSM:
      return { ...state, rsm: action.payload };
    case VIEW_USER_CONSTANT.GET_AM:
      return { ...state, am: action.payload };
    case VIEW_USER_CONSTANT.GET_MPO:
      return { ...state, mpo: action.payload };
    case SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_LOADING:
      return { ...state, loading: action.payload };
    case SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_SUCCESS:
      return { ...state, create: action.payload };
    case SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_ERROR:
      return { ...state, loading: action.payload };
    case LOADER_CONSTANT.SM_LOADING:
      return { ...state, loadingSm: action.payload };
    case LOADER_CONSTANT.AM_LOADING:
      return { ...state, loadingAm: action.payload };
    case LOADER_CONSTANT.RSM_LOADING:
      return { ...state, loadingRsm: action.payload };
    case LOADER_CONSTANT.MPO_LOADING:
      return { ...state, loadingMpo: action.payload };
    case GET_OLD_CONSTANT.GET_OLD_LOADING:
      return { ...state, loadingGift: action.payload };
    case GET_OLD_CONSTANT.GET_OLD_SUCCESS:
      return { ...state, oldGifts: action.payload };
    case GET_OLD_CONSTANT.GET_OLD_ERROR:
      return { ...state, loadingGift: action.payload };
      case GET_PARENT_CONSTANT.GET_PARENT_SUCCESS:
        return { ...state, parents: action.payload };
    default:
      return state;
  }
};
