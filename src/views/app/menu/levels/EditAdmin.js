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
  ViewSpecificUserAction,
} from 'Store/Actions/User/UserActions';
import Select from 'react-select';
import axios from 'axios';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';
import { NotificationManager } from 'components/common/react-notifications';
import apiServices from 'services/requestHandler';
import ChangePasswordModal from './ChangePasswordModal';
import Loader from 'react-loader-spinner';
const selectGender = [
  { label: 'Male', value: 'male', key: 1 },
  { label: 'Female', value: 'female', key: 2 },
  { label: 'Other', value: 'other', key: 3 },
];
export default function EditAdmin(props) {
  let [buttonName, setButtonName] = useState();
  const authToken = JSON.parse(localStorage.getItem('token'));

  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  // let [laoding, setLoa] = useState();

  const [thisView, setThisView] = useState(true);
  const [loadingSuspand, setLoadingSuspand] = useState(false);

  const currentUser = props?.location?.state;
  const { loading, loadingCreate } = useSelector(
    (state) => state?.ViewUserReducer
  );
  const admin_obj = {
    // email: userSpecific?.user?.email,
    username: currentUser?.username,
    // password: "alpha",

    role: currentUser?.role,
  };
  useEffect(() => {
    // dispatch(ViewSpecificUserAction(currentUser?.id));
    setAdmin(admin_obj);
  }, []);
  useEffect(() => {
    setAdmin(admin_obj);
  }, [currentUser]);
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  // const viewRole = () => {
  //   ViewRoleAction();
  // };

  const [admin, setAdmin] = useState(admin_obj);
  const editProfile = (e) => {
    e.preventDefault();
    setThisView(false);
  };
  const handleChangeToView = () => {
    props.history.push('/app/menu/levels/viewAdmin');
  };
  const editData = async () => {
    let res = await dispatch(UpdateUserAction(admin, currentUser?.id));
    if (res) {
      NotificationManager.success(
        'Successful response',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/menu/levels/viewAdmin');
    }
  };
  const suspandAdmin = async () => {
    setLoadingSuspand(true);

    let apiData = {
      uid: currentUser?.uid,
    };
    let res = await axios.delete(
      `https://dream-finder-backend.herokuapp.com/api/v1/users/${currentUser?.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${authToken?.token}`,
        },
      }
    );
    if (res?.data?.response_code === 200) {
      NotificationManager.success(
        'Successfully Deleted',
        'Success',
        5000,
        null,
        ''
      );
      setLoadingSuspand(false);

      props.history.push('/app/menu/levels/viewAdmin');
    } else {
      NotificationManager.error(
        res?.data?.response_message,
        'Error',
        5000,
        null,
        ''
      );
      setLoadingSuspand(false);
    }

    //  setStatusUpdate()

    // console.log(doctor?.password);
  };
  return (
    <>
      {loading ? (
        <Card>
          <CardBody>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Loader
                type="Puff"
                color="#fed000"
                height={100}
                width={100}
                // color="#fed000"
              />
            </div>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <CardTitle>
              <Button
                className="btn-btn-secondary"
                onClick={handleChangeToView}
                style={{ marginRight: '20px', 'background-color': '#fed000' }}
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
                          <p>{currentUser?.username}</p>
                        </span>
                      ) : (
                        <Input
                          required
                          defaultValue={currentUser?.username}
                          className="form-control"
                          name="name"
                          // validate={validateEmail}
                          onChange={(e) =>
                            setAdmin({ ...admin, username: e.target.value })
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
                          <p>{currentUser?.email}</p>
                        </span>
                      ) : (
                        <Input
                          required
                          disabled
                          defaultValue={currentUser?.email}
                          className="form-control"
                          name="email"
                          type="email"
                          onChange={(e) =>
                            setAdmin({ ...admin, email: e.target.value })
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
                          <p>{currentUser?.role}</p>
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
                            label: currentUser?.role,
                            value: currentUser?.role,
                            key: currentUser?.role,
                          }}
                          onChange={(val) =>
                            setAdmin({
                              ...admin,
                              role: val?.value,
                            })
                          }
                          options={[
                            {
                              label: 'Admin',
                              value: 'admin',
                              key: '1',
                            },
                            {
                              label: 'User',
                              value: 'user',
                              key: '2',
                            },
                          ]}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                {thisView ? (
                  <Button
                    className="btn btn-primary"
                    style={{ backgroundColor: '#fed000' }}
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
                    disabled={loadingCreate}
                    style={{ backgroundColor: '#fed000' }}
                    // type="submit"
                    className={`btn-shadow btn-multiple-state ${
                      loadingCreate ? 'show-spinner' : ''
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
                    style={{ 'background-color': '#fed000', marginLeft: '3px' }}
                    disabled={loadingSuspand}
                    className={`btn-shadow btn-multiple-state ${
                      loadingSuspand ? 'show-spinner' : ''
                    }`}
                    // className="btn btn-primary"
                    onClick={suspandAdmin}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>
                    <span className='label'>Delete User</span>
                  </Button>
                ) : (
                  ''
                )}
              </Form>
            </Formik>
          </CardBody>
        </Card>
      )}

      <ChangePasswordModal
        show={show}
        handleClose={hideModal}
        data={currentUser?.email_address}
      />
    </>
  );
}
