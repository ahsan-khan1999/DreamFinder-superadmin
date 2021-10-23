import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import ViewAdministrator from './third-level-4';

const CreateViewDoctor = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-1" */ './viewCurrentDoctor')
);
const CreateLabAdmins = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-1" */ './CreateLabAdmins')
);

const CreateDoctor = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-1" */ './CreateDoctors')
);
const CreatePatients = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-1" */ './CreatePatients')
);
const CreateAdministrators = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-1" */ './CreateAdministrators')
);
const ViewDoctor = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './viewDoctor')
);
const CreateAdministrator = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './createAdministrator')
);
const CreateAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateAdmin')
);
const ViewAdministrator = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './viewAdministrator')
);
const CreateLabAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './createLabAdmin')
);
const ViewLabAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './viewLabAdmin')
);
const CreatePharmacy = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './createPharmacy')
);
const CreatePharmacyUser = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreatePharmcyUser')
);
const ViewPharmacy = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './viewPharmacy')
);
const CreateSuperAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './createSuperAdmin')
);
const ViewCurrentUser = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './ViewCurrentUser')
);
const CreateSuperAdmins = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateSuperAdmins')
);
const ViewSuperAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './viewSuperAdmin')
);
const CreatePatient = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './createPatient')
);

const ViewPatient = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './viewPatient')
);

// CreateSuperAdmins

const MenuLevels = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect
        exact
        from={`${match.url}/`}
        to={`${match.url}/third-level-1`}
      />
      <Route
        path={`${match.url}/viewCurrentDoctor`}
        render={(props) => <CreateViewDoctor {...props} />}
      />
      CreateAdmin
      <Route
        path={`${match.url}/CreateAdmin`}
        render={(props) => <CreateAdmin {...props} />}
      />
      <Route
        path={`${match.url}/CreateDoctors`}
        render={(props) => <CreateDoctor {...props} />}
      />
      <Route
        path={`${match.url}/CreatePatients`}
        render={(props) => <CreatePatients {...props} />}
      />
       <Route
        path={`${match.url}/ViewCurrentUser`}
        render={(props) => <ViewCurrentUser {...props} />}
      />
      <Route
        path={`${match.url}/viewDoctor`}
        render={(props) => <ViewDoctor {...props} />}
      />
      <Route
        path={`${match.url}/CreateAdministrators`}
        render={(props) => <CreateAdministrators {...props} />}
      />
      <Route
        path={`${match.url}/createAdministrator`}
        render={(props) => <CreateAdministrator {...props} />}
      />
      <Route
        path={`${match.url}/viewAdministrator`}
        render={(props) => <ViewAdministrator {...props} />}
      />
      <Route
        path={`${match.url}/createLabAdmin`}
        render={(props) => <CreateLabAdmin {...props} />}
      />
       <Route
        path={`${match.url}/CreateLabAdmins`}
        render={(props) => <CreateLabAdmins {...props} />}
      />
       <Route
        path={`${match.url}/viewLabAdmin`}
        render={(props) => <ViewLabAdmin {...props} />}
      />
      <Route
        path={`${match.url}/createPharmacy`}
        render={(props) => <CreatePharmacy {...props} />}
      />
       <Route
        path={`${match.url}/CreatePharmcyUser`}
        render={(props) => <CreatePharmacyUser {...props} />}
      />
       <Route
        path={`${match.url}/viewPharmacy`}
        render={(props) => <ViewPharmacy {...props} />}
      />
      <Route
        path={`${match.url}/createSuperAdmin`}
        render={(props) => <CreateSuperAdmin {...props} />}
      />
      <Route
        path={`${match.url}/CreateSuperAdmins`}
        render={(props) => <CreateSuperAdmins {...props} />}
      />
       <Route
        path={`${match.url}/viewSuperAdmin`}
        render={(props) => <ViewSuperAdmin {...props} />}
      />
       <Route
        path={`${match.url}/createPatient`}
        render={(props) => <CreatePatient {...props} />}
      />
       <Route
        path={`${match.url}/viewPatient`}
        render={(props) => <ViewPatient {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuLevels;
