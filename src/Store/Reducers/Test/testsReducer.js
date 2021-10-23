/* eslint-disable */

import { VIEW_TEST_CONSTANT,UPDATE_TEST_CONSTANT, READR_CATEGORY_CONSTANT ,CREATE_TEST_CONSTANT} from 'Store/Constant/Constants';

const initial_state = {
  test: [],
  loading: false,
  updateTest:[],
  category:[],
  createTest:[]
};

export const ViewTestReducer = (state = initial_state, action) => {
  switch (action.type) {
    case VIEW_TEST_CONSTANT.VIEW_TEST_LOADING:
      return { ...state, loading: action.payload };
    case VIEW_TEST_CONSTANT.VIEW_TEST_SUCESS:
      return { ...state, test: action.payload };
    case VIEW_TEST_CONSTANT.VIEW_TEST_ERROR:
      return { ...state, loading: action.payload };
    case UPDATE_TEST_CONSTANT.UPDATE_TEST_LOADING:
      return { ...state, loading: action.payload };
    case UPDATE_TEST_CONSTANT.UPDATE_TEST_SUCESS:
      return { ...state, updateTest: action.payload };
    case UPDATE_TEST_CONSTANT.UPDATE_TEST_ERROR:
      return { ...state, loading: action.payload };
    case READR_CATEGORY_CONSTANT.READR_CATEGORY_LOADING:
      return { ...state, loading: action.payload };
    case READR_CATEGORY_CONSTANT.READR_CATEGORY_SUCESS:
      return { ...state, category: action.payload };
    case READR_CATEGORY_CONSTANT.READR_CATEGORY_ERROR:
      return { ...state, loading: action.payload };
    case CREATE_TEST_CONSTANT.CREATE_TEST_LOADING:
      return { ...state, loading: action.payload };
    case CREATE_TEST_CONSTANT.CREATE_TEST_SUCESS:
      return { ...state, createTest: action.payload };
    case CREATE_TEST_CONSTANT.CREATE_TEST_ERROR:
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
};
