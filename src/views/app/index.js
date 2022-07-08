import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
import ViewTeam from './OurTeam/ViewTeam';


// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);

const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);
const Certificates = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Certificates/ViewCertificate')
);
const CreateTeam = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './OurTeam/CreateTeam')
);
const EditTeam = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './OurTeam/EditTeam')
);
const ViewProject = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Project/ViewProject')
);
const CreateProject = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Project/CreateProject')
);
const EditProject = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Project/EditProject')
);
const ViewBanner = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Banner/ViewBanner')
);
const CreateBanner = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Banner/CreateBanner')
);
const EditBanner = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './Banner/EditBanner')
);
const ViewTestanomial = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './testanomial/ViewTestenomial')
);
const CreateTestanomial = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './testanomial/CreateTestanomial')
);
const EditTestanomial = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './testanomial/EditTestanomial')
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
            <Route
              path={`${match.url}/Certificates/ViewCertificate`}
              render={(props) => <Certificates {...props} />}
            />
            <Route
              path={`${match.url}/Project/ViewProject`}
              render={(props) => <ViewProject {...props} />}
            />
            <Route
              path={`${match.url}/Project/EditProject`}
              render={(props) => <EditProject {...props} />}
            />
            <Route
              path={`${match.url}/Project/CreateProject`}
              render={(props) => <CreateProject {...props} />}
            />
             <Route
              path={`${match.url}/OurTeam/ViewTeam`}
              render={(props) => <ViewTeam {...props} />}
            />
            <Route
              path={`${match.url}/OurTeam/CreateTeam`}
              render={(props) => <CreateTeam {...props} />}
            />
            <Route
              path={`${match.url}/OurTeam/EditTeam`}
              render={(props) => <EditTeam {...props} />}
            />
             <Route
              path={`${match.url}/Banner/ViewBanner`}
              render={(props) => <ViewBanner {...props} />}
            />
            <Route
              path={`${match.url}/Banner/CreateBanner`}
              render={(props) => <CreateBanner {...props} />}
            />
             <Route
              path={`${match.url}/Banner/EditBanner`}
              render={(props) => <EditBanner {...props} />}
            />
            <Route
              path={`${match.url}/testanomial/EditTestanomial`}
              render={(props) => <EditTestanomial {...props} />}
            />
             <Route
              path={`${match.url}/testanomial/ViewTestanomial`}
              render={(props) => <ViewTestanomial {...props} />}
            />
            <Route
              path={`${match.url}/testanomial/Createtestanomial`}
              render={(props) => <CreateTestanomial {...props} />}
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
