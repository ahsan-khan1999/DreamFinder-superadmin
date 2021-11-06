import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import ViewAdministrator from './third-level-4';


const CreateDirector = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-1" */ './CreateDirector')
);


const ViewAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './viewAdmin')
);
const ViewAm = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './ViewAm')
);
const ViewRsm = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './ViewRsm')
);
const ViewSm = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './ViewSm')
);
const ViewMpo = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './ViewMpo')
);
const ViewDirector = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './ViewDirector')
);
const ViewRole = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './ViewRole')
);
const CreateRole = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './CreateRole')
);
const EditRole = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './EditRole')
);
const ViewDepoManager = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './ViewDepoManager')
);
const ViewDeliveryStaff = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './ViewDeliveryStaff')
);

const CreateDeliveryStaff = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateDeliveryStaff')
);
const CreateSm = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateSm')
);
const CreateDepoManager = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateDepoManager')
);
const CreateRsm = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateRsm')
);
const CreateAm = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateAm')
);
const CreateMpo = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateMpo')
);
const CreateAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateAdmin')
);
const EditAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './EditAdmin')
);
const EditDirector = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './EditDirector')
);
const EditDepoManager = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './EditDepoManager')
)
const EditDeliveryStaff = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './EditDeliveryStaff')
)
const EditAm = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './EditAm')
)
const EditSm = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './EditSm')
)
const EditRsm = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './EditRsm')
)
const EditMpo = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './EditMpo')
)

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
        path={`${match.url}/CreateAdmin`}
        render={(props) => <CreateAdmin {...props} />}
      />
      <Route
        path={`${match.url}/EditAdmin`}
        render={(props) => <EditAdmin {...props} />}
      />
       <Route
        path={`${match.url}/EditDirector`}
        render={(props) => <EditDirector {...props} />}
      />
        <Route
        path={`${match.url}/EditDepoManager`}
        render={(props) => <EditDepoManager {...props} />}
      />
       <Route
        path={`${match.url}/EditDeliveryStaff`}
        render={(props) => <EditDeliveryStaff {...props} />}
      />
      <Route
        path={`${match.url}/EditMpo`}
        render={(props) => <EditMpo {...props} />}
      />
      <Route
        path={`${match.url}/EditRsm`}
        render={(props) => <EditRsm {...props} />}
      />
      <Route
        path={`${match.url}/EditSm`}
        render={(props) => <EditSm {...props} />}
      />
      <Route
        path={`${match.url}/EditAm`}
        render={(props) => <EditAm {...props} />}
      />
      
      
      <Route
        path={`${match.url}/CreateDirector`}
        render={(props) => <CreateDirector {...props} />}
      />
       <Route
        path={`${match.url}/CreateDepoManager`}
        render={(props) => <CreateDepoManager {...props} />}
      />
     
     
      <Route
        path={`${match.url}/ViewDirector`}
        render={(props) => <ViewDirector {...props} />}
      />
      <Route
        path={`${match.url}/ViewDepoManager`}
        render={(props) => <ViewDepoManager {...props} />}
      />
      <Route
        path={`${match.url}/viewAdmin`}
        render={(props) => <ViewAdmin {...props} />}
      />
      <Route
        path={`${match.url}/ViewRole`}
        render={(props) => <ViewRole {...props} />}
      />
      <Route
        path={`${match.url}/CreateRole`}
        render={(props) => <CreateRole {...props} />}
      />
      <Route
        path={`${match.url}/EditRole`}
        render={(props) => <EditRole {...props} />}
      />
      <Route
        path={`${match.url}/CreateDeliveryStaff`}
        render={(props) => <CreateDeliveryStaff {...props} />}
      />
      <Route
        path={`${match.url}/CreateSm`}
        render={(props) => <CreateSm {...props} />}
      />
      <Route
        path={`${match.url}/CreateRsm`}
        render={(props) => <CreateRsm {...props} />}
      />
      <Route
        path={`${match.url}/CreateAm`}
        render={(props) => <CreateAm {...props} />}
      />
      <Route
        path={`${match.url}/CreateMpo`}
        render={(props) => <CreateMpo {...props} />}
      />
      <Route
        path={`${match.url}/ViewDeliveryStaff`}
        render={(props) => <ViewDeliveryStaff {...props} />}
      />
      <Route
        path={`${match.url}/ViewAm`}
        render={(props) => <ViewAm {...props} />}
      />
      <Route
        path={`${match.url}/ViewRsm`}
        render={(props) => <ViewRsm {...props} />}
      />
      <Route
        path={`${match.url}/ViewSm`}
        render={(props) => <ViewSm {...props} />}
      />
      <Route
        path={`${match.url}/ViewMpo`}
        render={(props) => <ViewMpo {...props} />}
      />
      
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuLevels;
