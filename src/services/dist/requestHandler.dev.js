"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HttpProvider = require("./HttpProvider");

var _featuresConstants = _interopRequireDefault(require("./features-constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable */
var SERVICE_URLS = {
  // service URL's (API End-Points)
  login: 'users/login/web',
  changePassword: 'users/change-password',
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
  getDepoManagerAll: 'users/read/depot_manager',
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
  changePasswordSuperAdmin: 'users/admin/change-password',
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
  readSch: "schedules/read",
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
  updateRegion: 'region-classifications/suspend',
  addregion: 'region-classifications/create',
  editRegion: 'region-classifications/update',
  readStatic: 'static-data',
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
  regiondistributionCentres: 'region-classifications/read/region?assigned_to_dc=0',
  // areadistributionCentres:'region-classifications/read/area',
  getDepoManagerAssigned: 'users/read/depot_manager?assigned_to_dc=0',
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
  getdoctorcategorys: 'doctor-specialitys/read',
  createdoctorcategorys: 'doctor-specialitys/create',
  updatedoctorcategorys: 'doctor-specialitys/update',
  suspanddoctorcategorys: 'doctor-specialitys/suspend',
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
  giftAssignment: 'fieldstaffs/gift-assignment',
  readAssignedGift: 'fieldstaffs/read_all_gifts'
};

var AssignGift = function AssignGift(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.giftAssignment, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getDashboardChart = function getDashboardChart(convertFrom, convertTo) {
  var url = _HttpProvider.BASEURL + "/dashboard/".concat(convertFrom, "/").concat(convertTo);
  return (0, _HttpProvider.get)(url, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var ReadStatic = function ReadStatic() {
  return (0, _HttpProvider.get)(SERVICE_URLS.readStatic, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var CreateSample = function CreateSample(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createSample, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var UpdateSample = function UpdateSample(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.updateSample, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var ReadSample = function ReadSample(data) {
  return (0, _HttpProvider.get)(SERVICE_URLS.readSample, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var SuapandSample = function SuapandSample(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.suspandSample, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var CreateSampleTransaction = function CreateSampleTransaction(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createSampleTransaction, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var CreateUsers = function CreateUsers(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createUsers, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var ReadSampleTransaction = function ReadSampleTransaction(data) {
  return (0, _HttpProvider.get)(SERVICE_URLS.readSampleTransaction, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var SuspandSampleTransaction = function SuspandSampleTransaction(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.suspandSampleTransaction, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var updateUser = function updateUser(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.updateUsers, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var requestApproval = function requestApproval(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.reqApproval, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var updateTest = function updateTest(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.updateTest, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var updateCategory = function updateCategory(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.updateCategory, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var login = function login(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.login, data, {
    feature: _featuresConstants["default"].login
  });
};

var CreatePeriorityList = function CreatePeriorityList(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createPeriority, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var CreateDoctorPeriorityList = function CreateDoctorPeriorityList(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createPeriorityDoctor, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var UpdatePeriorityList = function UpdatePeriorityList(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.updatePeriority, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var UpdateDoctorPeriorityList = function UpdateDoctorPeriorityList(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.updateDoctorPeriority, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var SuspandPeriorityList = function SuspandPeriorityList(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.suspandPeriority, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var SuspandDoctorPeriorityList = function SuspandDoctorPeriorityList(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.suspandDoctorPeriority, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readPayment = function readPayment() {
  return (0, _HttpProvider.post)(SERVICE_URLS.readPayment, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var UploadImage = function UploadImage(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.uploadImage, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readRegion = function readRegion() {
  return (0, _HttpProvider.get)(SERVICE_URLS.region, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readAttendance = function readAttendance() {
  return (0, _HttpProvider.get)(SERVICE_URLS.attendanceRead, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readRoles = function readRoles() {
  return (0, _HttpProvider.get)(SERVICE_URLS.readRoles, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readPeriorityList = function readPeriorityList() {
  return (0, _HttpProvider.get)(SERVICE_URLS.readPeriority, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readPeriorityListDoctor = function readPeriorityListDoctor() {
  return (0, _HttpProvider.get)(SERVICE_URLS.readPeriorityDoctor, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readDcps = function readDcps() {
  return (0, _HttpProvider.get)(SERVICE_URLS.readDcp, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readDcr = function readDcr() {
  return (0, _HttpProvider.get)(SERVICE_URLS.readDCR, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readArea = function readArea() {
  return (0, _HttpProvider.get)(SERVICE_URLS.area, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readTarget = function readTarget() {
  return (0, _HttpProvider.get)(SERVICE_URLS.readTargets, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var ReadDistributionCenter = function ReadDistributionCenter() {
  return (0, _HttpProvider.get)(SERVICE_URLS.readDistributionCenter, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var CreateDcp = function CreateDcp(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createDcp, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readOrder = function readOrder() {
  return (0, _HttpProvider.get)(SERVICE_URLS.readOrder, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createTarget = function createTarget(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createTarget, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readThana = function readThana() {
  return (0, _HttpProvider.get)(SERVICE_URLS.thana, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var readTest = function readTest() {
  return (0, _HttpProvider.post)(SERVICE_URLS.readTests, {}, {
    feature: _featuresConstants["default"].login
  });
};

var logout = function logout() {
  return (0, _HttpProvider.post)(SERVICE_URLS.logout, {}, {
    feature: _featuresConstants["default"].login
  });
};

var insertMedicine = function insertMedicine(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.medicineUpload, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var CreateCategory = function CreateCategory(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createCategory, data, {
    feature: _featuresConstants["default"].login
  });
};

var ReadReports = function ReadReports() {
  return (0, _HttpProvider.post)(SERVICE_URLS.readReports, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var forgotPassword = function forgotPassword(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.forgotPassword, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createTest = function createTest(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createTest, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var resetPassword = function resetPassword(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.resetPassword, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getOrders = function getOrders() {
  return (0, _HttpProvider.post)(SERVICE_URLS.getOrder, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getDoctorRequests = function getDoctorRequests() {
  return (0, _HttpProvider.post)(SERVICE_URLS.getRemovalRequests, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getAllSlots = function getAllSlots(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.readSlots, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var cancalAppointment = function cancalAppointment(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.cancalAppointment, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var changePassword = function changePassword(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.changePassword, data, {
    feature: _featuresConstants["default"]["static"]
  });
}; // const config = {
//   "session_key":"619a518b-a1df-4098-aca6-d02d89cc4c76",
//   "session_key_type":"super_admin",
// }


var createAdministrator = function createAdministrator(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createAdministrator, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var CreateMedicines = function CreateMedicines(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.medicineCreate, data, {
    feature: _featuresConstants["default"].login
  });
};

var createLabAdmin = function createLabAdmin(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createLabAdmin, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createPharmacyUser = function createPharmacyUser(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createLabAdmin, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var changePasswordSuperAdmin = function changePasswordSuperAdmin(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.changePasswordSuperAdmin, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var changeDeliveryStatus = function changeDeliveryStatus(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.delivery_status, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getAdmin = function getAdmin() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getAdmin, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getUsers = function getUsers() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getAdmin, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getDirector = function getDirector() {
  return regeneratorRuntime.async(function getDirector$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          return _context.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.getDirector, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var getDepo = function getDepo() {
  return regeneratorRuntime.async(function getDepo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.getDepoManagerAll, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
};

var getDeliveryUser = function getDeliveryUser() {
  return regeneratorRuntime.async(function getDeliveryUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.getDeliveryStaff, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var getSm = function getSm() {
  return regeneratorRuntime.async(function getSm$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.getSM, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

var getRsm = function getRsm() {
  return regeneratorRuntime.async(function getRsm$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.getRSM, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
};

var getAm = function getAm() {
  return regeneratorRuntime.async(function getAm$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          return _context6.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.getAM, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context6.stop();
      }
    }
  });
};

var getMpo = function getMpo() {
  return regeneratorRuntime.async(function getMpo$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          return _context7.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.getMPO, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context7.stop();
      }
    }
  });
};

var getSuperAdmin = function getSuperAdmin() {
  return (0, _HttpProvider.post)(SERVICE_URLS.superAdminRead, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getAdministrator = function getAdministrator() {
  return (0, _HttpProvider.post)(SERVICE_URLS.getAdministrator, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getLabAdmin = function getLabAdmin() {
  return (0, _HttpProvider.post)(SERVICE_URLS.labAdmin, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getPharmacyUser = function getPharmacyUser() {
  return (0, _HttpProvider.post)(SERVICE_URLS.pharmacyUser, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getPatient = function getPatient() {
  return (0, _HttpProvider.post)(SERVICE_URLS.getPatient, {}, {
    feature: _featuresConstants["default"]["static"]
  });
}; // let token = await getToken();
// const response = await axios.post(
//   'https://dmfr-backend.herokuapp.com/api/v1/doctor/read',
//   {},
//   {
//     headers: {
//       '"x-session-key"': token,
//       '"x-session-type"': 'super_admin',
//     },
//   }
// );


var getStaticData = function getStaticData() {
  return (0, _HttpProvider.get)(SERVICE_URLS.staticData, {
    feature: _featuresConstants["default"]["static"]
  });
};

var registerPatient = function registerPatient(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.registerPatient, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var verifyEmail = function verifyEmail(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.verifyEmail, data, {
    feature: _featuresConstants["default"].login
  });
};

var verifyNumber = function verifyNumber(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.verifyNumber, data, {
    feature: _featuresConstants["default"].login
  });
};

var updatePatient = function updatePatient(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.updatePatient, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var patientAppointments = function patientAppointments(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.patientAppointments, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var resendPhoneOtp = function resendPhoneOtp(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.resendPhoneOtp, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var resendemailOtp = function resendemailOtp(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.resendemailOtp, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getDepartment = function getDepartment() {
  return (0, _HttpProvider.post)(SERVICE_URLS.getDepartment, {}, {
    feature: _featuresConstants["default"]["static"]
  });
};

var reg_doctor = function reg_doctor(data) {
  return regeneratorRuntime.async(function reg_doctor$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          return _context8.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.createUser, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context8.stop();
      }
    }
  });
};

var readCategory = function readCategory() {
  return regeneratorRuntime.async(function readCategory$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          return _context9.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.readCategory, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context9.stop();
      }
    }
  });
};

var updateDoctor = function updateDoctor(data) {
  return regeneratorRuntime.async(function updateDoctor$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          return _context10.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updateDoctor, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context10.stop();
      }
    }
  });
};

var updateMedicines = function updateMedicines(data) {
  return regeneratorRuntime.async(function updateMedicines$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          return _context11.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updateMedicines, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context11.stop();
      }
    }
  });
};

var updateSuperAdmin = function updateSuperAdmin(data) {
  return regeneratorRuntime.async(function updateSuperAdmin$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          return _context12.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updateSuperAdmin, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context12.stop();
      }
    }
  });
};

var updatePayment = function updatePayment(data) {
  return regeneratorRuntime.async(function updatePayment$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          return _context13.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.upadtePay, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context13.stop();
      }
    }
  });
};

var updateAdmin = function updateAdmin(data) {
  return regeneratorRuntime.async(function updateAdmin$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          return _context14.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updateDoctor, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context14.stop();
      }
    }
  });
};

var suspandUser = function suspandUser(data) {
  return regeneratorRuntime.async(function suspandUser$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          return _context15.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandUser, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context15.stop();
      }
    }
  });
};

var getTodaysAppoinments = function getTodaysAppoinments() {
  return regeneratorRuntime.async(function getTodaysAppoinments$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          return _context16.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.getTodaysAppoinment, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context16.stop();
      }
    }
  });
};

var getPastAppoinments = function getPastAppoinments() {
  return regeneratorRuntime.async(function getPastAppoinments$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          return _context17.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.getPastAppoinment, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context17.stop();
      }
    }
  });
};

var getUpcomingAppoinments = function getUpcomingAppoinments() {
  return regeneratorRuntime.async(function getUpcomingAppoinments$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          return _context18.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.getUpcomingAppoinments, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context18.stop();
      }
    }
  });
};

var getAppoinmentsRescheduleRequest = function getAppoinmentsRescheduleRequest() {
  return regeneratorRuntime.async(function getAppoinmentsRescheduleRequest$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          return _context19.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.getRemovalRequests, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context19.stop();
      }
    }
  });
};

var getMedicines = function getMedicines() {
  return regeneratorRuntime.async(function getMedicines$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          return _context20.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.readMedicines, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context20.stop();
      }
    }
  });
};

var uploadReport = function uploadReport(data) {
  return regeneratorRuntime.async(function uploadReport$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          return _context21.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.reportUpload, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context21.stop();
      }
    }
  });
};

var deleteReport = function deleteReport(data) {
  return regeneratorRuntime.async(function deleteReport$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          return _context22.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.deleteReport, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context22.stop();
      }
    }
  });
};

var suspandTarget = function suspandTarget(data) {
  return regeneratorRuntime.async(function suspandTarget$(_context23) {
    while (1) {
      switch (_context23.prev = _context23.next) {
        case 0:
          return _context23.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandtarget, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context23.stop();
      }
    }
  });
}; // post getStatic
// Concord Orders


var getorder = function getorder() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getorder, {
    feature: _featuresConstants["default"]["static"]
  });
};

var staticdataconcord = function staticdataconcord() {
  return (0, _HttpProvider.get)(SERVICE_URLS.staticdataconcord, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createorder = function createorder(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createorder, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspandorder = function suspandorder(data) {
  return regeneratorRuntime.async(function suspandorder$(_context24) {
    while (1) {
      switch (_context24.prev = _context24.next) {
        case 0:
          return _context24.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandorder, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context24.stop();
      }
    }
  });
};

var statusChanges = function statusChanges(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.statusChanges, data, {
    feature: _featuresConstants["default"]["static"]
  });
}; //Concord Department Head


var getdepartmentHead = function getdepartmentHead() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getdepartmentHead, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createdepartmentHead = function createdepartmentHead(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createdepartmentHead, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspanddepartmentHead = function suspanddepartmentHead(data) {
  return regeneratorRuntime.async(function suspanddepartmentHead$(_context25) {
    while (1) {
      switch (_context25.prev = _context25.next) {
        case 0:
          return _context25.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspanddepartmentHead, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context25.stop();
      }
    }
  });
};

var updatedepartmentHead = function updatedepartmentHead(data) {
  return regeneratorRuntime.async(function updatedepartmentHead$(_context26) {
    while (1) {
      switch (_context26.prev = _context26.next) {
        case 0:
          return _context26.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updatedepartmentHead, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context26.stop();
      }
    }
  });
}; //Concord Distribution Center


var getdistributionCentres = function getdistributionCentres() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getdistributionCentres, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createdistributionCentres = function createdistributionCentres(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createdistributionCentres, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspanddistributionCentres = function suspanddistributionCentres(data) {
  return regeneratorRuntime.async(function suspanddistributionCentres$(_context27) {
    while (1) {
      switch (_context27.prev = _context27.next) {
        case 0:
          return _context27.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspanddistributionCentres, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context27.stop();
      }
    }
  });
};

var updatedistributionCentres = function updatedistributionCentres(data) {
  return regeneratorRuntime.async(function updatedistributionCentres$(_context28) {
    while (1) {
      switch (_context28.prev = _context28.next) {
        case 0:
          return _context28.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updatedistributionCentres, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context28.stop();
      }
    }
  });
};

var regiondistributionCentres = function regiondistributionCentres() {
  return (0, _HttpProvider.get)(SERVICE_URLS.regiondistributionCentres, {
    feature: _featuresConstants["default"]["static"]
  });
};

var getDepoManagerAssigned = function getDepoManagerAssigned() {
  return regeneratorRuntime.async(function getDepoManagerAssigned$(_context29) {
    while (1) {
      switch (_context29.prev = _context29.next) {
        case 0:
          return _context29.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.getDepoManagerAssigned, {}, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context29.stop();
      }
    }
  });
}; //Concord Products Category


var getproductcategory = function getproductcategory() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getproductcategory, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createproductcategory = function createproductcategory(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createproductcategory, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspandproductcategory = function suspandproductcategory(data) {
  return regeneratorRuntime.async(function suspandproductcategory$(_context30) {
    while (1) {
      switch (_context30.prev = _context30.next) {
        case 0:
          return _context30.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandproductcategory, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context30.stop();
      }
    }
  });
};

var updateproductcategory = function updateproductcategory(data) {
  return regeneratorRuntime.async(function updateproductcategory$(_context31) {
    while (1) {
      switch (_context31.prev = _context31.next) {
        case 0:
          return _context31.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updateproductcategory, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context31.stop();
      }
    }
  });
}; //Concord Products


var getproducts = function getproducts() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getproducts, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createproducts = function createproducts(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createproducts, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspandproducts = function suspandproducts(data) {
  return regeneratorRuntime.async(function suspandproducts$(_context32) {
    while (1) {
      switch (_context32.prev = _context32.next) {
        case 0:
          return _context32.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandproducts, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context32.stop();
      }
    }
  });
};

var updateproducts = function updateproducts(data) {
  return regeneratorRuntime.async(function updateproducts$(_context33) {
    while (1) {
      switch (_context33.prev = _context33.next) {
        case 0:
          return _context33.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updateproducts, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context33.stop();
      }
    }
  });
}; //Concord Stocks


var getstocks = function getstocks() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getstocks, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createstocks = function createstocks(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createstocks, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspandstocks = function suspandstocks(data) {
  return regeneratorRuntime.async(function suspandstocks$(_context34) {
    while (1) {
      switch (_context34.prev = _context34.next) {
        case 0:
          return _context34.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandstocks, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context34.stop();
      }
    }
  });
};

var updatestocks = function updatestocks(data) {
  return regeneratorRuntime.async(function updatestocks$(_context35) {
    while (1) {
      switch (_context35.prev = _context35.next) {
        case 0:
          return _context35.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updatestocks, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context35.stop();
      }
    }
  });
}; //Concord Stocks Transaction


var getstockstransaction = function getstockstransaction() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getstockstransaction, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createstockstransaction = function createstockstransaction(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createstockstransaction, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspandstockstransaction = function suspandstockstransaction(data) {
  return regeneratorRuntime.async(function suspandstockstransaction$(_context36) {
    while (1) {
      switch (_context36.prev = _context36.next) {
        case 0:
          return _context36.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandstockstransaction, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context36.stop();
      }
    }
  });
}; //Concord Doctor Categorys


var getdoctorcategorys = function getdoctorcategorys() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getdoctorcategorys, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createdoctorcategorys = function createdoctorcategorys(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createdoctorcategorys, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspanddoctorcategorys = function suspanddoctorcategorys(data) {
  return regeneratorRuntime.async(function suspanddoctorcategorys$(_context37) {
    while (1) {
      switch (_context37.prev = _context37.next) {
        case 0:
          return _context37.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspanddoctorcategorys, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context37.stop();
      }
    }
  });
};

var updatedoctorcategorys = function updatedoctorcategorys(data) {
  return regeneratorRuntime.async(function updatedoctorcategorys$(_context38) {
    while (1) {
      switch (_context38.prev = _context38.next) {
        case 0:
          return _context38.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updatedoctorcategorys, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context38.stop();
      }
    }
  });
}; //Concord Doctors


var getdoctors = function getdoctors() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getdoctors, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createdoctors = function createdoctors(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createdoctors, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspanddoctors = function suspanddoctors(data) {
  return regeneratorRuntime.async(function suspanddoctors$(_context39) {
    while (1) {
      switch (_context39.prev = _context39.next) {
        case 0:
          return _context39.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspanddoctors, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context39.stop();
      }
    }
  });
};

var updatedoctors = function updatedoctors(data) {
  return regeneratorRuntime.async(function updatedoctors$(_context40) {
    while (1) {
      switch (_context40.prev = _context40.next) {
        case 0:
          return _context40.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updatedoctors, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context40.stop();
      }
    }
  });
}; //Concord Customers


var getcustomers = function getcustomers() {
  return (0, _HttpProvider.get)(SERVICE_URLS.getcustomers, {
    feature: _featuresConstants["default"]["static"]
  });
};

var createcustomers = function createcustomers(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.createcustomers, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var suspandcustomers = function suspandcustomers(data) {
  return regeneratorRuntime.async(function suspandcustomers$(_context41) {
    while (1) {
      switch (_context41.prev = _context41.next) {
        case 0:
          return _context41.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandcustomers, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context41.stop();
      }
    }
  });
};

var updatecustomers = function updatecustomers(data) {
  return regeneratorRuntime.async(function updatecustomers$(_context42) {
    while (1) {
      switch (_context42.prev = _context42.next) {
        case 0:
          return _context42.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updatecustomers, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context42.stop();
      }
    }
  });
}; // post getStatic


var updateTarget = function updateTarget(data) {
  return regeneratorRuntime.async(function updateTarget$(_context43) {
    while (1) {
      switch (_context43.prev = _context43.next) {
        case 0:
          return _context43.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updateTarget, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context43.stop();
      }
    }
  });
};

var readSchedule = function readSchedule(data) {
  return regeneratorRuntime.async(function readSchedule$(_context44) {
    while (1) {
      switch (_context44.prev = _context44.next) {
        case 0:
          return _context44.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.readSch, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context44.stop();
      }
    }
  });
};

var suspandDcp = function suspandDcp(data) {
  return regeneratorRuntime.async(function suspandDcp$(_context45) {
    while (1) {
      switch (_context45.prev = _context45.next) {
        case 0:
          return _context45.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandDCP, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context45.stop();
      }
    }
  });
};

var suspandSchedule = function suspandSchedule(data) {
  return regeneratorRuntime.async(function suspandSchedule$(_context46) {
    while (1) {
      switch (_context46.prev = _context46.next) {
        case 0:
          return _context46.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandSch, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context46.stop();
      }
    }
  });
};

var createAttendance = function createAttendance(data) {
  return regeneratorRuntime.async(function createAttendance$(_context47) {
    while (1) {
      switch (_context47.prev = _context47.next) {
        case 0:
          return _context47.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.createAttendance, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context47.stop();
      }
    }
  });
};

var editSchedule = function editSchedule(data) {
  return regeneratorRuntime.async(function editSchedule$(_context48) {
    while (1) {
      switch (_context48.prev = _context48.next) {
        case 0:
          return _context48.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.editSchedule, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context48.stop();
      }
    }
  });
};

var suspandDcr = function suspandDcr(data) {
  return regeneratorRuntime.async(function suspandDcr$(_context49) {
    while (1) {
      switch (_context49.prev = _context49.next) {
        case 0:
          return _context49.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandDCR, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context49.stop();
      }
    }
  });
};

var suspandAttendance = function suspandAttendance(data) {
  return regeneratorRuntime.async(function suspandAttendance$(_context50) {
    while (1) {
      switch (_context50.prev = _context50.next) {
        case 0:
          return _context50.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandAttendance, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context50.stop();
      }
    }
  });
};

var readUserRoles = function readUserRoles(data) {
  return regeneratorRuntime.async(function readUserRoles$(_context51) {
    while (1) {
      switch (_context51.prev = _context51.next) {
        case 0:
          return _context51.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.readRole, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context51.stop();
      }
    }
  });
};

var readPeriority = function readPeriority(data) {
  return regeneratorRuntime.async(function readPeriority$(_context52) {
    while (1) {
      switch (_context52.prev = _context52.next) {
        case 0:
          return _context52.abrupt("return", (0, _HttpProvider.get)(SERVICE_URLS.readRole, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context52.stop();
      }
    }
  });
};

var createRoles = function createRoles(data) {
  return regeneratorRuntime.async(function createRoles$(_context53) {
    while (1) {
      switch (_context53.prev = _context53.next) {
        case 0:
          return _context53.abrupt("return", (0, _HttpProvider.post)(SERVICE_URLS.createRole, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context53.stop();
      }
    }
  });
};

var updateRoles = function updateRoles(data) {
  return regeneratorRuntime.async(function updateRoles$(_context54) {
    while (1) {
      switch (_context54.prev = _context54.next) {
        case 0:
          return _context54.abrupt("return", (0, _HttpProvider.put)(SERVICE_URLS.updateRole, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context54.stop();
      }
    }
  });
};

var suspandRoles = function suspandRoles(data) {
  return regeneratorRuntime.async(function suspandRoles$(_context55) {
    while (1) {
      switch (_context55.prev = _context55.next) {
        case 0:
          return _context55.abrupt("return", (0, _HttpProvider.patch)(SERVICE_URLS.suspandRole, data, {
            feature: _featuresConstants["default"]["static"]
          }));

        case 1:
        case "end":
          return _context55.stop();
      }
    }
  });
};

var deleteRegion = function deleteRegion(data) {
  return (0, _HttpProvider.patch)(SERVICE_URLS.updateRegion, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var addRegion = function addRegion(data) {
  return (0, _HttpProvider.post)(SERVICE_URLS.addregion, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var EditRegion = function EditRegion(data) {
  return (0, _HttpProvider.put)(SERVICE_URLS.editRegion, data, {
    feature: _featuresConstants["default"]["static"]
  });
};

var ReadAssignedGifts = function ReadAssignedGifts(data) {
  return (0, _HttpProvider.get)(SERVICE_URLS.readAssignedGift, data, {
    feature: _featuresConstants["default"]["static"]
  });
}; // post g


var apiServices = {
  // define variables
  ReadAssignedGifts: ReadAssignedGifts,
  EditRegion: EditRegion,
  addRegion: addRegion,
  deleteRegion: deleteRegion,
  getAllSlots: getAllSlots,
  login: login,
  getStaticData: getStaticData,
  resendPhoneOtp: resendPhoneOtp,
  registerPatient: registerPatient,
  logout: logout,
  forgotPassword: forgotPassword,
  verifyEmail: verifyEmail,
  verifyNumber: verifyNumber,
  updatePatient: updatePatient,
  patientAppointments: patientAppointments,
  resendemailOtp: resendemailOtp,
  resetPassword: resetPassword,
  getDepartment: getDepartment,
  changePassword: changePassword,
  reg_doctor: reg_doctor,
  getAdmin: getAdmin,
  updateDoctor: updateDoctor,
  getTodaysAppoinments: getTodaysAppoinments,
  getPastAppoinments: getPastAppoinments,
  getUpcomingAppoinments: getUpcomingAppoinments,
  createAdministrator: createAdministrator,
  createPharmacyUser: createPharmacyUser,
  createLabAdmin: createLabAdmin,
  getAdministrator: getAdministrator,
  updateAdmin: updateAdmin,
  getLabAdmin: getLabAdmin,
  getPharmacyUser: getPharmacyUser,
  getSuperAdmin: getSuperAdmin,
  updateSuperAdmin: updateSuperAdmin,
  getOrders: getOrders,
  getPatient: getPatient,
  getDoctorRequests: getDoctorRequests,
  requestApproval: requestApproval,
  changePasswordSuperAdmin: changePasswordSuperAdmin,
  getAppoinmentsRescheduleRequest: getAppoinmentsRescheduleRequest,
  changeDeliveryStatus: changeDeliveryStatus,
  cancalAppointment: cancalAppointment,
  readTest: readTest,
  updateTest: updateTest,
  readCategory: readCategory,
  createTest: createTest,
  CreateCategory: CreateCategory,
  updateCategory: updateCategory,
  getMedicines: getMedicines,
  CreateMedicines: CreateMedicines,
  updateMedicines: updateMedicines,
  ReadReports: ReadReports,
  uploadReport: uploadReport,
  insertMedicine: insertMedicine,
  deleteReport: deleteReport,
  readPayment: readPayment,
  readRegion: readRegion,
  updatePayment: updatePayment,
  readArea: readArea,
  readThana: readThana,
  CreateUsers: CreateUsers,
  readRoles: readRoles,
  updateUser: updateUser,
  getDirector: getDirector,
  getDepo: getDepo,
  getDeliveryUser: getDeliveryUser,
  getSm: getSm,
  getRsm: getRsm,
  getAm: getAm,
  getMpo: getMpo,
  suspandUser: suspandUser,
  readTarget: readTarget,
  createTarget: createTarget,
  readOrder: readOrder,
  suspandTarget: suspandTarget,
  updateTarget: updateTarget,
  ReadDistributionCenter: ReadDistributionCenter,
  readDcps: readDcps,
  CreateDcp: CreateDcp,
  readSchedule: readSchedule,
  readDcr: readDcr,
  suspandDcp: suspandDcp,
  suspandDcr: suspandDcr,
  suspandSchedule: suspandSchedule,
  editSchedule: editSchedule,
  readAttendance: readAttendance,
  suspandAttendance: suspandAttendance,
  UploadImage: UploadImage,
  createAttendance: createAttendance,
  readUserRoles: readUserRoles,
  createRoles: createRoles,
  updateRoles: updateRoles,
  suspandRoles: suspandRoles,
  readPeriorityList: readPeriorityList,
  CreatePeriorityList: CreatePeriorityList,
  UpdatePeriorityList: UpdatePeriorityList,
  SuspandPeriorityList: SuspandPeriorityList,
  CreateDoctorPeriorityList: CreateDoctorPeriorityList,
  readPeriorityListDoctor: readPeriorityListDoctor,
  UpdateDoctorPeriorityList: UpdateDoctorPeriorityList,
  SuspandDoctorPeriorityList: SuspandDoctorPeriorityList,
  CreateSample: CreateSample,
  UpdateSample: UpdateSample,
  ReadSample: ReadSample,
  SuapandSample: SuapandSample,
  CreateSampleTransaction: CreateSampleTransaction,
  ReadSampleTransaction: ReadSampleTransaction,
  SuspandSampleTransaction: SuspandSampleTransaction,
  ReadStatic: ReadStatic,
  // Concord Orders
  getorder: getorder,
  staticdataconcord: staticdataconcord,
  createorder: createorder,
  suspandorder: suspandorder,
  statusChanges: statusChanges,
  // Concord Department Head
  getdepartmentHead: getdepartmentHead,
  createdepartmentHead: createdepartmentHead,
  suspanddepartmentHead: suspanddepartmentHead,
  updatedepartmentHead: updatedepartmentHead,
  // Concord Distribution Center
  getdistributionCentres: getdistributionCentres,
  createdistributionCentres: createdistributionCentres,
  suspanddistributionCentres: suspanddistributionCentres,
  updatedistributionCentres: updatedistributionCentres,
  regiondistributionCentres: regiondistributionCentres,
  getDepoManagerAssigned: getDepoManagerAssigned,
  //Concord Products Category
  getproductcategory: getproductcategory,
  createproductcategory: createproductcategory,
  updateproductcategory: updateproductcategory,
  suspandproductcategory: suspandproductcategory,
  //Concord Products
  getproducts: getproducts,
  createproducts: createproducts,
  updateproducts: updateproducts,
  suspandproducts: suspandproducts,
  //Concord Stocks
  getstocks: getstocks,
  createstocks: createstocks,
  updatestocks: updatestocks,
  suspandstocks: suspandstocks,
  //Concord StocksTransaction
  getstockstransaction: getstockstransaction,
  createstockstransaction: createstockstransaction,
  suspandstockstransaction: suspandstockstransaction,
  //Concord Doctor Categorys
  getdoctorcategorys: getdoctorcategorys,
  createdoctorcategorys: createdoctorcategorys,
  updatedoctorcategorys: updatedoctorcategorys,
  suspanddoctorcategorys: suspanddoctorcategorys,
  //Concord Doctors
  getdoctors: getdoctors,
  createdoctors: createdoctors,
  updatedoctors: updatedoctors,
  suspanddoctors: suspanddoctors,
  //Concord Customers
  getcustomers: getcustomers,
  createcustomers: createcustomers,
  updatecustomers: updatecustomers,
  suspandcustomers: suspandcustomers,
  AssignGift: AssignGift,
  getDashboardChart: getDashboardChart
};
var _default = apiServices;
exports["default"] = _default;