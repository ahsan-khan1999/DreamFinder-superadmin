/* eslint-disable */

import { arrowFunctionExpression } from '@babel/types';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik, useFormik } from 'formik';
// import leftArrow from '../../../assets/logos/leftArrow.svg';

import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import apiServices from 'services/requestHandler';
import { updateOrderAction } from 'Store/Actions/Orders/ViewOrderAction';
export default function viewCurrentOrderComponent(props) {
  // let view = useSelector((state) => state?.ViewCurrentOrderRedcuer?.view);
  let currentOrder = props?.location?.state;
  const formikData = useFormik({
    initialValues: {
      //   password: doctor_obj?.password,
      //   confirmPassword: confirmPassword,
    },
    // validate: validate,

    onSubmit: (values) => {
    },
  });
  useEffect(() => {
    if (currentOrder?.length === 0) {
      history.push('/app/Orders/orders');
    }
  }, []);
  // const handleChangeToView = () => {
  //   history.push('/app/Orders/orders');
  // };
  // const dispatch = useDispatch();

  // const changeStatusToProcessing = () => {
  //   const apiData = {
  //     order_id: currentOrder?.id,
  //     delivery_status: { id: 2, name: 'processing' },
  //   };
  //   let res = dispatch(updateOrderAction(apiData));
  //   if (res) {
  //     NotificationManager.success(
  //       'Sucessfully Updated',
  //       'Sucess',
  //       5000,
  //       null,
  //       ''
  //     );
  //     history.push('/app/Orders/orders');
  //   }
  // };
  // const changeStatusToDispatched = async () => {
  //   const apiData = {
  //     order_id: currentOrder?.id,
  //     delivery_status: { id: 3, name: 'dispatched' },
  //   };
  //   let res = dispatch(updateOrderAction(apiData));
  //   if (res) {
  //     NotificationManager.success(
  //       'Sucessfully Updated',
  //       'Sucess',
  //       5000,
  //       null,
  //       ''
  //     );
  //     history.push('/app/Orders/orders');
  //   }
  // };
  // const changeStatusToDelivered = async () => {
  //   const apiData = {
  //     order_id: currentOrder?.id,
  //     delivery_status: { id: 4, name: 'delivered' },
  //   };
  //   let res = dispatch(updateOrderAction(apiData));
  //   if (res) {
  //     NotificationManager.success(
  //       'Sucessfully Updated',
  //       'Sucess',
  //       5000,
  //       null,
  //       ''
  //     );
  //     history.push('/app/Orders/orders');
  //   }
  // };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            className="btn-btn-secondary"
            // onClick={handleChangeToView}
            style={{ marginRight: '20px', 'background-color': '#003766' }}
          >
            Back
          </Button>
          <IntlMessages id="View Order" />
        </CardTitle>

        <div
          style={{
            marginBottom: '10px',
            display:
              currentOrder?.delivery_status?.name === 'delivered' ? 'none' : '',
          }}
        >
          <Button
            // onClick={changeStatusToProcessing}
            style={{
              'margin-right': '10px',
              'background-color': '#003766',
              display:
                currentOrder?.delivery_status?.name === 'processing'
                  ? 'none'
                  : '',
            }}
          >
            Processing
          </Button>
          <Button
            // onClick={changeStatusToDispatched}
            style={{
              'margin-right': '10px',
              'background-color': '#003766',
              display:
                currentOrder?.delivery_status?.name === 'dispatched'
                  ? 'none'
                  : '',
            }}
          >
            Dispatched
          </Button>

          <Button
            // onClick={changeStatusToDelivered}
            style={{ 'background-color': '#003766' }}
          >
            Delivered
          </Button>
        </div>

        <Formik initialValues={formikData.initialValues}>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Delivery Type</h6>
                  </Label>
                  <span>
                    <p>"Del"</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Delivery Status</h6>
                  </Label>
                  <span style={{color:currentOrder?.delivery_status?.name === "delivered" ? 'green' : "red"}}>
                    <p>""</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Paid Status</h6>
                  </Label>
                  <span style={{color:currentOrder?.paid_status?.name === "paid" ? 'green' : "red"}}>
                    <p></p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Ordered By" />
                  </Label>
                  <span>
                    <p></p>
                  </span>
                </FormGroup>
              </Col>
              {/* <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Test" />
                    </Label>
                    <span>
                      <p>
                        {currentOrder?.tests?.map((item) => item?.test?.name)}
                      </p>
                    </span>
                  </FormGroup>
                </Col> */}
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Total Amount" />
                  </Label>
                  <span>
                    <p>""</p>
                  </span>
                </FormGroup>
              </Col>
            </Row>
           

            <Row>
              <Col lg={12}>
                <div
                  className=""
                  style={{
                    width: '100%',
                    display: currentOrder?.tests?.length > 0 ? '' : 'none',
                  }}
                >
                  <h3>Test</h3>
                  <Table className="">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Report Status</th>
                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                         ""
                        </td>

                        <td>
                          ""
                        </td>
                        <td>
                          ""
                        </td>

                        <td>
                         ""
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div
                  className="table-form-test table-responsive"
                  style={{
                    width: '100%',
                    display: currentOrder?.packages?.length > 0 ? '' : 'none',
                  }}
                >
                  <h3>Package</h3>
                  <Table className="">
                    <thead>
                      <tr>
                        <th>Name</th>

                        <th>Age Group</th>
                        <th>Category</th>
                        <th>Gender</th>

                        <th>Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrder?.packages?.map((item, index) => {
                        return (
                          <tr>
                            <td>""</td>

                            <td>""</td>
                            <td>""</td>
                            <td>""</td>
                            <td>""</td>
                            <td>""</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <div
                  className="table-form-test table-responsive"
                  style={{
                    width: '100%',
                    display: currentOrder?.medicines?.length > 0 ? '' : 'none',
                  }}
                >
                  <h3>Medicine</h3>
                  <Table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Quantity</th>

                        <th>Medicine Type</th>
                        <th>Purchase Rate</th>
                        <th>Avilabilty</th>
                        <th>Formula</th>
                        <th>Sale Price</th>
                        {/* <th>Status</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {currentOrder?.medicines?.map((item) => {
                        return (
                          <tr>
                            <td></td>
                            <td></td>

                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                         
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
