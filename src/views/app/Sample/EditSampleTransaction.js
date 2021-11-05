/* eslint-disable */

import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { React, useEffect, useState } from 'react';
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
  Table,
} from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  ViewAreaManagerAction,
  ViewDirectorAction,
  ViewMPOManagerAction,
  ViewRegionalSalesManagerManagerAction,
  ViewSalesManagerManagerAction,
} from 'Store/Actions/User/UserActions';
import { getToken } from 'Utils/auth.util';
import axios from 'axios';
import moment from 'moment';
import {
  CreateTargetAction,
  GetDistributionCenter,
  OrderRead,
} from 'Store/Actions/Target/TargetAction';
const animatedComponents = makeAnimated();

import { NotificationManager } from 'components/common/react-notifications';
import { getUsers } from 'Store/Actions/AttendanceActions/AttendanceAction';
import {
  CreateSampleAction,
  CreateSampleTransactionAction,
  SuspandSampleTransactionAction,
  ViewSampleAction,
} from 'Store/Actions/SampleAction/SampleAction';
import { SampleReducer } from 'Store/Reducers/SampleReducer/SampleReducer';

export default function EditSampleTransaction(props) {
  let currentTransaction = props.location.state;
  // const [loading, setLoading] = useState(false)
  const loading = useSelector((state) => state?.SampleReducer?.loading);
  const dispatch = useDispatch();

  const handleBack = () => {
    props.history.push('/app/Sample/ViewSampleTransaction');
  };
  const suspandSample = async () => {
    // setLoading(true)
    let res = await dispatch(
      SuspandSampleTransactionAction({ uid: currentTransaction?.uid })
    );
    if (res) {
      NotificationManager.success(
        'Successfully Suspanded',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/Sample/ViewSampleTransaction');
    } else {
    }
  };
  return (
    <Card>
      <CardBody>
        <Button style={{ backgroundColor: '#0066B3' }} onClick={handleBack}>
          Back
        </Button>
        <CardTitle>
          View Sample Transaction
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Sample Assign To
                  </Label>
                  <span>
                    <p>{currentTransaction?.sample?.assigned_to?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Sample Assign To Manager
                  </Label>
                  <span>
                    <p>
                      {
                        currentTransaction?.sample?.assigned_to?.field_staff
                          ?.manager?.name
                      }
                    </p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Sample Assign To Manager
                  </Label>
                  <span>
                    <p>
                      {
                        currentTransaction?.sample?.assigned_to?.field_staff
                          ?.manager?.name
                      }
                    </p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Sample Assign To Service Location
                  </Label>

                  {currentTransaction?.sample?.assigned_to?.field_staff?.service_location?.map(
                    (item) => (
                      <span>
                        <p>{item?.name}</p>
                      </span>
                    )
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Sample Assign To Designation
                  </Label>

                  <span>
                    <p>
                      {currentTransaction?.sample?.assigned_to?.designation}
                    </p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Sample Assign To Address
                  </Label>

                  <span>
                    <p>
                      {currentTransaction?.sample?.assigned_to?.address?.area}
                    </p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Sample Status
                  </Label>

                  <span
                    style={{
                      color:
                        currentTransaction?.sample?.status?.name === 'active'
                          ? 'green'
                          : 'red',
                    }}
                  >
                    <p>
                      {currentTransaction?.sample?.status?.name?.toUpperCase()}
                    </p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Sample Transaction Status
                  </Label>

                  <span
                    style={{
                      color:
                        currentTransaction?.sample?.status?.name === 'active'
                          ? 'green'
                          : 'red',
                    }}
                  >
                    <p>{currentTransaction?.status?.name?.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Sample Transaction Date Time
                  </Label>

                  <span>
                    <p>
                      {moment
                        .unix(currentTransaction?.datetime)
                        .format('YYYY/MM/DD hh:mm:ss')}
                    </p>
                  </span>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <FormGroup>
                  <div className="table-form">
                    <Table>
                      <thead>
                        <tr>
                          <th>Medicine Products</th>
                          <th>Available Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentTransaction?.medicines?.map((item) => (
                          <tr>
                            <td>{item?.medicine_name}</td>
                            <td>{item?.medicine_quantity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Formik>
        <Button
          style={{ backgroundColor: '#0066B3' }}
          disabled={loading ? true : false}
          className={`btn-shadow btn-multiple-state ${
            loading ? 'show-spinner' : ''
          }`}
          onClick={suspandSample}
        >
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">
            Suspand Sample Transaction
          </span>
        </Button>
      </CardBody>
    </Card>
  );
}
