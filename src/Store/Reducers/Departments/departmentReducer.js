/* eslint-disable */

import React from 'react'
import { GET_DEPARTMENT_CONSTANT } from 'Store/Constant/Constants'

const initial_state = {
    department:[]
}
export default function DepartmentReducer(state=initial_state,action) {
    switch(action.type){
        case GET_DEPARTMENT_CONSTANT.GET_DEPARTMENT_LOADING:
            return {...state,department:action.payload}
        case GET_DEPARTMENT_CONSTANT.GET_DEPARTMENT_SUCESS:
            return {...state,department:action.payload}
        case GET_DEPARTMENT_CONSTANT.GET_DEPARTMENT_ERROR:
            return {...state,department:action.payload}
        default:
            return state;
        }
    } 

