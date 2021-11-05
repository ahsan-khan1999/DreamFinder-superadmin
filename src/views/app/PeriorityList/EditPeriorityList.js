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
  SuspandCustomerPeriorityListAction,
} from 'Store/Actions/PeriorityListAction/PeriorityListAction';
import apiServices from 'services/requestHandler';
import axios from 'axios';
import { getToken } from 'Utils/auth.util';

export default function EditPeriorityList(props) {
  const currentList = props.location.state;
  console.log(currentList);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [suspandLoading, setsuspandLoading] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [customerID, setCustomerID] = useState('');
  const [view, setView] = useState(true);

  const readCustomers = async () => {
    let token = await getToken();
    let res = await axios.get(
      'https://concord-backend-m2.herokuapp.com/api/customers/read',
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
    readCustomers();
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
      customer_uid: customerID,
    };
    let res = await dispatch(EditCustomerPeriorityListAction(apiData));
    if (res) {
      NotificationManager.success(
        'Updated Successfully',
        'Success',
        5000,
        null,
        ''
      );
      setLoading(false);

      props.history.push('/app/PeriorityList/ViewPeriorityList');
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
      SuspandCustomerPeriorityListAction({ uid: currentList?.uid })
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
      props.history.push('/app/PeriorityList/ViewPeriorityList');
    } else {
      setsuspandLoading(false);
    }
  };
  const handleBack = () => {
    props.history.push('/app/PeriorityList/ViewPeriorityList');
  };
  return (
    <Card>
      <CardBody>
        <Button style={{ backgroundColor: '#0066B3' }} onClick={handleBack}>
          Back
        </Button>
        <CardTitle>
          <IntlMessages id="View Customer Priority List" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Customer" />
                  </label>
                  {view ? (
                    <span>
                      <p>{currentList?.customer?.name}</p>
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
                          label: currentList?.customer?.name,
                          value: currentList?.customer?.name,
                          key: currentList?.customer?.uid,
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
                  <Label>Customer Email Addres</Label>

                  <span>
                    <p>{currentList?.customer?.email_address}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Customer Phone Number</Label>
                  <span>
                    <p>{currentList?.customer?.phone_number}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Customer Market Street Address</Label>
                  <span>
                    <p>{currentList?.customer?.market__street_address}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Customer Market Name</Label>
                  <span>
                    <p>{currentList?.customer?.market?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Customer Client Type</Label>
                  <span>
                    <p>{currentList?.customer?.client_type}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Customer Status</Label>
                  <span
                    style={{
                      color:
                        currentList?.status?.name === 'active'
                          ? 'green'
                          : 'red',
                    }}
                  >
                    <p>{currentList?.customer?.status?.name?.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Customer Periority List Status</Label>
                  <span
                    style={{
                      color:
                        currentList?.status?.name === 'active'
                          ? 'green'
                          : 'red',
                    }}
                  >
                    <p>{currentList?.status?.name?.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
            </Row>
            {view ? (
              <Button
                style={{ backgroundColor: '#0066B3', marginRight: '5px' }}
                onClick={editPeriority}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                style={{ backgroundColor: '#0066B3', marginRight: '5px' }}
                // className="btn btn-primary"
                disabled={loading ? true : false}
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
                <span className="label">
                  <IntlMessages id="Edit" />
                </span>
              </Button>
            )}
            <Button
              style={{ backgroundColor: '#0066B3' }}
              // className="btn btn-primary"
              disabled={suspandLoading ? true : false}
              // type="submit"
              className={`btn-shadow btn-multiple-state ${
                suspandLoading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={suspand}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                <IntlMessages id="Suspand" />
              </span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
