/* eslint-disable */

import { CHANGE_PASSWORD_CONSTANT } from "../../Constant/Constants";
const initial_state = {
    change_password_user:{}
}
const ChangePassWordReducer = (state=initial_state,action) => {
    switch(action.type){
        case CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_LOADING:
            return {...state,change_password_user:action.payload}
        case CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_SUCESS:
            return {...state,change_password_user:action.payload}
        case CHANGE_PASSWORD_CONSTANT.CHANGE_PASSWORD_ERROR:
            return {...state,change_password_user:action.payload}
        default:
            return state;
    }
}
export default ChangePassWordReducer;