/* eslint-disable */

import { React, useEffect, useMemo } from 'react';
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
const specialityOpt = [
  { id: 1, name: 'surgeon' },
  { id: 2, name: 'neurosurgeon' },
];

import apiServices from 'services/requestHandler';
import axios from 'axios';
import { departmentAction } from 'Store/Actions/Department/departmentAction';

const validate = (values) => {
  const errors = {};
  if (!values.email_address) {
    errors.email = 'Required';
  }
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }

  return errors;
};

const ThirdLevel1 = ({ match, history }) => {
  const selectGender = [
    { label: 'Male', value: 'male', key: 1 },
    { label: 'Female', value: 'female', key: 2 },
  ];
  const CreatedDoctors = useSelector((state) => state?.doctorReducer?.doctor);
  //   console.log(CreatedDoctor);

  let deps = [];
  const dispatch = useDispatch();
  const [gender, setGender] = useState();

  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();

  const [date, setDate] = useState();
  // console.log(gender);
  let specialityArray = [];
  const [day, setDay] = useState();
  // let doctor_lpength = useSelector((state) => state?.viewDoctorReducer?.doctor);

  // let len = doctor_length?.length;
  // console.log(len, 'prev length');
  // useEffect(() => {
  //   len = len + 100;
  //   console.log(len,"updated length");
  // }, [len]);
  const func = async () => {
    let res = await apiServices.getStaticData();
    // console.log(res);
    specialityArray.push(
      res?.data?.response_data?.static_data?.doctor_speciality
    );
    for (
      let i = 0;
      i < res?.data?.response_data?.static_data?.doctor_speciality.length;
      i++
    ) {

      
      specialityArray.push({
        label: `${res?.data?.response_data?.static_data?.doctor_speciality[i]?.name}`,
        value: `${res?.data?.response_data?.static_data?.doctor_speciality[i]?.name}`,
        key: `${res?.data?.response_data?.static_data?.doctor_speciality[i]?.id}`,
      });
    }
  };
  func();
  // console.log(specialityArray, 'log');
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const [show, setShow] = useState(false);
  const [department, setDepartment] = useState();
  const [childData, setChildData] = useState();
  const [slotsData, setSlotsData] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState();
  const departmentsArray = useSelector(
    (state) => state?.DepartmentReducer?.department
  );

  const handleClickButton = (e) => {
    setShow(true);
  };

  // let dep = [];
  //   const depart = async() => {
  //       let res = await apiServices.getDepartment();
  //       console.log(res.data.response_data.department);
  //       let depart = res.data.response_data.department
  //   }
  //   useEffect(() => {
  //     // depart()
  //   }, [])

  // const
  const getDep = async () => {
    // let res = dispatch(departmentAction())
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
    // console.log(res);
    for (let i = 0; i < res?.data?.response_data?.department?.length; i++) {
      deps.push({
        label: `${
          res?.data?.response_data?.department[i]?.name.at(0).toUpperCase() +
          res?.data?.response_data?.department[i]?.name.slice(1).toLowerCase()
        }`,
        value: `${res?.data?.response_data?.department[i]?.name}`,

        key: `${res?.data?.response_data?.department[i]?.department_id}`,
      });
    }
    return deps;
  };
  // const getDepar = async () => {
  //   let d = await getDep();
  //   // console.log(d);

  //   return d;
  // };

  //   console.log(d);

  // getDep();
  // useMemo(() => getDep())
  getDep();
  // useEffect(() => {

  // }, [department]);

  const workingHours = (value) => {
    let error;
    if (!value) {
      error = 'Please enter your Working Hours';
    } else if (value.workingHours < 10 && value.workingHours > 60) {
      error = 'Enter Valid Working Hours';
    } else if (value.breakSlot < 5 && value.breakSlot > 30) {
      error = 'Enter Valid Break Hours';
    }

    return error;
  };
  let [loading, setLoading] = useState(false);

  const formikData = useFormik({
    initialValues: {
      doctor: doctor,
    },
    validate: validate,

    onSubmit: (values) => {
      if (!values) {
        alert('NO email');
      } else {
        onDoctorCreate();
      }
      // console.log(values);
    },
  });

  const onDoctorCreate = async () => {
    setLoading(true);
    if (
      doctor?.email_address === '' &&
      doctor?.name === '' &&
      doctor?.password === '' &&
      doctor?.employee_id === '' &&
      doctor?.gender === ''
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
      let res = await dispatch(CreateDoctor({ ...doctor }));
      // console.log(res, 'doctor create res');
      setLoading(false);

      if (res === 'success') {
        NotificationManager.success(
          'Doctor Added Sucessfully',
          'Error',
          3000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewDoctor');
      } else if (confirmPassword !== doctor.password) {
        NotificationManager.warning(
          'Password Doesnt match',
          'Error',
          3000,
          null,
          ''
        );
      }
    }

    // NotificationManager.warning(CreatedDoctors , 3000, null, null, '');
  };
  // console.log(departmentsArray);
  const doctor_obj = {
    email_address: '',

    employee_id: '',
    name: '',
    // password: "alpha",
    password: '',

    gender: '',

    phone_number: '',
    role: {
      user_role_id: 4,
      name: 'doctor',
      title: 'Doctor User',
      rights: [],
    },
    departments: ['1'],
    date_of_birth: '',

    timings: [],

    slots: [],
    speciality: '',
    designation: '',
  };

  const [doctor, setDoctor] = useState(doctor_obj);
  const [arraySlot, setarraySlot] = useState([]);

  const clickHandler = (data, day, timeFrom, timeTo) => {
    if (data === undefined) {
      return;
    } else if (data?.length === 0) {
      return;
    } else {
      arraySlot.push({ [day]: data });

      // console.log(arraySlot, 'array slotsdata');
      setSlotsData(arraySlot);

      setDay(day);
      doc(day, timeFrom, timeTo);
      // console.log(slotsData, 'slotsdata');
      let obj = {};
      arraySlot?.map((item) => {
        obj = { ...obj, ...item };
      });
      // console.log(obj, 'array');

      setDoctor({ ...doctor, slots: obj });
    }
  };

  const doc = (day, timeFrom, timeTo) => {
    (doctor.timings = { [day]: { from: timeFrom, to: timeTo } }),
      setDoctor(doctor);
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Doctor" />
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
                    value={doctor?.employee_id}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctor({ ...doctor, employee_id: e.target.value })
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
                    value={doctor.name}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctor({ ...doctor, name: e.target.value })
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
                    value={doctor.email_address}
                    className="form-control"
                    name="email"
                    type="email"
                    // validate={validate}
                    onChange={(e) =>
                      setDoctor({ ...doctor, email_address: e.target.value })
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
                    value={doctor.password}
                    className="form-control"
                    name="password"
                    type="password"
                    validate={validate}
                    onChange={(e) =>
                      setDoctor({ ...doctor, password: e.target.value })
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
                    validate={validate}
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
                      defaultValue={{
                        label: doctor?.gender?.name,
                        value: doctor?.gender?.name,
                        key: doctor?.gender?.id,
                      }}
                      onChange={(val) =>
                        setDoctor({
                          ...doctor,
                          gender: { id: val?.key, name: val?.value },
                        })
                      }
                      options={selectGender}
                    />
                  </>
                </FormGroup>
              </Col>
              <Col lg={6}>
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
                      // value={gender}
                      defaultValue={{
                        label: doctor?.departments?.name,
                        value: doctor?.departments?.name,
                        key: doctor?.departments?.id,
                      }}
                      onChange={(val) => {
                        // console.log(val);
                        setDoctor({ ...doctor, departments: [val?.key] });
                      }}
                      options={deps}
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
                    value={doctor?.phone_number}
                    type="number"
                    className="radio-in"
                    name="phone_number"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setDoctor({ ...doctor, phone_number: e.target.value })
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
                    value={doctor.date_of_birth}
                    className="form-control"
                    name="date_of_birth"
                    type="date"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctor({ ...doctor, date_of_birth: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Speciality" />
                  </label>
                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    // value={gender}
                    defaultValue={{
                      name: doctor?.speciality?.name,
                      label: doctor?.speciality?.name,

                      key: doctor?.speciality?.id,
                    }}
                    onChange={(val) => {
                      // console.log(val, 'value spec');
                      setDoctor({
                        ...doctor,
                        speciality: { id: Number(val?.key), name: val?.value },
                      });
                    }}
                    options={specialityArray}
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
                    value={doctor.designation}
                    className="form-control"
                    name="designation"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctor({ ...doctor, designation: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
              style={{ 'background-color': '#003766' }}
              // type="submit"
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onDoctorCreate}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              Add Doctor
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />

        <ModalExample buttonLabel="Add Slots" clickHandler={clickHandler} />

        <div
          className="table-form" /*style={{display: !thisView ? "none" : ""}}*/
        >
          <Table
            style={{
              display: slotsData?.length === 0 ? 'none' : '',
              marginTop: '20px',
            }}
          >
            <thead>
              <tr>
                <th>Day</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {/* {console.log(slotsData)} */}
              {slotsData?.map((item, index) => (
                <>
                  {/* {console.log(item)} */}
                  {Object.values(item)?.map((_item) => {
                    {
                      return _item?.map((item3, index) => (
                        <tr>
                          {/* {Object.keys(item)[index] === Object.keys(item)[index++] ? '' : <td>{Object.keys(item)[index]}</td>} */}
                          <td>{Object.keys(item)}</td>

                          <td>{item3?.from}</td>

                          <td>{item3?.to}</td>

                          {/* {<td>{_item[index]?.from}</td>}
                          {<td>{_item[index]?.to}</td>} */}
                          {/* <td>{_item[index]?.from}</td>
                          <td>{_item[index]?.to}</td> */}

                          {/* <td>{item3?.from}</td> */}
                        </tr>
                      ));
                    }
                  })}
                </>
              ))}
              {/* {slotsData?.map((item, index) => {
                console.log(slotsData?.length);
                slotsData?.length > 0
                  ? (console.log(item, index),
                    console.log(Object.keys(item)[index]),
                    Object.values(item)?.map((item,index) =>
                      console.log(item?.from)
                    ),
                    Object.values(item)?.map((item,index) =>
                      console.log(item?.to)
                    ))
                  : '';
              })} */}
            </tbody>
          </Table>
        </div>

        <div></div>
      </CardBody>
    </Card>
  );
};
export default ThirdLevel1;

// {thisView ? "" : (
//   <Button
//     className="btn btn-primary"
//     type="submit"
//     onClick={confirmEdit}
//   >
//     Edit Doctor
//   </Button>
// )}

// {slotsData?.map((item) => {

//   return (
//     <tr>
//       <td>{day}</td>

//       <td>{item?.from}</td>

//       <td>{item?.to}</td>
//     </tr>
//   );
// })}

// {console.log(_item[index]?.from)}
// {console.log(_item[index]?.to)}
