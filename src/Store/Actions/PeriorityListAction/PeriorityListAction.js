/* eslint-disable */
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { BASEURL } from 'services/HttpProvider';
import apiServices from 'services/requestHandler';
import {
  VIEW_PERORITY_CONSTANT,
  CREATE_PERORITY_CONSTANT,
  UPDATE_PERORITY_CONSTANT,
  SUSPAND_PERORITY_CONSTANT,
  VIEW_DOCTOR_PERORITY_CONSTANT,
  GET_MPO_CUSTOMER_CONSTANT,
  GET_MPO_DOCTOR_CONSTANT
} from 'Store/Constant/Constants';
import { Check_Validation, Check_Validation_Update, getToken } from 'Utils/auth.util';

export const ViewPeriorityListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_PERORITY_CONSTANT.VIEW_PERORITY_LOADING,
      payload: true,
    });

    let res = await apiServices.readPeriorityList();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_PERORITY_CONSTANT.VIEW_PERORITY_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_PERORITY_CONSTANT.VIEW_PERORITY_SUCCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_PERORITY_CONSTANT.VIEW_PERORITY_SUCCESS,
        payload: false,
      });
    }
  } catch {}
};
export const ViewDoctorPeriorityListAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_DOCTOR_PERORITY_CONSTANT.VIEW_DOCTOR_PERORITY_LOADING,
      payload: true,
    });

    let res = await apiServices.readPeriorityListDoctor();
    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_DOCTOR_PERORITY_CONSTANT.VIEW_DOCTOR_PERORITY_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_DOCTOR_PERORITY_CONSTANT.VIEW_DOCTOR_PERORITY_SUCCESS,
        payload: res?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_DOCTOR_PERORITY_CONSTANT.VIEW_DOCTOR_PERORITY_ERROR,
        payload: false,
      });
    }
  } catch {}
};
export const CreateCustomerPeriorityListAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PERORITY_CONSTANT.CREATE_PERORITY_LOADING,
      payload: true,
    });

    let res = await apiServices.CreatePeriorityList(data);
    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_PERORITY_CONSTANT.CREATE_PERORITY_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_PERORITY_CONSTANT.CREATE_PERORITY_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_PERORITY_CONSTANT.CREATE_PERORITY_ERROR,
        payload: false,
      });

      Check_Validation(res)
      // NotificationManager.error(
      //   res?.data?.response_message,
      //   'Error',
      //   5000,
      //   null,
      //   ''
      // );
      return false;
    }
  } catch {}
};
export const CreateDoctorPeriorityListAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_PERORITY_CONSTANT.CREATE_PERORITY_LOADING,
      payload: true,
    });

    let res = await apiServices.CreateDoctorPeriorityList(data);
    if (res?.data?.response_code === 200) {
      dispatch({
        type: CREATE_PERORITY_CONSTANT.CREATE_PERORITY_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_PERORITY_CONSTANT.CREATE_PERORITY_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_PERORITY_CONSTANT.CREATE_PERORITY_ERROR,
        payload: false,
      });
      Check_Validation(res)

      // NotificationManager.error(
      //   res?.data?.response_message,
      //   'Error',
      //   5000,
      //   null,
      //   ''
      // );
      return false;
    }
  } catch {}
};

export const EditDoctorPeriorityListAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PERORITY_CONSTANT.UPDATE_PERORITY_LOADING,
      payload: true,
    });

    let res = await apiServices.UpdateDoctorPeriorityList(data);
    if (res?.response_code === 200) {
      dispatch({
        type: UPDATE_PERORITY_CONSTANT.UPDATE_PERORITY_LOADING,
        payload: false,
      });
      dispatch({
        type: UPDATE_PERORITY_CONSTANT.UPDATE_PERORITY_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_PERORITY_CONSTANT.UPDATE_PERORITY_ERROR,
        payload: false,
      });
      // Check_Validation_Update(res)

      NotificationManager.error(res?.response_message, 'Error', 5000, null, '');
      return false;
    }
  } catch {}
};

export const EditCustomerPeriorityListAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PERORITY_CONSTANT.UPDATE_PERORITY_LOADING,
      payload: true,
    });

    let res = await apiServices.UpdatePeriorityList(data);
    if (res?.response_code === 200) {
      dispatch({
        type: UPDATE_PERORITY_CONSTANT.UPDATE_PERORITY_LOADING,
        payload: false,
      });
      dispatch({
        type: UPDATE_PERORITY_CONSTANT.UPDATE_PERORITY_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_PERORITY_CONSTANT.UPDATE_PERORITY_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.response_message, 'Error', 5000, null, '');
      return false;
    }
  } catch {}
};

export const SuspandCustomerPeriorityListAction =
  (data) => async (dispatch) => {
    try {
      dispatch({
        type: SUSPAND_PERORITY_CONSTANT.SUSPAND_PERORITY_LOADING,
        payload: true,
      });

      let res = await apiServices.SuspandPeriorityList(data);
      if (res?.response_code === 200) {
        dispatch({
          type: SUSPAND_PERORITY_CONSTANT.SUSPAND_PERORITY_LOADING,
          payload: false,
        });
        dispatch({
          type: SUSPAND_PERORITY_CONSTANT.SUSPAND_PERORITY_SUCCESS,
          payload: res?.data?.response_data,
        });
        return true;
      } else {
        dispatch({
          type: SUSPAND_PERORITY_CONSTANT.SUSPAND_PERORITY_ERROR,
          payload: false,
        });
        NotificationManager.error(
          res?.response_message,
          'Error',
          5000,
          null,
          ''
        );
        return false;
      }
    } catch {}
  };

export const SuspandDoctorPeriorityListAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SUSPAND_PERORITY_CONSTANT.SUSPAND_PERORITY_LOADING,
      payload: true,
    });

    let res = await apiServices.SuspandDoctorPeriorityList(data);
    if (res?.response_code === 200) {
      dispatch({
        type: SUSPAND_PERORITY_CONSTANT.SUSPAND_PERORITY_LOADING,
        payload: false,
      });
      dispatch({
        type: SUSPAND_PERORITY_CONSTANT.SUSPAND_PERORITY_SUCCESS,
        payload: res?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: SUSPAND_PERORITY_CONSTANT.SUSPAND_PERORITY_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.response_message, 'Error', 5000, null, '');
      return false;
    }
  } catch {}
};

export const ViewMpoCustomer = (uid) => async (dispatch) => {
  try {
    dispatch({
      type:GET_MPO_CUSTOMER_CONSTANT.GET_MPO_CUSTOMER_LOADING,
      payload:true
    })
    let token = await getToken();
    let res = await axios.get(
      BASEURL+`/customers/read?child_uid=${uid}`,
      {
        headers: {
          "x-session-key": token?.token,
          "x-session-type": token?.type,
        },
      }
    );
    if(res?.data?.response_code === 200){
      dispatch({
        type:GET_MPO_CUSTOMER_CONSTANT.GET_MPO_CUSTOMER_LOADING,
        payload:false
      })
      dispatch({
        type:GET_MPO_CUSTOMER_CONSTANT.GET_MPO_CUSTOMER_SUCCESS,
        payload:res?.data?.response_data
      })
    }else{
      dispatch({
        type:GET_MPO_CUSTOMER_CONSTANT.GET_MPO_CUSTOMER_ERROR,
        payload:false
      })
    }
    
  } catch {}
};
export const ViewMpoDoctor = (uid) => async (dispatch) => {
  try {
    dispatch({
      type:GET_MPO_DOCTOR_CONSTANT.GET_MPO_DOCTOR_LOADING,
      payload:true
    })
    let token = await getToken();
    let res = await axios.get(
      BASEURL+`/doctors/read?child_uid=${uid}`,
      {
        headers: {
          "x-session-key": token?.token,
          "x-session-type": token?.type,
        },
      }
    );
    
    if(res?.data?.response_code === 200){
      dispatch({
        type:GET_MPO_DOCTOR_CONSTANT.GET_MPO_DOCTOR_LOADING,
        payload:false
      })
      dispatch({
        type:GET_MPO_DOCTOR_CONSTANT.GET_MPO_DOCTOR_SUCCESS,
        payload:res?.data?.response_data
      })
    }else{
      dispatch({
        type:GET_MPO_DOCTOR_CONSTANT.GET_MPO_DOCTOR_ERROR,
        payload:false
      })
    }
    
  } catch {}
};


