/* eslint-disable */

import { get, patch, post, put } from './HttpProvider';
import featureConstants from './features-constants';
import { getToken } from '../Utils/auth.util';

const SERVICE_URLS = {
  // service URL's (API End-Points)
  login: 'users/login/mobile',
  changePassword: 'users/admin/change-password',
  staticData: 'static/all',
  registerPatient: 'patient/create',
  logout: 'users/logout',
  verifyEmail: 'user/verify-email',
  verifyNumber: 'user/verify-phone',
  updatePatient: 'user/update',
  patientAppointments: 'my-appointments',
  resendPhoneOtp: 'user/resend-otp/phone',
  resendemailOtp: 'user/resend-otp/email',
  forgotPassword: 'users/forgot-password',
  resetPassword: 'users/reset-password ',
  getDepartment: 'department/read ',
  createUser: 'user/create',
  getAdmin: 'users/read/admin',
  getDirector: 'users/read/director',
  getDepoManager: 'users/read/depot_manager',
  getDeliveryStaff: 'users/read/delivery_staff',
  getSM: 'users/read/sm',
  getRSM: 'users/read/rsm',
  getAM: 'users/read/am',
  getMPO: 'users/read/mpo',
  updateDoctor: 'user/update',
  getTodaysAppoinment: 'appointments/today',
  getPastAppoinment: 'appointments/past',
  getUpcomingAppoinments: 'appointments/upcoming',
  createAdministrator: 'user/create',
  createLabAdmin: 'user/create',
  getAdministrator: 'administrator/read',
  labAdmin: 'laboratory_admin/read',
  pharmacyUser: 'pharmacy/read',
  superAdminRead: 'super_admin/read',
  updateSuperAdmin: 'user/update',
  getOrder: 'order/read',
  getPatient: 'patient/read',
  getRemovalRequests: 'request/read',
  reqApproval: 'request/approval',
  changePasswordSuperAdmin: 'user/change-password/super-admin',
  readSlots: 'doctor/available-slots',
  delivery_status: 'order/update/delivery-status',
  cancalAppointment: 'appointment/cancelled',
  readTests: 'test/read',
  updateTest: 'test/update',
  readCategory: 'category/read',
  createTest: 'test/create',
  createCategory: 'category/create',
  updateCategory: 'category/update',
  readMedicines: 'medicine/read',
  updateMedicines: 'medicine/update',
  medicineCreate: 'medicine/create',
  readReports: 'test-report/read',
  reportUpload: 'user/upload/test-report',
  medicineUpload: 'medicine/insert-file',
  deleteReport: 'test-report/delete',
  readPayment: 'payment/read',
  upadtePay: 'payment/update',
  region: 'region-classifications/read_hierarchy',
  area: 'region-classifications/read/area',
  createUsers: 'users/create',
  readRoles: 'roles/read',
  updateUsers: 'users/update',
  suspandUser: 'users/suspend',
  readTargets: 'targets/read',
  createTarget: 'targets/create',
  readOrder: 'stocks/read/medicine',
  suspandtarget: 'targets/suspend',
  updateTarget: 'targets/update',
  readDistributionCenter: 'distribution_centres/read',
  readDcp: 'dcps/read',
  createDcp: 'dcps/create',
  readSch: `schedules/read`,
  readDCR: 'dcrs/read',
  suspandDCP: 'dcps/suspend',
  suspandDCR: 'dcrs/suspend',
  suspandSch: 'schedules/suspend',
  editSchedule: 'schedules/status',
  attendanceRead: 'attendances/read',
  suspandAttendance: 'attendances/suspend',
  uploadImage: 'attendances/image_upload',
  createAttendance: 'attendances/create',
  readRole: 'roles/read',
  createRole: 'roles/create',
  updateRole: 'roles/update',
  suspandRole: 'roles/suspend',
  readPeriority: 'priority_lists/customer/read',
  readPeriorityDoctor: 'priority_lists/doctor/read',

  createPeriority: 'priority_lists/customer/create',
  createPeriorityDoctor: 'priority_lists/doctor/create',

  updatePeriority: 'priority_lists/customer/update',
  updateDoctorPeriority: 'priority_lists/doctor/update',

  suspandPeriority: 'priority_lists/customer/suspend',
  suspandDoctorPeriority: 'priority_lists/doctor/suspend',
  readSample: 'samples/read',
  createSample: 'samples/create',
  updateSample: 'samples/update',
  suspandSample: 'samples/suspend',
  createSampleTransaction: 'sample_transactions/create',
  readSampleTransaction: 'sample_transactions/read',
  suspandSampleTransaction: 'sample_transactions/suspend',
  updateRegion:'region-classifications/suspend',
  addregion:'region-classifications/create',
  editRegion:'region-classifications/update'
};

const CreateSample = (data) =>
  post(SERVICE_URLS.createSample, data, { feature: featureConstants.static });
const UpdateSample = (data) =>
  put(SERVICE_URLS.updateSample, data, { feature: featureConstants.static });
const ReadSample = (data) =>
  get(SERVICE_URLS.readSample, data, { feature: featureConstants.static });
const SuapandSample = (data) =>
  patch(SERVICE_URLS.suspandSample, data, { feature: featureConstants.static });
const CreateSampleTransaction = (data) =>
  post(SERVICE_URLS.createSampleTransaction, data, {
    feature: featureConstants.static,
  });
const ReadSampleTransaction = (data) =>
  get(SERVICE_URLS.readSampleTransaction, data, {
    feature: featureConstants.static,
  });
const SuspandSampleTransaction = (data) =>
  patch(SERVICE_URLS.suspandSampleTransaction, data, {
    feature: featureConstants.static,
  });

const requestApproval = (data) =>
  put(SERVICE_URLS.reqApproval, data, { feature: featureConstants.static });
const updateTest = (data) =>
  put(SERVICE_URLS.updateTest, data, { feature: featureConstants.static });
const updateCategory = (data) =>
  put(SERVICE_URLS.updateCategory, data, { feature: featureConstants.static });
const login = (data) =>
  post(SERVICE_URLS.login, data, { feature: featureConstants.login });
const CreatePeriorityList = (data) =>
  post(SERVICE_URLS.createPeriority, data, {
    feature: featureConstants.static,
  });
const CreateDoctorPeriorityList = (data) =>
  post(SERVICE_URLS.createPeriorityDoctor, data, {
    feature: featureConstants.static,
  });
const UpdatePeriorityList = (data) =>
  put(SERVICE_URLS.updatePeriority, data, {
    feature: featureConstants.static,
  });
const UpdateDoctorPeriorityList = (data) =>
  put(SERVICE_URLS.updateDoctorPeriority, data, {
    feature: featureConstants.static,
  });
const SuspandPeriorityList = (data) =>
  patch(SERVICE_URLS.suspandPeriority, data, {
    feature: featureConstants.static,
  });
const SuspandDoctorPeriorityList = (data) =>
  patch(SERVICE_URLS.suspandDoctorPeriority, data, {
    feature: featureConstants.static,
  });

const readPayment = () =>
  post(SERVICE_URLS.readPayment, {}, { feature: featureConstants.static });
const UploadImage = (data) =>
  post(SERVICE_URLS.uploadImage, data, { feature: featureConstants.static });
const readRegion = () =>
  get(SERVICE_URLS.region, {}, { feature: featureConstants.static });
const readAttendance = () =>
  get(SERVICE_URLS.attendanceRead, {}, { feature: featureConstants.static });
const readRoles = () =>
  get(SERVICE_URLS.readRoles, {}, { feature: featureConstants.static });
const readPeriorityList = () =>
  get(SERVICE_URLS.readPeriority, {}, { feature: featureConstants.static });
const readPeriorityListDoctor = () =>
  get(
    SERVICE_URLS.readPeriorityDoctor,
    {},
    { feature: featureConstants.static }
  );
const readDcps = () =>
  get(SERVICE_URLS.readDcp, {}, { feature: featureConstants.static });
const readDcr = () =>
  get(SERVICE_URLS.readDCR, {}, { feature: featureConstants.static });
const readArea = () =>
  get(SERVICE_URLS.area, {}, { feature: featureConstants.static });
const readTarget = () =>
  get(SERVICE_URLS.readTargets, {}, { feature: featureConstants.static });
const ReadDistributionCenter = () =>
  get(
    SERVICE_URLS.readDistributionCenter,
    {},
    { feature: featureConstants.static }
  );
const CreateDcp = (data) =>
  post(SERVICE_URLS.createDcp, data, { feature: featureConstants.static });
const readOrder = () =>
  get(SERVICE_URLS.readOrder, {}, { feature: featureConstants.static });
const createTarget = (data) =>
  post(SERVICE_URLS.createTarget, data, { feature: featureConstants.static });
const readThana = () =>
  get(SERVICE_URLS.thana, {}, { feature: featureConstants.static });
const readTest = () =>
  post(SERVICE_URLS.readTests, {}, { feature: featureConstants.login });
const logout = () =>
  post(SERVICE_URLS.logout, {}, { feature: featureConstants.login });
const insertMedicine = (data) =>
  post(SERVICE_URLS.medicineUpload, data, { feature: featureConstants.static });
const CreateUsers = (data) =>
  post(SERVICE_URLS.createUsers, data, { feature: featureConstants.static });
const CreateCategory = (data) =>
  post(SERVICE_URLS.createCategory, data, { feature: featureConstants.login });
const ReadReports = () =>
  post(SERVICE_URLS.readReports, {}, { feature: featureConstants.static });

const forgotPassword = (data) =>
  post(SERVICE_URLS.forgotPassword, data, { feature: featureConstants.static });
const createTest = (data) =>
  post(SERVICE_URLS.createTest, data, { feature: featureConstants.static });
const resetPassword = (data) =>
  patch(SERVICE_URLS.resetPassword, data, {
    feature: featureConstants.static,
  });
const getOrders = () =>
  post(SERVICE_URLS.getOrder, {}, { feature: featureConstants.static });
const getDoctorRequests = () =>
  post(
    SERVICE_URLS.getRemovalRequests,
    {},
    { feature: featureConstants.static }
  );
const getAllSlots = (data) =>
  post(SERVICE_URLS.readSlots, data, { feature: featureConstants.static });

const cancalAppointment = (data) =>
  patch(SERVICE_URLS.cancalAppointment, data, {
    feature: featureConstants.static,
  });
const changePassword = (data) =>
  patch(SERVICE_URLS.changePassword, data, {
    feature: featureConstants.static,
  });
// const config = {
//   "session_key":"619a518b-a1df-4098-aca6-d02d89cc4c76",
//   "session_key_type":"super_admin",
// }

const createAdministrator = (data) =>
  post(SERVICE_URLS.createAdministrator, data, {
    feature: featureConstants.static,
  });
const CreateMedicines = (data) =>
  post(SERVICE_URLS.medicineCreate, data, { feature: featureConstants.login });
const createLabAdmin = (data) =>
  post(SERVICE_URLS.createLabAdmin, data, { feature: featureConstants.static });
const createPharmacyUser = (data) =>
  post(SERVICE_URLS.createLabAdmin, data, { feature: featureConstants.static });

const changePasswordSuperAdmin = (data) => {
  // console.log(config)
  patch(SERVICE_URLS.changePasswordSuperAdmin, data, {
    feature: featureConstants.static,
  });
};

const changeDeliveryStatus = (data) =>
  patch(SERVICE_URLS.delivery_status, data, {
    feature: featureConstants.static,
  });

const getAdmin = () =>
  get(
    SERVICE_URLS.getAdmin,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getDirector = async () =>
  get(
    SERVICE_URLS.getDirector,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getDepo = async () =>
  get(
    SERVICE_URLS.getDepoManager,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getDeliveryUser = async () =>
  get(
    SERVICE_URLS.getDeliveryStaff,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getSm = async () =>
  get(
    SERVICE_URLS.getSM,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getRsm = async () =>
  get(
    SERVICE_URLS.getRSM,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getAm = async () =>
  get(
    SERVICE_URLS.getAM,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getMpo = async () =>
  get(
    SERVICE_URLS.getMPO,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getSuperAdmin = () =>
  post(
    SERVICE_URLS.superAdminRead,
    {},
    {
      feature: featureConstants.static,
    }
  );

const getAdministrator = () =>
  post(
    SERVICE_URLS.getAdministrator,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getLabAdmin = () =>
  post(
    SERVICE_URLS.labAdmin,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getPharmacyUser = () =>
  post(
    SERVICE_URLS.pharmacyUser,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getPatient = () =>
  post(
    SERVICE_URLS.getPatient,
    {},
    {
      feature: featureConstants.static,
    }
  );
// let token = await getToken();
// const response = await axios.post(
//   'https://dmfr-backend.herokuapp.com/api/v1/doctor/read',
//   {},
//   {
//     headers: {
//       'x-session-key': token,
//       'x-session-type': 'super_admin',
//     },
//   }
// );

const getStaticData = () =>
  get(SERVICE_URLS.staticData, { feature: featureConstants.static });

const registerPatient = (data) =>
  post(SERVICE_URLS.registerPatient, data, {
    feature: featureConstants.static,
  });
const verifyEmail = (data) => {
  return post(SERVICE_URLS.verifyEmail, data, {
    feature: featureConstants.login,
  });
};
const verifyNumber = (data) =>
  post(SERVICE_URLS.verifyNumber, data, { feature: featureConstants.login });
const updatePatient = (data) =>
  put(SERVICE_URLS.updatePatient, data, { feature: featureConstants.static });
const patientAppointments = (data) =>
  post(SERVICE_URLS.patientAppointments, data, {
    feature: featureConstants.static,
  });
const resendPhoneOtp = (data) =>
  post(SERVICE_URLS.resendPhoneOtp, data, {
    feature: featureConstants.static,
  });
const resendemailOtp = (data) =>
  post(SERVICE_URLS.resendemailOtp, data, {
    feature: featureConstants.static,
  });
const getDepartment = () =>
  post(
    SERVICE_URLS.getDepartment,
    {},
    {
      feature: featureConstants.static,
    }
  );
const reg_doctor = async (data) =>
  post(SERVICE_URLS.createUser, data, {
    feature: featureConstants.static,
  });
const readCategory = async () =>
  post(
    SERVICE_URLS.readCategory,
    {},
    {
      feature: featureConstants.static,
    }
  );

const updateDoctor = async (data) =>
  put(SERVICE_URLS.updateDoctor, data, {
    feature: featureConstants.static,
  });
const updateMedicines = async (data) =>
  put(SERVICE_URLS.updateMedicines, data, {
    feature: featureConstants.static,
  });

const updateSuperAdmin = async (data) =>
  put(SERVICE_URLS.updateSuperAdmin, data, {
    feature: featureConstants.static,
  });
const updatePayment = async (data) =>
  put(SERVICE_URLS.upadtePay, data, {
    feature: featureConstants.static,
  });
const updateAdmin = async (data) =>
  put(SERVICE_URLS.updateDoctor, data, {
    feature: featureConstants.static,
  });
const suspandUser = async (data) =>
  patch(SERVICE_URLS.suspandUser, data, {
    feature: featureConstants.static,
  });
const getTodaysAppoinments = async () =>
  post(
    SERVICE_URLS.getTodaysAppoinment,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getPastAppoinments = async () =>
  post(
    SERVICE_URLS.getPastAppoinment,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getUpcomingAppoinments = async () =>
  post(
    SERVICE_URLS.getUpcomingAppoinments,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getAppoinmentsRescheduleRequest = async () =>
  post(
    SERVICE_URLS.getRemovalRequests,
    {},
    {
      feature: featureConstants.static,
    }
  );
const getMedicines = async () =>
  post(
    SERVICE_URLS.readMedicines,
    {},
    {
      feature: featureConstants.static,
    }
  );
const uploadReport = async (data) =>
  post(SERVICE_URLS.reportUpload, data, {
    feature: featureConstants.static,
  });
const deleteReport = async (data) =>
  patch(SERVICE_URLS.deleteReport, data, {
    feature: featureConstants.static,
  });
const suspandTarget = async (data) =>
  patch(SERVICE_URLS.suspandtarget, data, {
    feature: featureConstants.static,
  });

const updateUser = async (data) =>
  put(SERVICE_URLS.updateUsers, data, {
    feature: featureConstants.static,
  });
// post getStatic
const updateTarget = async (data) =>
  put(SERVICE_URLS.updateTarget, data, {
    feature: featureConstants.static,
  });
const readSchedule = async (data) =>
  get(SERVICE_URLS.readSch, data, {
    feature: featureConstants.static,
  });
const suspandDcp = async (data) =>
  patch(SERVICE_URLS.suspandDCP, data, {
    feature: featureConstants.static,
  });
const suspandSchedule = async (data) =>
  patch(SERVICE_URLS.suspandSch, data, {
    feature: featureConstants.static,
  });
const createAttendance = async (data) =>
  post(SERVICE_URLS.createAttendance, data, {
    feature: featureConstants.static,
  });
const editSchedule = async (data) =>
  put(SERVICE_URLS.editSchedule, data, {
    feature: featureConstants.static,
  });
const suspandDcr = async (data) =>
  patch(SERVICE_URLS.suspandDCR, data, {
    feature: featureConstants.static,
  });
const suspandAttendance = async (data) =>
  patch(SERVICE_URLS.suspandAttendance, data, {
    feature: featureConstants.static,
  });
const readUserRoles = async (data) =>
  get(SERVICE_URLS.readRole, data, {
    feature: featureConstants.static,
  });
const readPeriority = async (data) =>
  get(SERVICE_URLS.readRole, data, {
    feature: featureConstants.static,
  });
const createRoles = async (data) =>
  post(SERVICE_URLS.createRole, data, {
    feature: featureConstants.static,
  });
const updateRoles = async (data) =>
  put(SERVICE_URLS.updateRole, data, {
    feature: featureConstants.static,
  });
const suspandRoles = async (data) =>
  patch(SERVICE_URLS.suspandRole, data, {
    feature: featureConstants.static,
  });
  const deleteRegion = (data) =>
  patch(SERVICE_URLS.updateRegion, data, {
    feature: featureConstants.static,
  });
  const addRegion = (data) =>
  post(SERVICE_URLS.addregion, data, {
    feature: featureConstants.static,
  });
  const EditRegion = (data) =>
  put(SERVICE_URLS.editRegion, data, {
    feature: featureConstants.static,
  });
  
// post g
const apiServices = {
  // define variables
  EditRegion,
  addRegion,
  deleteRegion,
  getAllSlots,
  login,
  getStaticData,
  resendPhoneOtp,
  registerPatient,
  logout,
  forgotPassword,
  verifyEmail,
  verifyNumber,
  updatePatient,
  patientAppointments,
  resendemailOtp,
  resetPassword,
  getDepartment,
  changePassword,
  reg_doctor,
  getAdmin,
  updateDoctor,
  getTodaysAppoinments,
  getPastAppoinments,
  getUpcomingAppoinments,
  createAdministrator,
  createPharmacyUser,
  createLabAdmin,
  getAdministrator,
  updateAdmin,
  getLabAdmin,
  getPharmacyUser,
  getSuperAdmin,
  updateSuperAdmin,
  getOrders,
  getPatient,
  getDoctorRequests,
  requestApproval,
  changePasswordSuperAdmin,
  getAppoinmentsRescheduleRequest,
  changeDeliveryStatus,
  cancalAppointment,
  readTest,
  updateTest,
  readCategory,
  createTest,
  CreateCategory,
  updateCategory,
  getMedicines,
  CreateMedicines,
  updateMedicines,
  ReadReports,
  uploadReport,
  insertMedicine,
  deleteReport,
  readPayment,
  readRegion,
  updatePayment,
  readArea,
  readThana,
  CreateUsers,
  readRoles,
  updateUser,
  getDirector,
  getDepo,
  getDeliveryUser,
  getSm,
  getRsm,
  getAm,
  getMpo,
  suspandUser,
  readTarget,
  createTarget,
  readOrder,
  suspandTarget,
  updateTarget,
  ReadDistributionCenter,
  readDcps,
  CreateDcp,
  readSchedule,
  readDcr,
  suspandDcp,
  suspandDcr,
  suspandSchedule,
  editSchedule,
  readAttendance,
  suspandAttendance,
  UploadImage,
  createAttendance,
  readUserRoles,
  createRoles,
  updateRoles,
  suspandRoles,
  readPeriorityList,
  CreatePeriorityList,
  UpdatePeriorityList,
  SuspandPeriorityList,
  CreateDoctorPeriorityList,
  readPeriorityListDoctor,
  UpdateDoctorPeriorityList,
  SuspandDoctorPeriorityList,
  CreateSample,
  UpdateSample,
  ReadSample,
  SuapandSample,
  CreateSampleTransaction,
  ReadSampleTransaction,
  SuspandSampleTransaction
};
export default apiServices;
