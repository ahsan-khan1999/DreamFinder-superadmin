/* eslint-disable */
import { VIEW_TEST_CONSTANT,UPDATE_TEST_CONSTANT ,CREATE_TEST_CONSTANT,CREATE_CATEGORY_CONSTANT,UPDATE_CATEGORY_CONSTANT} from 'Store/Constant/Constants';
import apiServices from 'services/requestHandler';
import { NotificationManager } from 'components/common/react-notifications';
import { date } from 'yup/lib/locale';

export const ViewTestAction = () => async (dispatch) => {
  try {
    dispatch({
      type: VIEW_TEST_CONSTANT.VIEW_TEST_LOADING,
      payload: true,
    });
    let res = await apiServices.readTest();
    // console.log(res);

    if (res?.data?.response_code === 200) {
      dispatch({
        type: VIEW_TEST_CONSTANT.VIEW_TEST_LOADING,
        payload: false,
      });
      dispatch({
        type: VIEW_TEST_CONSTANT.VIEW_TEST_SUCESS,
        payload: res?.data?.response_data?.test,
      });
      return true;
    } else {
      dispatch({
        type: VIEW_TEST_CONSTANT.VIEW_TEST_ERROR,
        payload: false,
      });
    }
  } catch {}
};



export const UpdateTestAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_TEST_CONSTANT.UPDATE_TEST_LOADING,
      payload: true,
    });
    let res = await apiServices.updateTest(data);
    // console.log(res);

    if (res?.response_code === 200) {
      dispatch({
        type: UPDATE_TEST_CONSTANT.UPDATE_TEST_LOADING,
        payload: false,
      });
      dispatch({
        type: UPDATE_TEST_CONSTANT.UPDATE_TEST_SUCESS,
        payload: res?.response_data?.test,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_TEST_CONSTANT.UPDATE_TEST_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.response_message,"ERROR",5000,"","")
      return false;
    }
  } catch {}
};

export const CreateTestAction = (data) => async(dispatch) => {
  try{
    dispatch({
      type:CREATE_TEST_CONSTANT.CREATE_TEST_LOADING,
      payload:true
    })

    let res = await apiServices.createTest(data)
    // console.log(res);
    if(res?.data?.response_code === 200){
      dispatch({
        type:CREATE_TEST_CONSTANT.CREATE_TEST_LOADING,
        payload:false
      })
      dispatch({
        type:CREATE_TEST_CONSTANT.CREATE_TEST_SUCESS,
        payload:res?.data?.response_data?.test
      })
      return true
    }
    else{
      dispatch({
        type:CREATE_TEST_CONSTANT.CREATE_TEST_ERROR,
        payload:true
      })
      NotificationManager.error(res?.data?.response_message,"ERROR",5000,"","")

      return false
    }
  }catch{

  }
}
export const CreateCategoeyAction = (data) => async (dispatch) => {
  try{
    dispatch({
      type:CREATE_CATEGORY_CONSTANT.CREATE_CATEGORY_LOADING,
      payload:true
    })

    let res = await apiServices.CreateCategory(data)
    // console.log(res);
    if(res?.data?.response_code === 200){
      dispatch({
        type:CREATE_CATEGORY_CONSTANT.CREATE_CATEGORY_ERROR,
        payload:false
      })
      dispatch({
        type:CREATE_CATEGORY_CONSTANT.CREATE_CATEGORY_SUCESS,
        payload:res?.data?.response_data?.test
      })
      return true
    }
    else{
      dispatch({
        type:CREATE_CATEGORY_CONSTANT.CREATE_CATEGORY_ERROR,
        payload:true
      })
      NotificationManager.error(res?.data?.response_message,"ERROR",5000,"","")

      return false
    }
  }catch{

  }
}

export const UpdateCategoryAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CATEGORY_CONSTANT.UPDATE_CATEGORY_LOADING,
      payload: true,
    });
    let res = await apiServices.updateCategory(data);
    // console.log(res);

    if (res?.response_code === 200) {
      dispatch({
        type: UPDATE_CATEGORY_CONSTANT.UPDATE_CATEGORY_LOADING,
        payload: false,
      });
      dispatch({
        type: UPDATE_CATEGORY_CONSTANT.UPDATE_CATEGORY_SUCESS,
        payload: res?.response_data?.test,
      });
      return true;
    } else {
      dispatch({
        type: UPDATE_CATEGORY_CONSTANT.UPDATE_CATEGORY_ERROR,
        payload: false,
      });
      NotificationManager.error(res?.response_message,"ERROR",5000,"","")
      return false;
    }
  } catch {}
};