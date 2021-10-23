/* eslint-disable */

import { arrowFunctionExpression } from '@babel/types';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik, useFormik } from 'formik';
// import leftArrow from '../../../assets/logos/leftArrow.svg';

import IntlMessages from 'helpers/IntlMessages';
import moment from 'moment';
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
  console.log(currentOrder)
  const formikData = useFormik({
    initialValues: {
      //   password: doctor_obj?.password,
      //   confirmPassword: confirmPassword,
    },
    // validate: validate,

    onSubmit: (values) => {},
  });
  useEffect(() => {
    if (currentOrder?.length === 0) {
      props.history.push('/app/Orders/orders');
    }
  }, []);
  const handleChangeToView = () => {
    props.history.push('/app/Orders/orders');
  };
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
  
  const handleAdd = () => {

    history.push('/app/menu/levels/CreateOrders');
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            className="btn-btn-secondary"
            onClick={handleChangeToView}
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
        ></div>

        <Formik initialValues={formikData.initialValues}>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                    style={{
              fontWeight:'700',
              fontSize: '0.9rem',
            }}
                    >Orders ID</h6>
                  </Label>
                  <span>
                    <p>{currentOrder.order_id}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                    style={{
              fontWeight:'700',
              fontSize: '0.9rem',
            }}
                    >Customer Name</h6>
                  </Label>
                  <span>
                    <p>{currentOrder.customer.name.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                    style={{
              fontWeight:'700',
              fontSize: '0.9rem',
            }}
                    >Market & Address</h6>
                  </Label>
                  <span>
                    <p>{currentOrder.customer.market__street_address.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                    style={{
              fontWeight:'700',
              fontSize: '0.9rem',
            }}
                    >Order Date/Time</h6>
                  </Label>
                  <span>
                    <p>
                      {moment
                        .unix(currentOrder.order_datetime)
                        .format('MMM DD, YYYY')}
                    </p>
                  </span>
                </FormGroup>
              </Col>
             
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                    style={{
              fontWeight:'700',
              fontSize: '0.9rem',
            }}
                    >Delivery Status</h6>
                  </Label>
                  <span>
                    <p
                      style={{
                        color:
                          currentOrder.delivery_status === 'delivered' ||
                          currentOrder.delivery_status === 'submitted_to_depot'
                            ? 'green'
                            : currentOrder.delivery_status === 'pending'
                            ? '#C0B627'
                            : currentOrder.delivery_status === 'returned' ||
                              currentOrder.delivery_status === 'cancelled'
                            ? 'red'
                            : currentOrder.delivery_status === 'dispatched'
                            ? 'blue'
                            : '',
                            fontWeight:'600',
                        fontSize: '0.9rem',
                      }}
                    >
                      {currentOrder.delivery_status.toUpperCase()}
                    </p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                    style={{
              fontWeight:'700',
              fontSize: '0.9rem',
            }}
                    >Payment Status</h6>
                  </Label>
                  <span>
                    <p
                      style={{
                        color:
                          currentOrder.payment_status === 'delivered' ||
                          currentOrder.payment_status === 'received'
                            ? 'green'
                            : currentOrder.payment_status === 'pending'
                            ? '#C0B627'
                            : currentOrder.payment_status === 'declined' ||
                              currentOrder.payment_status === 'cancelled'
                            ? 'red'
                            : currentOrder.payment_status === 'unpaid' ||
                              currentOrder.payment_status === 'deposited'
                            ? 'blue'
                            : '',
                            fontWeight:'600',
                        fontSize: '0.9rem',
                      }}
                    >
                      {currentOrder.payment_status.toUpperCase()}
                    </p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                    style={{
              fontWeight:'700',
              fontSize: '0.9rem',
            }}
                    >Status</h6>
                  </Label>
                  <span>
                    <p
                    style={{
                      color: currentOrder.status.name === 'active' 
                      ? 'green':'red',
                      fontSize: '0.9rem',
                      fontWeight:'600'
                    }}
                    >{currentOrder.status.name.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                    style={{
              fontWeight:'700',
              fontSize: '0.9rem',
            }}
                    >Proceed By</h6>
                  </Label>
                  <span>
                    <p>{currentOrder.ordered_by.name.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
            </Row>
            <Button
          onClick={handleAdd}
          style={{
            marginBottom: '15px',
            'backgroundColor': '#003766',
            marginTop: '10px',
          }}
        >
          Suspend Order
        </Button>
        <Button
          onClick={handleAdd}
          style={{
            marginBottom: '15px',
            'backgroundColor': '#003766',
            marginTop: '10px',
          }}
        >
          Add New Order
        </Button>
        <Button
          onClick={handleAdd}
          style={{
            marginBottom: '15px',
            'backgroundColor': '#003766',
            marginTop: '10px',
          }}
        >
          Add New Order
        </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
