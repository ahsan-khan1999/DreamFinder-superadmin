/* eslint-disable */

import React, { Suspense, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import { IntlProvider } from 'react-intl';
import './helpers/Firebase';
import AppLocale from './lang';
import ColorSwitcher from './components/common/ColorSwitcher';
import { NotificationContainer } from './components/common/react-notifications';
import {
  isMultiColorActive,
  adminRoot,
  UserRole,
} from './constants/defaultValues';
import { getDirection } from './helpers/Utils';
import { ProtectedRoute } from './helpers/authHelper';
import UserLayout from 'layout/UserLayout';

const ViewHome = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './views/home')
);
const ViewApp = React.lazy(() =>
  import(/* webpackChunkName: "views-app" */ './views/app')
);
const ViewUser = React.lazy(() =>
  import(/* webpackChunkName: "views-user" */ './views/user')
);
const ViewError = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/error')
);
const ViewUnauthorized = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/unauthorized')
);
const Login = React.lazy(() =>
  import(/* webpackChunkName: "views-error" */ './views/user/login')
);
import { test, messaging } from './init-fcm';
import { getToken } from 'Utils/auth.util';

const App = ({ locale }) => {
  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add('rtl');
      document.body.classList.remove('ltr');
    } else {
      document.body.classList.add('ltr');
      document.body.classList.remove('rtl');
    }
  }, [direction]);

  // useEffect(() => {
  //   // dispatch(getUser());
  //   if ('serviceWorker' in navigator) {
  //     navigator?.serviceWorker
  //       .register('/firebase-messaging-sw.js')
  //       .then(function (registration) {
  //         console.log('Registration successful, scope is:', registration.scope);
  //       })
  //       .catch(function (err) {
  //         console.log('Service worker registration failed, error:', err);
  //       });
  //   }
  //   Notification.requestPermission()
  //     .then(async function () {
  //       const token = await test?.getToken(messaging);
  //       // console.log(token);
  //       localStorage.setItem('fcm', token);
  //     })
  //     .catch(function (err) {
  //       console.log('Unable to get permission to notify.', err);
  //     });
  //   navigator?.serviceWorker.addEventListener('message', (message) =>
  //     console.log(message)
  //   );
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="h-100">
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
        <>
          <NotificationContainer />
          {/* {isMultiColorActive && <ColorSwitcher />} */}
          <Suspense fallback={<div className="loading" />}>
            <Router>
              <Switch>
                <ProtectedRoute
                  path={adminRoot}
                  component={ViewApp}
                  roles={[UserRole.Admin, UserRole.Editor]}
                />
                <Route
                  path="/"
                  exact
                  render={(props) => (
                    <UserLayout>
                      <div className="container">
                        <Login {...props} />
                      </div>
                    </UserLayout>
                  )}
                />
                <Route
                  path="/user"
                  render={(props) => <ViewUser {...props} />}
                />
                <Route
                  path="/error"
                  exact
                  render={(props) => <ViewError {...props} />}
                />
                <Route
                  path="/unauthorized"
                  exact
                  render={(props) => <ViewUnauthorized {...props} />}
                />

                {/*
                <Redirect exact from="/" to={adminRoot} />
                */}
                <Redirect to="/error" />
              </Switch>
            </Router>
          </Suspense>
        </>
      </IntlProvider>
    </div>
  );
};

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(App);
