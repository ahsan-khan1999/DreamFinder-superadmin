/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  CreateAdminAction,
  ViewAdminAction,
  ViewRoleAction,
} from 'Store/Actions/User/UserActions';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import {
  CreateDoctor,
  UpdateDoctorAction,
} from '../../../../Store/Actions/User/Doctor/createDoctorAction';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

const selectGender = [
  { label: 'Male', value: 'male', key: 1 },
  { label: 'Female', value: 'female', key: 2 },
  { label: 'Other', value: 'other', key: 3 },
];
export default function CreateAdmin({ history }) {
  const dispatch = useDispatch();
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState('');
  const admin_obj = {
    email: '',

    username: '',
    password: '',



    role: '',
  };
  const [admin, setAdmin] = useState(admin_obj);

  const readRoles = () => {
    dispatch(ViewRoleAction());
  };
  const readUser = () => {
    // dispatch(ViewAdminAction());
  };
  useEffect(() => {
    // readRoles();
    // readUser();
  }, []);


  const onAdminCreate = async () => {
    if (
      admin?.email === '' ||
      admin?.username === '' ||
      admin?.password === '' ||
      admin.role_uid === ''
    ) {
      NotificationManager.error(
        'Please Enter Required Field',
        'Error',
        3000,
        null,
        ''
      );

      return;
    } else if (confirmPassword !== admin?.password) {
      NotificationManager.warning(
        'Password Doesnt match',
        'Error',
        3000,
        null,
        ''
      );
    } else {
      // console.log(id, 'user uid');
      // setAdmin({ ...admin, role_uid: id });
      // console.log(admin, 'admin');
      setLoadingCreate(true);
      let res = await dispatch(CreateAdminAction({ ...admin }));
      // console.log(res, 'admin create res');

      if (res) {
        NotificationManager.success(
          'Admin Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        setLoadingCreate(false);

        history.push('/app/menu/levels/viewAdmin');
      } else {
        setLoadingCreate(false);
      }
    }
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Admin" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Name" />
                  </Label>

                  <Input
                    required
                    value={admin.name}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setAdmin({ ...admin, username: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Email" />
                  </Label>

                  <Input
                    required
                    value={admin.email_address}
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={(e) =>
                      setAdmin({ ...admin, email: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Password" />
                  </Label>
                  <Input
                    required
                    value={admin.password}
                    className="form-control"
                    name="password"
                    type="password"
                    //   validate={validate}
                    onChange={(e) =>
                      setAdmin({ ...admin, password: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Confirm Password" />
                  </Label>
                  <Input
                    required
                    value={confirmPassword}
                    className="form-control"
                    name="confirm password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormGroup>
              </Col>
              

            

             
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Role" />
                  </Label>
                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    // value={gender}

                    onChange={(val) =>
                      setAdmin({
                        ...admin,
                        role: val?.value,
                      })
                    }
                    options={[
                      {
                        label: 'Admin',
                        value: 'admin',
                        key: '1',
                      },
                      {
                        label: 'User',
                        value: 'user',
                        key: '2',
                      },
                    ]}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              // disabled={loadingCreate ? true : false}
              style={{ backgroundColor: '#fed000' }}
              className={`btn-shadow btn-multiple-state ${
                loadingCreate ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onAdminCreate}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Create Admin</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
