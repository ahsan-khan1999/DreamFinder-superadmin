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
import { CreateCustomerPeriorityListAction, CreateDoctorPeriorityListAction } from 'Store/Actions/PeriorityListAction/PeriorityListAction';
import apiServices from 'services/requestHandler';
import axios from 'axios';
import { getToken } from 'Utils/auth.util';

export default function CreatePeriorityList(props) {
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(false);
  const [doctor, setDoctor] = useState([]);
  const [doctorID, setDoctorID] = useState('');
  const loading = useSelector(state => state?.ViewPeriorityRedcuer?.loading)

  const readDoctor = async () => {
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

      props.history.push('/app/PeriorityList/ViewPeriorityList');
    }else{

    }
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Doctor Periority List" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Doctor" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      // value={gender}
                      // defaultValue={{
                      //   label: admin?.gender,
                      //   value: admin?.gender,
                      //   key: admin?.gender,
                      // }}
                      onChange={(val) => {
                        // console.log(val.key);
                        setDoctorID(val.key)}}
                      options={doctorOptions}
                    />
                  </>
                </FormGroup>
              </Col>
            </Row>

            <Button
              // className="btn btn-primary"
              style={{backgroundColor:"#0066B3"}}
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
              Add
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
