/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  EditScheduleAction,
  SuspandDcpAction,
  SuspandDcpDcrAction,
  SuspandScheduleAction,
} from 'Store/Actions/FieldWorkManagmentAction/FieldWorkManagmentAction';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';

import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
export default function EditSchedule(props) {
  let currentItem = props?.location?.state;
  const [view, setView] = useState(true);
  console.log(currentItem);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [loadingSuspand, setLoadingSuspand] = useState(false);

  const dispatch = useDispatch();
  const onSuspandUser = async () => {
    setLoadingSuspand(true);
    let res = await dispatch(SuspandScheduleAction({ uid: currentItem?.uid }));
    if (res) {
      NotificationManager.success(
        'Successfully Suspanded',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/FieldWorkManagment/ViewSchedule');
      setLoadingSuspand(false);

    }else{
        setLoadingSuspand(false);

    }
  };
  const statusChange = async () => {
    setLoadingStatus(true);

    // let apidata = {
    //   uid: currentItem?.uid,
    //   approval_status: 'approved',
    // };
    let res = await dispatch(EditScheduleAction({uid:currentItem?.uid,approval_status:'approved'}));
    if (res) {
      NotificationManager.success(
        'Successfully Approved',
        'Success',
        5000,
        null,
        ''
      );
      setLoadingStatus(false);

      props.history.push('/app/FieldWorkManagment/ViewSchedule');
    }
    else{
        setLoadingStatus(false);

    }
  };
  const editProfile = () => {
    setView(false);
  };
  const handleBack = () => {
    props.history.push('/app/FieldWorkManagment/ViewSchedule');
  };
  return (
    <Card>
      <CardBody>
        <Button 
        style={{backgroundColor:'#0066B3'}}
        onClick={handleBack} style={{marginBottom:'10px'}}>Back</Button>
        <CardTitle>
          View Schedule
        </CardTitle>
        <div style={{ marginBottom: '15px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Assigne To Name
                  </Label>
                  <span>
                    <p>{currentItem?.assigned_to?.name}</p>
                  </span>
                </FormGroup>
              </Col>

              {currentItem?.is_doctor_customer === true ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Assign to Doctor Name
                      </Label>
                      <span>
                        <p>{currentItem?.doctor?.name}</p>
                      </span>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Assign to Doctor Market
                      </Label>
                      <span>
                        <p>{currentItem?.doctor?.market?.name}</p>
                      </span>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Assign to Doctor Category
                      </Label>
                      <span>
                        <p>{currentItem?.doctor?.doctor_category?.name}</p>
                      </span>
                    </FormGroup>
                  </Col>
                </>
              ) : (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Assign to Customer Name
                      </Label>
                      <span>
                        <p>{currentItem?.customer?.name}</p>
                      </span>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Assign to Doctor Market
                      </Label>
                      <span>
                        <p>{currentItem?.customer?.market?.name}</p>
                      </span>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Assign to Customer Type
                      </Label>
                      <span>
                        <p>{currentItem?.customer?.client_type}</p>
                      </span>
                    </FormGroup>
                  </Col>
                </>
              )}

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Rescheduled By
                  </Label>
                  <span>
                    <p>{currentItem?.scheduled_by?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Rescheduled By Role
                  </Label>
                  <span>
                    <p>{currentItem?.scheduled_by?.role?.category?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    Approval Status
                  </Label>
                  <span
                    style={{
                      color:
                        currentItem?.approval_status === 'approved'
                          ? 'green'
                          : 'red',
                    }}
                  >
                    <p>{currentItem?.approval_status?.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
            </Row>
            {currentItem?.approval_status !== 'approved' ? <Button
              // className="btn btn-primary"
              disabled={loadingStatus ? true : false}

              style={{backgroundColor:'#0066B3',marginRight:"5px"}}
              // type="submit"
              className={`btn-shadow btn-multiple-state ${
                loadingStatus ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={statusChange}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                Approve Schedule
              </span>
            </Button> : null}
            <Button
              // className="btn btn-primary"
              style={{backgroundColor:'#0066B3'}}
              disabled={loadingSuspand ? true : false}

              // type="submit"
              className={`btn-shadow btn-multiple-state ${
                loadingSuspand ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onSuspandUser}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">
                Suspand Schedule
              </span>
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
