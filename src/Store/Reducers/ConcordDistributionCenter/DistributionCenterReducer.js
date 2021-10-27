/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import {
    DISTRIBUTION_CENTER_CONSTANT,
} from 'Store/Constant/Constants';


const initialState = {
  loading: false,
  loader: false,
  distributioncenter: [],
  createdistributioncenter: [],
  updatedistributioncenter: [],
};
export const DistributionCenterReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING:
      return { ...state, loading: payload, distributioncenter: [] };

    case DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_SUCESS:
      return { ...state, distributioncenter: payload };

    case DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_ERROR:
      return { ...state, distributioncenter: payload };

    
  

    case DISTRIBUTION_CENTER_CONSTANT.CREATE_DISTRIBUTION_CENTER_LOADING:
      return { ...state, createdistributioncenter: true }

    case DISTRIBUTION_CENTER_CONSTANT.CREATE_DISTRIBUTION_CENTER_SUCCESS:
      return { ...state, createdistributioncenter: payload }

    case DISTRIBUTION_CENTER_CONSTANT.CREATE_DISTRIBUTION_CENTER_ERROR:
      return { ...state, createdistributioncenter: true }


    case DISTRIBUTION_CENTER_CONSTANT.UPDATE_DISTRIBUTION_CENTER_LOADING:
      return { ...state, updatedistributioncenter: true }

    case DISTRIBUTION_CENTER_CONSTANT.UPDATE_DISTRIBUTION_CENTER_SUCCESS:
      return { ...state, updatedistributioncenter: payload }

    case DISTRIBUTION_CENTER_CONSTANT.UPDATE_DISTRIBUTION_CENTER_ERROR:
      return { ...state, updatedistributioncenter: true }


    case DISTRIBUTION_CENTER_CONSTANT.DISTRIBUTION_CENTER_LOADING_All:
      return { ...state, loader: payload};


    default:
      return state;
  }
};
