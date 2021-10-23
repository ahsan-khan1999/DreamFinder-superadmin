/* eslint-disable */

import { React, useEffect } from 'react';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import leftArrow from '../../../../assets/logos/leftArrow.svg';

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

import apiServices from 'services/requestHandler';
import axios from 'axios';
import ChangePasswordModal from './ChangePasswordModal';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required';
  }

  if (values.password != values.confirmPassword) {
    errors.password = "Password Does'nt match";
  }
  return errors;
};

const ViewCurrentDoctor = ({ match, history }) => {
  const selectGender = [
    { label: 'Male', value: 'male', key: 1 },
    { label: 'Female', value: 'female', key: 2 },
  ];

  let deps = [];
  const dispatch = useDispatch();
  const [gender, setGender] = useState();
  const [selectedOptionsDay, setSelectedOptionsDay] = useState();

  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();

  const [date, setDate] = useState();
  // console.log(gender);

  const [day, setDay] = useState();
  const selectDay = [
    { label: 'Monday', value: 'monday', key: 1 },
    { label: 'Tuesday', value: 'tuesday', key: 2 },
    { label: 'Wednesday', value: 'wednesday', key: 3 },
    { label: 'Thursday', value: 'thursday', key: 4 },
    { label: 'Friday', value: 'friday', key: 5 },
    { label: 'Saturday', value: 'saturday', key: 6 },
    { label: 'Sunday', value: 'sunday', key: 7 },
  ];

  // console.log(gender);
  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const [department, setDepartment] = useState();
  const [childData, setChildData] = useState();
  const [slotsData, setSlotsData] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState();
  let currentDoctor = useSelector(
    (state) => state?.viewCurrentDoctorIsEdit?.currentDoctor
  );
  let view = useSelector((state) => state?.viewCurrentDoctorIsEdit?.view);
  let edit = useSelector((state) => state?.viewCurrentDoctorIsEdit?.isEdit);
  let [thisView, setThisView] = useState(view);

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
        key: i,
      });
      // deps.push({key:`${i}`,label:`${res?.data?.response_data?.department[i]?.name}`},value:`${res?.data?.response_data?.department[i]?.name}`)
      // deps.value.push(res?.data?.response_data?.department[i]?.name)
    }
    // console.log(deps);
    // deps = departments;
    return deps;
  };

  let d = getDep();

  const formikData = useFormik({
    initialValues: {
      password: doctor_obj?.password,
      confirmPassword: confirmPassword,
    },
    validate: validate,

    onSubmit: (values) => {
      // console.log(values);
    },
  });
  let [prevSlots, setPrevSlots] = useState([]);

  const doctor_obj = {
    email_address: currentDoctor?.email_address,

    employee_id: currentDoctor?.employee_id,
    name: currentDoctor?.name,
    // password: "alpha",
    password: currentDoctor?.password,

    gender: currentDoctor?.gender,

    phone_number: currentDoctor?.phone_number,
    role: {
      user_role_id: 4,
      name: 'doctor',
      title: 'Doctor User',
      rights: [],
    },
    departments: ['1'],
    // departments: String(currentDoctor?.departments?.id),

    date_of_birth: currentDoctor?.date_of_birth,

    timings: currentDoctor?.timings,
    slots: [],
    // slots: ,
    speciality: {
      id: 1,
      name: 'surgeon',
    },
    designation: currentDoctor?.designation,
    id: currentDoctor?.id,
    state: currentDoctor?.state,
  };

  let [buttonName, setButtonName] = useState();

  const suspandDoctor = async () => {
    if (currentDoctor?.state?.name === 'suspended') {
      // setButtonName("Active")
      // setDoctor({ ...doctor, state: { id: 3, name: 'active' } });
      let res = await dispatch(
        UpdateDoctorAction({ ...doctor, state: { id: 1, name: 'active' } })
      );
      if (res) {
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewDoctor');
      } else {
        NotificationManager.error(
          'Error active This Doctor',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      // setButtonName("Suspend")

      let res = await dispatch(
        UpdateDoctorAction({ ...doctor, state: { id: 3, name: 'suspended' } })
      );
      if (res) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewDoctor');
      } else {
        NotificationManager.error(
          'Error Suspanding This Doctor',
          'Error',
          5000,
          null,
          ''
        );
      }
    }
    //  setStatusUpdate()

    // console.log(doctor?.password);
  };
  const [title, setTitle] = useState('View Doctor');
  let [loading, setLoading] = useState(false);

  const [doctor, setDoctor] = useState(doctor_obj);
  useEffect(() => {
    if (currentDoctor?.length === 0) {
      history.push('/app/menu/levels/viewDoctor');
    }
    setSlotsData(currentDoctor.slots);
    if (currentDoctor?.state?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentDoctor?.state?.name === 'active') {
      setButtonName('Suspend');
    }
  }, []);
  function editProfile() {
    // console.log(currentDoctor?.departments, 'deps');

    setTitle('Edit Profile');
    setSlotsData(currentDoctor.slots);

    // view=false
    setThisView(false);
  }
  // console.log(thisView);

  async function confirmEdit() {
    setLoading(true);

    // console.log(slotsData);
    setDoctor({ ...doctor, slots: slotsData });

    let res = await dispatch(
      UpdateDoctorAction({
        ...doctor,
        slots: slotsData,
        timings: { ...currentDoctor?.timings, ...doctor?.timings },
      })
    );
    setLoading(false);

    if (res) {
      NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
      history.push('/app/menu/levels/viewDoctor');
    } else {
      NotificationManager.error('Edit Failour', 3000, null, null, '');
    }
  }
  // console.log(currentDoctor?.slots);
  const clickHandler = (data, day, timeFrom, timeTo) => {
    setPrevSlots(currentDoctor.slots);
    // setSlotsData([{ [day]: data }]);
    setSlotsData({ ...slotsData, [day]: data });
    // doctor.slots[...]
    setDay(day);
    doc(day, timeFrom, timeTo);
    setDoctor({ ...doctor, slots: { [day]: data } });
  };
  const doc = (day, timeFrom, timeTo) => {
    (doctor.timings = { [day]: { from: timeFrom, to: timeTo } }),
      setDoctor(doctor);
  };

  const handleChangeToView = () => {
    history.push('/app/menu/levels/viewDoctor');
  };
  // console.log(doctor.slots);
  // console.log(slotsData);
  {
    /* <img
              src={leftArrow}
              height="15px"
              width="20px"
              style={{ marginRight: '20px' }}
            /> */
  }
  // console.log(slotsData);
  // const [filteredSlots, setFilteredSlots] = useState();
  let filteredSlots = [];
  const filterSlots = (day) => {
    // var day = 'monday'
    // setFilteredSlots(slotsData['monday']);
    return slotsData[day?.value];
  };
  // console.log(selectedOptionsDay?.value);
  filteredSlots = filterSlots(selectedOptionsDay);

  // console.log(filteredSlots);
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <Button
              className="btn-btn-secondary"
              onClick={handleChangeToView}
              style={{ marginRight: '20px',  'background-color': '#003766' }}

            >
              Back
            </Button>
            <IntlMessages id={title} />
          </CardTitle>

          <Formik initialValues={formikData.initialValues}>
            <Form>
              <Row className="h-100">
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Employee ID</h6>
                    </Label>
                    {thisView ? (
                      <span>
                        <p>{doctor?.employee_id}</p>
                      </span>
                    ) : (
                      <Input
                        disabled
                        value={doctor?.employee_id}
                        className="form-control"
                        name="name"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setDoctor({ ...doctor, employee_id: e.target.value })
                        }
                      />
                    )}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Name</h6>
                    </Label>
                    {thisView ? (
                      <span>
                        <p>{doctor.name}</p>
                      </span>
                    ) : (
                      <Input
                        value={doctor.name}
                        className="form-control"
                        name="name"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setDoctor({ ...doctor, name: e.target.value })
                        }
                      />
                    )}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Email</h6>
                    </Label>
                    {thisView ? (
                      <span>
                        <p>{doctor.email_address}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        value={doctor.email_address}
                        disabled
                        className="form-control"
                        name="email"
                        type="email"
                        validate={validate}
                        onChange={(e) =>
                          setDoctor({
                            ...doctor,
                            email_address: e.target.value,
                          })
                        }
                      />
                    )}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <label>
                      <h6>Gender</h6>
                    </label>
                    {thisView ? (
                      <span>
                        <p>{currentDoctor?.gender?.name}</p>
                      </span>
                    ) : (
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
                    )}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Phone Number</h6>
                    </Label>
                    {thisView ? (
                      <span>
                        <p>{currentDoctor?.phone_number}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        disabled
                        value={doctor.phone_number}
                        className="radio-in"
                        type="number"
                        name="phone_number"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setDoctor({ ...doctor, phone_number: e.target.value })
                        }
                      />
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Date Of Birth</h6>
                    </Label>
                    {thisView ? (
                      <span>
                        <p>{doctor?.date_of_birth}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        value={doctor?.date_of_birth}
                        className="form-control"
                        name="date_of_birth"
                        type="date"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setDoctor({
                            ...doctor,
                            date_of_birth: e.target.value,
                          })
                        }
                      />
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Designation</h6>
                    </Label>
                    {thisView ? (
                      <span>
                        <p>{currentDoctor?.designation}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        value={doctor?.designation}
                        className="form-control"
                        name="designation"
                        type="text"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setDoctor({ ...doctor, designation: e.target.value })
                        }
                      />
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <label>
                      <h6>Department</h6>
                    </label>
                    {}
                    {thisView ? (
                      <span>
                        <p>
                          {currentDoctor?.departments[0]?.name
                            ?.at(0)
                            .toUpperCase() +
                            currentDoctor?.departments[0]?.name
                              .slice(1)
                              .toLowerCase()}
                        </p>
                      </span>
                    ) : (
                      <>
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          // value={gender}

                          defaultValue={{
                            label:
                              currentDoctor?.departments?.length > 0
                                ? currentDoctor?.departments[0]?.name
                                : '',
                            value:
                              currentDoctor?.departments?.length > 0
                                ? currentDoctor?.departments[0]?.name
                                : '',
                            key:
                              currentDoctor?.departments?.length > 0
                                ? currentDoctor?.departments[0]?.id
                                : '',
                          }}
                          onChange={
                            (val) =>
                              setDoctor({
                                ...doctor,
                                departments: `${val.key}`,
                              })

                            //   setDoctor({
                            //     ...doctor,
                            //     departments: { id: val.key, name: val.label },
                            //   })
                          }
                          options={deps}
                        />

                        {/* {console.log(administrator?.departments)} */}
                      </>
                    )}
                  </FormGroup>
                </Col>
              </Row>

              {thisView ? (
                <span>
                  <h6>Status</h6>
                  <p
                    style={{
                      color:
                        currentDoctor?.state?.name === 'active'
                          ? 'green'
                          : 'red',
                    }}
                  >
                    {currentDoctor?.state?.name?.toUpperCase()}
                  </p>
                </span>
              ) : (
                ''
              )}

              {/* (
                  <Button
                    className="btn btn-primary"
                    type="submit"
                    onClick={onDoctorCreate}
                  >
                    Add Doctor
                  </Button>
                )  */}
              {/* <Button type="submit" onClick={handleClickButton}>Add Slots</Button>
              <div style={{marginTop:"30px"}}></div>

              {
                show === true ? <AdvancedSearch /> : null
              }
               */}
            </Form>
          </Formik>
          <div style={{ marginTop: '30px' }} />
          {thisView ? (
            <span>
              <p></p>
            </span>
          ) : (
            <ModalExample buttonLabel="Add Slots" clickHandler={clickHandler} />
          )}

          <div style={{ marginBottom: '30px' }} />
          <div style={{ marginBottom: '30px' }}>
            {thisView === true ? (
              <Button
                className="btn btn-primary"
                onClick={editProfile}
                style={{ marginRight: '5px', 'background-color': '#003766' }}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                className="btn btn-primary"
                // style={{'background-color': '#003766'}}
                className={`btn-shadow btn-multiple-state ${
                  loading ? 'show-spinner' : ''
                }`}
                size="sm"
                onClick={confirmEdit}
                style={{ marginRight: '5px', 'background-color': '#003766' }}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                Save Changes
              </Button>
            )}

            {thisView ? (
              <Button
                style={{  'background-color': '#003766',marginRight:"5px" }}
                // className="btn btn-primary"
                onClick={suspandDoctor}
                className={`btn-shadow btn-multiple-state ${
                  loading ? 'show-spinner' : ''
                }`}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                {buttonName}
              </Button>
            ) : (
              ''
            )}

            {thisView ? (
              <Button
                className="btn btn-primary"
                onClick={showModal}
                style={{ marginLeft: '0px', 'background-color': '#003766' }}
              >
                Change Password
              </Button>
            ) : (
              ''
            )}
          </div>
          <div>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <h6>Select Day</h6>
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
            </Row>
          </div>
          <div>
            {filteredSlots?.length > 0 ? (
              <Table>
                <thead>
                  <tr>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredSlots?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.from}</td>
                        <td>{item?.to}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              'No Slots For This Day'
            )}
          </div>
        </CardBody>
      </Card>
      <ChangePasswordModal
        show={show}
        handleClose={hideModal}
        data={currentDoctor?.id}
      />
    </>
  );
};
export default ViewCurrentDoctor;
{
  /* <tr>
                          <td>item</td>

                          <td>{item1.from}</td>

                          <td>{console.log(item1?.to)}</td>
                        </tr> */
}

// {thisView ? "" : (
//   <Button
//     className="btn btn-primary"
//     type="submit"
//     onClick={confirmEdit}
//   >
//     Edit Doctor
//   </Button>
// )}

// ?.length > 0 ? (
//   <tr>
//     {console.log(slotsData[item][index]?.from)}
//     {/* <td>{console.log(item)}</td>

//     <td>{console.log(slotsData[item][0].from)}</td>

//     <td>{console.log(slotsData[item][0].to)}</td> */}
//   </tr>
// ) : (
//   ''
// );
// Object?.keys(slotsData)?.map((item) => {
//   return slotsData[item]?.length > 0
//     ? slotsData[item]?.map((item1) => {
//         return (
//           <div>
//             {/* <span>{item}</span>
//           <span>{item1?.from}</span>
//           <span>{item1?.to}</span> */}
//           </div>
//         );
//       })
//     : '';
// });

// <div
// className="table-form" /*style={{display: !thisView ? "none" : ""}}*/
// >
// <Table>
//   <thead>
//     <tr>
//       <th>Day</th>
//       <th>From</th>
//       <th>Too</th>
//     </tr>
//   </thead>
//   <tbody>
//     {Object?.keys(slotsData)?.map((item) => {
//       return slotsData[item]?.length > 0
//         ? slotsData[item]?.map((item1) => {
//             return (
//               <tr>
//                 <td>{item}</td>
//                 <td>{item1?.from}</td>
//                 <td>{item1?.to}</td>
//               </tr>
//             );
//           })
//         : '';
//     })}
//   </tbody>
// </Table>
// </div>
