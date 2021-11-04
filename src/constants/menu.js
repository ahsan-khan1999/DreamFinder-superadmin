import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
    // roles: [UserRole.Admin, UserRole.Editor],
    // subs: [
    //   {
    //     icon: 'simple-icon-briefcase',
    //     label: 'menu.default',
    //     to: `${adminRoot}/dashboards/default`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-pie-chart',
    //     label: 'menu.analytics',
    //     to: `${adminRoot}/dashboards/analytics`,
    //     // roles: [UserRole.Admin],
    //   },
    //   {
    //     icon: 'simple-icon-basket-loaded',
    //     label: 'menu.ecommerce',
    //     to: `${adminRoot}/dashboards/ecommerce`,
    //     // roles: [UserRole.Editor],
    //   },
    //   {
    //     icon: 'simple-icon-doc',
    //     label: 'menu.content',
    //     to: `${adminRoot}/dashboards/content`,
    //     // roles: [UserRole.Editor],
    //   },
    // ],
  },
  // {
  //   id: 'pages',
  //   icon: 'iconsminds-digital-drawing',
  //   label: 'menu.pages',
  //   to: `${adminRoot}/pages`,
  //   subs: [
  //     {
  //       id: 'pages-authorization',
  //       label: 'menu.authorization',
  //       to: '/user',
  //       subs: [
  //         {
  //           icon: 'simple-icon-user-following',
  //           label: 'menu.login',
  //           to: '/user/login',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-follow',
  //           label: 'menu.register',
  //           to: '/user/register',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-following',
  //           label: 'menu.forgot-password',
  //           to: '/user/forgot-password',
  //           newWindow: true,
  //         },
  //         {
  //           icon: 'simple-icon-user-unfollow',
  //           label: 'menu.reset-password',
  //           to: '/user/reset-password',
  //           newWindow: true,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-product',
  //       label: 'menu.product',
  //       to: `${adminRoot}/pages/product`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-credit-card',
  //           label: 'menu.data-list',
  //           to: `${adminRoot}/pages/product/data-list`,
  //         },
  //         {
  //           icon: 'simple-icon-list',
  //           label: 'menu.thumb-list',
  //           to: `${adminRoot}/pages/product/thumb-list`,
  //         },
  //         {
  //           icon: 'simple-icon-grid',
  //           label: 'menu.image-list',
  //           to: `${adminRoot}/pages/product/image-list`,
  //         },
  //         {
  //           icon: 'simple-icon-picture',
  //           label: 'menu.details',
  //           to: `${adminRoot}/pages/product/details`,
  //         },
  //         {
  //           icon: 'simple-icon-book-open',
  //           label: 'menu.details-alt',
  //           to: `${adminRoot}/pages/product/details-alt`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-profile',
  //       label: 'menu.profile',
  //       to: `${adminRoot}/pages/profile`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-share',
  //           label: 'menu.social',
  //           to: `${adminRoot}/pages/profile/social`,
  //         },
  //         {
  //           icon: 'simple-icon-link',
  //           label: 'menu.portfolio',
  //           to: `${adminRoot}/pages/profile/portfolio`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-blog',
  //       label: 'menu.blog',
  //       to: `${adminRoot}/pages/blog`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-share',
  //           label: 'menu.blog-list',
  //           to: `${adminRoot}/pages/blog/blog-list`,
  //         },
  //         {
  //           icon: 'simple-icon-link',
  //           label: 'menu.blog-detail',
  //           to: `${adminRoot}/pages/blog/blog-detail`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'pages-miscellaneous',
  //       label: 'menu.miscellaneous',
  //       to: `${adminRoot}/pages/miscellaneous`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-question',
  //           label: 'menu.faq',
  //           to: `${adminRoot}/pages/miscellaneous/faq`,
  //         },
  //         {
  //           icon: 'simple-icon-graduation',
  //           label: 'menu.knowledge-base',
  //           to: `${adminRoot}/pages/miscellaneous/knowledge-base`,
  //         },

  //         {
  //           icon: 'simple-icon-diamond',
  //           label: 'menu.prices',
  //           to: `${adminRoot}/pages/miscellaneous/prices`,
  //         },
  //         {
  //           icon: 'simple-icon-magnifier',
  //           label: 'menu.search',
  //           to: `${adminRoot}/pages/miscellaneous/search`,
  //         },
  //         {
  //           icon: 'simple-icon-envelope-open',
  //           label: 'menu.mailing',
  //           to: `${adminRoot}/pages/miscellaneous/mailing`,
  //         },
  //         {
  //           icon: 'simple-icon-bag',
  //           label: 'menu.invoice',
  //           to: `${adminRoot}/pages/miscellaneous/invoice`,
  //         },

  //         {
  //           icon: 'simple-icon-exclamation',
  //           label: 'menu.error',
  //           to: '/error',
  //           newWindow: true,
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: 'applications',
  //   icon: 'iconsminds-air-balloon-1',
  //   label: 'menu.applications',
  //   to: `${adminRoot}/applications`,
  //   subs: [
  //     {
  //       icon: 'simple-icon-check',
  //       label: 'menu.todo',
  //       to: `${adminRoot}/applications/todo`,
  //     },
  //     {
  //       icon: 'simple-icon-calculator',
  //       label: 'menu.survey',
  //       to: `${adminRoot}/applications/survey`,
  //     },
  //     {
  //       icon: 'simple-icon-bubbles',
  //       label: 'menu.chat',
  //       to: `${adminRoot}/applications/chat`,
  //     },
  //   ],
  // },
  // {
  //   id: 'ui',
  //   icon: 'iconsminds-pantone',
  //   label: 'menu.ui',
  //   to: `${adminRoot}/ui`,
  //   subs: [
  //     {
  //       id: 'ui-forms',
  //       label: 'menu.forms',
  //       to: `${adminRoot}/ui/forms`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-notebook',
  //           label: 'menu.layouts',
  //           to: `${adminRoot}/ui/forms/layouts`,
  //         },
  //         {
  //           icon: 'simple-icon-puzzle',
  //           label: 'menu.components',
  //           to: `${adminRoot}/ui/forms/components`,
  //         },
  //         {
  //           icon: 'simple-icon-check',
  //           label: 'menu.validations',
  //           to: `${adminRoot}/ui/forms/validations`,
  //         },
  //         {
  //           icon: 'simple-icon-magic-wand',
  //           label: 'menu.wizard',
  //           to: `${adminRoot}/ui/forms/wizard`,
  //         },
  //       ],
  //     },
  //     {
  //       id: 'ui-components',
  //       label: 'menu.components',
  //       to: `${adminRoot}/ui/components`,
  //       subs: [
  //         {
  //           icon: 'simple-icon-bell',
  //           label: 'menu.alerts',
  //           to: `${adminRoot}/ui/components/alerts`,
  //         },
  //         {
  //           icon: 'simple-icon-badge',
  //           label: 'menu.badges',
  //           to: `${adminRoot}/ui/components/badges`,
  //         },
  //         {
  //           icon: 'simple-icon-control-play',
  //           label: 'menu.buttons',
  //           to: `${adminRoot}/ui/components/buttons`,
  //         },
  //         {
  //           icon: 'simple-icon-layers',
  //           label: 'menu.cards',
  //           to: `${adminRoot}/ui/components/cards`,
  //         },
  //         {
  //           icon: 'simple-icon-picture',
  //           label: 'menu.carousel',
  //           to: `${adminRoot}/ui/components/carousel`,
  //         },
  //         {
  //           icon: 'simple-icon-chart',
  //           label: 'menu.charts',
  //           to: `${adminRoot}/ui/components/charts`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-up',
  //           label: 'menu.collapse',
  //           to: `${adminRoot}/ui/components/collapse`,
  //         },
  //         {
  //           icon: 'simple-icon-arrow-down',
  //           label: 'menu.dropdowns',
  //           to: `${adminRoot}/ui/components/dropdowns`,
  //         },
  //         {
  //           icon: 'simple-icon-book-open',
  //           label: 'menu.editors',
  //           to: `${adminRoot}/ui/components/editors`,
  //         },

  //         {
  //           icon: 'simple-icon-star',
  //           label: 'menu.icons',
  //           to: `${adminRoot}/ui/components/icons`,
  //         },
  //         {
  //           icon: 'simple-icon-note',
  //           label: 'menu.input-groups',
  //           to: `${adminRoot}/ui/components/input-groups`,
  //         },
  //         {
  //           icon: 'simple-icon-screen-desktop',
  //           label: 'menu.jumbotron',
  //           to: `${adminRoot}/ui/components/jumbotron`,
  //         },
  //         {
  //           icon: 'simple-icon-map',
  //           label: 'menu.maps',
  //           to: `${adminRoot}/ui/components/maps`,
  //         },
  //         {
  //           icon: 'simple-icon-docs',
  //           label: 'menu.modal',
  //           to: `${adminRoot}/ui/components/modal`,
  //         },
  //         {
  //           icon: 'simple-icon-cursor',
  //           label: 'menu.navigation',
  //           to: `${adminRoot}/ui/components/navigation`,
  //         },
  //         {
  //           icon: 'simple-icon-pin',
  //           label: 'menu.popover-tooltip',
  //           to: `${adminRoot}/ui/components/popover-tooltip`,
  //         },
  //         {
  //           icon: 'simple-icon-shuffle',
  //           label: 'menu.sortable',
  //           to: `${adminRoot}/ui/components/sortable`,
  //         },
  //         {
  //           icon: 'simple-icon-grid',
  //           label: 'menu.tables',
  //           to: `${adminRoot}/ui/components/tables`,
  //         },
  //       ],
  //     },
  //   ],
  // },
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
          {
            label: 'menu.fieldStaff',
            to: `${adminRoot}/menu/levels/viewDoctor`,
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
      // {
      //   icon: 'simple-icon-layers',
      //   label: 'Patient',
      //   to: `${adminRoot}/menu/levels`,
      //   subs: [
      //     {
      //       icon: 'simple-icon-arrow-right',
      //       label: 'Create Patient',
      //       to: `${adminRoot}/menu/levels/third-level-1`,
      //     },
      //     {
      //       icon: 'simple-icon-arrow-right',
      //       label: 'View Patient',
      //       to: `${adminRoot}/menu/levels/third-level-2`,
      //     },
      //     {
      //       icon: 'simple-icon-arrow-right',
      //       label: 'Edit Patient',
      //       to: `${adminRoot}/menu/levels/third-level-3`,
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   id: 'blankpage',
  //   icon: 'iconsminds-bucket',
  //   label: 'menu.blank-page',
  //   to: `${adminRoot}/blank-page`,
  // },
  // {
  //   id: 'docs',
  //   icon: 'iconsminds-library',
  //   label: 'menu.docs',
  //   to: 'https://gogo-react-docs.coloredstrategies.com/',
  //   newWindow: true,
  // },
  {
    id: 'order',
    icon: 'iconsminds-shopping-cart',
    label: 'menu.orders',
    to: `${adminRoot}/Orders/orders`,
    subs: [
      {
        icon: 'simple-icon-check',

        label: 'menu.viewOrders',
        to: `${adminRoot}/Orders/orders`,
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
    id: 'Stocks',
    icon: 'iconsminds-bag-items',
    label: 'Stocks',
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
    id: 'Doctors',
    icon: 'iconsminds-doctor',
    label: 'Doctors',
    to: `${adminRoot}/doctor-management`,
    subs: [
      {
        icon: 'iconsminds-doctor',
        label: 'Doctors Category',
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
    id: 'Customers',
    icon: 'iconsminds-business-man',
    label: 'Customers',
    to: `${adminRoot}/customer-management`,
    subs: [
      {
        icon: 'iconsminds-business-man',
        label: 'Customers',
        to: `${adminRoot}/customer-management/viewCustomers`,
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
  {
    id: 'Sample',
    icon: 'iconsminds-bag-items',
    label: 'Sample',
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
    id: 'Field Work',
    icon: 'iconsminds-shopping-cart',
    label: 'Field Work',
    to: `${adminRoot}/FieldWorkManagment`,
    subs: [
      {
        icon: 'simple-icon-check',

        label: 'View Daily Call Plan',
        to: `${adminRoot}/FieldWorkManagment/ViewDcp`,
      },
      {
        icon: 'simple-icon-check',

        label: 'View Schedule',
        to: `${adminRoot}/FieldWorkManagment/ViewSchedule`,
      },
      {
        icon: 'simple-icon-check',

        label: 'View Daily Call Record',
        to: `${adminRoot}/FieldWorkManagment/ViewDcr`,
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
    id: 'Region',
    icon: 'iconsminds-embassy',
    label: 'menu.region',
    to: `${adminRoot}/TreeView/RegionTreeView`,
    // subs: [
    //   {
    //     icon: 'simple-icon-check',
    //     label: 'menu.viewRegion',
    //     to: `${adminRoot}/TreeView/RegionTreeView`,
    //   },

    // ],
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
];
export default data;
