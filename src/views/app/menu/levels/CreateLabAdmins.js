/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Button, Card, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { getToken } from '../../../../Utils/auth.util';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { doc } from 'prettier';
import { items } from 'data/carouselItems';
import { useDispatch, useSelector } from 'react-redux';
import dot from '../../../../assets/img/dot.png';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';

import { UncontrolledDropdown } from 'reactstrap';
// import './loader.css';
// import eye from '../../../../assets/img/eye.png'
import Loader from 'react-loader-spinner';
import { Formik, useFormik } from 'formik';
import { CreateLabAdmin } from 'Store/Actions/User/LabAdmin/CreateLabAdminAction';
import { NotificationManager } from 'components/common/react-notifications';
import Select from 'react-select';

export default function CreateLabAdmins({ history }) {
  const selectGender = [
    { label: 'Male', value: 'male', key: 1 },
    { label: 'Female', value: 'female', key: 2 },
  ];

  const selectDay = [
    { label: 'Monday', value: 'monday', key: 1 },
    { label: 'Tuesday', value: 'tuesday', key: 2 },
    { label: 'Wednesday', value: 'wednesday', key: 3 },
    { label: 'Thursday', value: 'thursday', key: 4 },
    { label: 'Friday', value: 'friday', key: 5 },
    { label: 'Saturday', value: 'saturday', key: 6 },
    { label: 'Sunday', value: 'sunday', key: 7 },
  ];
  const [selectedOptionsDay, setSelectedOptionsDay] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  let labAdmin_length = useSelector(
    (state) => state?.ViewLabAdminReducer?.labAdmin
  );
  let len = labAdmin_length.length;
  let [loading, setLoading] = useState(false);

  let [confirmPassword, setConfirmPassword] = useState();
  const LabAdmin_obj = {
    email_address: '',

    employee_id: '',
    name: '',
    // password: "alpha",
    password: '',

    gender: '',

    phone_number: '',
    role: {
      user_role_id: 5,
      name: 'laboratory_admin',
      title: 'Laboratory Admin User',
      rights: [],
    },
    // departments: ['1'],
    date_of_birth: '',

    // timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },

    designation: '',
  };
  let [labAdmin, setLabAdmin] = useState(LabAdmin_obj);

  const formikData = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  let deps = [];
  const getDep = async () => {
    let token = await getToken();
    let res = await axios.post(
      'https://dmfr-backend.herokuapp.com/api/v1/department/read',
      {},
      {
        headers: {
          x_session_key: token?.token,
          x_session_type: token?.type,
        },
      }
    );
    for (let i = 0; i < res?.data?.response_data?.department?.length; i++) {
      // console.log(res?.data?.response_data);
      // console.log(res?.data?.response_data?.department[i]?.name)
      deps.push({
        label: `${res?.data?.response_data?.department[i]?.name}`,
        value: `${res?.data?.response_data?.department[i]?.name}`,
        key: `${res?.data?.response_data?.department[i]?.department_id}`,
      });
    }
    return deps;
  };
  // let d = getDep();
  const dispatch = useDispatch();
  const createLabAdmin = async () => {
    setLoading(true);
    if (
      labAdmin?.email_address === '' &&
      labAdmin?.name === '' &&
      labAdmin?.password === '' &&
      labAdmin?.employee_id === '' &&
      labAdmin?.gender === ''
    ) {
      NotificationManager.error(
        'Please Enter Required Field',
        'Error',
        3000,
        null,
        ''
      );
      return;
    } else {
      setLabAdmin({
        ...labAdmin,
        // timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },
      });

      let res = await dispatch(CreateLabAdmin(labAdmin));
      setLoading(false);
      if (res) {
        NotificationManager.success(
          'Lab Admin Added Sucessfully',
          'Sucess',
          3000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewLabAdmin');
      } else if (confirmPassword !== labAdmin.password) {
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
          <IntlMessages id="Create Lab Admin" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik
          initialValues={formikData.initialValues}
          onSubmit={formikData.handleSubmit}
        >
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Employee ID" />
                  </Label>

                  <Input
                    required
                    className="form-control"
                    name="name"
                    type="text"
                    value={labAdmin?.employee_id}
                    onChange={(e) =>
                      setLabAdmin({
                        ...labAdmin,
                        employee_id: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Name" />
                  </Label>

                  <Input
                    required
                    className="form-control"
                    name="name"
                    type="text"
                    value={labAdmin?.name}
                    onChange={(e) =>
                      setLabAdmin({
                        ...labAdmin,
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
                    value={labAdmin.email_address}
                    className="form-control"
                    name="email"
                    type="email"
                    // validate={validate}
                    onChange={(e) =>
                      setLabAdmin({
                        ...labAdmin,
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
                    value={labAdmin?.password}
                    className="form-control"
                    name="password"
                    type="password"
                    // validate={validate}
                    onChange={(e) =>
                      setLabAdmin({ ...labAdmin, password: e.target.value })
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
                    // validate={validate}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {formikData.errors.password ? (
                    <div>{formikData.errors.confirmPassword}</div>
                  ) : null}
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
                      required
                      defaultValue={{
                        label: labAdmin?.gender?.name,
                        value: labAdmin?.gender?.name,
                        key: labAdmin?.gender?.id,
                      }}
                      onChange={(val) =>
                        setLabAdmin({
                          ...labAdmin,
                          gender: { id: val?.key, name: val?.value },
                        })
                      }
                      options={selectGender}
                    />
                  </>
                </FormGroup>
              </Col>
              {/* <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Department" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      defaultValue={{
                        label: labAdmin?.departments?.name,
                        value: labAdmin?.departments?.name,
                        key: labAdmin?.departments?.id,
                      }}
                      onChange={
                        (val) =>
                          setLabAdmin({ ...labAdmin, departments: [val.key] })

                     
                      }
                      options={deps}
                    />
                  </>
                </FormGroup>
              </Col> */}

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Phone Number" />
                  </Label>

                  <Input
                    required
                    value={labAdmin?.phone_number}
                    className="radio-in"
                    name="phone_number"
                    type="number"
                    onChange={(e) =>
                      setLabAdmin({ ...labAdmin, phone_number: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Date Of Birth" />
                  </Label>

                  <Input
                    required
                    value={labAdmin.date_of_birth}
                    className="form-control"
                    name="date_of_birth"
                    type="date"
                    onChange={(e) =>
                      setLabAdmin({
                        ...labAdmin,
                        date_of_birth: e.target.value,
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
                    value={labAdmin.designation}
                    className="form-control"
                    name="designation"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setLabAdmin({ ...labAdmin, designation: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              {/* <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Day" />
                  </label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={selectedOptionsDay}
                    onChange={(val) => setSelectedOptionsDay(val)}
                    options={selectDay}
                  />
                </FormGroup>
              </Col> */}
              {/* <Col lg={6}><FormGroup>
                  <label>
                    <IntlMessages id="Select Timmings From" />
                  </label>
                  <Input
                    value={timeFrom}
                    className="form-control"
                    name="time"
                    type="time"
                    onChange={(e) => setTimeFrom(e.target.value)}
                  />
                </FormGroup>
              </Col> */}
              {/* <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Timmings To" />
                  </label>
                  <Input
                    value={timeTo}
                    className="form-control"
                    name="time"
                    type="time"
                    onChange={(e) => setTimeTo(e.target.value)}
                  />
                </FormGroup>
              </Col> */}
            </Row>

            <Button
              className="btn btn-primary"
              // type="submit"
              onClick={createLabAdmin}
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
            >
              Add Lab Admin
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
