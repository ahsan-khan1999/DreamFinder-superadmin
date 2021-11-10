/* eslint-disable */

import Select from 'react-select';
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Button from '@mui/material/Button';

import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button as Buttin,
} from 'reactstrap';
import {
  ViewMPOManagerAction,
  ViewAreaManagerAction,
  ViewRegionalSalesManagerManagerAction,
  ViewDirectorAction,
  ViewSalesManagerManagerAction,
  ViewDeliveryStaffAction,
  ViewDepoAction,
} from 'Store/Actions/User/UserActions';
import {
  CreateAttendanceAction,
  getUsers,
} from 'Store/Actions/AttendanceActions/AttendanceAction';
import moment from 'moment';
import { getToken } from '@firebase/messaging';
import Loader from 'react-loader-spinner';
const delaultOptions = [
  { label: 'Depo Manager', value: 'Depo Manager', key: 1 },
  { label: 'Delivery Staff', value: 'Delivery Staff', key: 2 },

  { label: 'SM', value: 'SM', key: 3 },
  { label: 'RSM', value: 'RSM', key: 4 },

  { label: 'AM', value: 'AM', key: 5 },
  { label: 'MPO', value: 'MPO', key: 6 },
];

export default function CreateAttendance(props) {
  const [imageUploadData, setImageUploadData] = useState({});

  const attendance_obj = {
    user_uid: '',
    image_url: imageUploadData?.attendance__image__url,
    datetime: '',
  };
  const loadingSM = useSelector((state) => state?.AttendanceReducer?.loadingSm);
  const loadingAM = useSelector((state) => state?.AttendanceReducer?.loadingAm);
  const loadingRSM = useSelector(
    (state) => state?.AttendanceReducer?.loadingRsm
  );
  const loadingMPO = useSelector(
    (state) => state?.AttendanceReducer?.loadingMpo
  );
  let [loadingMedicine, setLoadingMedicine] = useState(false);
  let [loadingStocks, setLoadingStocks] = useState(false);
  const [attendance, setAttendance] = useState(attendance_obj);
  console.log(imageUploadData, 'test');
  const [director, setDirector] = useState([]);
  const [selected, setSelected] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingFileUpload, setLoadingFileUpload] = useState(false);

  const [file, setFile] = useState();
  useEffect(() => {
    // dispatch(ViewMPOManagerAction());
    dispatch(ViewDepoAction());
    dispatch(ViewDeliveryStaffAction());
    dispatch(ViewDirectorAction());
    // dispatch(ViewAreaManagerAction());
    // dispatch(ViewSalesManagerManagerAction());
    // dispatch(ViewRegionalSalesManagerManagerAction());
  }, []);
  const sm = useSelector((state) => state?.AttendanceReducer?.sm);
  const rsm = useSelector((state) => state?.AttendanceReducer?.rsm);
  const am = useSelector((state) => state?.AttendanceReducer?.am);
  const mpo = useSelector((state) => state?.AttendanceReducer?.mpo);
  // const loading = useSelector((state) => state?.AttendanceReducer?.loading);

  const depo = useSelector((state) => state?.ViewUserReducer?.depoManager);
  const directorUser = useSelector((state) => state?.ViewUserReducer?.director);

  const deliveryStaff = useSelector(
    (state) => state?.ViewUserReducer?.deliveryStaff
  );

  let directorOption = [];
  directorUser?.map((item) =>
    directorOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let deliiveryOption = [];
  deliveryStaff.map((item) =>
    deliiveryOption.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );

  let salesManagerOption = [];
  sm?.map((item) =>
    salesManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let rsmOptions = [];
  rsm.map((item) =>
    rsmOptions?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let amOptions = [];
  am.map((item) =>
    amOptions?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let mpoOptions = [];
  mpo.map((item) =>
    mpoOptions?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  //   mpo.map((item) => {
  //     mpoOptions.push({
  //       label: item?.name,
  //       value: item?.name,
  //       key: item?.uid,
  //     });
  //   });

  const uploadFile = async (event) => {
    setLoadingFileUpload(true);
    event.preventDefault();
    let formdata = new FormData();
    const authToken = JSON.parse(localStorage.getItem('token'));

    if (file === undefined || file === null) {
      NotificationManager.error('Select File', 'Error', 5000, '');
      setLoading(false);

      return;
    } else {
      formdata.append('file', file[0]);
      formdata.append('purpose', 'attendance__image');

      let res = await axios.post(
        'https://concord-backend-m2.herokuapp.com/api/media/upload/image',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-session-key': authToken.token,
            'x-session-type': authToken.type,
          },
        }
      );
      setLoadingFileUpload(false);
      setImageUploadData(res?.data?.response_data);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Successfully Uploaded Image',
          'Success',
          5000,
          ''
        );
        // props.history.push('/app/Reports/viewReports');
        setLoadingFileUpload(false);
      } else {
        NotificationManager.error(
          res?.data?.response_message,
          'Error',
          5000,
          ''
        );
        setLoadingFileUpload(false);
      }
      setLoadingFileUpload(false);
    }
  };
  //   console.log(imageUploadData);
  const createAttendance = async () => {
    console.log(attendance, 'attendance');
    if (
      attendance?.datetime === '' ||
      imageUploadData?.attendance__image__url === undefined ||
      attendance?.user_uid === ''
    ) {
      setLoading(true);
      NotificationManager.error(
        'Please Enter Details',
        'Error',
        5000,
        null,
        ''
      );
      setLoading(false);

      return;
    } else {
      setLoading(true);

      let datetimeFormat = moment(attendance?.datetime).format(
        'YYYY-MM-DD hh:mm:ss'
      );
      let apiData = {
        ...attendance,
        datetime: datetimeFormat,
        image_url: imageUploadData?.attendance__image__url,
      };
      // console.log(apiData);

      let res = await dispatch(CreateAttendanceAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        setLoading(false);

        props.history.push('/app/Attendance/ViewAttendance');
      } else {
        setLoading(false);
      }
    }
  };
  const handleBack =()=>{
    props.history.push('/app/Attendance/ViewAttendance');

  }
  return (
    <Card>
      <CardBody>
      <Buttin style={{ backgroundColor: '#0066B3' }} onClick={handleBack}>Back
        </Buttin>

        <CardTitle>Create Attendance</CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>Select User</Label>
                  <Select
                    required
                    isDisabled={selected === '' ? false : true}
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="selectUserid"
                    required
                    onChange={(val) => setSelected(val.value)}
                    options={delaultOptions}
                  />
                </FormGroup>
              </Col>
              {selected === 'Depo Manager' ? (
                <>
                  <Col lg={6}>
                    <div className="form-row">
                      <div className="form-group col-md-9">
                        <label className="">Select File :</label>
                        <input
                          type="file"
                          className="form-control"
                          name="upload_file"
                          onChange={async (e) => {
                            await setFile(e.target.files);
                          }}
                        />
                      </div>
                      <div
                        className="form-group col-md-3"
                        style={{ marginTop: '25px' }}
                      >
                        <Button onClick={uploadFile} variant="outlined">
                          Save
                        </Button>
                      </div>
                    </div>

                    {/* <div className="form-row">
                      <div className="col-md-6">
                        <button
                          type="submit"
                          style={{ 'background-color': '#003766' }}
                          className={`btn btn-primary btn-shadow btn-multiple-state ${
                            loading ? 'show-spinner' : ''
                          }`}
                          onClick={uploadFile}
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          Save
                        </button>
                      </div>
                    </div> */}
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter Date</Label>
                      <Input
                        type="datetime-local"
                        onChange={(e) =>
                          setAttendance({
                            ...attendance,
                            datetime: e.target.value,
                          })
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Depo Manager</Label>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={(val) =>
                          setAttendance({
                            ...attendance,
                            user_uid: val?.key,
                          })
                        }
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
                </>
              ) : selected === 'Delivery Staff' ? (
                <>
                  <Col lg={6}>
                    <div className="form-row">
                      <div className="form-group col-md-9">
                        <label className="">Select File :</label>
                        <input
                          type="file"
                          className="form-control"
                          name="upload_file"
                          onChange={async (e) => {
                            await setFile(e.target.files);
                          }}
                        />
                      </div>
                      <div
                        className="form-group col-md-3"
                        style={{ marginTop: '25px' }}
                      >
                        <Button onClick={uploadFile} variant="outlined">
                          Save
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter Date</Label>
                      <Input
                        type="datetime-local"
                        onChange={(e) =>
                          setAttendance({
                            ...attendance,
                            datetime: e.target.value,
                          })
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Delivery Staff</Label>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={async (val) => {
                          setAttendance({
                            ...attendance,
                            user_uid: val?.key,
                          });
                          //   await getDirector(val?.key);
                        }}
                        options={deliiveryOption}
                      />
                    </FormGroup>
                  </Col>
                </>
              ) : selected === 'SM' ? (
                <>
                  <Col lg={6}>
                    <div className="form-row">
                      <div className="form-group col-md-9">
                        <label className="">Select File :</label>
                        <input
                          type="file"
                          className="form-control"
                          name="upload_file"
                          onChange={async (e) => {
                            await setFile(e.target.files);
                          }}
                        />
                      </div>
                      <div
                        className="form-group col-md-3"
                        style={{ marginTop: '25px' }}
                      >
                        <Button onClick={uploadFile} variant="outlined">
                          Save
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter Date</Label>
                      <Input
                        type="datetime-local"
                        onChange={(e) =>
                          setAttendance({
                            ...attendance,
                            datetime: e.target.value,
                          })
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Director</Label>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={(val) => {
                          //   setAttendance({
                          //     ...attendance,
                          //     user_uid: val?.key,
                          //   });
                          //   console.log(val.key);
                          dispatch(getUsers(val.key, 'sm'));
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select SM</Label>
                      {loadingSM ? (
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
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="selectUserid"
                          required
                          onChange={async (val) => {
                            setAttendance({
                              ...attendance,
                              user_uid: val?.key,
                            });
                            //   await getDirector(val?.key);
                          }}
                          options={salesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected === 'RSM' ? (
                <>
                  <Col lg={6}>
                    <div className="form-row">
                      <div className="form-group col-md-9">
                        <label className="">Select File :</label>
                        <input
                          type="file"
                          className="form-control"
                          name="upload_file"
                          onChange={async (e) => {
                            await setFile(e.target.files);
                          }}
                        />
                      </div>
                      <div
                        className="form-group col-md-3"
                        style={{ marginTop: '25px' }}
                      >
                        <Button onClick={uploadFile} variant="outlined">
                          Save
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter Date</Label>
                      <Input
                        type="datetime-local"
                        onChange={(e) =>
                          setAttendance({
                            ...attendance,
                            datetime: e.target.value,
                          })
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Director</Label>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={(val) => {
                          //   setAttendance({
                          //     ...attendance,
                          //     user_uid: val?.key,
                          //   });
                          //   console.log(val.key);
                          dispatch(getUsers(val.key, 'sm'));
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select SM</Label>
                      {loadingSM ? (
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
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="selectUserid"
                          required
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'rsm'));

                            //   await getDirector(val?.key);
                          }}
                          options={salesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select RSM</Label>
                      {loadingRSM ? (
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
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="selectUserid"
                          required
                          onChange={async (val) => {
                            setAttendance({
                              ...attendance,
                              user_uid: val.key,
                            });

                            //   await getDirector(val?.key);
                          }}
                          options={rsmOptions}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected === 'AM' ? (
                <>
                  <Col lg={6}>
                    <div className="form-row">
                      <div className="form-group col-md-9">
                        <label className="">Select File :</label>
                        <input
                          type="file"
                          className="form-control"
                          name="upload_file"
                          onChange={async (e) => {
                            await setFile(e.target.files);
                          }}
                        />
                      </div>
                      <div
                        className="form-group col-md-3"
                        style={{ marginTop: '25px' }}
                      >
                        <Button onClick={uploadFile} variant="outlined">
                          Save
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter Date</Label>
                      <Input
                        type="datetime-local"
                        onChange={(e) =>
                          setAttendance({
                            ...attendance,
                            datetime: e.target.value,
                          })
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Director</Label>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={(val) => {
                          //   setAttendance({
                          //     ...attendance,
                          //     user_uid: val?.key,
                          //   });
                          //   console.log(val.key);
                          dispatch(getUsers(val.key, 'sm'));
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select SM</Label>
                      {loadingSM ? (
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
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="selectUserid"
                          required
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'rsm'));

                            //   await getDirector(val?.key);
                          }}
                          options={salesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select RSM</Label>
                      {loadingRSM ? (
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
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="selectUserid"
                          required
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'am'));

                            //   await getDirector(val?.key);
                          }}
                          options={rsmOptions}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select AM</Label>
                      {loadingAM ? (
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
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="selectUserid"
                          required
                          onChange={async (val) => {
                            setAttendance({
                              ...attendance,
                              user_uid: val.key,
                            });
                          }}
                          options={amOptions}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected === 'MPO' ? (
                <>
                  <Col lg={6}>
                    <div className="form-row">
                      <div className="form-group col-md-9">
                        <label className="">Select File :</label>
                        <input
                          type="file"
                          className="form-control"
                          name="upload_file"
                          onChange={async (e) => {
                            await setFile(e.target.files);
                          }}
                        />
                      </div>
                      <div
                        className="form-group col-md-3"
                        style={{ marginTop: '25px' }}
                      >
                        <Button
                          className={`btn-shadow btn-multiple-state ${
                            loadingFileUpload ? 'show-spinner' : ''
                          }`}
                          onClick={uploadFile}
                          variant="outlined"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter Date</Label>
                      <Input
                        type="datetime-local"
                        onChange={(e) =>
                          setAttendance({
                            ...attendance,
                            datetime: e.target.value,
                          })
                        }
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Director</Label>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={(val) => {
                          //   setAttendance({
                          //     ...attendance,
                          //     user_uid: val?.key,
                          //   });
                          //   console.log(val.key);
                          dispatch(getUsers(val.key, 'sm'));
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select SM</Label>
                      {loadingSM ? <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div> : <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={async (val) => {
                          dispatch(getUsers(val.key, 'rsm'));

                          //   await getDirector(val?.key);
                        }}
                        options={salesManagerOption}
                      />}
                     
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select RSM</Label>
                      {loadingRSM ? <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div> :<Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={async (val) => {
                          dispatch(getUsers(val.key, 'am'));

                          //   await getDirector(val?.key);
                        }}
                        options={rsmOptions}
                      /> }
                      
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select AM</Label>
                      {loadngAM ? <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div> : <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={async (val) => {
                          dispatch(getUsers(val.key, 'mpo'));
                        }}
                        options={amOptions}
                      />}
                      
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select MPO</Label>
                      {loadingMPO ? <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div> : <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="selectUserid"
                        required
                        onChange={async (val) => {
                          setAttendance({
                            ...attendance,
                            user_uid: val.key,
                          });
                        }}
                        options={mpoOptions}
                      />}
                      
                    </FormGroup>
                  </Col>
                </>
              ) : (
                <div></div>
              )}
            </Row>
            <Buttin
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              disabled={loading ? true : false}
              onClick={createAttendance}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Add Attendance</span>
            </Buttin>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
