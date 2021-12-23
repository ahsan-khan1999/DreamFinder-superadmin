import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import ViewAdministrator from './third-level-4';




const ViewAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-2" */ './viewAdmin')
);


const CreateAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './CreateAdmin')
);
const EditAdmin = React.lazy(() =>
  import(/* webpackChunkName: "menu-level-3" */ './EditAdmin')
);


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
        path={`${match.url}/viewAdmin`}
        render={(props) => <ViewAdmin {...props} />}
      />
      
      
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default MenuLevels;
