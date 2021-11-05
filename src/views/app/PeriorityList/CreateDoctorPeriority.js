/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  CreateAdminAction,
  ViewAdminAction,
  ViewRoleAction,
} from 'Store/Actions/User/UserActions';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import {
  CreateCustomerPeriorityListAction,
  CreateDoctorPeriorityListAction,
} from 'Store/Actions/PeriorityListAction/PeriorityListAction';
import apiServices from 'services/requestHandler';
import axios from 'axios';
import { getToken } from 'Utils/auth.util';
import Loader from 'react-loader-spinner';

export default function CreatePeriorityList(props) {
  const dispatch = useDispatch();
  const [loadingList, setLoadingList] = useState(false);

  const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [doctorID, setDoctorID] = useState('');
  // const loading = useSelector(state => state?.ViewPeriorityRedcuer?.loading)

  const readDoctor = async () => {
    setLoadingList(true);
    let token = await getToken();
    let res = await axios.get(
      'https://concord-backend-m2.herokuapp.com/api/doctors/read',
      {
        headers: {
          'x-session-key': token?.token,
          'x-session-type': token?.type,
        },
      }
    );
    setLoadingList(false);

    setDoctor(res?.data?.response_data);
  };
  useEffect(() => {
    readDoctor();
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
                  <label>Select Doctor</label>

                  <>
                    {loadingList ? (
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
