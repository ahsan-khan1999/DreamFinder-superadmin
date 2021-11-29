/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  CreateAdminAction,
  ViewAdminAction,
  ViewRoleAction,
  ViewSalesManagerManagerAction,
} from 'Store/Actions/User/UserActions';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import {
  CreateCustomerPeriorityListAction,
  CreateDoctorPeriorityListAction,
  ViewMpoDoctor,
} from 'Store/Actions/PeriorityListAction/PeriorityListAction';
import apiServices from 'services/requestHandler';
import axios from 'axios';
import { getToken } from 'Utils/auth.util';
import Loader from 'react-loader-spinner';
import { getUsers } from 'Store/Actions/AttendanceActions/AttendanceAction';

export default function CreatePeriorityList(props) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [doctorID, setDoctorID] = useState('');
  const doctor = useSelector(state => state?.ViewPeriorityRedcuer?.doctor)
  const loadingDoctor = useSelector(state => state?.ViewPeriorityRedcuer?.loadingDoctor)


  const sm = useSelector((state) => state?.ViewUserReducer?.salesManager);
  const loadingSM = useSelector((state) => state?.ViewUserReducer?.loading);

  const customers = useSelector(
    (state) => state?.ViewPeriorityRedcuer?.customers
  );
  const rsm = useSelector((state) => state?.AttendanceReducer?.rsm);
  const am = useSelector((state) => state?.AttendanceReducer?.am);
  const mpo = useSelector((state) => state?.AttendanceReducer?.mpo);
  const loadingAM = useSelector((state) => state?.AttendanceReducer?.loadingAm);
  const loadingRSM = useSelector(
    (state) => state?.AttendanceReducer?.loadingRsm
  );
  const loadingMPO = useSelector(
    (state) => state?.AttendanceReducer?.loadingMpo
  );

  let salesManagerOption = [];
  sm?.map((item) =>
    salesManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );

  let regionalSalesManagerOption = [];
  rsm?.map((item) =>
    regionalSalesManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let areaManagerOption = [];
  am?.map((item) =>
    areaManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let mpoOption = [];
  mpo?.map((item) =>
    mpoOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
 
  useEffect(() => {
    // readDoctor();
    dispatch(ViewSalesManagerManagerAction())
  }, []);
  let doctorOptions = [];
  doctor?.map((item) =>
    doctorOptions.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  const createDoctorPeriorityList = async () => {
    setLoading(true);
    let res = await dispatch(
      CreateDoctorPeriorityListAction({ doctor_uid: doctorID })
    );
    if (res) {
      NotificationManager.success(
        'Successfully Created',
        'Success',
        5000,
        null,
        ''
      );
      setLoading(false);

      props.history.push('/app/PeriorityList/ViewPeriorityListDoctor');
    } else {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>Create Doctor Priority List</CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">


            <Col lg={6}>
                <FormGroup>
                  <Label>Select Sales Manager</Label>
                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    onChange={async (val) => {
                      dispatch(getUsers(val.key, 'rsm'));
                    }}
                    options={salesManagerOption}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Select Regional Sales Manager</Label>
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
                      name="form-field-name-gender"
                      onChange={async (val) => {
                        dispatch(getUsers(val.key, 'am'));
                      }}
                      options={regionalSalesManagerOption}
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Select Area Manager</Label>
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
                      name="form-field-name-gender"
                      onChange={async (val) => {
                        dispatch(getUsers(val.key, 'mpo'));
                      }}
                      options={areaManagerOption}
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Select MPO</Label>
                  {loadingMPO ? (
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
                      name="form-field-name-gender"
                      onChange={async (val) => {
                        dispatch(ViewMpoDoctor(val?.key));
                      }}
                      options={mpoOption}
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>Select Doctor</label>

                  <>
                    {loadingDoctor ? (
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
                        name="form-field-name-gender"
                        onChange={(val) => {
                          setDoctorID(val.key);
                        }}
                        options={doctorOptions}
                      />
                    )}
                  </>
                </FormGroup>
              </Col>
            </Row>

            <Button
              // className="btn btn-primary"
              style={{ backgroundColor: '#0066B3' }}
              disabled={loading ? true : false}
              // type="submit"
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={createDoctorPeriorityList}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Add</span>
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
