/* eslint-disable */

import React, { useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardTitle,
  Label,
  FormGroup,
  Button,
  Input,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { resetPassword } from 'redux/actions';
import { NotificationManager } from 'components/common/react-notifications';
import { useFormik } from 'formik';
import { ChangePasswordAction } from '../../Store/Actions/Auth/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { getToken, getUser } from 'Utils/auth.util';
import { setUserFromLocal } from 'Store/Actions/Auth/Actions';

const validate = (values) => {
  const errors = {};

  if (!values.old_password) {
    errors.old_password = 'Required';
  }
  if (!values.new_password) {
    errors.new_password = 'Required';
  }
  if (!values.new_password_next) {
    errors.new_password_next = 'Required';
  }
  if (values.new_password != values.new_password_next) {
    errors.new_password = "Password Does'nt match";
  }
  return errors;
};
const ResetPassword = ({
  location,
  history,
  loading,
  setModal,
  error,
  handleClose,
  resetPasswordAction,
}) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.logIn?.user);

  // const dispatch = useDispatch()

  const userId = useSelector((state) => state?.logIn?.user?.id);
  useEffect(async () => {
    let token = await getToken();
    let user = await getUser();
    dispatch(setUserFromLocal(user));
    if (user === null || user === undefined) {
    } else {
    }
  }, []);
  // const [newPassword] = useState('');
  // const [newPasswordAgain] = useState('');
  // console.log(user);
  // setId(user);

  // useEffect(() => {
  //   if (error) {
  //     NotificationManager.warning(
  //       error,
  //       'Forgot Password Error',
  //       3000,
  //       null,
  //       null,
  //       ''
  //     );
  //   } else if (!loading && newPassword === 'success')
  //     NotificationManager.success(
  //       'Please login with your new password.',
  //       'Reset Password Success',
  //       3000,
  //       null,
  //       null,
  //       ''
  //     );
  // }, [error, loading]);

  const onResetPassword = async (values) => {
    if (
      changePasswordFormik?.values?.new_password.length > 3
      
    ) {
      const apiData = {
        email_address: user?.email_address,

        new_password: changePasswordFormik?.values?.new_password,
      };

      let res = await dispatch(ChangePasswordAction(apiData));
      // console.log(res);
      if (res) {
        NotificationManager.success(
          'Password has been successfully changed',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/user/login')
      } else {
        NotificationManager.error(
          'Password has not been changed ',
          'Error',
          5000,
          null,
          ''
        );
      }
      // setModal(false);
      handleClose(true);
    } else {
      NotificationManager.error(
        'Password Does Not Match ',
        'Error',
        5000,
        null,
        ''
      );
      // setModal(false);
      handleClose(true);
    }
  };
  const changePasswordFormik = useFormik({
    initialValues: {
      old_password: '',
      new_password: '',
      new_password_next: '',
    },
    // validateChangePassword,
    validate,
    onSubmit: (values) => {
      // console.log(values);
    },
  });

  // const initialValues = { newPassword, newPasswordAgain };

  return (
    <div className="form-side">
      <Formik
        validate={validate}
        initialValues={changePasswordFormik.initialValues}
        onSubmit={changePasswordFormik.handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <FormGroup className="form-group has-float-label">
              <Label>Enter Old Password</Label>
              <Input
                style={{ width: '100%' }}
                type="password"
                name="old_password"
                value={changePasswordFormik.values.old_password}
                onChange={changePasswordFormik.handleChange}
              />
              {changePasswordFormik.errors.old_password ? (
                <div>{changePasswordFormik.errors.old_password}</div>
              ) : null}
            </FormGroup>
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="Enter New Password" />
              </Label>
              <Field
                className="form-control"
                name="new_password"
                type="password"
                value={changePasswordFormik.values.new_password}
                onChange={changePasswordFormik.handleChange}
              />
            </FormGroup>
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="Enter New Password Again" />
              </Label>
              <Field
                className="form-control"
                name="new_password_next"
                type="password"
                value={changePasswordFormik.values.new_password_next}
                onChange={changePasswordFormik.handleChange}
              />
              {errors.new_password_next && touched.new_password_next && (
                <div className="invalid-feedback d-block">
                  {errors.newPasswordAgain}
                </div>
              )}
            </FormGroup>

            <div className="d-flex justify-content-between align-items-center">
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Button
                  onClick={onResetPassword}
                  color="primary"
                  style={{
                    'background-color': '#0066B3',
                  }}
                  className={`btn-shadow btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
                  size="md"
                >
                  <span className="label">
                    <IntlMessages id="Change Password" />
                  </span>
                </Button>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = ({ authUser }) => {
  const { newPassword, resetPasswordCode, loading, error } = authUser;
  return { newPassword, resetPasswordCode, loading, error };
};

export default connect(mapStateToProps, {
  resetPasswordAction: resetPassword,
})(ResetPassword);
