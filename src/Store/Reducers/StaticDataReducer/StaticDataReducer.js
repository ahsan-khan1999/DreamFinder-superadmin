/* eslint-disable */

import { STATICDATACONSTANT } from "Store/Constant/Constants";

const initialState = {
    staticdata: [],
};
export const StaticDataReducer = (state = initialState, { type, payload }) => {
    
    switch (type) {
        case STATICDATACONSTANT.STATIC_DATA:
            return { ...state, staticdata: payload };
        
        default:
            return state;
    }
};
