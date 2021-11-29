/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  Table,
} from 'reactstrap';
import { cancalAppointmentAction } from 'Store/Actions/ApponimentRescheduleRequest/viewAppoinmentRescheduleReqAction';

export default function viewCurrentPastAppointment(props) {
  const currentAppointment = props?.location?.state;
  // console.log(currentAppointment);
  const handleChangeToView = () => {
    props.history.push('/app/ui/components/pastAppoinment');
  };
  const dispatch = useDispatch();

  const cancalAppointment = async () => {
    if (currentAppointment?.status?.name === 'booked') {
      const apiData = {
        appointment_id: currentAppointment?.id,
      };
      let res = dispatch(cancalAppointmentAction(apiData));
      if (res) {
        NotificationManager.success(
          'Sucessfully Cancaled Appointment',
          'Sucess',
          5000,
          '',
          ''
        );

        props.history.push('/app/ui/components/pastAppoinment');
      }
    } else {
      NotificationManager.error(
        'CanNot Cancal Appointment',
        'error',
        5000,
        '',
        ''
      );
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
          {currentAppointment?.status?.name === 'booked' ? (
            <Button
              onClick={cancalAppointment}
              style={{
                backgroundColor: '#003766',
                marginRight: '10px',
                // marginBottom: '10px',
                // marginLeft: '10px',
              }}
            >
              Cancal Appointment
            </Button>
          ) : (
            ''
          )}
        </CardTitle>
        <CardTitle>
          <IntlMessages id="View Past Appointment" />
        </CardTitle>

        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>City</h6>
                  </Label>
                  <span>
                    <p>{currentAppointment?.city}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Description</h6>
                  </Label>
                  <span>
                    {currentAppointment?.description === '' ? (
                      <p>No description</p>
                    ) : (
                      <p>{currentAppointment?.description}</p>
                    )}
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Condition</h6>
                  </Label>
                  <span>
                    <p>{currentAppointment?.condition?.name}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <h6>Consultation Type</h6>
                  </label>
                  <span>
                    <p>{currentAppointment?.consultation_type?.name}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Status</h6>
                  </Label>
                  <span
                    style={{
                      color:
                        currentAppointment?.status?.name === 'booked' ||
                        'cancelled'
                          ? 'red'
                          : 'green',
                      // 'font-size': '0.9rem',
                    }}
                  >
                    <p>{currentAppointment?.status?.name?.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Slot</h6>
                  </Label>
                  <span>
                    <p>
                      {currentAppointment?.slot?.day} From :{' '}
                      {currentAppointment?.slot?.from} To :
                      {currentAppointment?.slot?.to}
                    </p>
                  </span>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Formik>
        <Row>
          <Col lg={12}>
            <div className="table-form-test table-responsive">
              <h3>Doctor Details</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>

                    <th>Email Address</th>
                    <th>Speciality</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{currentAppointment?.doctor_details.name}</td>
                    <td>{currentAppointment?.doctor_details?.gender?.name}</td>

                    <td>{currentAppointment?.doctor_details?.email_address}</td>
                    <td>
                      {currentAppointment?.doctor_details?.speciality?.name}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={12}>
            <div className="table-form-test table-responsive">
              <h3>Patient Details</h3>
              <Table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>

                    <th>Email Address</th>
                    <th>Age</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{currentAppointment?.patient_details.name}</td>
                    <td>{currentAppointment?.patient_details?.gender?.name}</td>

                    <td>
                      {currentAppointment?.patient_details?.email_address}
                    </td>
                    <td>{currentAppointment?.patient_details?.age}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        {currentAppointment?.prescription?.medicines?.length !== 0 ? (
          <Row>
            <Col lg={12}>
              <div
                className="table-form-test table-responsive"
                style={{
                  display:
                    currentAppointment?.prescription?.length === 0
                      ? 'none'
                      : '',
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
                    {currentAppointment?.prescription?.medicines?.map(
                      (item) => (
                        <tr>
                          <td>{currentAppointment?.prescription?.diagnosis}</td>
                          <td>{item?.medicine?.name}</td>

                          <td>{item?.medicine?.sales_price}</td>
                          <td>{item?.medicine?.medicine_type}</td>
                          <td>{item?.medicine?.availability?.name}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        ) : (
          ''
        )}
        {currentAppointment?.prescription?.tests?.length !== 0 ? (
          <Row>
            <Col lg={12}>
              <div
                className="table-form-test table-responsive"
                style={{
                  display:
                    currentAppointment?.prescription?.length === 0
                      ? 'none'
                      : '',
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
                    {currentAppointment?.prescription?.tests?.map((item) => (
                      <tr>
                        <td>{item?.name}</td>
                        <td>{item?.price}</td>

                        <td>{item?.report?.status?.name}</td>
                        {item?.report?.status?.name === 'report uploaded' ? (
                          <td>
                            {
                              <Button style={{ 'background-color': '#003766' }}>
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
      </CardBody>
    </Card>
  );
}
