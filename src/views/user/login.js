/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import logo from '../../../src/assets/logos/logo.png';

import { Formik, Form, Field } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';
import { Login_action } from '../../Store/Actions/Auth/Actions';

import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { loginUser } from 'redux/actions';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 1) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const Login = ({ history, error, loginUserAction }) => {
  function handleClick() {
    history.push('/app/dashboards/default');
  }
  const user = useSelector((state) => state?.logIn?.user?.user);
  const loading = useSelector((state) => state?.logIn?.loading);

  const dispatch = useDispatch();

  const [email] = useState('');
  const [password] = useState('');

  useEffect(() => {
    if (error) {
      NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
    }
  }, [error]);

  const onUserLogin = async (values) => {
    if (values.email === '' && values.password === '') {
      NotificationManager.error(
        'Please Enter Details',
        'Error',
        3000,
        null,
        null,
        ''
      );
      return;
    }
    if (values.email !== '' && values.password !== '') {
      const apiData = {
        email: values?.email,
        password: values?.password,
      };
      // console.log(apiData);

      let res = await dispatch(Login_action(apiData));
      if (res) {
        NotificationManager.success(
          'Success',
          'Login Success',
          3000,
          null,
          null,
          ''
        );

        handleClick();

        return;
      }
    }
  };

  const initialValues = { email, password };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" xxl="4" lg="4" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="form-side">
            <NavLink to="/" className="white">
              {/* <span className="logo-single" /> */}
              <span
                className=""
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  marginBottom: '30px',
                }}
              >
                <img className="logo" src={logo} alt="" height="70px" width="240px" />
              </span>
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.login-title" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onUserLogin}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      validate={validateEmail}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.password" />
                    </Label>
                    <Field
                      className="form-control"
                      type="password"
                      name="password"
                      validate={validatePassword}
                    />
                    {errors.password && touched.password && (
                      <div className="invalid-feedback d-block">
                        {errors.password}
                      </div>
                    )}
                  </FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/forgot-password">
                      <IntlMessages id="user.forgot-password-question" />
                    </NavLink>
                    <Button
                      color="primary"
                      style={{backgroundColor:"#fed000"}}
                      disabled={loading ? true :false}
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="sm"
                      onSubmit={onUserLogin}
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.login-button" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card>
      </Colxx>
    </Row>
  );
};
const mapStateToProps = ({ authUser }) => {
  const { loading, error } = authUser;
  return { loading, error };
};

export default connect(mapStateToProps, {
  loginUserAction: loginUser,
})(Login);
