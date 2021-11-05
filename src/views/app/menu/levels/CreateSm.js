/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  CreateAdminAction,
  CreateSmAction,
  ViewAdminAction,
  ViewDirectorAction,
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
import { getToken } from '../../../../Utils/auth.util';
import BestSellers from 'containers/dashboards/BestSellers';
import AdvancedSearch from 'containers/dashboards/AdvancedSearch';
import { Link, NavLink } from 'react-router-dom';
import products from '../../../../data/products';
import AddNewSurveyModal from 'containers/applications/AddNewSurveyModal';
import AddNewModal from 'containers/pages/AddNewModal';
import AddNewTodoModal from 'containers/applications/AddNewTodoModal';
import ModalExample from './ModelTo';
import data from 'data/notifications';
import { object } from 'prop-types';
import { objectOf } from 'prop-types';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const selectGender = [
  { label: 'Male', value: 'male', key: 1 },
  { label: 'Female', value: 'female', key: 2 },
  { label: 'Other', value: 'other', key: 3 },
];
export default function CreateDirector({ history }) {
  const dispatch = useDispatch();
  let [service_location, setService_location] = useState([]);

  const [confirmPassword, setConfirmPassword] = useState('');
  const admin_obj = {
    email_address: '',

    name: '',
    // password: "alpha",
    password: '',

    gender: '',
    designation: '',

    phone_number: '',

    role_uid: '',
    manager_uid: '',
    service_location_uid: [],
  };
  const [admin, setAdmin] = useState(admin_obj);
  const [array, setArray] = useState(admin?.service_location_uid);

  const readRoles = () => {
    dispatch(ViewRoleAction());
  };
  const readUser = () => {
    dispatch(ViewDirectorAction());
  };
  useEffect(() => {
    readRoles();
    readUser();
  }, []);
  const roles = useSelector((state) => state?.ViewUserReducer?.roles);
  const user = useSelector((state) => state?.ViewUserReducer?.director);

  let options = [];
  roles?.filter((item) =>
    options.push({ label: item?.name, value: item?.name, key: item?.uid })
  );

  let directorFilter = [];
  user?.filter((item) =>
    directorFilter?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let option = [];
  let value = [];

  const handleChange = async (e) => {
    let options = e;
    options?.map((item, index) => {
      value.push(item?.key);
    });
    let test = { ...admin, service_location_uid: value };
    setAdmin(test)
  };
  const [loading, setLoading] = useState(false);

  const onAdminCreate = async () => {
    setLoading(true);
    // let test = { ...admin, service_location_uid: array };

    if (
      admin?.email_address === '' ||
      admin?.name === '' ||
      admin?.password === '' ||
      admin?.gender === '' ||
      admin?.phone_number === '' ||
      admin?.designation === '' ||
      admin.role_uid === '' ||
      admin?.service_location_uid === []
    ) {
      NotificationManager.error(
        'Please Enter Required Field',
        'Error',
        3000,
        null,
        ''
      );
      setLoading(false);

      return;
    } else {
      setLoading(true);

      let res = await dispatch(CreateSmAction(admin));
      // console.log(test);
      if (res) {
        NotificationManager.success(
          'User Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        setLoading(false);

        history.push('/app/menu/levels/viewSm');
      } else if (confirmPassword !== admin?.password) {
        NotificationManager.warning(
          'Password Doesnt match',
          'Error',
          3000,
          null,
          ''
        );
        setLoading(false);
      } else {
        setLoading(false);
      }
    }
  };
  const getServiceLocationUid = async (uid) => {
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/region-classifications/read/region?child_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );
    setService_location(response?.data?.response_data);
  };
  service_location?.filter((item) =>
    option?.push({ label: item?.name, value: item?.name, key: item?.uid })
  );
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Sales Manager" />
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
                    value={admin?.name}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setAdmin({ ...admin, name: e.target.value })
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
                    value={admin?.email_address}
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={(e) =>
                      setAdmin({ ...admin, email_address: e.target.value })
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
                    value={admin?.password}
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
                  <label>
                    <IntlMessages id="Select Gender" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      // value={gender}
                      defaultValue={{
                        label: admin?.gender,
                        value: admin?.gender,
                        key: admin?.gender,
                      }}
                      onChange={(val) =>
                        setAdmin({
                          ...admin,
                          gender: val?.value,
                        })
                      }
                      options={selectGender}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Phone Number" />
                  </Label>

                  <Input
                    required
                    value={admin?.phone_number}
                    type="text"
                    className="radio-in"
                    name="phone_number"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setAdmin({ ...admin, phone_number: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Designation" />
                  </Label>

                  <Input
                    required={true}
                    value={admin?.designation}
                    className="form-control"
                    name="designation"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setAdmin({ ...admin, designation: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Role" />
                  </Label>

                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    // value={gender}

                    onChange={(val) =>
                      setAdmin({ ...admin, role_uid: val?.key })
                    }
                    options={options}
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Director" />
                  </Label>

                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    // value={gender}

                    onChange={(val) => {
                      setAdmin({
                        ...admin,
                        manager_uid: val.key,
                      });
                      getServiceLocationUid(val.key);
                    }}
                    options={directorFilter}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Area" />
                  </Label>
                  <Select
                    cacheOptions
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    // value={admin?.service_location_uid}
                    onChange={(e) => handleChange(e)}
                    options={option}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              // className="btn btn-primary"
              disabled={loading ? true : false}
              style={{ backgroundColor: '#0066B3' }}
              // type="submit"
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onAdminCreate}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Add SM</span>
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
