/* eslint-disable */

import React from 'react';
import apiServices from 'services/requestHandler';
import { GET_DEPARTMENT_CONSTANT } from 'Store/Constant/Constants';
export const departmentAction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DEPARTMENT_CONSTANT.GET_DEPARTMENT_LOADING,
      payload: [],
    });

    let res = await apiServices.getDepartment();
    // console.log(res);
    if (res?.data?.response_code) {
      dispatch({
        type: GET_DEPARTMENT_CONSTANT.GET_DEPARTMENT_SUCESS,
        payload: res?.data?.response_data?.department,
      });
    } else {
      dispatch({
        type: GET_DEPARTMENT_CONSTANT.GET_DEPARTMENT_ERROR,
        payload: [],
      });
    }
  } catch {}
};
