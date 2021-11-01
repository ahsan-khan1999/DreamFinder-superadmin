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
  staticdataconcord: 'static-data',
  createorder: 'orders/create',
  suspandorder: 'orders/suspend',
  statusChanges: 'orders/status-update',

  //Concord Department Head
  getdepartmentHead: 'department_heads/read',
  createdepartmentHead: 'department_heads/create',
  updatedepartmentHead: 'department_heads/update',
  suspanddepartmentHead: 'department_heads/suspend',

  //Concord Distribution Center
  getdistributionCentres: 'distribution_centres/read',
  createdistributionCentres: 'distribution_centres/create',
  updatedistributionCentres: 'distribution_centres/update',
  suspanddistributionCentres: 'distribution_centres/suspend',
  regiondistributionCentres: 'region-classifications/read/region',
  // areadistributionCentres:'region-classifications/read/area',
  getDepoManager: 'users/read/depot_manager?assigned_to_dc=0',

  //Concord Products Categorys
  getproductcategory: 'product-categorys/read',
  createproductcategory: 'product-categorys/create',
  updateproductcategory: 'product-categorys/update',
  suspandproductcategory: 'product-categorys/suspend',

  //Concord Products
  getproducts: 'products/read',
  createproducts: 'products/create',
  updateproducts: 'products/update',
  suspandproducts: 'products/suspend',

  //Concord Stocks
  getstocks: 'stocks/read',
  createstocks: 'stocks/create',
  updatestocks: 'stocks/update',
  suspandstocks: 'stocks/suspend',

  //Concord StocksTransactions
  getstockstransaction: 'stock-transactions/read',
  createstockstransaction: 'stock-transactions/create',
  suspandstockstransaction: 'stock-transactions/suspend',

  //Concord Doctor Categorys
  getdoctorcategorys: 'doctor-categorys/read',
  createdoctorcategorys: 'doctor-categorys/create',
  updatedoctorcategorys: 'doctor-categorys/update',
  suspanddoctorcategorys: 'doctor-categorys/suspend',

  //Concord Doctors
  getdoctors: 'doctors/read',
  createdoctors: 'doctors/create',
  updatedoctors: 'doctors/update',
  suspanddoctors: 'doctors/suspend',

  //Concord Customers
  getcustomers: 'customers/read',
  createcustomers: 'customers/create',
  updatecustomers: 'customers/update',
  suspandcustomers: 'customers/suspend',
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

const staticdataconcord = () =>
  get(SERVICE_URLS.staticdataconcord, { feature: featureConstants.static });

const createorder = (data) =>
  post(SERVICE_URLS.createorder, data, { feature: featureConstants.static });

const suspandorder = async (data) =>
  patch(SERVICE_URLS.suspandorder, data, {
    feature: featureConstants.static,
  });
const statusChanges = (data) =>
  put(SERVICE_URLS.statusChanges, data, { feature: featureConstants.static });

//Concord Department Head

const getdepartmentHead = () =>
  get(SERVICE_URLS.getdepartmentHead, { feature: featureConstants.static });

const createdepartmentHead = (data) =>
  post(SERVICE_URLS.createdepartmentHead, data, {
    feature: featureConstants.static,
  });

const suspanddepartmentHead = async (data) =>
  patch(SERVICE_URLS.suspanddepartmentHead, data, {
    feature: featureConstants.static,
  });
const updatedepartmentHead = async (data) =>
  put(SERVICE_URLS.updatedepartmentHead, data, {
    feature: featureConstants.static,
  });

//Concord Distribution Center

const getdistributionCentres = () =>
  get(SERVICE_URLS.getdistributionCentres, {
    feature: featureConstants.static,
  });

const createdistributionCentres = (data) =>
  post(SERVICE_URLS.createdistributionCentres, data, {
    feature: featureConstants.static,
  });

const suspanddistributionCentres = async (data) =>
  patch(SERVICE_URLS.suspanddistributionCentres, data, {
    feature: featureConstants.static,
  });
const updatedistributionCentres = async (data) =>
  put(SERVICE_URLS.updatedistributionCentres, data, {
    feature: featureConstants.static,
  });

const regiondistributionCentres = () =>
  get(SERVICE_URLS.regiondistributionCentres, {
    feature: featureConstants.static,
  });

const getDepoManager = async () =>
  get(
    SERVICE_URLS.getDepoManager,
    {},
    {
      feature: featureConstants.static,
    }
  );

//Concord Products Category

const getproductcategory = () =>
  get(SERVICE_URLS.getproductcategory, { feature: featureConstants.static });

const createproductcategory = (data) =>
  post(SERVICE_URLS.createproductcategory, data, {
    feature: featureConstants.static,
  });

const suspandproductcategory = async (data) =>
  patch(SERVICE_URLS.suspandproductcategory, data, {
    feature: featureConstants.static,
  });
const updateproductcategory = async (data) =>
  put(SERVICE_URLS.updateproductcategory, data, {
    feature: featureConstants.static,
  });

//Concord Products

const getproducts = () =>
  get(SERVICE_URLS.getproducts, { feature: featureConstants.static });

const createproducts = (data) =>
  post(SERVICE_URLS.createproducts, data, {
    feature: featureConstants.static,
  });

const suspandproducts = async (data) =>
  patch(SERVICE_URLS.suspandproducts, data, {
    feature: featureConstants.static,
  });
const updateproducts = async (data) =>
  put(SERVICE_URLS.updateproducts, data, {
    feature: featureConstants.static,
  });

//Concord Stocks

const getstocks = () =>
  get(SERVICE_URLS.getstocks, { feature: featureConstants.static });

const createstocks = (data) =>
  post(SERVICE_URLS.createstocks, data, {
    feature: featureConstants.static,
  });

const suspandstocks = async (data) =>
  patch(SERVICE_URLS.suspandstocks, data, {
    feature: featureConstants.static,
  });
const updatestocks = async (data) =>
  put(SERVICE_URLS.updatestocks, data, {
    feature: featureConstants.static,
  });

//Concord Stocks Transaction

const getstockstransaction = () =>
  get(SERVICE_URLS.getstockstransaction, { feature: featureConstants.static });

const createstockstransaction = (data) =>
  post(SERVICE_URLS.createstockstransaction, data, {
    feature: featureConstants.static,
  });

const suspandstockstransaction = async (data) =>
  patch(SERVICE_URLS.suspandstockstransaction, data, {
    feature: featureConstants.static,
  });

//Concord Doctor Categorys

const getdoctorcategorys = () =>
  get(SERVICE_URLS.getdoctorcategorys, { feature: featureConstants.static });

const createdoctorcategorys = (data) =>
  post(SERVICE_URLS.createdoctorcategorys, data, {
    feature: featureConstants.static,
  });

const suspanddoctorcategorys = async (data) =>
  patch(SERVICE_URLS.suspanddoctorcategorys, data, {
    feature: featureConstants.static,
  });
const updatedoctorcategorys = async (data) =>
  put(SERVICE_URLS.updatedoctorcategorys, data, {
    feature: featureConstants.static,
  });

//Concord Doctors

const getdoctors = () =>
  get(SERVICE_URLS.getdoctors, { feature: featureConstants.static });

const createdoctors = (data) =>
  post(SERVICE_URLS.createdoctors, data, {
    feature: featureConstants.static,
  });

const suspanddoctors = async (data) =>
  patch(SERVICE_URLS.suspanddoctors, data, {
    feature: featureConstants.static,
  });
const updatedoctors = async (data) =>
  put(SERVICE_URLS.updatedoctors, data, {
    feature: featureConstants.static,
  });

//Concord Customers

const getcustomers = () =>
  get(SERVICE_URLS.getcustomers, { feature: featureConstants.static });

const createcustomers = (data) =>
  post(SERVICE_URLS.createcustomers, data, {
    feature: featureConstants.static,
  });

const suspandcustomers = async (data) =>
  patch(SERVICE_URLS.suspandcustomers, data, {
    feature: featureConstants.static,
  });
const updatecustomers = async (data) =>
  put(SERVICE_URLS.updatecustomers, data, {
    feature: featureConstants.static,
  });

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
  staticdataconcord,
  createorder,
  suspandorder,
  statusChanges,

  // Concord Department Head
  getdepartmentHead,
  createdepartmentHead,
  suspanddepartmentHead,
  updatedepartmentHead,

  // Concord Distribution Center
  getdistributionCentres,
  createdistributionCentres,
  suspanddistributionCentres,
  updatedistributionCentres,
  regiondistributionCentres,
  getDepoManager,

  //Concord Products Category
  getproductcategory,
  createproductcategory,
  updateproductcategory,
  suspandproductcategory,

  //Concord Products
  getproducts,
  createproducts,
  updateproducts,
  suspandproducts,

  //Concord Stocks
  getstocks,
  createstocks,
  updatestocks,
  suspandstocks,

  //Concord StocksTransaction
  getstockstransaction,
  createstockstransaction,
  suspandstockstransaction,

  //Concord Doctor Categorys
  getdoctorcategorys,
  createdoctorcategorys,
  updatedoctorcategorys,
  suspanddoctorcategorys,

  //Concord Doctors
  getdoctors,
  createdoctors,
  updatedoctors,
  suspanddoctors,

  //Concord Customers
  getcustomers,
  createcustomers,
  updatecustomers,
  suspandcustomers,
};
export default apiServices;
