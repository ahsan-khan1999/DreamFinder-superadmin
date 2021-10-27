/* eslint-disable */

import { LoginReducer } from 'Store/Reducers/Auth/reducer';
import ForgotReducer from 'Store/Reducers/Auth/forgotReducer';
import {
  CreateDoctorReducer,
  UpdateDoctorReducer,
} from 'Store/Reducers/Users/Doctor/createDoctorReducer';
import ChangePassWordReducer from 'Store/Reducers/Auth/changePasswordReducer';
import {
  GetDoctorIsEdit,
  ViewDoctorReducer,
} from 'Store/Reducers/Users/Doctor/ViewDoctorReducer';
import {
  CreateAdministratorReducer,
  UpdateAdministratorReducer,
} from 'Store/Reducers/Users/Administrator/CreateAdministratorReducer';
import {
  CreateLabAdminReducer,
  UpdateLabAdminReducer,
} from 'Store/Reducers/Users/LabAdmin/CreateLabAdminReducer';
import {
  CreatePatientReducer,
  UpdatePatientReducer,
} from 'Store/Reducers/Users/Patient/CreatePatientReducer';
import {
  CreatePharmacyReducer,
  UpdatePharmacyReducer,
} from 'Store/Reducers/Users/Pharmacy/CreatePharmacyUserReducer';
import {
  CreateSuperAdminReducer,
  UpdateSuperAdminReducer,
} from 'Store/Reducers/Users/SuperAdmin/CreateSuperAdminReducer';
import {
  ViewCurrentSuperAdminReducer,
  ViewSuperAdminReducer,
} from 'Store/Reducers/Users/SuperAdmin/ViewSuperAdminReducer';
import {
  ViewCurrentAdministratorReducer,
  ViewAdministratorReducer,
} from 'Store/Reducers/Users/Administrator/ViewAdministratorReducer';
import {
  ViewLabAdminReducer,
  ViewCurrentLabAdminReducer,
} from 'Store/Reducers/Users/LabAdmin/ViewLabAdminReducer';
import {
  ViewPharmacyReducer,
  ViewCurrentPharmacyReducer,
} from 'Store/Reducers/Users/Pharmacy/ViewPharmacyUserReducer';
import {
  ViewPatientReducer,
  ViewCurrentPatientReducer,
} from 'Store/Reducers/Users/Patient/ViewPatientReducer';
import {
  ViewDoctorRemovalRequest,
  ViewCurrentDoctorRemovalRequest,
} from 'Store/Reducers/RemovalRequest/removalRequestReducer';
import {
  ViewCurrentOrderRedcuer,
  ViewOrderRedcuer,
} from 'Store/Reducers/Orders/viewOrdersReducer';
import {
  ViewAppoinmentRescheduleRequest,
  UpdateAppoinmentRescheduleRequest,
  ViewCurrentAppointmentRemovalRequest,
} from 'Store/Reducers/AppoinmentRescheduleRequest/appoinmentRecheduleReqReducer';
import { GetAvilableSlotsReducer } from 'Store/Reducers/AvilableSlots/avilableSlotsReducer';
import { CreateRegionReducer } from 'Store/Reducers/RegionClassification/regionClassificationReducer';
import { ViewReportReducer } from 'Store/Reducers/ReportReducer/reportReducer';
import { ViewUserReducer } from 'Store/Reducers/Users/UserReducer';
import { ViewMedicinesReducer } from 'Store/Reducers/Medicines/medicinesRedcuer';
import { ViewTestReducer } from 'Store/Reducers/Test/testsReducer';
import { TargetReducer } from 'Store/Reducers/Target/TargetReducer';
import { combineReducers } from 'redux';
import settings from './settings/reducer';
import menu from './menu/reducer';
import authUser from './auth/reducer';
import todoApp from './todo/reducer';
import chatApp from './chat/reducer';
import surveyListApp from './surveyList/reducer';
import surveyDetailApp from './surveyDetail/reducer';

const reducers = combineReducers({
  menu,
  settings,
  authUser,
  todoApp,
  chatApp,
  surveyListApp,
  surveyDetailApp,
  logIn: LoginReducer,
  // forgotReducer: ForgotReducer,
  doctorReducer: CreateDoctorReducer,
  // changePasswordReducer: ChangePassWordReducer,
  viewDoctorReducer: ViewDoctorReducer,
  viewCurrentDoctorIsEdit: GetDoctorIsEdit,
  updateDoctor: UpdateDoctorReducer,
  createadmin: CreateAdministratorReducer,
  updateAdmin: UpdateAdministratorReducer,
  createLabAdmin: CreateLabAdminReducer,
  updateLabAdmin: UpdateLabAdminReducer,
  createPatient: CreatePatientReducer,
  updatePatient: UpdatePatientReducer,
  createPharmacy: CreatePharmacyReducer,
  updatePharmacy: UpdatePharmacyReducer,
  createSuperAdmin: CreateSuperAdminReducer,
  updateSuperAdmi: UpdateSuperAdminReducer,
  viewSuperAdmin: ViewSuperAdminReducer,
  viewCurrentSuperAdmin: ViewCurrentSuperAdminReducer,
  viewAdmin: ViewAdministratorReducer,
  ViewCurrentAdministratorReducer,
  ViewLabAdminReducer,
  ViewCurrentLabAdminReducer,
  ViewPharmacyReducer,
  ViewCurrentPharmacyReducer,
  ViewPatientReducer,
  ViewCurrentPatientReducer,
  viewOrderRed: ViewOrderRedcuer,
  ViewDoctorRemovalRequest,
  ViewCurrentDoctorRemovalRequest,
  ViewCurrentOrderRedcuer,
  ViewAppoinmentRescheduleRequest,
  UpdateAppoinmentRescheduleRequest,
  ViewCurrentAppointmentRemovalRequest,
  GetAvilableSlotsReducer,
  ViewTestReducer,
  ViewMedicinesReducer,
  ViewReportReducer,
  CreateRegionReducer,
  ViewUserReducer,
  TargetReducer,

  // DepartmentReducer,
});

export default reducers;
