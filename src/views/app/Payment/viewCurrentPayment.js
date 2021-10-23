/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import React, { useState } from 'react';
import Select from 'react-select';
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
import apiServices from 'services/requestHandler';
import CustomSelectInput from 'components/common/CustomSelectInput';
import moment from 'moment';

const statusOPtion = [
  { label: 'Unpaid', value: 'unpaid', key: 1 },
  { label: 'Paid', value: 'paid', key: 2 },
];
export default function viewCurrentPayment(props) {
  const payment = props?.location?.state?.item;
  const view = props?.location?.state?.view;
  const [View, setView] = useState(true);
  const [status, setStatus] = useState();

  // console.log(status);
  const handleChangeToView = () => {
    props.history.push('/app/Payment/viewPayment');
  };
  const editProfile = () => {
    setView(false);
  };
  const editStatus = async () => {
    if (payment?.status?.name === 'paid') {
      let apiData = {
        payment_ref_id: payment?.payment_ref_id,
        status: { id: 1, name: 'unpaid' },
      };
      let res = await apiServices.updatePayment(apiData);
      // console.log(res);
      if (res?.response_code === 200) {
        NotificationManager.success('Sucessfully Updated', 'Success', 5000, '');
        props.history.push('/app/Payment/viewPayment');
        return;
      }
    } else {
      let apiData = {
        payment_ref_id: payment?.payment_ref_id,
        status: { id: 2, name: 'paid' },
      };
      let res = await apiServices.updatePayment(apiData);
      // console.log(res);

      if (res?.response_code === 200) {
        NotificationManager.success(
          'Successfully Updated',
          'Success',
          5000,
          ''
        );
        props.history.push('/app/Payment/viewPayment');
      } else {
        NotificationManager.error(res?.response_message, 'Error', 5000, '');
      }
    }
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            className="btn-btn-secondary"
            onClick={handleChangeToView}
            style={{ marginRight: '10px', 'background-color': '#003766' }}
          >
            Back
          </Button>
        </CardTitle>
        <CardTitle>
          <h4>View Payment</h4>
        </CardTitle>

        <Formik>
          {payment?.type === 'appointment' ? (
            <Form>
              <Row className="h-100">
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Patient Name</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p>{payment?.appointment?.patient_details?.name}</p>
                      </span>
                    ) : (
                      <Input
                        type="text"
                        defaultValue={
                          payment?.appointment?.patient_details?.name
                        }
                        disabled
                      ></Input>
                      // <span>
                      //   <p>{payment?.appointment?.patient_details?.name}</p>
                      // </span>
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Doctor Name</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p>{payment?.appointment?.doctor_details?.name}</p>
                      </span>
                    ) : (
                      <Input
                        type="text"
                        defaultValue={
                          payment?.appointment?.doctor_details?.name
                        }
                        disabled
                      ></Input>
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Amount</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p>{payment?.total_amount}</p>
                      </span>
                    ) : (
                      <Input
                        type="number"
                        defaultValue={payment?.total_amount}
                        disabled
                      ></Input>
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Date</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p>{payment?.appointment?.date}</p>
                      </span>
                    ) : (
                      <Input
                        type="date"
                        defaultValue={payment?.appointment?.date}
                        disabled
                      ></Input>
                    )}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Appointment Status</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p
                          style={{
                            color:
                              payment?.appointment?.status?.name === 'confirmed'
                                ? 'green'
                                : 'red',
                          }}
                        >
                          {payment?.appointment?.status?.name?.toUpperCase()}
                        </p>
                      </span>
                    ) : (
                      <Input
                        type="text"
                        defaultValue={payment?.appointment?.status?.name?.toUpperCase()}
                        disabled
                      ></Input>
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Condition</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p>{payment?.appointment?.condition?.name}</p>
                      </span>
                    ) : (
                      <Input
                        type="text"
                        defaultValue={payment?.appointment?.condition?.name}
                        disabled
                      ></Input>
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Consultation Type</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p>{payment?.appointment?.consultation_type?.name}</p>
                      </span>
                    ) : (
                      <Input
                        type="text"
                        defaultValue={
                          payment?.appointment?.consultation_type?.name
                        }
                        disabled
                      ></Input>
                    )}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Payment Status</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p
                          style={{
                            color:
                              payment?.status?.name === 'paid'
                                ? 'green'
                                : 'red',
                            'font-size': '0.9rem',
                          }}
                        >
                          {payment?.status?.name?.toUpperCase()}
                        </p>
                      </span>
                    ) : (
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-slot-duration"
                        //   value={status}
                        defaultValue={{
                          label: payment?.status?.name,
                          value: payment?.status?.name,
                          key: payment?.status?.id,
                        }}
                        onChange={(val) =>
                          setStatus({ name: val?.value, id: val?.key })
                        }
                        options={statusOPtion}
                      />
                    )}
                  </FormGroup>
                </Col>
              </Row>
              {View ? (
                <Button
                  style={{ 'background-color': '#003766' }}
                  onClick={editProfile}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  style={{ 'background-color': '#003766' }}
                  onClick={editStatus}
                >
                  Save
                </Button>
              )}
              {payment?.order?.length !== 0 ? (
                <Row>
                  <Col lg={12}>
                    <div
                      className="table-form-test table-responsive"
                      style={{
                        display:
                          payment?.prescription?.length === 0 ? 'none' : '',
                      }}
                    >
                      <h3>Medicines</h3>
                      <Table>
                        <thead>
                          <tr>
                            {}
                            <th>Diagnosis</th>
                            <th>Medicine Name</th>

                            <th>Sale Price</th>
                            <th>Medicine Type</th>
                            <th>Avilability</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payment?.prescription?.medicines?.map((item) => (
                            <tr>
                              <td>{payment?.prescription?.diagnosis}</td>
                              <td>{item?.medicine?.name}</td>

                              <td>{item?.medicine?.sales_price}</td>
                              <td>{item?.medicine?.medicine_type}</td>
                              <td>{item?.medicine?.availability?.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              ) : (
                ''
              )}
              {/* {payment?.prescription?.tests?.length !== 0 ? (
                <Row>
                  <Col lg={12}>
                    <div
                      className="table-form-test table-responsive"
                      style={{
                        display:
                          payment?.prescription?.length === 0 ? 'none' : '',
                      }}
                    >
                      <h3>Tests</h3>
                      <Table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Price</th>

                            <th>Report Status</th>

                            <th>View Report</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payment?.prescription?.tests?.map((item) => (
                            <tr>
                              <td>{item?.name}</td>
                              <td>{item?.price}</td>

                              <td>{item?.report?.status?.name}</td>
                              {item?.report?.status?.name ===
                              'report uploaded' ? (
                                <td>
                                  {
                                    <Button
                                      style={{
                                        'background-color': '#003766',
                                      }}
                                    >
                                      <a
                                        target="_blank"
                                        href={item?.report?.url}
                                        style={{ color: '#ffff' }}
                                      >
                                        Report
                                      </a>
                                    </Button>
                                  }
                                </td>
                              ) : (
                                <td>
                                  <Button
                                    className=""
                                    disabled
                                    style={{ 'background-color': '#003766' }}
                                  >
                                    Report
                                  </Button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              ) : (
                ''
              )} */}
            </Form>
          ) : (
            <Form>
              <Row className="h-100">
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>User Name</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p>{payment?.user?.name}</p>
                      </span>
                    ) : (
                      <Input
                        type="text"
                        defaultValue={payment?.user?.name}
                        disabled
                      ></Input>
                    )}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Amount</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p>{payment?.total_amount}</p>
                      </span>
                    ) : (
                      <Input
                        type="text"
                        defaultValue={payment?.total_amount}
                        disabled
                      ></Input>
                    )}
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Date</h6>
                    </Label>
                    {View === true ? (
                      <span>
                        <p>
                          {moment
                            .unix(payment?.created_at)
                            .format('MMM DD, YYYY')}
                        </p>
                      </span>
                    ) : (
                      <Input
                        type="date"
                        defaultValue={moment
                          .unix(payment?.created_at)
                          .format('MMM DD, YYYY')}
                        disabled
                      ></Input>
                    )}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Payment Status</h6>
                    </Label>
                    {View === true ? (
                      <span
                        style={{
                          color:
                            payment?.status?.name === 'paid' ? 'green' : 'red',
                        }}
                      >
                        <p>{payment?.status?.name?.toUpperCase()}</p>
                      </span>
                    ) : (
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-slot-duration"
                        //   value={status}
                        defaultValue={{
                          label: payment?.status?.name,
                          value: payment?.status?.name,
                          key: payment?.status?.id,
                        }}
                        onChange={(val) =>
                          setStatus({ name: val?.value, id: val?.key })
                        }
                        options={statusOPtion}
                      />
                    )}
                  </FormGroup>
                </Col>
              </Row>

              {payment?.order?.medicines?.length !== 0 ? (
                <Row>
                  <Col lg={12}>
                    <div
                      className="table-form-test table-responsive"
                      style={{
                        display: payment?.order?.length === 0 ? 'none' : '',
                      }}
                    >
                      <h3>Medicines</h3>
                      <Table>
                        <thead>
                          <tr>
                            <th>Diagnosis</th>
                            <th>Medicine Name</th>

                            <th>Sale Price</th>
                            <th>Medicine Type</th>
                            <th>Avilability</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payment?.order?.medicines?.map((item) => (
                            <tr>
                              <td>{payment?.prescription?.diagnosis}</td>
                              <td>{item?.medicine?.name}</td>

                              <td>{item?.medicine?.sales_price}</td>
                              <td>{item?.medicine?.medicine_type}</td>
                              <td>{item?.medicine?.availability?.name}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              ) : (
                ''
              )}
              {payment?.order?.tests?.length !== 0 ? (
                <Row>
                  <Col lg={12}>
                    <div
                      className="table-form-test table-responsive"
                      style={{
                        display: payment?.order?.length === 0 ? 'none' : '',
                      }}
                    >
                      <h3>Tests</h3>
                      <Table>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Price</th>

                            <th>Report Status</th>

                            <th>View Report</th>
                          </tr>
                        </thead>
                        <tbody>
                          {payment?.order?.tests?.map((item) => (
                            <tr>
                              <td>{item?.test?.name}</td>
                              <td>{item?.test?.price}</td>

                              <td>{item?.test?.report?.status?.name}</td>
                              {item?.test?.report?.status?.name ===
                              'report uploaded' ? (
                                <td>
                                  {
                                    <Button
                                      style={{
                                        'background-color': '#003766',
                                      }}
                                    >
                                      <a
                                        target="_blank"
                                        href={item?.report?.url}
                                        style={{ color: '#ffff' }}
                                      >
                                        Report
                                      </a>
                                    </Button>
                                  }
                                </td>
                              ) : (
                                <td>
                                  <Button
                                    className=""
                                    disabled
                                    style={{ 'background-color': '#003766' }}
                                  >
                                    Report
                                  </Button>
                                </td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                </Row>
              ) : (
                ''
              )}
              {View ? (
                <Button
                  style={{ 'background-color': '#003766' }}
                  onClick={editProfile}
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  style={{ 'background-color': '#003766' }}
                  onClick={editStatus}
                >
                  Save
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}
