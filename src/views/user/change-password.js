/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
/* eslint-disable */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import { useFormik } from 'formik';
import { ChangePasswordFromSuperAdmin } from 'Store/Actions/Auth/Actions';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Card, CardTitle, Label, FormGroup } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { NavLink } from 'react-router-dom';

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
const ChangePasswordModelSuperAdmin = (props) => {
  const [loading, setLoading] = useState(false);
  const changePasswordFormik = useFormik({
    initialValues: {
      new_password: '',
      new_password_next: '',
    },
    // validateChangePassword,
    validate,
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  const { buttonLabel, className, clickHandler } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const dispatch = useDispatch();
  const onResetPassword = async (values) => {
    // console.log(props);
    setLoading(true);
    const apiData = {
      email_address: props?.data,

      new_password: changePasswordFormik.values.new_password,
    };
    if (
      changePasswordFormik.values.new_password !==
      changePasswordFormik.values?.new_password_next
    ) {
      setLoading(true);

      NotificationManager.error(
        'Password Does not match ',
        'Error',
        5000,
        null,
        ''
      );
      setLoading(false);
      props?.handleClose();

      return;
    } else {
      setLoading(true);

      let res = await dispatch(ChangePasswordFromSuperAdmin(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Changed The Password',
          'Success',
          5000,
          null,
          ''
        );
        setLoading(false);

        props?.handleClose();
      }
      props?.handleClose();
    }
  };

  return (
    <div>
      {/* <Button color="btn btn-secondary" onClick={toggle}></Button> */}

      <Row className="h-100">
        <Colxx xxs="12" md="12" className="mx-auto my-auto">
          {/* <Card className="auth-card"> */}
          <div className="form-side" style={{ width: '100%' }}>
            <Formik
              validate={validate}
              initialValues={changePasswordFormik.initialValues}
              onSubmit={changePasswordFormik.handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="av-tooltip tooltip-label-bottom">
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
                    {/* {errors.new_password_next &&
                        touched.new_password_next && (
                          <div className="invalid-feedback d-block">
                            {errors.newPasswordAgain}
                          </div>
                        )} */}
                  </FormGroup>

                  <div className="d-flex justify-content-center align-items-center">
                    <Button
                      style={{
                        marginTop: '5px',
                        'background-color': '#0066B3',
                      }}
                      onClick={onResetPassword}
                      color="primary"
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
                        <IntlMessages id="Change Password" />
                      </span>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {/* </Card> */}
        </Colxx>
      </Row>
    </div>
  );
};

export default ChangePasswordModelSuperAdmin;
