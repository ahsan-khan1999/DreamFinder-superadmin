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
import {
  CreatePharmacyAction,
  UpdatePharmacyAction,
} from 'Store/Actions/User/Pharmacy/CreatePharmacyAction';
import { NotificationManager } from 'components/common/react-notifications';
import { getToken } from 'Utils/auth.util';
import axios from 'axios';
import ChangePasswordModal from './ChangePasswordModal';

const CreatePharmacy = ({ match, history }) => {
  const [gender, setGender] = useState();

  const selectGender = [
    { label: 'Male', value: 'male', key: 1 },
    { label: 'Female', value: 'female', key: 2 },
  ];
  const selectDepartment = [
    { label: 'Physio Tharepy', value: 'Physio Tharepy', key: 1 },
    { label: 'Physio Tharepy', value: 'Tharepy', key: 2 },
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
  let view = useSelector((state) => state?.ViewCurrentPharmacyReducer?.view);
  let currentPharmacy = useSelector(
    (state) => state?.ViewCurrentPharmacyReducer?.currentPharmacy
  );
  let [thisView, setThisView] = useState(view);
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
  // console.log(currentPharmacy, view);
  let [title, setTitle] = useState('View Pharmacy ');
  const [loading, setLoading] = useState(false);
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const pharmacy_obj = {
    email_address: currentPharmacy.email_address,

    employee_id: currentPharmacy?.employee_id,
    name: currentPharmacy.name,
    // password: "alpha",
    password: '',

    gender: currentPharmacy.gender,

    phone_number: currentPharmacy.phone_number,
    role: {
      user_role_id: 9,
      name: 'pharmacy',
      title: 'Pharmacy User',
      rights: [],
    },
    // timings: currentPharmacy?.timings,
    // timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },

    // departments: ['1'],
    date_of_birth: currentPharmacy.date_of_birth,

    designation: currentPharmacy.designation,
    id: currentPharmacy?.id,
  };

  async function confirmEdit() {
    // const newtiming = { ...pharmacy?.timings };
    // const newtimingarray = Object.keys(newtiming);
    // console.log(newtimingarray);
    // if (newtimingarray[0] === 'undefined') {
    //   console.log({
    //     ...pharmacy,
    //     timings: { ...currentPharmacy?.timings },
    //   });
    //   let res = await dispatch(
    //     UpdatePharmacyAction({
    //       ...pharmacy,
    //     })
    //   );
    //   if (res) {
    //     NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
    //     history.push('/app/menu/levels/viewPharmacy');
    //   } else {
    //     NotificationManager.error('Edit Failour', 'Error', 3000, null, '');
    //   }
    setLoading(true);
    let res = await dispatch(
      UpdatePharmacyAction({
        ...pharmacy,
        // timings: {
        //   ...currentPharmacy?.timings,
        //   ...pharmacy?.timings,
        // },
      })
    );
    setLoading(false);
    if (res) {
      NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
      history.push('/app/menu/levels/viewPharmacy');
    } else {
      NotificationManager.error('Edit Failour', 'Error', 3000, null, '');
    }
  }
  function editProfile() {
    setTitle('Edit Profile');
    // setSlotsData(currentDoctor.slots);

    // view=false
    setThisView(false);
  }
  const formikData = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  let [pharmacy, setPharmacy] = useState(pharmacy_obj);
  let [buttonName, setButtonName] = useState();

  useEffect(() => {
    if (currentPharmacy?.length === 0) {
      history.push('/app/menu/levels/viewPharmacy');
    }
    // let day = selectedOptionsDay?.value;
    // pharmacy.timings = { [day]: { from: timeFrom, to: timeTo } };
    // setPharmacy(pharmacy);
    if (currentPharmacy?.state?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentPharmacy?.state?.name === 'active') {
      setButtonName('Suspend');
    }
  }, [timeFrom, timeTo]);
  const dispatch = useDispatch();
  const suspandPharmacyUser = async () => {
    setLoading(true);
    if (currentPharmacy?.state?.name === 'suspended') {
      let res = await dispatch(
        UpdatePharmacyAction({
          ...pharmacy,
          state: { id: 1, name: 'active' },
          // timings: currentPharmacy?.timings,
        })
      );
      if (res) {
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        setLoading(false);
        history.push('/app/menu/levels/viewPharmacy');
      } else {
        NotificationManager.error(
          'Error Suspanding This Pharmacy User',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      setLoading(true);

      let res = await dispatch(
        UpdatePharmacyAction({
          ...pharmacy,
          state: { id: 3, name: 'suspended' },
          // timings: currentPharmacy?.timings,
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
        history.push('/app/menu/levels/viewPharmacy');
      } else {
        NotificationManager.error(
          'Error Suspanding This Pharmacy User',
          'Error',
          5000,
          null,
          ''
        );
      }
    }
  };
  const handleChangeToView = () => {
    history.push('/app/menu/levels/viewPharmacy');
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
              <Row className="h-100" style={{ marginTop: '10px' }}>
                <Col lg={6}>
                  <Label>
                    <h6>Employee ID</h6>
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{pharmacy?.employee_id}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        disabled
                        className="form-control"
                        name="name"
                        type="text"
                        value={pharmacy?.employee_id}
                        onChange={(e) =>
                          setPharmacy({
                            ...pharmacy,
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
                      <p>{pharmacy?.name}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        value={pharmacy?.name}
                        onChange={(e) =>
                          setPharmacy({
                            ...pharmacy,
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
                      <p>{pharmacy?.email_address}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        disabled
                        className="form-control"
                        name="name"
                        type="email"
                        value={pharmacy?.email_address}
                        onChange={(e) =>
                          setPharmacy({
                            ...pharmacy,
                            email_address: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  )}
                </Col>

                <Col lg={6}>
                  <label>
                    <h6>Gender</h6>
                  </label>
                  {thisView ? (
                    <span>
                      <p>{pharmacy?.gender.name}</p>
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
                          label: pharmacy?.gender?.name,
                          value: pharmacy?.gender?.name,
                          key: pharmacy?.gender?.id,
                        }}
                        onChange={(val) =>
                          setPharmacy({
                            ...pharmacy,
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
                      <p>{pharmacy?.phone_number}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        disabled
                        value={pharmacy?.phone_number}
                        className="radio-in"
                        name="phone_number"
                        type="number"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setPharmacy({
                            ...pharmacy,
                            phone_number: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  )}
                </Col>
                <Col lg={6}>
                  <Label>
                    <h6>Date Of Birth</h6>
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{pharmacy?.date_of_birth}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        value={pharmacy?.date_of_birth}
                        className="form-control"
                        name="date_of_birth"
                        type="date"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setPharmacy({
                            ...pharmacy,
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
                      <p>{pharmacy?.designation}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        value={pharmacy?.designation}
                        className="form-control"
                        name="designation"
                        type="text"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setPharmacy({
                            ...pharmacy,
                            designation: e.target.value,
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
                      <p>{currentPharmacy?.departments[0]?.name}</p>
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
                          label:currentPharmacy?.departments?.length > 0 ?  currentPharmacy?.departments[0]?.name : "",
                          value: currentPharmacy?.departments?.length > 0 ?  currentPharmacy?.departments[0]?.name : "",
                          key: currentPharmacy?.departments?.length > 0 ?  currentPharmacy?.departments[0]?.id : "",
                        }}
                        onChange={
                          (val) =>
                            setPharmacy({
                              ...pharmacy,
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
                            currentPharmacy?.state?.name === 'active'
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {currentPharmacy?.state?.name?.toUpperCase()}
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
                        {Object.values(currentPharmacy?.timings || []).map(
                          (item, index = 0) => {
                            // console.log(item,"item is");
                            return (
                              <tr>
                                <td>
                                  {Object.keys(currentPharmacy?.timings)[index]}
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
                <Button onClick={editProfile} style={{ marginRight: '10px' ,'background-color': '#003766'}}>
                  Edit profile
                </Button>
              ) : (
                <Button
                  onClick={confirmEdit}
                  style={{ marginRight: '10px','background-color': '#003766' }}
                  className={`btn-shadow btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
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
                  className="btn btn-primary"
                  style={{'background-color': '#003766' ,marginRight:"5px"}}

                  type="submit"
                  className={`btn-shadow btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
                  size="sm"
                  onClick={suspandPharmacyUser}
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
            </Form>
          </Formik>
        </CardBody>
      </Card>
      <ChangePasswordModal
        show={show}
        handleClose={hideModal}
        data={currentPharmacy?.id}
      />
    </>
  );
};
export default CreatePharmacy;
