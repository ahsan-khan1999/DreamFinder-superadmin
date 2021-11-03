/* eslint-disable */

import { React, useState, useEffect } from 'react';
import {
  Row,
  Card,
  CardBody,
  CardTitle,
  Col,
  FormGroup,
  Table,
} from 'reactstrap';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Formik, Form, Field, useFormik } from 'formik';
import { Label, Button, Input } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  CreateAdministratorAction,
  UpdateAdministratorAction,
} from 'Store/Actions/User/Administrator/CreateAdministratorAction';
import { NotificationManager } from 'components/common/react-notifications';
import { getToken } from 'Utils/auth.util';
import ChangePasswordModal from './ChangePasswordModal';

const ThirdLevel3 = ({ match, history }) => {
  const [gender, setGender] = useState();

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
      // deps.push({key:`${i}`,label:`${res?.data?.response_data?.department[i]?.name}`},value:`${res?.data?.response_data?.department[i]?.name}`)
      // deps.value.push(res?.data?.response_data?.department[i]?.name)
    }
    // console.log(deps);
    // deps = departments;
    return deps;
  };
  // let d = getDep();

  let view = useSelector(
    (state) => state?.ViewCurrentAdministratorReducer?.view
  );
  let currentAdministrator = useSelector(
    (state) => state?.ViewCurrentAdministratorReducer?.currentAdministrator
  );
  const [selectedOptionsDay, setSelectedOptionsDay] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  const dispatch = useDispatch();
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const administrator_obj = {
    email_address: currentAdministrator?.email_address,

    employee_id: 'admin-13',
    name: currentAdministrator?.name,
    // password: "alpha",
    password: '',

    gender: currentAdministrator?.gender,

    phone_number: currentAdministrator?.phone_number,
    role: {
      user_role_id: 2,
      name: 'administrator',
      title: 'Administrator User',
      rights: [],
    },
    // departments: ['1'],
    date_of_birth: currentAdministrator?.date_of_birth,
    id: currentAdministrator?.id,

    // timings: currentAdministrator?.timings,

    designation: currentAdministrator?.designation,
  };
  let [administrator, setAdministrator] = useState(administrator_obj);

  let [thisView, setThisView] = useState(view);
  // console.log(view);
  function editProfile() {
    setTitle('Edit Profile');

    // setSlotsData(currentDoctor.slots);

    // view=false
    setThisView(false);
  }

  async function confirmEdit() {
    // const newtiming = { ...administrator?.timings };
    // const newtimingarray = Object.keys(newtiming);
    // console.log(newtimingarray);
    // if (newtimingarray[0] === 'undefined') {
    //   console.log({
    //     ...administrator,
    //     timings: { ...currentAdministrator?.timings },
    //   });
    //   let res = await dispatch(
    //     UpdateAdministratorAction({
    //       ...administrator,
    //       timings: { ...currentAdministrator?.timings },
    //     })
    //   );
    //   if (res) {
    //     NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
    //     history.push('/app/menu/levels/viewAdministrator');
    //   } else {
    //     NotificationManager.error('Edit Failour', 'Error', 3000, null, '');
    //   }
    // }

    let res = await dispatch(
      UpdateAdministratorAction({
        ...administrator,
      })
    );

    if (res) {
      NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
      history.push('/app/menu/levels/viewAdministrator');
    } else {
      NotificationManager.error('Edit Failour', 'Error', 3000, null, '');
    }
  }
  let [loading, setLoading] = useState(false);

  const formikData = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  let [buttonName, setButtonName] = useState();
  let [title, setTitle] = useState('View Administrator');
  useEffect(() => {
    if (currentAdministrator?.length === 0) {
      history.push('/app/menu/levels/viewAdministrator');
    }
    // let day = selectedOptionsDay?.value;
    // administrator.timings = { [day]: { from: timeFrom, to: timeTo } };
    // setAdministrator(administrator);

    if (currentAdministrator?.state?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentAdministrator?.state?.name === 'active') {
      setButtonName('Suspend');
    }
  });
  // console.log(administrator.gender);

  const suspandAdministrator = async () => {
    setLoading(true);

    if (currentAdministrator?.state?.name === 'suspended') {
      let res = await dispatch(
        UpdateAdministratorAction({
          ...administrator,
          state: { id: 1, name: 'active' },
          //   timings:
          //     currentAdministrator?.timings === undefined
          //       ? ''
          //       : currentAdministrator?.timings,
        })
      );
      setLoading(false);

      if (res) {
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewAdministrator');
      } else {
        NotificationManager.error(
          'Error Activating This Administrator',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      let res = await dispatch(
        UpdateAdministratorAction({
          ...administrator,
          state: { id: 3, name: 'suspended' },
          // timings:
          //   currentAdministrator?.timings === undefined
          //     ? ''
          //     : currentAdministrator?.timings,

          // timings: currentAdministrator.timings,
        })
      );
      if (res) {
        NotificationManager.success(
          'Sucessfully Suspended',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewAdministrator');
      } else {
        NotificationManager.error(
          'Error Suspanding This Administrator',
          'Error',
          5000,
          null,
          ''
        );
      }
    }

    //  setStatusUpdate()
    // setAdministrator({ ...administrator, state: { id: 3, name: 'suspended' } });

    // console.log(doctor?.password);
  };
  const handleChangeToView = () => {
    history.push('/app/menu/levels/viewAdministrator');
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <Button
              className="btn-btn-secondary"
              onClick={handleChangeToView}
              style={{ marginRight: '20px','background-color': '#003766' }}
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
                        <p>{currentAdministrator?.employee_id}</p>
                      </span>
                    ) : (
                      <Input
                        disabled
                        value={administrator?.employee_id}
                        className="form-control"
                        name="name"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setAdministrator({
                            ...administrator,
                            employee_id: e.target.value,
                          })
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
                        <p>{currentAdministrator?.name}</p>
                      </span>
                    ) : (
                      <Input
                        value={administrator?.name}
                        className="form-control"
                        name="name"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setAdministrator({
                            ...administrator,
                            name: e.target.value,
                          })
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
                        <p>{currentAdministrator?.email_address}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        value={administrator?.email_address}
                        disabled
                        className="form-control"
                        name="email"
                        type="email"
                        // validate={validate}
                        onChange={(e) =>
                          setAdministrator({
                            ...administrator,
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
                        <p>{currentAdministrator?.gender?.name}</p>
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
                            label: administrator?.gender?.name,
                            value: administrator?.gender?.name,
                            key: administrator?.gender?.id,
                          }}
                          onChange={(val) =>
                            setAdministrator({
                              ...administrator,
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
                        <p>{currentAdministrator?.phone_number}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        disabled
                        type="number"
                        value={administrator?.phone_number}
                        className="radio-in"
                        name="phone_number"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setAdministrator({
                            ...administrator,
                            phone_number: e.target.value,
                          })
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
                        <p>{currentAdministrator?.date_of_birth}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        value={administrator.date_of_birth}
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
                        <p>{currentAdministrator?.designation}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        value={administrator?.designation}
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
                    )}
                  </FormGroup>
                </Col>
                {/* <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Department" />
                  </label>
                  {}
                  {thisView ? (
                    <span>
                      <p>{currentAdministrator?.departments[0]?.name}</p>
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
                            currentAdministrator?.departments?.length > 0
                              ? currentAdministrator?.departments[0]?.name
                              : '',
                          value:
                            currentAdministrator?.departments?.length > 0
                              ? currentAdministrator?.departments[0]?.name
                              : '',
                          key:
                            currentAdministrator?.departments?.length > 0
                              ? currentAdministrator?.departments[0]?.id
                              : '',
                        }}
                        onChange={
                          (val) =>
                            setAdministrator({
                              ...administrator,
                              departments: [val.key],
                            })

                         
                        }
                        options={deps}
                      />

                    </>
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                {thisView ? (
                  ''
                ) : (
                  <FormGroup>
                    <label>
                      <IntlMessages id="Day" />
                    </label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      // defaultValue={administrator?.departments?.name}
                      value={selectedOptionsDay}
                      onChange={(val) => setSelectedOptionsDay(val)}
                      options={selectDay}
                    />
                  </FormGroup>
                )}
              </Col>

              <Col lg={6}>
                {thisView ? (
                  ''
                ) : (
                  <FormGroup>
                    <label>
                      <IntlMessages id="Timmings From" />
                    </label>
                    <Input
                      value={timeFrom}
                      defaultValue={'currentAdministrator.timings.from'}
                      className="form-control"
                      name="time"
                      type="time"
                      // validate={validateEmail}
                      onChange={(e) => setTimeFrom(e.target.value)}
                    />
                  </FormGroup>
                )}
              </Col>

              <Col lg={6}>
                {thisView ? (
                  ''
                ) : (
                  <FormGroup>
                    <label>
                      <IntlMessages id="Timmings To" />
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
                )}
              </Col> */}
                {thisView ? (
                  <Col lg={6}>
                    <span>
                      <h6>Status</h6>
                      <p
                        style={{
                          color:
                            currentAdministrator?.state?.name === 'active'
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {currentAdministrator?.state?.name?.toUpperCase()}
                      </p>
                    </span>
                  </Col>
                ) : (
                  ''
                )}
              </Row>
              {/* <Row>
              <Col xl={12}>
                <FormGroup>
                  <div className="table-form">
                    <Table>
                      <thead>
                        <tr>
                          <th>Day</th>
                          <th>From</th>
                          <th>To</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.values(currentAdministrator?.timings || []).map(
                          (item, index = 0) => {
                            return (
                              <tr>
                                <td>
                                  {
                                    Object.keys(currentAdministrator?.timings)[
                                      index
                                    ]
                                  }
                                </td>

                                <td>{item?.from}</td>
                                <td>{item?.to}</td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </Table>
                  </div>
                </FormGroup>
              </Col>
            </Row> */}
              <div style={{ marginBottom: '30px' }}>
                {thisView === true ? (
                  <Button
                    style={{ backgroundColor:'#0066b3' }}
                    onClick={editProfile}
                    style={{ marginRight: '5px','background-color': '#003766' }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    style={{ backgroundColor:'#0066b3' }}
                    onClick={confirmEdit}
                    className={`btn-shadow btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    }`}
                    style={{ marginRight: '5px','background-color': '#003766' }}
                  >
                    Save Changes
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                  </Button>
                )}
                {thisView ? (
                  <Button
                    style={{ backgroundColor:'#0066b3' }}
                    onClick={suspandAdministrator}
                    style={{ marginRight: '5px' ,'background-color': '#003766',marginRight:"5px"}}
                  >
                    {buttonName}
                  </Button>
                ) : (
                  ''
                )}
                {thisView ? (
                  <Button
                    style={{ 'background-color': '#003766' }}
                    className="btn btn-primary"
                    onClick={showModal}
                    // style={{ marginRight: '5px' }}
                  >
                    Change Password
                  </Button>
                ) : (
                  ''
                )}

                {/*  <Button style={{backgroundColor:'#0066b3'}} onClick={suspandDoctor}>
            Suspend Doctor
          </Button> */}
              </div>
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
          {/* {thisView ? (
          <span>
            <p></p>
          </span>
        ) : (
          <ModalExample buttonLabel="Add Slots" clickHandler={clickHandler} />
        )} */}

          <div style={{ marginBottom: '30px' }} />

          <div
            className="table-form" /*style={{display: !thisView ? "none" : ""}}*/
          >
            {/* <Table>
            <thead>
              <tr>
                <th>Day</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>
              {slotsData?.map((item) => {
                console.log(item);
                return (
                  <tr>
                    <td>{day}</td>

                    <td>{item?.from}</td>

                    <td>{item?.to}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table> */}
          </div>
        </CardBody>
      </Card>
      <ChangePasswordModal
        show={show}
        handleClose={hideModal}
        data={currentAdministrator?.id}
      />
    </>
  );
};
export default ThirdLevel3;
