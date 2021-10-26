/* eslint-disable */

import React, { useEffect } from 'react';
import {
  CreateAdminAction,
  ViewAdminAction,
  ViewDepoAction,
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
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';

const selectGender = [
  { label: 'Male', value: 'male', key: 1 },
  { label: 'Female', value: 'female', key: 2 },
  { label: 'Other', value: 'other', key: 3 },
];
export default function CreateDeliveryStaff() {
  let [filterLocationIds, setfilterLocationIds] = useState([]);
  // let filterLocationIds =[]
  let [service_location, setService_location] = useState([]);

  const dispatch = useDispatch();
  const [confirmPassword, setConfirmPassword] = useState('');

  const [array, setArray] = useState(deliveryStaff?.service_location_uid);

  const deliveryStaff_obj = {
    email_address: '',

    name: '',
    password: '',

    gender: '',
    designation: '',

    phone_number: '',
    service_location_uid: array,

    role_uid: '',
    manager_uid: '',
  };
  const [deliveryStaff, setDeliveryStaff] = useState(deliveryStaff_obj);

  let option = [];

  const getServiceLocationUid = async (uid) => {
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/region-classifications/read/territory?child_uid=${uid}`,
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

  const readRoles = () => {
    dispatch(ViewRoleAction());
  };
  useEffect(() => {
    readRoles();
    dispatch(ViewDepoAction());
  }, []);
  const depoManager = useSelector(
    (state) => state?.ViewUserReducer?.depoManager
  );

  const roles = useSelector((state) => state?.ViewUserReducer?.roles);
  let options = [];
  roles?.filter((item) =>
    options.push({ label: item?.name, value: item?.name, key: item?.uid })
  );
  let depoManagerFilter = [];
  depoManager?.filter((item) =>
    depoManagerFilter?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let value = [];

  const handleChange = async (e) => {
    let options = e;
    options?.map((item, index) => {
      value.push(item?.key);
    });
    await setArray(value);
    // await setDeliveryStaff({ ...deliveryStaff, service_location_uid: value });
  };
  const onAdminCreate = async () => {
    console.log(array);
    let test = { ...deliveryStaff, service_location_uid: array };
    console.log(test);
    setDeliveryStaff(test);

    if (
      deliveryStaff?.email_address === '' &&
      deliveryStaff?.name === '' &&
      deliveryStaff?.password === '' &&
      deliveryStaff?.gender === '' &&
      deliveryStaff?.phone_number === '' &&
      deliveryStaff?.designation === '' &&
      deliveryStaff.role_uid === '' &&
      deliveryStaff.manager_uid === '' &&
      deliveryStaff?.service_location_uid === []
    ) {
      console.log(deliveryStaff, 'at  if');

      NotificationManager.error(
        'Please Enter Required Field',
        'Error',
        3000,
        null,
        ''
      );
      return;
    } else {
      // setTimeout(() => {
      // console.log(deliveryStaff,"at  else");

      // }, 5000);
      let res = await dispatch(CreateAdminAction(test));

      if (res) {
        NotificationManager.success(
          'Delivery Staff Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/menu/levels/ViewDeliveryStaff');
      } else if (confirmPassword !== deliveryStaff?.password) {
        NotificationManager.warning(
          'Password Doesnt match',
          'Error',
          3000,
          null,
          ''
        );
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Delivery Staff" />
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
                    value={deliveryStaff.name}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDeliveryStaff({
                        ...deliveryStaff,
                        name: e.target.value,
                      })
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
                    value={deliveryStaff.email_address}
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={(e) =>
                      setDeliveryStaff({
                        ...deliveryStaff,
                        email_address: e.target.value,
                      })
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
                    value={deliveryStaff.password}
                    className="form-control"
                    name="password"
                    type="password"
                    //   validate={validate}
                    onChange={(e) =>
                      setDeliveryStaff({
                        ...deliveryStaff,
                        password: e.target.value,
                      })
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
                        label: deliveryStaff?.gender,
                        value: deliveryStaff?.gender,
                        key: deliveryStaff?.gender,
                      }}
                      onChange={(val) =>
                        setDeliveryStaff({
                          ...deliveryStaff,
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
                    value={deliveryStaff?.phone_number}
                    type="text"
                    className="radio-in"
                    name="phone_number"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setDeliveryStaff({
                        ...deliveryStaff,
                        phone_number: e.target.value,
                      })
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
                    value={deliveryStaff.designation}
                    className="form-control"
                    name="designation"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDeliveryStaff({
                        ...deliveryStaff,
                        designation: e.target.value,
                      })
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
                    onChange={(val) =>
                      setDeliveryStaff({ ...deliveryStaff, role_uid: val?.key })
                    }
                    options={options}
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Depo Manager" />
                  </Label>

                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    // value={gender}

                    onChange={(val) => {
                      setDeliveryStaff({
                        ...deliveryStaff,
                        manager_uid: val.key,
                      });
                      getServiceLocationUid(val?.key);
                    }}
                    options={depoManagerFilter}
                  />
                </FormGroup>
              </Col>
              {/* <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Territory" />
                  </Label>

                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    // value={gender}

                    onChange={(val) => {
                      setDeliveryStaff({
                        ...deliveryStaff,
                        service_location_uid: [val?.key],
                      });
                      // getServiceLocationUid(val?.key);
                    }}
                    options={option}
                  />
                </FormGroup>
              </Col> */}
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Select Teritory</h6>
                  </Label>
                  <Select
                    cacheOptions
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    value={deliveryStaff?.service_location_uid}
                    onChange={(e) => handleChange(e)}
                    options={option}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
              // type="submit"
              // className={`btn-shadow btn-multiple-state ${
              //   loading ? 'show-spinner' : ''
              // }`}
              size="sm"
              onClick={onAdminCreate}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              Add Admin
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
