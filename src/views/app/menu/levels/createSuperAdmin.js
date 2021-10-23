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
import { NotificationManager } from 'components/common/react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateSuperAdminAction } from 'Store/Actions/User/SuperAdmin/CreateSuperAdminAction';
import { getToken } from 'Utils/auth.util';
import axios from 'axios';
import ChangePasswordModal from './ChangePasswordModal';

const CreateSuperAdmin = ({ match, history }) => {
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
    // console.log(token);
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
  const [loading, setLoading] = useState(false);
  let view = useSelector((state) => state?.viewCurrentSuperAdmin?.view);
  let currentSuperAdmin = useSelector(
    (state) => state?.viewCurrentSuperAdmin?.currentSuperAdmin
  );
  let [title, setTitle] = useState('View Super Admin ');
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const [selectedOptionsDay, setSelectedOptionsDay] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();

  const superAdmin_obj = {
    email_address: currentSuperAdmin?.email_address,

    employee_id: currentSuperAdmin?.employee_id,
    name: currentSuperAdmin?.name,
    // password: "alpha",
    password: '',

    gender: currentSuperAdmin?.gender,

    phone_number: currentSuperAdmin?.phone_number,
    role: {
      user_role_id: 1,
      name: 'super_admin',
      title: 'Super Admin User',
      rights: [],
    },
    // departments: ['1'],
    date_of_birth: currentSuperAdmin?.date_of_birth,
    id: currentSuperAdmin?.id,

    // timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },

    designation: currentSuperAdmin?.designation,
  };
  useEffect(() => {
    if (currentSuperAdmin?.length === 0) {
      history.push('/app/menu/levels/viewSuperAdmin');
    }
    if (currentSuperAdmin?.state?.name === 'suspended') {
      setButtonLabel('Active');
    } else if (currentSuperAdmin?.state?.name === 'active') {
      setButtonLabel('Suspend');
    }
  }, []);
  let [superAdmin, setSuperAdmin] = useState(superAdmin_obj);

  let [thisView, setThisView] = useState(view);
  function editProfile() {
    setTitle('Edit Profile');
    // setSlotsData(currentDoctor.slots);

    // view=false
    setThisView(false);
  }
  const dispatch = useDispatch();

  async function confirmEdit() {
    setLoading(true);
    // const newtiming = { ...superAdmin?.timings };
    // const newtimingarray = Object.keys(newtiming);
    // console.log(newtimingarray);
    // if (newtimingarray[0] === 'undefined') {
    //   console.log({
    //     ...superAdmin,
    //     timings: { ...currentSuperAdmin?.timings },
    //   });
    //   let res = await dispatch(
    //     UpdateSuperAdminAction({
    //       ...superAdmin,
    //       timings: { ...currentSuperAdmin?.timings },
    //     })
    //   );
    //   if (res) {
    //     NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
    //     history.push('/app/menu/levels/viewSuperAdmin');
    //   } else {
    //     NotificationManager.error('Edit Failour', 'Error', 3000, null, '');
    //   }
    // }
    //  else {
    // console.log({
    //   ...superAdmin,
    //   timings: {
    //     ...currentSuperAdmin?.timings,
    //     ...superAdmin?.timings,
    //   },
    // });
    let res = await dispatch(
      UpdateSuperAdminAction({
        ...superAdmin,
        // timings: {
        //   ...currentSuperAdmin?.timings,
        //   ...superAdmin?.timings,
        // },
      })
    );
    setLoading(false);
    if (res) {
      NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
      history.push('/app/menu/levels/viewSuperAdmin');
    } else {
      NotificationManager.error('Edit Failour', 'Error', 3000, null, '');
    }
    // }
  }
  const formikData = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  let [buttonLabel, setButtonLabel] = useState();
  useEffect(() => {
    let day = selectedOptionsDay?.value;
    // superAdmin.timings = { [day]: { from: timeFrom, to: timeTo } };
    setSuperAdmin(superAdmin);
  }, [timeFrom, timeTo]);
  const suspandSuperAdmin = async () => {
    setLoading(true);
    if (currentSuperAdmin.state.name === 'active') {
      let res = await dispatch(
        UpdateSuperAdminAction({
          ...superAdmin,
          state: { id: 3, name: 'suspended' },
          // timings: currentSuperAdmin?.timings,
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
        history.push('/app/menu/levels/viewSuperAdmin');
      } else {
        NotificationManager.error(
          'Error Suspanding This Super Admin',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      setLoading(true);
      let res = await dispatch(
        UpdateSuperAdminAction({
          ...superAdmin,
          state: { id: 1, name: 'active' },
          // timings: currentSuperAdmin?.timings,
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
        history.push('/app/menu/levels/viewSuperAdmin');
      } else {
        NotificationManager.error(
          'Error Suspanding This Super Admin',
          'Error',
          5000,
          null,
          ''
        );
      }
    }
    //  setStatusUpdate()
  };
  // console.log(administrator.gender);
  // console.log(currentSuperAdmin);
  const handleChangeToView = () => {
    history.push('/app/menu/levels/viewSuperAdmin');
  };
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <Button
              className="btn-btn-secondary"
              onClick={handleChangeToView}
              style={{ marginRight: '20px' ,'background-color': '#003766'}}
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
                        <p>{currentSuperAdmin?.employee_id}</p>
                      </span>
                    ) : (
                      <Input
                        disabled
                        value={superAdmin?.employee_id}
                        className="form-control"
                        name="name"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setSuperAdmin({
                            ...superAdmin,
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
                        <p>{currentSuperAdmin?.name}</p>
                      </span>
                    ) : (
                      <Input
                        value={superAdmin?.name}
                        className="form-control"
                        name="name"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setSuperAdmin({
                            ...superAdmin,
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
                        <p>{currentSuperAdmin?.email_address}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        value={superAdmin?.email_address}
                        disabled
                        className="form-control"
                        name="email"
                        type="email"
                        // validate={validate}
                        onChange={(e) =>
                          setSuperAdmin({
                            ...superAdmin,
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
                        <p>{currentSuperAdmin?.gender?.name}</p>
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
                            label: superAdmin?.gender?.name,
                            value: superAdmin?.gender?.name,
                            key: superAdmin?.gender?.id,
                          }}
                          onChange={(val) =>
                            setSuperAdmin({
                              ...superAdmin,
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
                        <p>{currentSuperAdmin?.phone_number}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        disabled
                        value={superAdmin?.phone_number}
                        className="radio-in"
                        name="phone_number"
                        type="number"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setSuperAdmin({
                            ...superAdmin,
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
                        <p>{currentSuperAdmin?.date_of_birth}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        value={superAdmin.date_of_birth}
                        className="form-control"
                        name="date_of_birth"
                        type="date"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setSuperAdmin({
                            ...superAdmin,
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
                        <p>{currentSuperAdmin?.designation}</p>
                      </span>
                    ) : (
                      <Input
                        required
                        value={superAdmin?.designation}
                        className="form-control"
                        name="designation"
                        type="text"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setSuperAdmin({
                            ...superAdmin,
                            designation: e.target.value,
                          })
                        }
                      />
                    )}
                  </FormGroup>
                </Col>

                {thisView ? (
                  <Col lg={6}>
                    <span>
                      <h6>Status</h6>
                      <p
                        style={{
                          color:
                            currentSuperAdmin?.state?.name === 'active'
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {currentSuperAdmin?.state?.name?.toUpperCase()}
                      </p>
                    </span>
                  </Col>
                ) : (
                  ''
                )}
                {/* <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Department" />
                  </label>
                  {thisView ? (
                    <span>
                      <p>{currentSuperAdmin?.departments[0]?.name}</p>
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
                          label:currentSuperAdmin?.departments?.length > 0 ?  currentSuperAdmin?.departments[0]?.name : "",
                          value: currentSuperAdmin?.departments?.length > 0 ?  currentSuperAdmin?.departments[0]?.name : "",
                          key: currentSuperAdmin?.departments?.length > 0 ?  currentSuperAdmin?.departments[0]?.id : "",
                        }}
                        onChange={
                          (val) =>
                            setSuperAdmin({
                              ...superAdmin,
                              departments: [val.key],
                            })

                         
                        }
                        options={deps}
                      />

                    </>
                  )}
                </FormGroup>
              </Col>

              {thisView ? (
                <Col lg={6}>
                  <FormGroup>
                    <Label>Status</Label> {currentSuperAdmin?.state?.name}
                  </FormGroup>
                </Col>
              ) : (
                ''
              )}

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
                        {Object?.values(currentSuperAdmin?.timings || []).map(
                          (item, index = 0) => {
                            // console.log(item,"item is");
                            return (
                              <tr>
                                <td>
                                  {Object?.keys(currentSuperAdmin?.timings)[index]}
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
                    className="btn btn-primary"
                    onClick={editProfile}
                    style={{
                      marginRight: '5px',
                      'background-color': '#003766',
                    }}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button
                    className={`btn-shadow btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    }`}
                    className="btn btn-primary"
                    onClick={confirmEdit}
                    style={{
                      marginRight: '5px',
                      'background-color': '#003766',
                    }}
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
                    style={{
                      marginRight:"5px",
                      'background-color': '#003766',
                    }}
                    onClick={suspandSuperAdmin}
                    className={`btn-shadow btn-multiple-state ${
                      loading ? 'show-spinner' : ''
                    }`}
                  >
                    {buttonLabel}
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
                    style={{
                      // marginLeft: '10px',
                      'background-color': '#003766',
                    }}
                    className="btn btn-primary"
                    onClick={showModal}
                    // style={{ marginRight: '5px' }}
                  >
                    Change Password
                  </Button>
                ) : (
                  ''
                )}
                {/* <Button className="btn btn-primary" onClick={suspandDoctor}>
            Suspend Doctor
          </Button> */}
              </div>
            </Form>
          </Formik>
        </CardBody>
      </Card>
      <ChangePasswordModal
        show={show}
        handleClose={hideModal}
        data={currentSuperAdmin?.id}
      />
    </>
  );
};
export default CreateSuperAdmin;
