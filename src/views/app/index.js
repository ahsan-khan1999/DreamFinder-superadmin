import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);
const Orders = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Orders/orders')
);
const Test = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/viewTest')
);
const ViewRegion = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './TreeView/RegionTreeView')
);
const ViewTarget = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Target/ViewTarget')
);
const CreateTarget = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Target/CreateTarget')
);
const EditTarget = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Target/EditTarget')
);
const Category = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/viewCategory')
);
const CreateCategory = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/CreateCategory')
);
const ViewMedicines = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Medicines/viewMedicines')
);
const ViewCurrentCategory = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/viewCurrentCategory')
);
const ViewCurrentReport = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Reports/viewCurrentReport')
);
const CreateTest = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/createTest')
);
const CreateMedicines = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Medicines/CreateMedicines')
);
const ViewCurrentTest = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/viewCurrentTest')
);
const ViewReport = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Reports/viewReports')
);
const ViewPayment = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Payment/viewPayment')
);
const ViewCurrentPayment = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Payment/viewCurrentPayment')
);
const UploadReport = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Reports/uploadReport')
);
const ViewCurrentMedicines = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboards" */ './Medicines/viewCurrentMedicines'
  )
);
const ViewCurrentOrder = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Orders/viewCurrentOrder'
  )
);
const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />

            <Route
              path={`${match.url}/Target/ViewTarget`}
              render={(props) => <ViewTarget {...props} />}
            />
            <Route
              path={`${match.url}/Target/CreateTarget`}
              render={(props) => <CreateTarget {...props} />}
            />
            <Route
              path={`${match.url}/Target/EditTarget`}
              render={(props) => <EditTarget {...props} />}
            />

            <Route
              path={`${match.url}/Orders/viewCurrentOrder`}
              render={(props) => <ViewCurrentOrder {...props} />}
            />

            <Route
              path={`${match.url}/Reports/viewReports`}
              render={(props) => <ViewReport {...props} />}
            />
            <Route
              path={`${match.url}/TreeView/RegionTreeView`}
              render={(props) => <ViewRegion {...props} />}
            />
            <Route
              path={`${match.url}/Payment/viewPayment`}
              render={(props) => <ViewPayment {...props} />}
            />
            <Route
              path={`${match.url}/Payment/viewCurrentPayment`}
              render={(props) => <ViewCurrentPayment {...props} />}
            />
            <Route
              path={`${match.url}/Reports/uploadReport`}
              render={(props) => <UploadReport {...props} />}
            />
            <Route
              path={`${match.url}/Reports/viewCurrentReport`}
              render={(props) => <ViewCurrentReport {...props} />}
            />
            <Route
              path={`${match.url}/Medicines/viewCurrentMedicines`}
              render={(props) => <ViewCurrentMedicines {...props} />}
            />
            <Route
              path={`${match.url}/orders`}
              render={(props) => <Orders {...props} />}
            />

            <Route
              path={`${match.url}/Test/viewTest`}
              render={(props) => <Test {...props} />}
            />
            <Route
              path={`${match.url}/Medicines/viewMedicines`}
              render={(props) => <ViewMedicines {...props} />}
            />

            <Route
              path={`${match.url}/Test/viewCategory`}
              render={(props) => <Category {...props} />}
            />
            <Route
              path={`${match.url}/Medicines/CreateMedicines`}
              render={(props) => <CreateMedicines {...props} />}
            />

            <Route
              path={`${match.url}/Test/CreateCategory`}
              render={(props) => <CreateCategory {...props} />}
            />
            <Route
              path={`${match.url}/Test/viewCurrentCategory`}
              render={(props) => <ViewCurrentCategory {...props} />}
            />
            <Route
              path={`${match.url}/Test/createTest`}
              render={(props) => <CreateTest {...props} />}
            />
            <Route
              path={`${match.url}/Test/viewCurrentTest`}
              render={(props) => <ViewCurrentTest {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
