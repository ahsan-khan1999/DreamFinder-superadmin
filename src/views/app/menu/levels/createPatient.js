/* eslint-disable */

import { React, useEffect, useState } from 'react';
import { Row, Card, CardBody, CardTitle, Col, FormGroup } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { Formik, Form, Field, useFormik } from 'formik';
import { Label, Button, Input } from 'reactstrap';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { getToken } from 'Utils/auth.util';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { UpdatePatientAction } from 'Store/Actions/User/Patient/CreatePatientAction';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import { ChangePasswordFromSuperAdmin } from 'Store/Actions/Auth/changePasswordAction';
import ChangePasswordModal from './ChangePasswordModal';

const Patient = ({ match, history }) => {
  const [gender, setGender] = useState();

  const selectGender = [
    { label: 'male', value: 'male', key: 1 },
    { label: 'female', value: 'female', key: 2 },
  ];

  let view = useSelector((state) => state?.ViewCurrentPatientReducer?.view);
  let [thisView, setThisView] = useState(view);
  let currentPatient = useSelector(
    (state) => state?.ViewCurrentPatientReducer?.currentPatient
  );
  // console.log(currentPatient);

  // console.log(currentPatient);

  const dispatch = useDispatch();
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  const patient_obj = {
    email_address: currentPatient?.email_address,

    employee_id: currentPatient?.employee_id,
    name: currentPatient?.name,
    // password: "alpha",
    password: '',

    gender: currentPatient?.gender,

    phone_number: currentPatient?.phone_number,
    role: {
      user_role_id: 3,
      name: 'patient',
      title: 'Patient User',
      rights: [],
    },

    id: currentPatient?.id,
    patient_id: currentPatient?.patient_id,
  };
  let [patient, setPatient] = useState(patient_obj);
  let [title, setTitle] = useState('View Profile');
  function editProfile() {
    setTitle('Edit Profile');
    setThisView(false);
  }
  async function confirmEdit() {
    // console.log(patient);
    let res = dispatch(UpdatePatientAction(patient));
    if (res) {
      NotificationManager.success('Edit Sucess', 'Sucess', 3000, null, '');
      history.push('/app/menu/levels/viewPatient');
    } else {
      NotificationManager.error('Edit Failour', 'Error', 3000, null, '');
    }
  }

  const formikData = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  let [buttonName, setButtonName] = useState();

  const suspandPatient = async () => {
    //  setStatusUpdate()
    // setPatient({ ...patient, state: { id: 3, name: 'suspended' } });
    if (currentPatient?.state?.name === 'suspended') {
      let res = await dispatch(
        UpdatePatientAction({
          ...patient,
          state: { id: 1, name: 'active' },
        })
      );
      if (res) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewPatient');
      } else {
        NotificationManager.error(
          'Error Suspanding This Patient',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else if (currentPatient?.state?.name === 'active') {
      let res = await dispatch(
        UpdatePatientAction({
          ...patient,
          state: { id: 3, name: 'suspended' },
        })
      );
      if (res) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewPatient');
      }
    } else if (currentPatient?.state?.name === 'inactive') {
      let res = await dispatch(
        UpdatePatientAction({
          ...patient,
          state: { id: 1, name: 'active' },
        })
      );
      if (res) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewPatient');
      } else {
        NotificationManager.error(
          'Error Suspanding This Patient',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
    }
  };
  useEffect(() => {
    if (currentPatient?.length === 0) {
      history.push('/app/menu/levels/viewPatient');
    }

    if (currentPatient?.state?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentPatient?.state?.name === 'active') {
      setButtonName('Suspend');
    } else if (currentPatient?.state?.name === 'inactive') {
      setButtonName('Active');
    } else {
    }
  }, []);
  const handleChangeToView = () => {
    history.push('/app/menu/levels/viewPatient');
  };
  const changePassword = async () => {
    let id = currentPatient?.id;
    <ChangePasswordModal data={id} />;

    // if(res){
    //   NotificationManager.success(
    //     'Sucessfully Changed',
    //     'Sucess',
    //     5000,
    //     null,
    //     ''
    //   );
    // }
    // else{
    //   NotificationManager.error(
    //     'Error Changing This Password ',
    //     'Sucess',
    //     5000,
    //     null,
    //     ''
    //   );
    // }
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
          <Formik
            initialValues={formikData.initialValues}
            // onSubmit={onDoctorCreate}
          >
            <Form>
              <Row className="h-100" style={{ marginTop: '20px' }}>
                {/* <h2>Register Doctor</h2> */}
                <Col lg={6}>
                  <Label>
                    <h6>Patient Id</h6>
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{currentPatient?.patient_id}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        value={patient?.patient_id}
                        onChange={(e) =>
                          setPatient({
                            ...patient,
                            patient_id: e.target.value,
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
                      <p>{currentPatient?.name}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        className="form-control"
                        name="name"
                        type="text"
                        value={patient?.name}
                        onChange={(e) =>
                          setPatient({
                            ...patient,
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
                      <p>{currentPatient?.email_address}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        disabled
                        value={patient?.email_address}
                        className="form-control"
                        name="email"
                        type="email"
                        onChange={(e) =>
                          setPatient({
                            ...patient,
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
                      <p>{currentPatient?.gender?.name}</p>
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
                          label: patient?.gender?.name,
                          value: patient?.gender?.name,
                          key: patient?.gender?.id,
                        }}
                        onChange={(val) =>
                          setPatient({
                            ...patient,
                            gender: { id: val.key, name: val.label },
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
                      <p>{currentPatient?.phone_number}</p>
                    </span>
                  ) : (
                    <FormGroup>
                      <Input
                        disabled
                        value={patient.phone_number}
                        className="radio-in"
                        name="phone_number"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setPatient({
                            ...patient,
                            phone_number: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  )}
                </Col>
              </Row>
              {thisView ? (
                <span>
                  <h6>Status</h6>
                  <p
                    style={{
                      color:
                        currentPatient?.state?.name === 'active'
                          ? 'green'
                          : 'red',
                    }}
                  >
                    {currentPatient?.state?.name?.toUpperCase()}
                  </p>
                </span>
              ) : (
                ''
              )}

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
                    className="btn btn-primary"
                    // className={`btn-shadow btn-multiple-state ${
                    //   loading ? 'show-spinner' : ''
                    // }`}
                    size="sm"
                    onClick={confirmEdit}
                    style={{
                      marginRight: '5px',
                      'background-color': '#003766',
                    }}
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
                    // className="btn btn-primary"
                    style={{
                      marginRight:"5px",
                      'background-color': '#003766',
                    }}
                    onClick={suspandPatient}
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
                    style={{  'background-color': '#003766'}}
                    onClick={showModal}
                    // className="btn btn-primary"
                    // onClick={suspandPatient}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    Change Password
                  </Button>
                ) : (
                  ''
                )}
              </div>
            </Form>
          </Formik>
        </CardBody>
      </Card>
      <ChangePasswordModal
        show={show}
        handleClose={hideModal}
        data={currentPatient?.id}
      />
      {/* <ModalChangePassword show={show} handleClose={hideModal} /> */}
    </>
  );
};
export default Patient;
