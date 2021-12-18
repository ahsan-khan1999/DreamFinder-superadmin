"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defaultValues = require("./defaultValues");

var data = [{
  id: 'dashboard',
  icon: 'iconsminds-shop-4',
  label: 'menu.dashboards',
  to: "".concat(_defaultValues.adminRoot, "/dashboards")
}, {
  id: 'Region',
  icon: 'iconsminds-embassy',
  label: 'menu.region',
  to: "".concat(_defaultValues.adminRoot, "/TreeView/RegionTreeView")
}, {
  id: 'menu',
  icon: 'simple-icon-user-following',
  label: 'menu.user',
  to: "".concat(_defaultValues.adminRoot, "/menu"),
  subs: [// {
  //   icon: 'simple-icon-logout',
  //   label: 'menu.types',
  //   to: `${adminRoot}/menu/types`,
  // },
  {
    icon: 'simple-icon-layers',
    label: 'menu.users',
    to: "".concat(_defaultValues.adminRoot, "/menu/levels"),
    subs: [// {
    //   icon: 'simple-icon-arrow-right',
    //   label: 'Create Doctor',
    //   to: `${adminRoot}/menu/levels/createDoctor`,
    // },
    {
      // icon: 'simple-icon-arrow-right',
      label: 'menu.admin',
      to: "".concat(_defaultValues.adminRoot, "/menu/levels/viewAdmin")
    }, // {
    //   icon: 'simple-icon-arrow-right',
    //   label: 'Create Patient',
    //   to: `${adminRoot}/menu/levels/createPatient`,
    // },
    {
      // icon: 'simple-icon-arrow-right',
      label: 'menu.director',
      to: "".concat(_defaultValues.adminRoot, "/menu/levels/ViewDirector")
    }, {
      // icon: 'simple-icon-arrow-right',
      label: 'Depot Manager',
      to: "".concat(_defaultValues.adminRoot, "/menu/levels/viewDepoManager")
    }, // {
    //   icon: 'simple-icon-arrow-right',
    //   label: 'Create Administrator',
    //   to: `${adminRoot}/menu/levels/createAdministrator`,
    // },
    {
      // icon: 'simple-icon-arrow-right',
      label: 'menu.fieldStaff',
      to: "".concat(_defaultValues.adminRoot, "/menu/levels/ViewDeliveryStaff")
    }, // {
    //   icon: 'simple-icon-arrow-right',
    //   label: 'Create Lab Admin',
    //   to: `${adminRoot}/menu/levels/createLabAdmin`,
    // },
    {
      // icon: 'simple-icon-arrow-right',
      label: 'menu.sm',
      to: "".concat(_defaultValues.adminRoot, "/menu/levels/ViewSm")
    }, // {
    //   icon: 'simple-icon-arrow-right',
    //   label: 'Create Pharmacy',
    //   to: `${adminRoot}/menu/levels/createPharmacy`,
    // },
    {
      // icon: 'simple-icon-arrow-right',
      label: 'menu.rsm',
      to: "".concat(_defaultValues.adminRoot, "/menu/levels/ViewRsm")
    }, // {
    //   icon: 'simple-icon-arrow-right',
    //   label: 'Create Super Admin',
    //   to: `${adminRoot}/menu/levels/createSuperAdmin`,
    // },
    {
      // icon: 'simple-icon-arrow-right',
      label: 'menu.am',
      to: "".concat(_defaultValues.adminRoot, "/menu/levels/ViewAm")
    }, {
      // icon: 'simple-icon-arrow-right',
      label: 'Medicine Promotion Officer',
      to: "".concat(_defaultValues.adminRoot, "/menu/levels/ViewMpo")
    }, {
      // icon: 'simple-icon-arrow-right',
      label: 'Role',
      to: "".concat(_defaultValues.adminRoot, "/menu/levels/ViewRole")
    }]
  }]
}, {
  id: 'Distribution Center',
  icon: 'iconsminds-management',
  label: 'menu.distribution-center-management',
  to: "".concat(_defaultValues.adminRoot, "/distributioncenter-management"),
  subs: [{
    icon: 'iconsminds-management',
    label: 'menu.distribution-center',
    to: "".concat(_defaultValues.adminRoot, "/distributioncenter-management/viewDistributioncenter")
  }, {
    icon: 'iconsminds-business-man',
    label: 'menu.department-head',
    to: "".concat(_defaultValues.adminRoot, "/distributioncenter-management/viewDepartmenthead")
  }]
}, {
  id: 'menu.stocks',
  icon: 'iconsminds-bag-items',
  label: 'menu.stocks',
  to: "".concat(_defaultValues.adminRoot, "/stocks-management"),
  subs: [{
    icon: 'iconsminds-add-cart',
    label: 'Product Category',
    to: "".concat(_defaultValues.adminRoot, "/stocks-management/viewProductCategory")
  }, {
    icon: 'iconsminds-add-basket',
    label: 'Product',
    to: "".concat(_defaultValues.adminRoot, "/stocks-management/viewProduct")
  }, {
    icon: 'iconsminds-cart-quantity',
    label: 'Stock',
    to: "".concat(_defaultValues.adminRoot, "/stocks-management/viewStock")
  }, {
    icon: 'iconsminds-credit-card',
    label: 'Stock Transaction',
    to: "".concat(_defaultValues.adminRoot, "/stocks-management/ViewStockTransaction")
  }]
}, {
  id: 'gift',
  icon: 'iconsminds-gift-box',
  label: 'Gift',
  to: "".concat(_defaultValues.adminRoot, "/Gift/ViewGift")
}, {
  id: 'menu.Customers',
  icon: 'iconsminds-business-man',
  label: 'menu.Customers',
  to: "".concat(_defaultValues.adminRoot, "/customer-management/viewCustomers")
}, {
  id: 'menu.Doctors',
  icon: 'iconsminds-doctor',
  label: 'menu.Doctors',
  to: "".concat(_defaultValues.adminRoot, "/doctor-management"),
  subs: [{
    icon: 'iconsminds-doctor',
    label: 'Doctors Speciality',
    to: "".concat(_defaultValues.adminRoot, "/doctor-management/viewDoctorsCategory")
  }, {
    icon: 'iconsminds-doctor',
    label: 'Doctors ',
    to: "".concat(_defaultValues.adminRoot, "/doctor-management/viewDoctors")
  }]
}, {
  id: 'order',
  icon: 'iconsminds-shopping-cart',
  label: 'menu.orders',
  to: "".concat(_defaultValues.adminRoot, "/Orders/orders")
}, {
  id: 'Periority List',
  icon: 'simple-icon-list',
  label: 'Priority List',
  to: "".concat(_defaultValues.adminRoot, "/PeriorityList"),
  subs: [{
    icon: 'simple-icon-check',
    label: 'Customer',
    to: "".concat(_defaultValues.adminRoot, "/PeriorityList/ViewPeriorityList")
  }, {
    icon: 'simple-icon-check',
    label: 'Doctor',
    to: "".concat(_defaultValues.adminRoot, "/PeriorityList/ViewPeriorityListDoctor")
  }]
}, {
  id: 'Attendance',
  icon: 'iconsminds-up',
  label: 'Attendance',
  to: "".concat(_defaultValues.adminRoot, "/Attendance/ViewAttendance") // subs: [
  //   {
  //     icon: 'simple-icon-check',
  //     label: 'menu.viewOrders',
  //     to: `${adminRoot}/Orders/orders`,
  //   },
  // ],

}, {
  id: 'menu.Sample',
  icon: 'iconsminds-bag-items',
  label: 'menu.Sample',
  to: "".concat(_defaultValues.adminRoot, "/Sample/"),
  subs: [{
    icon: 'simple-icon-check',
    label: 'View Sample',
    to: "".concat(_defaultValues.adminRoot, "/Sample/ViewSample")
  }, {
    icon: 'simple-icon-check',
    label: 'View Sample Transaction',
    to: "".concat(_defaultValues.adminRoot, "/Sample/ViewSampleTransaction")
  }]
}, {
  id: 'menu.fieldWork',
  icon: 'simple-icon-call-end',
  label: 'menu.fieldWork',
  to: "".concat(_defaultValues.adminRoot, "/FieldWorkManagment"),
  subs: [{
    icon: 'simple-icon-check',
    label: 'View Daily Call Plan',
    to: "".concat(_defaultValues.adminRoot, "/FieldWorkManagment/ViewDcp")
  }, // {
  //   icon: 'simple-icon-check',
  //   label: 'View Schedule',
  //   to: `${adminRoot}/FieldWorkManagment/ViewSchedule`,
  // },
  {
    icon: 'simple-icon-check',
    label: 'View Daily Call Record',
    to: "".concat(_defaultValues.adminRoot, "/FieldWorkManagment/ViewDcr")
  }]
}, {
  id: 'Target',
  icon: 'simple-icon-target',
  label: 'menu.target',
  to: "".concat(_defaultValues.adminRoot, "/Target/ViewTarget") // subs: [
  //   {
  //     icon: 'simple-icon-check',
  //     label: 'menu.viewOrders',
  //     to: `${adminRoot}/Orders/orders`,
  //   },
  // ],

}];
var _default = data;
exports["default"] = _default;