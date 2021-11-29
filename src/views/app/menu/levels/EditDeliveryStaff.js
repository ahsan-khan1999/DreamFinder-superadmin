/* eslint-disable */

import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import {
  ViewRoleAction,
  UpdateUserAction,
  ViewDepoAction,
} from 'Store/Actions/User/UserActions';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import axios from 'axios';
import { getToken } from 'Utils/auth.util';
import Loader from 'react-loader-spinner';
import ChangePasswordModal from './ChangePasswordModal';
import { BASEURL } from 'services/HttpProvider';

const selectGender = [
  { label: 'Male', value: 'male', key: 1 },
  { label: 'Female', value: 'female', key: 2 },
  { label: 'Other', value: 'other', key: 3 },
];
export default function EditDeliveryStaff(props) {
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const currentUser = props?.location?.state;
  const [optionState, setOptionState] = useState([]);
  const [loadingRegion, setLoadingRegion] = useState(false);
  let defaultOptions = [];
  currentUser?.field_staff?.service_location?.map((item) =>
    defaultOptions?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let service_location_id = [];
  currentUser?.field_staff?.service_location?.map((item) =>
    service_location_id?.push(item?.uid)
  );
  const admin_obj = {
    email_address: currentUser?.email_address,
    uid: currentUser?.uid,
    name: currentUser?.name,
    // password: "alpha",

    gender: currentUser?.gender,
    designation: currentUser?.designation,
    manager_uid: currentUser?.field_staff?.manager?.uid,

    phone_number: currentUser?.phone_number,
    service_location_uid: service_location_id,

    role_uid: currentUser?.role?.uid,
  };
  const [thisView, setThisView] = useState(true);
  let [service_location, setService_location] = useState();
  let [buttonName, setButtonName] = useState();

  const [confirmPassword, setConfirmPassword] = useState('');
  const [admin, setAdmin] = useState(admin_obj);
  const [array, setArray] = useState(admin?.service_location_uid);

  const [loadingSuspand, setLoadingSuspand] = useState(false);

  const dispatch = useDispatch();
  const readRoles = () => {
    dispatch(ViewRoleAction());
  };
  let option = [];
  const getServiceLocationUid = async (uid) => {
    setLoadingRegion(true);
    let token = await getToken();
    const response = await axios.get(
      BASEURL+`/region-classifications/read/territory?child_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );
    setLoadingRegion(false);

    setService_location(response?.data?.response_data);
  };
  service_location?.filter((item) =>
    option?.push({ label: item?.name, value: item?.name, key: item?.uid })
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
  useEffect(() => {
    setOptionState(defaultOptions);
    setAdmin(admin_obj);
    if (currentUser?.status?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentUser?.status?.name === 'active') {
      setButtonName('Suspend');
    }
    readRoles();
    dispatch(ViewDepoAction());
  }, []);
  const roles = useSelector((state) => state?.ViewUserReducer?.roles);
  const loading = useSelector((state) => state?.ViewUserReducer?.loadingCreate);

  const depoManager = useSelector(
    (state) => state?.ViewUserReducer?.depoManager
  );

  let options = [];
  roles?.filter((item) =>
    item?.category?.user_role_id == 8
      ? options.push({ label: item?.name, value: item?.name, key: item?.uid })
      : null
  );
  let depoManagerFilter = [];
  depoManager?.filter((item) =>
    depoManagerFilter?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );

  const editProfile = (e) => {
    e.preventDefault();
    setThisView(false);
  };
  const handleChangeToView = () => {
    props.history.push('/app/menu/levels/ViewDeliveryStaff');
  };
  const editData = async (e) => {
    e.preventDefault();

    if (
      admin?.name === '' ||
      admin?.gender === '' ||
      admin?.designation === '' ||
      admin.role_uid === '' ||
      admin.manager_uid === '' ||
      admin?.service_location_uid === []
    ) {
      NotificationManager.error(
        'Please Enter Details',
        'Error',
        5000,
        null,
        ''
      );
    } else {
      let test = { ...admin, service_location_uid: array };

      if (array === undefined) {
        let res = await dispatch(UpdateUserAction(admin));
        if (res) {
          NotificationManager.success(
            'Successful response',
            'Success',
            5000,
            ''
          );
          props.history.push('/app/menu/levels/ViewDeliveryStaff');
        }
      } else {
        let res = await dispatch(UpdateUserAction(test));
        if (res) {
          NotificationManager.success(
            'Successful response',
            'Success',
            5000,
            ''
          );
          props.history.push('/app/menu/levels/ViewDeliveryStaff');
        }
      }
    }

    // console.log(test);
  };

  // console.log(defaultOptions, 'default option');
  const suspandAdmin = async () => {
    if (currentUser?.status?.name === 'suspended') {
      let apiData = {
        uid: currentUser?.uid,
      };
      let res = await apiServices.suspandUser(apiData);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/menu/levels/ViewDeliveryStaff');
      } else {
        NotificationManager.error(
          'Error active This Admin',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      setLoadingSuspand(true);

      let apiData = {
        uid: currentUser?.uid,
      };
      let res = await apiServices.suspandUser(apiData);
      if (res?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        setLoadingSuspand(false);

        props.history.push('/app/menu/levels/ViewDeliveryStaff');
      } else {
        NotificationManager.error(
          res?.response_message,
          'Error',
          5000,
          null,
          ''
        );
        setLoadingSuspand(false);
      }
    }

  };
  return (
    <>
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            // className="btn-btn-secondary"
            onClick={handleChangeToView}
            style={{ marginRight: '20px', backgroundColor: '#0066B3' }}
          >
            Back
          </Button>
          <IntlMessages id="View User" />
        </CardTitle>

        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Name" />
                  </Label>

                  {thisView ? (
                    <span>
                      <p>{admin?.name}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      value={admin.name}
                      className="form-control"
                      name="name"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setAdmin({ ...admin, name: e.target.value })
                      }
                    />
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Email" />
                  </Label>

                  {thisView ? (
                    <span>
                      <p>{admin?.email_address}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      disabled
                      value={admin.email_address}
                      className="form-control"
                      name="email"
                      type="email"
                      onChange={(e) =>
                        setAdmin({ ...admin, email_address: e.target.value })
                      }
                    />
                  )}
                </FormGroup>
              </Col>

              {/* <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Password" />
                  </Label>
                  {thisView ? (
                    <span>
                      <p>{admin.password}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      value={admin.password}
                      className="form-control"
                      name="password"
                      type="password"
                      //   validate={validate}
                      onChange={(e) =>
                        setAdmin({ ...admin, password: e.target.value })
                      }
                    />
                  )}
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
              </Col> */}
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Gender" />
                  </label>

                  <>
                    {thisView ? (
                      <span>
                        <p>{admin?.gender}</p>
                      </span>
                    ) : (
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        // value={gender}
                        defaultValue={{
                          label: admin?.gender,
                          value: admin?.gender,
                          key: admin?.gender,
                        }}
                        onChange={(val) =>
                          setAdmin({
                            ...admin,
                            gender: val?.value,
                          })
                        }
                        options={selectGender}
                      />
                    )}
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Phone Number" />
                  </Label>

                  {thisView ? (
                    <span>
                      <p>{admin?.phone_number}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      disabled
                      value={admin?.phone_number}
                      type="text"
                      className="radio-in"
                      name="phone_number"
                      // validate={validateEmail}
                      // onChange={(e) => setNumber()}
                      onChange={(e) =>
                        setAdmin({ ...admin, phone_number: e.target.value })
                      }
                    />
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Designation" />
                  </Label>

                  {thisView ? (
                    <span>
                      <p>{admin?.designation}</p>
                    </span>
                  ) : (
                    <Input
                      required={true}
                      value={admin.designation}
                      className="form-control"
                      name="designation"
                      type="text"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setAdmin({ ...admin, designation: e.target.value })
                      }
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Role" />
                  </Label>

                  {thisView ? (
                    <span>
                      <p>{currentUser?.role?.name}</p>
                    </span>
                  ) : (
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      defaultValue={{
                        label: currentUser?.role?.name,
                        value: currentUser?.role?.name,
                        id: currentUser?.role?.id,
                      }}
                      onChange={(val) =>
                        setAdmin({ ...admin, role_uid: val?.key })
                      }
                      options={options}
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Manager" />
                  </Label>

                  {thisView ? (
                    <span>
                      <p>{currentUser?.field_staff?.manager?.name}</p>
                    </span>
                  ) : (
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      defaultValue={{
                        label: currentUser?.field_staff?.manager?.name,
                        value: currentUser?.field_staff?.manager?.name,
                        id: currentUser?.field_staff?.manager?.id,
                      }}
                      // value={gender}

                      onChange={(val) => {
                        setAdmin({
                          ...admin,
                          manager_uid: val.key,
                        });
                        getServiceLocationUid(val?.key);
                        setOptionState([])
                        setArray([])
                      }}
                      options={depoManagerFilter}
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Area" />
                  </Label>

                  {thisView ? (
                    <span>
                      {currentUser?.field_staff?.service_location?.map(
                        (item) => (
                          <p>{item?.name}</p>
                        )
                      )}
                    </span>
                  ) : loadingRegion ? (
                    <div className="">
                      <Loader
                        height={18}
                        width={18}
                        type="Oval"
                        color="#0066B3"
                      />
                      &nbsp;
                    </div>
                  ) : (
                    <Select
                      cacheOptions
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      defaultValue={optionState}
                      onChange={(e) => handleChange(e)}
                      options={option}
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>

            {thisView ? (
              <Button
                // className="btn btn-primary"
                style={{ marginRight: '10px', backgroundColor: '#0066B3' }}
                // type="submit"
                // className={`btn-shadow btn-multiple-state ${
                //   loading ? 'show-spinner' : ''
                // }`}
                size="sm"
                onClick={editProfile}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                Edit Profile
              </Button>
            ) : (
              <Button
                // className="btn btn-primary"

                style={{ marginRight: '0px', backgroundColor: '#0066B3' }}
                // type="submit"
                disabled={loading ? true : false}
                className={`btn-shadow btn-multiple-state ${
                  loading ? 'show-spinner' : ''
                }`}
                size="sm"
                onClick={editData}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Save</span>
              </Button>
            )}
            {thisView ? (
              <Button
                style={{ 'background-color': '#0066B3', marginRight: '5px' }}
                // className="btn btn-primary"
                disabled={loading ? true : false}
                className={`btn-shadow btn-multiple-state ${
                  loadingSuspand ? 'show-spinner' : ''
                }`}
                onClick={suspandAdmin}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">{buttonName}</span>
              </Button>
            ) : (
              ''
            )}
             {thisView ? (
                <Button
                  className="btn btn-primary"
                  onClick={showModal}
                  style={{ marginLeft: '3px', 'background-color': '#0066B3' }}
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
     data={currentUser?.email_address}
   />
   </>
  );
}
