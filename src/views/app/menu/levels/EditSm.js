/* eslint-disable */

import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { React, useState, useEffect, useRef } from 'react';
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
  ViewSalesManagerManagerAction,
  ViewDirectorAction,
} from 'Store/Actions/User/UserActions';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import { getToken } from 'Utils/auth.util';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import ChangePasswordModal from './ChangePasswordModal';
import { BASEURL } from 'services/HttpProvider';

const selectGender = [
  { label: 'Male', value: 'male', key: 1 },
  { label: 'Female', value: 'female', key: 2 },
  { label: 'Other', value: 'other', key: 3 },
];
export default function EditSm(props) {
  const selectRef = useRef('');
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const currentUser = props?.location?.state;
  let [loadingLocation, setLoadingLocation] = useState(false);
  const [optionsState, setOptionState] = useState([]);
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

    phone_number: currentUser?.phone_number,

    role_uid: currentUser?.role?.uid,
    manager_uid: currentUser?.field_staff?.manager?.uid,

    service_location_uid: service_location_id,
  };
  const [buttonName, setButtonName] = useState('');
  const [admin, setAdmin] = useState(admin_obj);
  const [loading, setLoading] = useState(false);
  const [loadingSuspand, setLoadingSuspand] = useState(false);

  const [thisView, setThisView] = useState(true);

  //   console.log(currentUser);
  const [confirmPassword, setConfirmPassword] = useState('');
  let [service_location, setService_location] = useState([]);
  const [array, setArray] = useState(admin?.service_location_uid);

  const dispatch = useDispatch();
  const readRoles = () => {
    dispatch(ViewRoleAction());
  };
  let defaultOptions = currentUser?.field_staff?.service_location?.map(
    (item) => ({ label: item?.name, value: item?.name, id: item?.uid })
  );
  useEffect(() => {
    setAdmin(admin_obj);
    setOptionState(defaultOptions);
    if (currentUser?.status?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentUser?.status?.name === 'active') {
      setButtonName('Suspend');
    }
    readRoles();
    dispatch(ViewDirectorAction());
  }, []);

  //   const [currentItem, setCurrentItem] = useState('');
  //   roles?.filter((item) => (

  //   ));
  const roles = useSelector((state) => state?.ViewUserReducer?.roles);
  const user = useSelector((state) => state?.ViewUserReducer?.director);
  let options = [];
  roles?.filter((item) =>
    item?.category?.user_role_id == 3
      ? options.push({ label: item?.name, value: item?.name, key: item?.uid })
      : null
  );
  const editProfile = (e) => {
    e.preventDefault();
    setThisView(false);
  };
  const handleChangeToView = () => {
    props.history.push('/app/menu/levels/ViewSm');
  };
  const editData = async (e) => {
    setLoading(true);
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
      setLoading(false);
    } else {
      setLoading(true);

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
          setLoading(false);

          props.history.push('/app/menu/levels/ViewSm');
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
          setLoading(false);

          props.history.push('/app/menu/levels/ViewSm');
        }
        setLoading(false);
      }
      setLoading(false);
    }
  };
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
        props.history.push('/app/menu/levels/ViewSm');
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

        props.history.push('/app/menu/levels/ViewSm');
      } else {
        setLoadingSuspand(true);

        NotificationManager.error(
          res?.response_message,
          'Error',
          5000,
          null,
          ''
        );
        setLoadingSuspand(false);
      }
      setLoadingSuspand(false);
    }
    //  setStatusUpdate()

    // console.log(doctor?.password);
  };
  let directorFilter = [];
  user?.filter((item) =>
    directorFilter?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let option = [];
  let value = [];

  const handleChange = async (e) => {
    let options = e;
    options?.map((item, index) => {
      value.push(item?.key);
    });
    await setArray(value);
    // await setDeliveryStaff({ ...deliveryStaff, service_location_uid: value });
  };
  const getServiceLocationUid = async (uid) => {
    setLoadingLocation(true);

    let token = await getToken();
    const response = await axios.get(
      BASEURL+`/region-classifications/read/region?child_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );
    setLoadingLocation(false);

    setService_location(response?.data?.response_data);
  };
  service_location?.filter((item) =>
    option?.push({ label: item?.name, value: item?.name, key: item?.uid })
  );

  return (
    <>
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            className="btn-btn-secondary"
            onClick={handleChangeToView}
            style={{ marginRight: '20px', 'background-color': '##0066B3' }}
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
                      value={admin?.name}
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
                      disabled
                      required
                      value={admin?.email_address}
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
                      disabled
                      required
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
                      value={admin?.designation}
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
                      // value={gender}

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
                    <IntlMessages id="Select Director" />
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
                      defaultValue={{
                        label: currentUser?.field_staff?.manager?.name,
                        value: currentUser?.field_staff?.manager?.name,
                        id: currentUser?.field_staff?.manager?.id,
                      }}
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      // value={gender}

                      onChange={(val) => {
                        setAdmin({
                          ...admin,
                          manager_uid: val.key,
                        });
                        getServiceLocationUid(val.key);
                        setOptionState([]);
                        setArray([]);
                      }}
                      options={directorFilter}
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Region" />
                  </Label>
                  {thisView ? (
                    currentUser?.field_staff?.service_location?.map((item) => (
                      <span>
                        <p>{item?.name}</p>
                      </span>
                    ))
                  ) : loadingLocation ? (
                    <div className="">
                      <Loader
                        height={18}
                        width={18}
                        type="Oval"
                        color="#0066B3"
                      />
                      &nbsp;
                    </div>
                  ) : loadingLocation ? (
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
                      // defaultValue={defaultOptions[0]}
                      defaultValue={optionsState}
                      // value={admin?.service_location_uid}
                      onChange={(e) => handleChange(e)}
                      options={option}
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>

            {thisView ? (
              <Button
                className="btn btn-primary"
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
                disabled={loading ? true : false}
                style={{ 'background-color': '##0066B3' }}
                // type="submit"
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
                style={{ 'background-color': '##0066B3', marginLeft: '5px' }}
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
