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
  EditCustomerPeriorityListAction,
  EditDoctorPeriorityListAction,
  SuspandDoctorPeriorityListAction,
} from 'Store/Actions/PeriorityListAction/PeriorityListAction';
import apiServices from 'services/requestHandler';
import axios from 'axios';
import { getToken } from 'Utils/auth.util';

export default function EditDoctorPeriorityList(props) {
  const currentList = props.location.state;
  console.log(currentList);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [suspandloading, setsuspandLoading] = useState(false);

  const [customer, setCustomer] = useState([]);
  const [customerID, setCustomerID] = useState('');
  const [view, setView] = useState(true);

  const readDoctors = async () => {
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
    setCustomer(res?.data?.response_data);
  };
  useEffect(() => {
    readDoctors();
  }, []);
  let customerOptions = [];
  customer?.map((item) =>
    customerOptions.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  const editCustomerPeriorityList = async () => {
    setLoading(true);
    let apiData = {
      uid: currentList?.uid,
      doctor_uid: customerID,
    };
    let res = await dispatch(EditDoctorPeriorityListAction(apiData));
    if (res) {
      NotificationManager.success(
        'Updated Successfully',
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
  const editPeriority = () => {
    setView(false);
  };
  const suspand = () => {
    setsuspandLoading(true);
    let res = dispatch(
      SuspandDoctorPeriorityListAction({ uid: currentList?.uid })
    );
    if (res) {
      NotificationManager.success(
        'Successfully Suspanded',
        'Success',
        5000,
        null,
        ''
      );
      setsuspandLoading(false);
      props.history.push('/app/PeriorityList/ViewPeriorityListDoctor');
    } else {
      setsuspandLoading(false);
    }
  };
  const handleBack = () =>{
      props.history.push('/app/PeriorityList/ViewPeriorityListDoctor')
  }
  return (
    <Card>
      <CardBody>
          <Button 
          style={{backgroundColor:"#0066B3"}}
          onClick={handleBack}>Back</Button>
        <CardTitle>
          <IntlMessages id="View Doctor Periority List" />
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
                  {view ? (
                    <span>
                      <p>{currentList?.doctor?.name}</p>
                    </span>
                  ) : (
                    <>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        // value={gender}
                        defaultValue={{
                          label: currentList?.doctor?.name,
                          value: currentList?.doctor?.name,
                          key: currentList?.doctor?.uid,
                        }}
                        onChange={(val) => {
                          // console.log(val.key);
                          setCustomerID(val.key);
                        }}
                        options={customerOptions}
                      />
                    </>
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Doctor Category</Label>
                  
                  <span>
                    <p>{currentList?.doctor?.doctor_category?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Doctor Phone Number</Label>
                  <span>
                    <p>{currentList?.doctor?.phone_number}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Doctor Organization</Label>
                  <span>
                    <p>{currentList?.doctor?.organization}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Doctor Market Name</Label>
                  <span>
                    <p>{currentList?.doctor?.market?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Doctor Designation</Label>
                  <span>
                    <p>{currentList?.doctor?.designation}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Doctor Status</Label>
                  <span style={{color:currentList?.doctor?.status?.name === 'active' ? 'green' : 'red'}}>
                    <p>{currentList?.doctor?.status?.name?.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Doctor Periority List Status</Label>
                  <span style={{color:currentList?.status?.name === 'active' ? 'green' : 'red'}}>
                    <p>{currentList?.status?.name?.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
            </Row>
            {view ? (
              
              <Button
              style={{backgroundColor:"#0066B3"}}
               onClick={editPeriority}>Edit Profile</Button>
            ) : (
              <>
                <Button
                  // className="btn btn-primary"
                  style={{backgroundColor:"#0066B3"}}
                  // type="submit"
                  className={`btn-shadow btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
                  size="sm"
                  onClick={editCustomerPeriorityList}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  Edit
                </Button>
                
              </>
            )}
            <Button
                  // className="btn btn-primary"
                  style={{backgroundColor:"#0066B3"}}
                  // type="submit"
                  className={`btn-shadow btn-multiple-state ${
                    suspandloading ? 'show-spinner' : ''
                  }`}
                  size="sm"
                  onClick={suspand}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  Suspand
                </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
