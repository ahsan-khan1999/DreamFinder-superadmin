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
} from 'Store/Actions/User/UserActions';
import Select from 'react-select';

import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
const selectGender = [
  { label: 'Male', value: 'male', key: 1 },
  { label: 'Female', value: 'female', key: 2 },
  { label: 'Other', value: 'other', key: 3 },
];
export default function EditAm(props) {
  const [thisView, setThisView] = useState(true);
  const currentUser = props?.location?.state;
  //   console.log(currentUser);
  const [confirmPassword, setConfirmPassword] = useState('');
  console.log(currentUser);
  let [buttonName, setButtonName] = useState();

  const admin_obj = {
    email_address: currentUser?.email_address,
    uid: currentUser?.uid,
    name: currentUser?.name,
    // password: "alpha",

    gender: currentUser?.gender,
    designation: currentUser?.designation,

    phone_number: currentUser?.phone_number,

    role_uid: currentUser?.role?.uid,
  };
  const dispatch = useDispatch();
  const readRoles = () => {
    // dispatch(ViewRoleAction());
  };
  useEffect(() => {
    if (currentUser?.status?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentUser?.status?.name === 'active') {
      setButtonName('Suspend');
    }
    // readRoles();
  }, []);
  const roles = useSelector((state) => state?.ViewUserReducer?.roles);
  let options = [];
  // roles?.filter((item) =>
  //   options.push({ label: item?.name, value: item?.name, key: item?.uid })
  // );
  //   const [currentItem, setCurrentItem] = useState('');
  //   roles?.filter((item) => (

  //   ));

  const [admin, setAdmin] = useState(admin_obj);
  const editProfile = (e) => {
    e.preventDefault();
    setThisView(false);
  };
  const handleChangeToView = () => {
    props.history.push('/app/menu/levels/viewAdmin');
  };
  const editData = async (e) => {
    e.preventDefault();
    console.log(admin);
    let res = await dispatch(UpdateUserAction(admin));
    if (res) {
      NotificationManager.success('Successful response', 'Success', 5000, '');
      props.history.push('/app/menu/levels/viewAdmin');
    }
  };
  const suspandAdmin = async () => {
    if (currentUser?.status?.name === 'suspended') {
      let apiData = {
        uid: currentUser?.uid,
      };
      let res = await apiServices.suspandUser(apiData);
      console.log(res);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/menu/levels/ViewAm');
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
      let apiData = {
        uid: currentUser?.uid,
      };
      let res = await apiServices.suspandUser(apiData);
      console.log(res);
      if (res?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/menu/levels/ViewAm');
      } else {
        NotificationManager.error(
          res?.response_message,
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
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            className="btn-btn-secondary"
            onClick={handleChangeToView}
            style={{ marginRight: '20px', 'background-color': '#003766' }}
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
                      <p>{admin.name}</p>
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
                      <p>{admin.email_address}</p>
                    </span>
                  ) : (
                    <Input
                      required
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
                      <p>{admin?.role_uid}</p>
                    </span>
                  ) : (
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      //   defaultValue={}
                      // value={gender}

                      onChange={(val) =>
                        setAdmin({ ...admin, role_uid: val?.key })
                      }
                      options={options}
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
                className="btn btn-primary"
                // type="submit"
                // className={`btn-shadow btn-multiple-state ${
                //   loading ? 'show-spinner' : ''
                // }`}
                size="sm"
                onClick={editData}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                Save
              </Button>
            )}
             {thisView ? (
              <Button
                style={{ 'background-color': '#003766', marginRight: '5px' }}
                // className="btn btn-primary"
                onClick={suspandAdmin}
                // className={`btn-shadow btn-multiple-state ${
                //   loading ? 'show-spinner' : ''
                // }`}
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
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
