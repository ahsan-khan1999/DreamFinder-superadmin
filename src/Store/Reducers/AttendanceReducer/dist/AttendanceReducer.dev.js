"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AttendanceReducer = void 0;

var _Constants = require("Store/Constant/Constants");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initial_state = {
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
  parents: []
};

var AttendanceReducer = function AttendanceReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial_state;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _Constants.VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_LOADING:
      return _objectSpread({}, state, {
        loading: action.payload
      });

    case _Constants.VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_SUCCESS:
      return _objectSpread({}, state, {
        attendance: action.payload
      });

    case _Constants.VIEW_ATTENDANCE_CONSTANT.VIEW_ATTENDANCE_ERROR:
      return _objectSpread({}, state, {
        loading: action.payload
      });

    case _Constants.CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_LOADING:
      return _objectSpread({}, state, {
        loading: action.payload
      });

    case _Constants.CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_SUCCESS:
      return _objectSpread({}, state, {
        create: action.payload
      });

    case _Constants.CREATE_ATTENDANCE_CONSTANT.CREATE_ATTENDANCE_ERROR:
      return _objectSpread({}, state, {
        loading: action.payload
      });

    case _Constants.VIEW_USER_CONSTANT.GET_SM:
      return _objectSpread({}, state, {
        sm: action.payload
      });

    case _Constants.VIEW_USER_CONSTANT.GET_RSM:
      return _objectSpread({}, state, {
        rsm: action.payload
      });

    case _Constants.VIEW_USER_CONSTANT.GET_AM:
      return _objectSpread({}, state, {
        am: action.payload
      });

    case _Constants.VIEW_USER_CONSTANT.GET_MPO:
      return _objectSpread({}, state, {
        mpo: action.payload
      });

    case _Constants.SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_LOADING:
      return _objectSpread({}, state, {
        loading: action.payload
      });

    case _Constants.SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_SUCCESS:
      return _objectSpread({}, state, {
        create: action.payload
      });

    case _Constants.SUSPAND_ATTENDANCE_CONSTANT.SUSPAND_ATTENDANCE_ERROR:
      return _objectSpread({}, state, {
        loading: action.payload
      });

    case _Constants.LOADER_CONSTANT.SM_LOADING:
      return _objectSpread({}, state, {
        loadingSm: action.payload
      });

    case _Constants.LOADER_CONSTANT.AM_LOADING:
      return _objectSpread({}, state, {
        loadingAm: action.payload
      });

    case _Constants.LOADER_CONSTANT.RSM_LOADING:
      return _objectSpread({}, state, {
        loadingRsm: action.payload
      });

    case _Constants.LOADER_CONSTANT.MPO_LOADING:
      return _objectSpread({}, state, {
        loadingMpo: action.payload
      });

    case _Constants.GET_OLD_CONSTANT.GET_OLD_LOADING:
      return _objectSpread({}, state, {
        loadingGift: action.payload
      });

    case _Constants.GET_OLD_CONSTANT.GET_OLD_SUCCESS:
      return _objectSpread({}, state, {
        oldGifts: action.payload
      });

    case _Constants.GET_OLD_CONSTANT.GET_OLD_ERROR:
      return _objectSpread({}, state, {
        loadingGift: action.payload
      });

    case _Constants.GET_PARENT_CONSTANT.GET_PARENT_SUCCESS:
      return _objectSpread({}, state, {
        parents: action.payload
      });

    default:
      return state;
  }
};

exports.AttendanceReducer = AttendanceReducer;