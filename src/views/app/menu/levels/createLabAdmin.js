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
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Formik, Form, Field, useFormik } from 'formik';
import { Label, Button, Input } from 'reactstrap';

import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { CreateAdministratorAction } from 'Store/Actions/User/Administrator/CreateAdministratorAction';
import {
  CreateLabAdmin,
  UpdateLabAdminAction,
} from 'Store/Actions/User/LabAdmin/CreateLabAdminAction';
import { NotificationManager } from 'components/common/react-notifications';
import axios from 'axios';
import { getToken } from 'Utils/auth.util';
import ChangePasswordModal from './ChangePasswordModal';

const LabAdmin = ({ match, history }) => {
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
  let view = useSelector((state) => state?.ViewCurrentLabAdminReducer?.view);
  let [thisView, setThisView] = useState(view);
  // console.log(thisView);
  let currentLabAdmin = useSelector(
    (state) => state?.ViewCurrentLabAdminReducer?.currentLabAdmin
  );
  const [selectedOptionsDay, setSelectedOptionsDay] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const LabAdmin_obj = {
    email_address: currentLabAdmin?.email_address,

    employee_id: currentLabAdmin?.employee_id,
    name: currentLabAdmin?.name,
    // password: "alpha",
    password: '',

    gender: currentLabAdmin?.gender,

    phone_number: currentLabAdmin?.phone_number,
    role: {
      user_role_id: 5,
      name: 'laboratory_admin',
      title: 'Laboratory Admin User',
      rights: [],
    },
    // departments: ['1'],
    date_of_birth: currentLabAdmin?.date_of_birth,

    // timings: currentLabAdmin?.timings,
    id: currentLabAdmin?.id,

    designation: currentLabAdmin?.designation,
  };
  let [labAdmin, setLabAdmin] = useState(LabAdmin_obj);

  function editProfile() {
    setTitle('Edit Lab Admin');
    setThisView(false);
  }
  const [loading, setLoading] = useState(false);
  async function confirmEdit() {
    setLoading(true);
    // const newtiming = { ...labAdmin?.timings };
    // const newtimingarray = Object.keys(newtiming);
    // console.log(newtimingarray);
    // if (newtimingarray[0] === 'undefined') {
    //   console.log({
    //     ...labAdmin,
    //     timings: { ...currentLabAdmin?.timings },
    //   });
    //   let res = await dispatch(
    //     UpdateLabAdminAction({
    //       ...labAdmin,
    //       timings: { ...currentLabAdmin?.timings },
    //     })
    //   );
    //   if (res) {
    //     NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
    //     history.push('/app/menu/levels/viewLabAdmin');
    //   } else {
    //     NotificationManager.error('Edit Failour', 'Error', 3000, null, '');
    //   }
    // }
    // if() {
    // console.log({
    //   ...labAdmin,
    //   timings: {
    //     ...currentLabAdmin?.timings,
    //     ...labAdmin?.timings,
    //   },
    // });
    let res = await dispatch(
      UpdateLabAdminAction({
        ...labAdmin,
        // timings: {
        //   ...currentLabAdmin?.timings,
        //   ...labAdmin?.timings,
        // },
      })
    );
    setLoading(false);
    if (res) {
      NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
      history.push('/app/menu/levels/viewLabAdmin');
    } else {
      NotificationManager.error('Edit Failour', 'Error', 3000, null, '');
    }
    // }
  }
  let [buttonName, setButtonName] = useState();
  const formikData = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  useEffect(() => {
    if (currentLabAdmin?.length === 0) {
      history.push('/app/menu/levels/viewLabAdmin');
    }
    // let day = selectedOptionsDay?.value;
    // labAdmin.timings = { [day]: { from: timeFrom, to: timeTo } };
    // setLabAdmin(labAdmin);
    if (currentLabAdmin?.state?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentLabAdmin?.state?.name === 'active') {
      setButtonName('Suspend');
    }
  }, [timeFrom, timeTo]);
  const dispatch = useDispatch();
  const suspandLabAdmin = async () => {
    setLoading(true);
    if (currentLabAdmin?.state?.name === 'suspended') {
      let res = await dispatch(
        UpdateLabAdminAction({
          ...labAdmin,
          state: { id: 1, name: 'active' },
          // timings: currentLabAdmin?.timings,
        })
      );
      setLoading(false);
      if (res) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewLabAdmin');
      } else {
        NotificationManager.error(
          'Error Suspanding This Lab Admin',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      setLoading(true);

      let res = await dispatch(
        UpdateLabAdminAction({
          ...labAdmin,
          state: { id: 3, name: 'suspended' },
          // timings: currentLabAdmin?.timings,
        })
      );
      setLoading(false);

      if (res) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewLabAdmin');
      } else {
        NotificationManager.error(
          'Error Suspanding This Lab',
          'Error',
          5000,
          null,
          ''
        );
      }
    }
  };
  //  setStatusUpdate()
  // setLabAdmin({ ...labAdmin, state: { id: 3, name: 'suspended' } });
  let [title, setTitle] = useState('View Lab Admin');
  const handleChangeToView = () => {
    history.push('/app/menu/levels/viewLabAdmin');
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
          <Formik
            initialValues={formikData.initialValues}
            // onSubmit={onDoctorCreate}
          >
            <Form>
              <Row className="h-100" style={{ marginTop: '20px' }}>
                {/* <h2>Register Doctor</h2> */}

                <Col lg={6}>
                  <Label>
                    <h6>Employee ID</h6>
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{currentLabAdmin?.employee_id}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        disabled
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
                  )}
                </Col>

                <Col lg={6}>
                  <Label>
                    <h6>Name</h6>
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{currentLabAdmin?.name}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
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
                  )}
                </Col>

                <Col lg={6}>
                  <Label>
                    <h6>Email</h6>
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{currentLabAdmin?.email_address}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        disabled
                        value={labAdmin?.email_address}
                        className="form-control"
                        name="email"
                        type="email"
                        onChange={(e) =>
                          setLabAdmin({
                            ...labAdmin,
                            email_address: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  )}
                </Col>
                {/* <Col lg={6}>
                {thisView ?( <span>
                      <p>{currentLabAdmin?.password}</p>
                    </span>) :(
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Password" />
                    </Label>

                    <Input
                      value={labAdmin?.password}
                      className="form-control"
                      name="password"
                      type="password"
                      onChange={(e) =>
                        setLabAdmin({
                          ...labAdmin,
                          password: e.target.value,
                        })
                      }
                    />
                  </FormGroup>)}
                </Col> */}
                <Col lg={6}>
                  <label>
                    <h6>Gender</h6>
                  </label>
                  {thisView ? (
                    <span>
                      <p>{currentLabAdmin?.gender?.name}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        value={gender}
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
                    </FormGroup>
                  )}
                </Col>
                <Col lg={6}>
                  <Label>
                    <h6>Phone Number</h6>
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{currentLabAdmin?.phone_number}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        disabled
                        value={labAdmin.phone_number}
                        className="radio-in"
                        name="phone_number"
                        type="number"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setLabAdmin({
                            ...labAdmin,
                            phone_number: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  )}
                </Col>

                {/* <Col lg={6}>
                  <FormGroup>
                    <label>
                      <IntlMessages id="Department" />
                    </label>
                    {thisView ? (
                      <span>
                        <p>{currentLabAdmin?.departments[0]?.name}</p>
                      </span>
                    ) : (
                      <>
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          defaultValue={{
                            label:
                              currentLabAdmin?.departments?.length > 0
                                ? currentLabAdmin?.departments[0]?.name
                                : '',
                            value:
                            currentLabAdmin?.departments?.length > 0
                                ? currentLabAdmin?.departments[0]?.name
                                : '',
                            key:
                            currentLabAdmin?.departments?.length > 0
                                ? currentLabAdmin?.departments[0]?.id
                                : '',
                          }}
                          onChange={
                            (val) =>
                              setLabAdmin({
                                ...labAdmin,
                                departments: [val.key],
                              })

                           
                          }
                          options={deps}
                        />

                      </>
                    )}
                  </FormGroup>
                </Col> */}
                <Col lg={6}>
                  <Label>
                    <h6>Date Of Birth</h6>
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{currentLabAdmin?.date_of_birth}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        value={labAdmin.date_of_birth}
                        className="form-control"
                        name="date_of_birth"
                        type="date"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setLabAdmin({
                            ...labAdmin,
                            date_of_birth: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  )}
                </Col>
                <Col lg={6}>
                  <Label>
                    <h6>Designation</h6>
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{currentLabAdmin?.designation}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        value={labAdmin.designation}
                        className="form-control"
                        name="designation"
                        type="text"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setLabAdmin({
                            ...labAdmin,
                            designation: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  )}
                </Col>
                {/* <Col lg={6}>
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
                        className="form-control"
                        name="time"
                        type="time"
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
                            currentLabAdmin?.state?.name === 'active'
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {currentLabAdmin?.state?.name?.toUpperCase()}
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
                          {Object.values(currentLabAdmin?.timings || []).map(
                            (item, index = 0) => {
                              console.log(item, 'item is');
                              return (
                                <tr>
                                  <td>
                                    {
                                      Object.keys(currentLabAdmin?.timings)[
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

              {thisView ? (
                <Button
                  style={{ marginRight: '10px', 'background-color': '#003766' }}
                  className="btn btn-primary"
                  type="submit"
                  onClick={editProfile}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  className={`btn-shadow btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
                  className="btn btn-primary"
                  style={{ marginRight: '10px', 'background-color': '#003766' }}
                  type="submit"
                  onClick={confirmEdit}
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
                  style={{  'background-color': '#003766',marginRight:"5px" }}
                  className={`btn-shadow btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
                  className="btn btn-primary"
                  type="submit"
                  onClick={suspandLabAdmin}
                >
                  {buttonName}
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                </Button>
              ) : (
                ''
              )}
              {thisView ? (
                <Button
                  style={{'background-color': '#003766'}}
                  className="btn btn-primary"
                  onClick={showModal}
                  // style={{ marginRight: '5px' }}
                >
                  Change Password
                </Button>
              ) : (
                ''
              )}
            </Form>
          </Formik>
        </CardBody>
      </Card>
      <ChangePasswordModal
        show={show}
        handleClose={hideModal}
        data={currentLabAdmin?.id}
      />
    </>
  );
};
export default LabAdmin;
