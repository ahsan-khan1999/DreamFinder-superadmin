/* eslint-disable */
import {
  VIEW_RESCHEDULE_REQUEST,
  UPDATE_RESCHEDULE_REQUEST,
  VIEW_CURRENT_APPOINMTENT_REQUEST_CONSTANTS,
} from '../../Constant/Constants';

const initial_state = {
  rescheduleRequest: [],
  loading: false,
  currentAppointment: [],
  view: false,
};

export const ViewAppoinmentRescheduleRequest = (
  state = initial_state,
  action
) => {
  switch (action.type) {
    case VIEW_RESCHEDULE_REQUEST.VIEW_RESCHEDULE_REQUEST_LOADING:
      return { ...state, loading: action?.payload, rescheduleRequest: [] };

    case VIEW_RESCHEDULE_REQUEST.VIEW_RESCHEDULE_REQUEST_SUCESS:
      return { ...state, rescheduleRequest: action?.payload, loading: false };

    case VIEW_RESCHEDULE_REQUEST.VIEW_RESCHEDULE_REQUEST_ERROR:
      return { ...state, rescheduleRequest: action?.payload, loading: false };

    default:
      return state;
  }
};
export const UpdateAppoinmentRescheduleRequest = (
  state = initial_state,
  action
) => {
  switch (action.type) {
    case UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_LOADING:
      return { ...state, loading: action?.payload, rescheduleRequest: [] };

    case UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_SUCESS:
      return { ...state, rescheduleRequest: action?.payload };

    case UPDATE_RESCHEDULE_REQUEST.UPDATE_RESCHEDULE_REQUEST_ERROR:
      return { ...state, rescheduleRequest: action?.payload };

    default:
      return state;
  }
};
export const ViewCurrentAppointmentRemovalRequest = (
  state = initial_state,
  action
) => {
  switch (action.type) {
    case VIEW_CURRENT_APPOINMTENT_REQUEST_CONSTANTS.VIEW_CURRENT_APPOINMTENT_REQUEST_LOADING:
      return { ...state, currentAppointment: action.payload, view: false };
    case VIEW_CURRENT_APPOINMTENT_REQUEST_CONSTANTS.VIEW_CURRENT_APPOINMTENT_REQUEST_SUCESS:
      return { ...state, currentAppointment: action.payload, view: true };
    case VIEW_CURRENT_APPOINMTENT_REQUEST_CONSTANTS.VIEW_CURRENT_APPOINMTENT_REQUEST_ERROR:
      return { ...state, currentAppointment: action.payload, view: false };
    default:
      return state;
  }
};
// payload: response?.data?.response_data?.static_data,
