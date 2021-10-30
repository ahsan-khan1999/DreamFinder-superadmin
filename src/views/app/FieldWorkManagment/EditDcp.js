/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  
    SuspandDcpAction,
  SuspandDcpDcrAction
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
export default function EditDcp(props) {
  let currentItem = props?.location?.state;
  console.log(currentItem);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const onSuspandUser =async () => {
    setLoading(true)
      let res = await dispatch(SuspandDcpAction({uid:currentItem?.uid}))
      if(res){
          NotificationManager.success("Successfully Suspanded",'Success',5000,null,'')
          props.history.push('/app/FieldWorkManagment/ViewDcp')
      }
    setLoading(false)

  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="View DCP" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Assigne To Name" />
                  </Label>
                  <span>
                    <p>{currentItem?.assigned_to?.name}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Assign to Manager" />
                  </Label>
                  <span>
                    <p>
                      {currentItem?.assigned_to?.field_staff?.manager?.name}
                    </p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Assign to Manager Role" />
                  </Label>
                  <span>
                    <p>
                      {
                        currentItem?.assigned_to?.field_staff?.manager?.role
                          ?.category?.name
                      }
                    </p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Assign to Manager Service Location" />
                  </Label>
                  {currentItem?.assigned_to?.field_staff?.service_location?.map(
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
                    <IntlMessages id="Assign to Doctor Name" />
                  </Label>
                  <span>
                    <p>{currentItem?.doctor?.name}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Assign to Doctor Market" />
                  </Label>
                  <span>
                    <p>{currentItem?.doctor?.market?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Assign to Doctor Category" />
                  </Label>
                  <span>
                    <p>{currentItem?.doctor?.doctor_category?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              
            </Row>
           
            
            <Button
              className="btn btn-primary"
              // type="submit"
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onSuspandUser}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              Suspand Dcr
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
