/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import { SuspandDcpDcrAction } from 'Store/Actions/FieldWorkManagmentAction/FieldWorkManagmentAction';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';

import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
export default function EditDcr(props) {
  let currentItem = props?.location?.state;
  console.log(currentItem);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const onSuspandUser = async () => {
    setLoading(true);
    let res = await dispatch(SuspandDcpDcrAction({ uid: currentItem?.uid }));
    if (res) {
      NotificationManager.success(
        'Successfully Suspanded',
        'Success',
        5000,
        null,
        ''
      );
      setLoading(false);

      props.history.push('/app/FieldWorkManagment/ViewDcr');
    }else{
      setLoading(false);

    }
  };
  const handleBack = () => {
    props.history.push('/app/FieldWorkManagment/ViewDcr');
  };
  return (
    <Card>
      <CardBody>
        <Button
        className="btn btn-primary"
        style={{backgroundColor:"#0066B3"}}
        onClick={handleBack} style={{ marginBottom: '10px' }}>
          Back
        </Button>
        <CardTitle>
          <IntlMessages id="Daily Call Record" />
        </CardTitle>

        <div style={{ marginBottom: '15px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Name" />
                  </Label>
                  <span>
                    <p>{currentItem?.dcp?.assigned_to?.name}</p>
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
                      {
                        currentItem?.dcp?.assigned_to?.field_staff?.manager
                          ?.name
                      }
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
                        currentItem?.dcp?.assigned_to?.field_staff?.manager
                          ?.role?.category?.name
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
                  {currentItem?.dcp?.assigned_to?.field_staff?.service_location?.map(
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
                    <p>{currentItem?.dcp?.doctor?.name}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Assign to Doctor Name Market" />
                  </Label>
                  <span>
                    <p>{currentItem?.dcp?.doctor?.market?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Assign to Doctor Category" />
                  </Label>
                  <span>
                    <p>{currentItem?.dcp?.doctor?.doctor_category?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Product Promoted" />
                  </Label>
                  {currentItem?.products_promoted?.map((item) => (
                    <span>
                      <p>{item?.product?.name}</p>
                    </span>
                  ))}
                </FormGroup>
              </Col>
              {currentItem?.is_prescription ? (
                <Col lg={6}>
                  <h6>Our Product</h6>
                  <FormGroup>
                    
                    <img
                      src={currentItem?.prescription?.image_url}
                      height="100px"
                      width="100px"
                    />
                  </FormGroup>
                </Col>
              ) : null}
            </Row>
            <Row>
              <Col xl={12}>
                <h5>Product Details</h5>
                <div className="table-form" className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>Medicine Products</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Created By</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItem?.products_promoted?.map((item, index) => {
                        return (
                          <tr>
                            <td>{item?.product?.name}</td>

                            <td>{item?.product?.price}</td>
                            <td>{item?.quantity}</td>
                            <td>{item?.product?.created_by?.name}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl={12}>
                <h5>Visit By Details</h5>

                <div className="table-form" className="table-responsive">
                  <Table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItem?.visit_by_items?.map((item, index) => {
                        return (
                          <tr>
                            <td>{item?.name}</td>

                            <td>{item?.price}</td>
                            <td>{item?.quantity}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Button
            style={{backgroundColor:"#0066B3"}}
              // className="btn btn-primary"
              disabled={loading ? true : false}

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
              <span className="label">
                <IntlMessages id="Suspand Dcr" />
              </span>
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
