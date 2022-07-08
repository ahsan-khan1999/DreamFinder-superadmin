import { adminRoot } from './defaultValues';

const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
  },

  {
    id: 'menu',
    icon: 'simple-icon-user-following',
    label: 'menu.user',
    to: `${adminRoot}/menu`,
    subs: [
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
        ],
      },
    ],
  },
  {
    id:"team",
    icon: 'iconsminds-students',
    label: 'Team',
    to: `${adminRoot}/OurTeam/ViewTeam`,
  },
  {
    id:"project",
    icon: 'iconsminds-project',
    label: 'Project',
    to: `${adminRoot}/Project/ViewProject`,
  },
  {
    id:"certificate",
    icon: 'simple-icon-docs',
    label: 'Certificate',
    to: `${adminRoot}/Certificates/ViewCertificate`,
  },
  {
    id:"banner",
    icon: 'simple-icon-picture',
    label: 'Banner',
    to: `${adminRoot}/Banner/ViewBanner`,
  },
  {
    id:"testanomial",
    icon: 'iconsminds-students',
    label: 'Testanomial',
    to: `${adminRoot}/testanomial/ViewTestanomial`,
  },
];
export default data;
