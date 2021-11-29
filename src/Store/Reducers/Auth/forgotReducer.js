/* eslint-disable */

import { FORGOT_CONSTANTS } from '../../Constant/Constants';

const initial_state = {
  forgot: {},
};

const ForgotReducer = (state = initial_state.forgot, action) => {
    switch(action.type){
        case FORGOT_CONSTANTS.FORGOT_LOADING :
            return {...state,forgot:action?.payload}
        case FORGOT_CONSTANTS.FORGOT_SUCESS : 
            return {...state,forgot:action?.payload}
        case FORGOT_CONSTANTS.FORGOT_ERROR:
            return {...state,forgot:action?.payload}
        default:
            return state
    }
};
export default ForgotReducer;
