/* eslint-disable */

import { React, useEffect } from 'react';
import axios from 'axios';
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
import { NotificationManager } from 'components/common/react-notifications';
import { CreateAdministratorAction } from 'Store/Actions/User/Administrator/CreateAdministratorAction';

const selectDay = [
  { label: 'Monday', value: 'monday', key: 1 },
  { label: 'Tuesday', value: 'tuesday', key: 2 },
  { label: 'Wednesday', value: 'wednesday', key: 3 },
  { label: 'Thursday', value: 'thursday', key: 4 },
  { label: 'Friday', value: 'friday', key: 5 },
  { label: 'Saturday', value: 'saturday', key: 6 },
  { label: 'Sunday', value: 'sunday', key: 7 },
];
const selectGender = [
  { label: 'Male', value: 'male', key: 1 },
  { label: 'Female', value: 'female', key: 2 },
];
export default function CreateAdministrators({ history }) {
  let deps = [];
  let [loading, setLoading] = useState(false);

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
        label: `${
          res?.data?.response_data?.department[i]?.name.at(0).toUpperCase() +
          res?.data?.response_data?.department[i]?.name.slice(1).toLowerCase()
        }`,

        value: `${res?.data?.response_data?.department[i]?.name}`,
        key: `${res?.data?.response_data?.department[i]?.department_id}`,
      });
      // deps.push({key:`${i}`,label:`${res?.data?.response_data?.department[i]?.name}`},value:`${res?.data?.response_data?.department[i]?.name}`)
      // deps.value.push(res?.data?.response_data?.department[i]?.name)
    }
    // console.log(deps);
    // deps = departments;
    return deps;
  };
  // let d = getDep();

  const [gender, setGender] = useState();
  let administrator_length = useSelector(
    (state) => state?.ViewAdministratorReducer?.administrator
  );
  let len = administrator_length.length;
  // console.log(len);

  const formikData = useFormik({
    initialValues: {
      //   password: doctor_obj?.password,
      //   confirmPassword: confirmPassword,
    },
    // validate: validate,

    onSubmit: (values) => {
      // console.log(values);
    },
  });
  //   useEffect(() => {
  //     let day = selectedOptionsDay?.value;
  //     administrator.timings = { [day]: { from: timeFrom, to: timeTo } };
  //     setAdministrator(administrator);
  //   }, [timeFrom, timeTo]);

  const [selectedOptionsDay, setSelectedOptionsDay] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();

  const administrator_obj = {
    email_address: '',

    employee_id: '',
    name: '',
    // password: "alpha",
    password: '',

    gender: '',

    phone_number: '',
    role: {
      user_role_id: 2,
      name: 'administrator',
      title: 'Administrator User',
      rights: [],
    },
    // departments: ['1'],
    date_of_birth: '',

    // timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },

    designation: '',
  };
  const [confirmPassword, setConfirmPassword] = useState();
  //   console.log(selectedOptionsDay?.value, timeTo, timeFrom);

  let [administrator, setAdministrator] = useState(administrator_obj);
  const dispatch = useDispatch();
  const createAdministrator = async () => {
    setLoading(true);
    // setAdministrator({
    //   ...administrator,
    //   timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },
    // });
    // console.log({
    //   ...administrator,
    //   timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },
    // });

    if (
      administrator?.email_address === '' &&
      administrator?.name === '' &&
      administrator?.password === '' &&
      administrator?.employee_id === '' &&
      administrator?.gender === ''
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
      let res = await dispatch(CreateAdministratorAction(administrator));
      // let res = true;
      setLoading(false);
      if (res) {
        NotificationManager.success(
          'Administrator Added Sucessfully',
          'Error',
          3000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewAdministrator');
      } else if (confirmPassword !== administrator.password) {
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
          <IntlMessages id="Create Administrator" />
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
                    value={administrator?.employee_id}
                    onChange={(e) =>
                      setAdministrator({
                        ...administrator,
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
                    value={administrator?.name}
                    onChange={(e) =>
                      setAdministrator({
                        ...administrator,
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
                    value={administrator?.email_address}
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={(e) =>
                      setAdministrator({
                        ...administrator,
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
                    value={administrator?.password}
                    className="form-control"
                    name="password"
                    type="password"
                    onChange={(e) =>
                      setAdministrator({
                        ...administrator,
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

                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    value={gender}
                    onChange={(val) =>
                      setAdministrator({
                        ...administrator,
                        gender: { id: val?.key, name: val?.value },
                      })
                    }
                    options={selectGender}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Phone Number" />
                  </Label>

                  <Input
                    value={administrator?.phone_number}
                    className="radio-in"
                    type="number"
                    name="phone_number"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setAdministrator({
                        ...administrator,
                        phone_number: e.target.value,
                      })
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
                    value={administrator?.date_of_birth}
                    className="form-control"
                    name="date_of_birth"
                    type="date"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setAdministrator({
                        ...administrator,
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
                    value={administrator.designation}
                    className="form-control"
                    name="designation"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setAdministrator({
                        ...administrator,
                        designation: e.target.value,
                      })
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
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Timmings From" />
                  </label>
                  <Input
                    value={timeFrom}
                    className="form-control"
                    name="time"
                    type="time"
                    // validate={validateEmail}
                    onChange={(e) => setTimeFrom(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Timmings To" />
                  </label>
                  <Input
                    value={timeTo}
                    className="form-control"
                    name="time"
                    type="time"
                    // min={timeFrom}
                    // validate={validateEmail}
                    onChange={(e) => setTimeTo(e.target.value)}
                  />
                </FormGroup>
              </Col> */}
            </Row>

            <Button
              // className="btn btn-primary"
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              type="submit"
              onClick={createAdministrator}
            >
              Add Administrator
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

// <Col lg={6}>
// <FormGroup>
//   <label>
//     <IntlMessages id="Select Department" />
//   </label>

//   <>
//     <Select
//       required
//       components={{ Input: CustomSelectInput }}
//       className="react-select"
//       classNamePrefix="react-select"
//       name="form-field-name-gender"
//       // value={gender}
//       defaultValue={{
//         label: administrator?.departments?.name,
//         value: administrator?.departments?.name,
//         key: administrator?.departments?.id,
//       }}
//       onChange={
//         (val) =>
//           setAdministrator({
//             ...administrator,
//             departments: [val.key],
//           })

//       }
//       options={deps}
//     />

//   </>
// </FormGroup>
// </Col>
