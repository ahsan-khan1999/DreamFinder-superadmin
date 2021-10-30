/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
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
} from 'Store/Constant/Constants';

export const ViewAdminAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_ADMIN_CONSTANT.VIEW_ADMIN_LOADING,
      payload: true,
    });

    let response = await apiServices.getAdmin();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_ADMIN_CONSTANT.VIEW_ADMIN_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_ADMIN_CONSTANT.VIEW_ADMIN_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_ADMIN_CONSTANT.VIEW_ADMIN_ERROR,
        payload: false,
      });
    }
  } catch {}
};

export const ViewDirectorAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_LOADING,
      payload: true,
    });

    let response = await apiServices.getDirector();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_DIRECTOR_CONSTANT.VIEW_DIRECTOR_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const ViewDepoAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_DEPO_CONSTANT.VIEW_DEPO_LOADING,
      payload: true,
    });

    let response = await apiServices.getDepo();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_DEPO_CONSTANT.VIEW_DEPO_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_DEPO_CONSTANT.VIEW_DEPO_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_DEPO_CONSTANT.VIEW_DEPO_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const ViewDeliveryStaffAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_LOADING,
      payload: true,
    });

    let response = await apiServices.getDeliveryUser();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_DELIVERYSTAFF_CONSTANT.VIEW_DELIVERYSTAFF_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const ViewAreaManagerAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_AM_CONSTANT.VIEW_AM_LOADING,
      payload: true,
    });

    let response = await apiServices.getAm();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_AM_CONSTANT.VIEW_AM_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_AM_CONSTANT.VIEW_AM_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_AM_CONSTANT.VIEW_AM_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const ViewRegionalSalesManagerManagerAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_RSM_CONSTANT.VIEW_RSM_LOADING,
      payload: true,
    });

    let response = await apiServices.getRsm();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_RSM_CONSTANT.VIEW_RSM_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_RSM_CONSTANT.VIEW_RSM_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_RSM_CONSTANT.VIEW_RSM_ERROR,
        payload: true,
      });
    }
  } catch {}
};
export const ViewSalesManagerManagerAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_SM_CONSTANT.VIEW_SM_LOADING,
      payload: true,
    });

    let response = await apiServices.getSm();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_SM_CONSTANT.VIEW_SM_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_SM_CONSTANT.VIEW_SM_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_SM_CONSTANT.VIEW_SM_ERROR,
        payload: true,
      });
    }
  } catch {}
};
export const ViewMPOManagerAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_MPO_CONSTANT.VIEW_MPO_LOADING,
      payload: true,
    });

    let response = await apiServices.getMpo();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_MPO_CONSTANT.VIEW_MPO_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_MPO_CONSTANT.VIEW_MPO_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_MPO_CONSTANT.VIEW_MPO_ERROR,
        payload: true,
      });
    }
  } catch {}
};
export const ViewRoleAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_ROLE_CONSTANT.VIEW_ROLE_LOADING,
      payload: true,
    });

    let response = await apiServices.readRoles();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_ROLE_CONSTANT.VIEW_ROLE_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_ROLE_CONSTANT.VIEW_ROLE_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_ROLE_CONSTANT.VIEW_ROLE_ERROR,
        payload: true,
      });
    }
  } catch {}
};

export const CreateAdminAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_ADMIN_CONSTANT.CREATE_ADMIN_LOADING,
      payload: true,
    });

    let response = await apiServices.CreateUsers(data);
    if (response?.data?.response_code === 200) {
      dispatch({
        type: CREATE_ADMIN_CONSTANT.CREATE_ADMIN_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_ADMIN_CONSTANT.CREATE_ADMIN_SUCCESS,
        payload: true,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_ADMIN_CONSTANT.CREATE_ADMIN_ERROR,
        payload: true,
      });

      let message = response?.data?.response_data[0];
      let mess = Object.values(message);
      console.log(mess);
      NotificationManager.error(mess, 'Error', 5000, '');
      NotificationManager.error(
        response?.data?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch {}
};
export const CreateSmAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_SM_CONSTANT.CREATE_SM_LOADING,
      payload: true,
    });

    let response = await apiServices.CreateUsers(data);
    if (response?.data?.response_code === 200) {
      dispatch({
        type: CREATE_SM_CONSTANT.CREATE_SM_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_SM_CONSTANT.CREATE_SM_SUCCESS,
        payload: true,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_SM_CONSTANT.CREATE_SM_ERROR,
        payload: true,
      });

      NotificationManager.error(
        response?.data?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch {}
};
export const CreateRsmAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_RSM_CONSTANT.CREATE_RSM_LOADING,
      payload: true,
    });

    let response = await apiServices.CreateUsers(data);
    if (response?.data?.response_code === 200) {
      dispatch({
        type: CREATE_RSM_CONSTANT.CREATE_RSM_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_RSM_CONSTANT.CREATE_RSM_SUCCESS,
        payload: false,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_RSM_CONSTANT.CREATE_RSM_ERROR,
        payload: true,
      });

      NotificationManager.error(
        response?.data?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch {}
};
export const CreateAmAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_AM_CONSTANT.CREATE_AM_LOADING,
      payload: true,
    });

    let response = await apiServices.CreateUsers(data);
    if (response?.data?.response_code === 200) {
      dispatch({
        type: CREATE_AM_CONSTANT.CREATE_AM_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_AM_CONSTANT.CREATE_AM_SUCCESS,
        payload: false,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_AM_CONSTANT.CREATE_AM_ERROR,
        payload: true,
      });

      NotificationManager.error(
        response?.data?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch {}
};
export const CreateMpoAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_MPO_CONSTANT.CREATE_MPO_LOADING,
      payload: true,
    });

    let response = await apiServices.CreateUsers(data);
    if (response?.data?.response_code === 200) {
      dispatch({
        type: CREATE_MPO_CONSTANT.CREATE_MPO_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_MPO_CONSTANT.CREATE_MPO_SUCCESS,
        payload: false,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_MPO_CONSTANT.CREATE_MPO_ERROR,
        payload: true,
      });

      NotificationManager.error(
        response?.data?.response_message,
        'Error',
        5000,
        ''
      );

      return false;
    }
  } catch {}
};

export const UpdateUserAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_LOADING,
      payload: true,
    });
    let res = await apiServices.updateUser(data);
    console.log(res);
    if (res?.response_code === 200) {
      // dispatch(ViewAdminAction())
      dispatch({
        type: UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_LOADING,
        payload: false,
      });
      dispatch({
        type: UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_SUCCESS,
        payload: true,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_ADMIN_CONSTANT.UPDATE_ADMIN_ERROR,
        payload: true,
      });
      NotificationManager.error(res?.response_message, 'Error', 5000, '');
      return false;
    }
  } catch {}
};

export const ViewUserRoleAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_CATEGORY_CONSTANT.VIEW_CATEGORY_LOADING,
      payload: true,
    });
    // readUserRoles,
    // createRoles,
    // updateRoles,
    // suspandRoles
    let response = await apiServices.readUserRoles();
    if (response?.data?.response_code === 200) {
      dispatch({
        type: VIEW_CATEGORY_CONSTANT.VIEW_CATEGORY_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_CATEGORY_CONSTANT.VIEW_CATEGORY_SUCCESS,
        payload: response?.data?.response_data,
      });
    } else {
      dispatch({
        type: VIEW_CATEGORY_CONSTANT.VIEW_CATEGORY_ERROR,
        payload: false,
      });
    }
  } catch {}
};

export const CreateRoleAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CATEGORY__CONSTANT.CREATE_CATEGORY_LOADING,
      payload: true,
    });
    // readUserRoles,
    // createRoles,
    // updateRoles,
    // suspandRoles
    let response = await apiServices.createRoles(data);
    if (response?.data?.response_code === 200) {
      dispatch({
        type: CREATE_CATEGORY__CONSTANT.CREATE_CATEGORY_LOADING,
        payload: false,
      });
      dispatch({
        type: CREATE_CATEGORY__CONSTANT.CREATE_CATEGORY_SUCCESS,
        payload: response?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: CREATE_CATEGORY__CONSTANT.CREATE_CATEGORY_ERROR,
        payload: false,
      });
      NotificationManager.error(
        response?.data?.response_message,
        'Error',
        5000,
        null,
        ''
      );
      return false;
    }
  } catch {}
};

export const UpdateRoleAction = (data) => async(dispatch) => {
  try {
    dispatch({
      type: UPDATE_CATEGORY__CONSTANT.UPDATE_CATEGORY_LOADING,
      payload: true,
    });
    // readUserRoles,
    // createRoles,
    // updateRoles,
    // suspandRoles
    let response = await apiServices.updateRoles(data);
    if (response?.response_code === 200) {
      dispatch({
        type: UPDATE_CATEGORY__CONSTANT.UPDATE_CATEGORY_LOADING,
        payload: false,
      });
      dispatch({
        type: UPDATE_CATEGORY__CONSTANT.UPDATE_CATEGORY_SUCCESS,
        payload: response?.data?.response_data,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_CATEGORY__CONSTANT.UPDATE_CATEGORY_ERROR,
        payload: false,
      });
      NotificationManager.error(
        response?.response_message,
        'Error',
        5000,
        null,
        ''
      );
      return false;
    }
  } catch {}
};
