import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
    
  },
  {
    id: 'Region',
    icon: 'iconsminds-embassy',
    label: 'menu.region',
    to: `${adminRoot}/TreeView/RegionTreeView`,
  },
  {
    id: 'menu',
    icon: 'simple-icon-user-following',
    label: 'menu.user',
    to: `${adminRoot}/menu`,
    subs: [
      // {
      //   icon: 'simple-icon-logout',
      //   label: 'menu.types',
      //   to: `${adminRoot}/menu/types`,
      // },
      {
        icon: 'simple-icon-layers',
        label: 'menu.users',
        to: `${adminRoot}/menu/levels`,
        subs: [
          // {
          //   icon: 'simple-icon-arrow-right',
          //   label: 'Create Doctor',
          //   to: `${adminRoot}/menu/levels/createDoctor`,
          // },
          {
            // icon: 'simple-icon-arrow-right',
            label: 'menu.admin',
            to: `${adminRoot}/menu/levels/viewAdmin`,
           
          },

          // {
          //   icon: 'simple-icon-arrow-right',
          //   label: 'Create Patient',
          //   to: `${adminRoot}/menu/levels/createPatient`,
          // },
          {
            // icon: 'simple-icon-arrow-right',
            label: 'menu.director',
            to: `${adminRoot}/menu/levels/ViewDirector`,
          },
          {
            // icon: 'simple-icon-arrow-right',
            label: 'Depot Manager',
            to: `${adminRoot}/menu/levels/viewDepoManager`,
          },
          // {
          //   icon: 'simple-icon-arrow-right',
          //   label: 'Create Administrator',
          //   to: `${adminRoot}/menu/levels/createAdministrator`,
          // },
          {
            // icon: 'simple-icon-arrow-right',
            label: 'menu.fieldStaff',
            to: `${adminRoot}/menu/levels/ViewDeliveryStaff`,
          },
          // {
          //   icon: 'simple-icon-arrow-right',
          //   label: 'Create Lab Admin',
          //   to: `${adminRoot}/menu/levels/createLabAdmin`,
          // },
          {
            // icon: 'simple-icon-arrow-right',
            label: 'menu.sm',
            to: `${adminRoot}/menu/levels/ViewSm`,
          },
          // {
          //   icon: 'simple-icon-arrow-right',
          //   label: 'Create Pharmacy',
          //   to: `${adminRoot}/menu/levels/createPharmacy`,
          // },
          {
            // icon: 'simple-icon-arrow-right',
            label: 'menu.rsm',
            to: `${adminRoot}/menu/levels/ViewRsm`,

          },
          // {
          //   icon: 'simple-icon-arrow-right',
          //   label: 'Create Super Admin',
          //   to: `${adminRoot}/menu/levels/createSuperAdmin`,
          // },
          {
            // icon: 'simple-icon-arrow-right',
            label: 'menu.am',
            to: `${adminRoot}/menu/levels/ViewAm`,
          },
          {
            // icon: 'simple-icon-arrow-right',
            label: 'Medicine Promotion Officer',
            to: `${adminRoot}/menu/levels/ViewMpo`,
          },
          {
            // icon: 'simple-icon-arrow-right',
            label: 'Role',
            to: `${adminRoot}/menu/levels/ViewRole`,
          },
        ],
      },
    
    ],
  },
  {
    id: 'Distribution Center',
    icon: 'iconsminds-management',
    label: 'menu.distribution-center-management',
    to: `${adminRoot}/distributioncenter-management`,
    subs: [
      {
        icon: 'iconsminds-management',
        label: 'menu.distribution-center',
        to: `${adminRoot}/distributioncenter-management/viewDistributioncenter`,
      },
      {
        icon: 'iconsminds-business-man',
        label: 'menu.department-head',
         to: `${adminRoot}/distributioncenter-management/viewDepartmenthead`,
      },
    ],
  },
  {
    id: 'menu.stocks',
    icon: 'iconsminds-bag-items',
    label: 'menu.stocks',
    to: `${adminRoot}/stocks-management`,
    subs: [
      {
        icon: 'iconsminds-add-cart',
        label: 'Product Category',
        to: `${adminRoot}/stocks-management/viewProductCategory`,
      },
      {
        icon: 'iconsminds-add-basket',
        label: 'Product',
         to: `${adminRoot}/stocks-management/viewProduct`,
      },
      {
        icon: 'iconsminds-cart-quantity',
        label: 'Stock',
         to: `${adminRoot}/stocks-management/viewStock`,
      },
      {
        icon: 'iconsminds-credit-card',
        label: 'Stock Transaction',
         to: `${adminRoot}/stocks-management/ViewStockTransaction`,
      },
    ],
  },

  {
    id: 'gift',
    icon: 'iconsminds-gift-box',
    label: 'Gift',
    to: `${adminRoot}/Gift/ViewGift`,
   
  },









  {
    id: 'menu.Customers',
    icon: 'iconsminds-business-man',
    label: 'menu.Customers',
    to: `${adminRoot}/customer-management/viewCustomers`,
    
  },


 

  {
    id: 'menu.Doctors',
    icon: 'iconsminds-doctor',
    label: 'menu.Doctors',
    to: `${adminRoot}/doctor-management`,
    subs: [
      {
        icon: 'iconsminds-doctor',
        label: 'Doctors Speciality',
        to: `${adminRoot}/doctor-management/viewDoctorsCategory`,
      },
      {
        icon: 'iconsminds-doctor',
        label: 'Doctors ',
         to: `${adminRoot}/doctor-management/viewDoctors`,
      },
    ],
  },
  {
    id: 'order',
    icon: 'iconsminds-shopping-cart',
    label: 'menu.orders',
    to: `${adminRoot}/Orders/orders`,
   
  },
  

  {
    id: 'Periority List',
    icon: 'simple-icon-list',
    label: 'Priority List',
    to: `${adminRoot}/PeriorityList`,
    subs: [
      {
        icon: 'simple-icon-check',
        label: 'Customer',
        to: `${adminRoot}/PeriorityList/ViewPeriorityList`,
      },
      {
        icon: 'simple-icon-check',
        label: 'Doctor',
        to: `${adminRoot}/PeriorityList/ViewPeriorityListDoctor`,
      },

    ],
  },
   {
    id: 'Attendance',
    icon: 'iconsminds-up',
    label: 'Attendance',
    to: `${adminRoot}/Attendance/ViewAttendance`,
    // subs: [
    //   {
    //     icon: 'simple-icon-check',

    //     label: 'menu.viewOrders',
    //     to: `${adminRoot}/Orders/orders`,
    //   },
    // ],
  },
  

 
  {
    id: 'menu.Sample',
    icon: 'iconsminds-bag-items',
    label: 'menu.Sample',
    to: `${adminRoot}/Sample/`,
    subs: [
      {
        icon: 'simple-icon-check',

        label: 'View Sample',
        to: `${adminRoot}/Sample/ViewSample`,
      },
      {
        icon: 'simple-icon-check',

        label: 'View Sample Transaction',
        to: `${adminRoot}/Sample/ViewSampleTransaction`,
      },
    ],
  },
  {
    id: 'menu.fieldWork',
    icon: 'simple-icon-call-end',
    label: 'menu.fieldWork',
    to: `${adminRoot}/FieldWorkManagment`,
    subs: [
      {
        icon: 'simple-icon-check',

        label: 'View Daily Call Plan',
        to: `${adminRoot}/FieldWorkManagment/ViewDcp`,
      },
      // {
      //   icon: 'simple-icon-check',

      //   label: 'View Schedule',
      //   to: `${adminRoot}/FieldWorkManagment/ViewSchedule`,
      // },
      {
        icon: 'simple-icon-check',

        label: 'View Daily Call Record',
        to: `${adminRoot}/FieldWorkManagment/ViewDcr`,
      },
    ],
  },
 
  {
    id: 'Target',
    icon: 'simple-icon-target',
    label: 'menu.target',
    to: `${adminRoot}/Target/ViewTarget`,
    // subs: [
    //   {
    //     icon: 'simple-icon-check',

    //     label: 'menu.viewOrders',
    //     to: `${adminRoot}/Orders/orders`,
    //   },
    // ],
  },
 
  
 
];
export default data;
