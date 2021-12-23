/* eslint-disable */

import { combineReducers } from 'redux';
import { LoginReducer } from './Auth/reducer';
import ForgotReducer from './Auth/forgotReducer';
import ChangePassWordReducer from './Auth/changePasswordReducer';
import {
  CreateDoctorReducer,
  UpdateDoctorReducer,
} from './Users/Doctor/createDoctorReducer';
import {
  CreateAdministratorReducer,
  UpdateAdministratorReducer,
} from './Users/Administrator/CreateAdministratorReducer';
import {
  CreateLabAdminReducer,
  UpdateLabAdminReducer,
} from './Users/LabAdmin/CreateLabAdminReducer';
import {
  CreatePatientReducer,
  UpdatePatientReducer,
} from './Users/Patient/CreatePatientReducer';
import {
  CreatePharmacyReducer,
  UpdatePharmacyReducer,
} from './Users/Pharmacy/CreatePharmacyUserReducer';
import {
  CreateSuperAdminReducer,
  UpdateSuperAdminReducer,
} from './Users/SuperAdmin/CreateSuperAdminReducer';
import {
  ViewSuperAdminReducer,
  ViewCurrentSuperAdminReducer,
} from './Users/SuperAdmin/ViewSuperAdminReducer';
import {
  ViewAdministratorReducer,
  ViewCurrentAdministratorReducer,
} from './Users/Administrator/ViewAdministratorReducer';
import {
  ViewLabAdminReducer,
  ViewCurrentLabAdminReducer,
} from './Users/LabAdmin/ViewLabAdminReducer';
import {
  ViewPharmacyReducer,
  ViewCurrentPharmacyReducer,
} from './Users/Pharmacy/ViewPharmacyUserReducer';
import {
  ViewPatientReducer,
  ViewCurrentPatientReducer,
} from './Users/Patient/ViewPatientReducer';
import { ViewDoctorReducer } from './Users/Doctor/ViewDoctorReducer';
import {
  ViewOrderRedcuer,
  ViewCurrentOrderRedcuer,
} from './Orders/viewOrdersReducer';
import {
  GetDoctorIsEdit,
  GetDoctorIsView,
} from './Users/Doctor/ViewDoctorReducer';
import {
  ViewDoctorRemovalRequest,
  ViewCurrentDoctorRemovalRequest,
} from 'Store/Reducers/RemovalRequest/removalRequestReducer';
import DepartmentReducer from '../Reducers/Departments/departmentReducer';
import menu from '../../redux/menu/reducer';

// Concord Order Reducer
import { OrderRedcuer } from './ConcordOrder/orderReducer';

const reducers = combineReducers({
  menu,

  logIn: LoginReducer,
  forgotReducer: ForgotReducer,
  doctorReducer: CreateDoctorReducer,
  changePasswordReducer: ChangePassWordReducer,
  viewDoctorReducer: ViewDoctorReducer,
  viewCurrentDoctorIsEdit: GetDoctorIsEdit,
  updateDoctor: UpdateDoctorReducer,
  CreateAdministratorReducer,
  UpdateAdministratorReducer,
  CreateLabAdminReducer,
  UpdateLabAdminReducer,
  CreatePatientReducer,
  UpdatePatientReducer,
  CreatePharmacyReducer,
  UpdatePharmacyReducer,
  CreateSuperAdminReducer,
  UpdateSuperAdminReducer,
  ViewSuperAdminReducer,
  ViewCurrentSuperAdminReducer,
  ViewAdministratorReducer,
  ViewCurrentAdministratorReducer,
  ViewLabAdminReducer,
  ViewCurrentLabAdminReducer,
  ViewPharmacyReducer,
  ViewCurrentPharmacyReducer,
  ViewPatientReducer,
  ViewCurrentPatientReducer,
  ViewOrderRedcuer,
  ViewDoctorRemovalRequest,
  ViewCurrentDoctorRemovalRequest,
  ViewCurrentOrderRedcuer,
  DepartmentReducer,

 // Ismai Nhi Karne Merge Reducer


});

export default reducers;
