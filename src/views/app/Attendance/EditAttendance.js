/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import { currentUser } from 'constants/defaultValues';
import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  Label,
  Row,
} from 'reactstrap';
import { SuspandAttendanceAction } from 'Store/Actions/AttendanceActions/AttendanceAction';

export default function EditAttendance(props) {
  let currentAttendance = props?.location.state;
  // const loading = useSelector(state => state?.AttendanceReducer?.loading)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const suspandAttendance = async () => {
    setLoading(true);
    let res = await dispatch(
      SuspandAttendanceAction({ uid: currentAttendance?.uid })
    );
    if (res) {
      NotificationManager.success(
        'Successfully Suspended',
        'Success',
        5000,
        null,
        ''
      );
      setLoading(false);

      props.history.push('/app/Attendance/ViewAttendance');
    }else{
      setLoading(false);

    }
  };
  const handleBack = () => {
    props.history.push('/app/Attendance/ViewAttendance');
  };
  return (
    <Card>
      <CardBody>
        <Button 
        style={{backgroundColor:"#0066B3"}}
        onClick={handleBack}>Back</Button>
        <CardTitle>
          View Attendance
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <span>
                  <img
                    alt="No Image"
                    src={currentAttendance?.image_url}
                    height="100px"
                    width="100px"
                    style={{ marginBottom: '10px' }}
                  />
                </span>
              </Col>
              <Col lg={6}>
                <Label>User Name</Label>
                <span>
                  <p>{currentAttendance?.user?.name}</p>
                </span>
              </Col>
              <Col lg={6}>
                <Label>User Email</Label>
                <span>
                  <p>{currentAttendance?.user?.email_address}</p>
                </span>
              </Col>
              <Col lg={6}>
                <Label>User Contact</Label>
                <span>
                  <p>{currentAttendance?.user?.phone_number}</p>
                </span>
              </Col>
              <Col lg={6}>
                <Label>User Designation</Label>
                <span>
                  <p>{currentAttendance?.user?.designation}</p>
                </span>
              </Col>
              <Col lg={6}>
                <Label>Manager Name</Label>
                <span>
                  <p>{currentAttendance?.user?.field_staff?.manager?.name}</p>
                </span>
              </Col>
              <Col lg={6}>
                <Label>Manager Gender</Label>
                <span>
                  <p>{currentAttendance?.user?.field_staff?.manager?.gender}</p>
                </span>
              </Col>
              <Col lg={6}>
                <Label>Manager Role</Label>
                <span>
                  <p>
                    {
                      currentAttendance?.user?.field_staff?.manager?.role
                        ?.category?.name
                    }
                  </p>
                </span>
              </Col>
              <Col lg={6}>
                <Label>Manager Service Location</Label>
                {currentAttendance?.user?.field_staff?.service_location?.map(
                  (item) => (
                    <span>
                      <p>{item?.name}</p>
                    </span>
                  )
                )}
              </Col>
              <Col lg={6}>
                <Label>Date And Time</Label>
                <span>
                  <p>
                    {moment
                      .unix(currentAttendance?.datetime)
                      .format('MMM DD YYYY h:mm:ss')}
                  </p>
                </span>
              </Col>
            </Row>
            <Button
            style={{backgroundColor:"#0066B3"}}
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              disabled={loading ? true : false}

              onClick={suspandAttendance}
            >
              <span className="label">
              Suspend Attendance
              </span>
              
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
