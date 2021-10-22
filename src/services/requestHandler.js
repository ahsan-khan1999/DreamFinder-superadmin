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
  getDoctor: 'users/read',
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
  region: 'region-classifications/read/region',
  area: 'region-classifications/read/area',

  //Concord Orders
  getorder: 'orders/read',

};

const requestApproval = (data) =>
  put(SERVICE_URLS.reqApproval, data, { feature: featureConstants.static });
const updateTest = (data) =>
  put(SERVICE_URLS.updateTest, data, { feature: featureConstants.static });
const updateCategory = (data) =>
  put(SERVICE_URLS.updateCategory, data, { feature: featureConstants.static });
const login = (data) =>
  post(SERVICE_URLS.login, data, { feature: featureConstants.login });
const readPayment = () =>
  post(SERVICE_URLS.readPayment, {}, { feature: featureConstants.static });
const readRegion = () =>
  get(SERVICE_URLS.region, {}, { feature: featureConstants.static });
const readArea = () =>
  get(SERVICE_URLS.area, {}, { feature: featureConstants.static });
const readThana = () =>
  get(SERVICE_URLS.thana, {}, { feature: featureConstants.static });
const readTest = () =>
  post(SERVICE_URLS.readTests, {}, { feature: featureConstants.login });
const logout = () =>
  post(SERVICE_URLS.logout, {}, { feature: featureConstants.login });
const insertMedicine = (data) =>
  post(SERVICE_URLS.medicineUpload, data, { feature: featureConstants.static });
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

const getUsers = () =>
  get(
    SERVICE_URLS.getDoctor,
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
// post getStatic



// Concord Orders
  const getorder = () =>
  get(SERVICE_URLS.getorder, { feature: featureConstants.static });





const apiServices = {
  // define variables
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
  getUsers,
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



// Concord Orders
  getorder,



};
export default apiServices;
