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
  ViewAreaManagerAction,
} from 'Store/Actions/User/UserActions';
import Select from 'react-select';

import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
const animatedComponents = makeAnimated();
import ChangePasswordModal from './ChangePasswordModal';

import { getToken } from 'Utils/auth.util';
import Loader from 'react-loader-spinner';
import { BASEURL } from 'services/HttpProvider';
const selectGender = [
  { label: 'Male', value: 'male', key: 1 },
  { label: 'Female', value: 'female', key: 2 },
  { label: 'Other', value: 'other', key: 3 },
];
export default function EditMpo(props) {
  const currentUser = props?.location?.state;
  const [optionState, setOptionState] = useState([]);
  let [loadingLocation, setLoadingLocation] = useState(false);
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
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
  const [thisView, setThisView] = useState(true);
  const [admin, setAdmin] = useState(admin_obj);
  const [array, setArray] = useState(admin?.service_location_uid);

  const [loading, setLoading] = useState(false);
  const [loadingSuspand, setLoadingSuspand] = useState(false);

  let [service_location, setService_location] = useState([]);

  //   console.log(currentUser);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [buttonName, setButtonName] = useState('');

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
    dispatch(ViewAreaManagerAction());
  }, []);
  const roles = useSelector((state) => state?.ViewUserReducer?.roles);
  const user = useSelector((state) => state?.ViewUserReducer?.areaManager);

  let options = [];
  roles?.filter((item) =>
    item?.category?.user_role_id == 6
      ? options.push({ label: item?.name, value: item?.name, key: item?.uid })
      : null
  );
  let amOptiopns = [];

  user?.filter((item) =>
    amOptiopns?.push({ label: item?.name, value: item?.name, key: item?.uid })
  );

  const editProfile = (e) => {
    e.preventDefault();
    setThisView(false);
  };
  const handleChangeToView = () => {
    props.history.push('/app/menu/levels/ViewMpo');
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

          props.history.push('/app/menu/levels/ViewMpo');
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

          props.history.push('/app/menu/levels/ViewMpo');
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
        props.history.push('/app/menu/levels/ViewMpo');
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

        props.history.push('/app/menu/levels/ViewMpo');
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
    }
    //  setStatusUpdate()

    // console.log(doctor?.password);
  };
  const getServiceLocationUid = async (uid) => {
    setLoadingLocation(true);
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
    setLoadingLocation(false);

    setService_location(response?.data?.response_data);
  };
  let value = [];
  let option = [];
  service_location?.filter((item) =>
    option?.push({ label: item?.name, value: item?.name, key: item?.uid })
  );
  const handleChange = async (e) => {
    let options = e;
    options?.map((item, index) => {
      value.push(item?.key);
    });
    await setArray(value);
    // await setDeliveryStaff({ ...deliveryStaff, service_location_uid: value });
  };

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <Button
              className="btn-btn-secondary"
              onClick={handleChangeToView}
              style={{ marginRight: '20px', 'background-color': '#0066B3' }}
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
                        required
                        disabled
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
                        //   defaultValue={}
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
                      <IntlMessages id="Select AM" />
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
                        // value={gender}
                        defaultValue={{
                          label: currentUser?.field_staff?.manager?.name,
                          value: currentUser?.field_staff?.manager?.name,
                          id: currentUser?.field_staff?.manager?.id,
                        }}
                        onChange={(val) => {
                          setAdmin({
                            ...admin,
                            manager_uid: val.key,
                          });
                          getServiceLocationUid(val.key);
                          setOptionState([]);
                          setArray([]);
                        }}
                        options={amOptiopns}
                      />
                    )}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Select Territory" />
                    </Label>
                    {thisView ? (
                      currentUser?.field_staff?.service_location?.map(
                        (item) => (
                          <span>
                            <p>{item?.name}</p>
                          </span>
                        )
                      )
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
                  className="btn btn-primary"
                  // type="submit"
                  style={{ 'background-color': '#0066B3', marginRight: '5px' }}
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
                  className="btn btn-primary"
                  style={{ 'background-color': '#0066B3', marginRight: '5px' }}
                  disabled={loading ? true : false}
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
                  style={{ 'background-color': '#0066B3' }}
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
