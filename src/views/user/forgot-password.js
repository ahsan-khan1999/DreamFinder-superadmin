/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect, useDispatch } from 'react-redux';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { forgotPassword } from 'redux/actions';
import { ForgotAction } from '../../Store/Actions/Auth/Actions';
import { NotificationManager } from 'components/common/react-notifications';
import logo from '../../assets/logos/logo.7c0497cb.png';

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};

const ForgotPassword = ({
  history,
  forgotUserMail,
  loading,
  error,
  forgotPasswordAction,
}) => {
  const [email,setEmail] = useState('');

  // const onForgotPassword = (values) => {
  //   if (!loading) {
  //     if (values.email !== '') {
  //       forgotPasswordAction(values, history);
  //     }
  //   }
  // };
  const dispatch = useDispatch();

  const onForgotPassword =async (values) => {

    if (email !== '') {
      const apiEmail = {
        email_address: email,
      };
      // console.log(apiEmail);
      let res = await dispatch(ForgotAction(apiEmail));
      if (res) {
        NotificationManager.success(
          'Sucess',
          'Reset Email Has Been Sent',
          3000,
          null,
          null,
          ''
        );
        history.push('/user/login');
      } else {
        NotificationManager.error(
          'Error',
          'Forgot Password Error',
          3000,
          null,
          null,
          ''
        );
      }
    } else if (email === '') {
      NotificationManager.error(
        'Error',
        'Please Enter Details',
        3000,
        null,
        null,
        ''
      );
      return;
    } else {
    }
  };
  useEffect(() => {
    if (error) {
      NotificationManager.warning(
        error,
        'Forgot Password Error',
        3000,
        null,
        null,
        ''
      );
    } else if (!loading && forgotUserMail === 'success')
      NotificationManager.success(
        'Please check your email.',
        'Forgot Password Success',
        3000,
        null,
        null,
        ''
      );
  }, [error, forgotUserMail, loading]);

  const initialValues = { email };

  return (
    <Row className="h-100">
      <Colxx xxs="12" md="10" lg="4" className="mx-auto my-auto">
        <Card className="auth-card">
          <div className="form-side">
            <NavLink to="/" className="white">
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
                <img src={logo} alt="" height="70px" width="240px" />
              </span>
            </NavLink>
            <CardTitle className="mb-4">
              <IntlMessages id="user.forgot-password" />
            </CardTitle>

            <Formik initialValues={initialValues} onSubmit={onForgotPassword}>
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
                  <FormGroup className="form-group has-float-label">
                    <Label>
                      <IntlMessages id="user.email" />
                    </Label>
                    <Field
                      className="form-control"
                      name="email"
                      value={email}
                      validate={validateEmail}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && touched.email && (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    )}
                  </FormGroup>

                  <div className="d-flex justify-content-between align-items-center">
                    <NavLink to="/user/login">
                      <IntlMessages id="Login" />
                    </NavLink>
                    <Button
                      style={{ backgroundColor: '#fed000' }}
                      onClick={onForgotPassword}
                      className={`btn-shadow btn-multiple-state ${
                        loading ? 'show-spinner' : ''
                      }`}
                      size="sm"
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">
                        <IntlMessages id="user.reset-password-button" />
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
  const { forgotUserMail, loading, error } = authUser;
  return { forgotUserMail, loading, error };
};

export default connect(mapStateToProps, {
  forgotPasswordAction: forgotPassword,
})(ForgotPassword);
