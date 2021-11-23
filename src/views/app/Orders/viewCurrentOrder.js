/* eslint-disable */

import { arrowFunctionExpression } from '@babel/types';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik, useFormik } from 'formik';
// import leftArrow from '../../../assets/logos/leftArrow.svg';

import IntlMessages from 'helpers/IntlMessages';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
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
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import apiServices from 'services/requestHandler';
import { updateOrderAction } from 'Store/Actions/Orders/ViewOrderAction';
import StatuschangedModal from './StatuschangedModal';
export default function viewCurrentOrderComponent(props) {
  // let view = useSelector((state) => state?.ViewCurrentOrderRedcuer?.view);
 
 
 
 
 
  let currentOrder = props?.location?.state;
  const [show, setShow] = useState(false);
 
 
 
 
 
  const formikData = useFormik({
    onSubmit: (values) => { },
  });

  useEffect(() => {
    if (currentOrder?.length === 0) {
      props.history.push('/app/Orders/orders');
    }
  }, []);

  useEffect(() => {
    // readRoles();
    if (currentOrder?.status?.name === 'suspended') {
      setButtonName('Active Order');
    } else if (currentOrder?.status?.name === 'active') {
      setButtonName('Suspend Order');
    }
  }, []);
  const loading = useSelector((state) => state?.orderReducer?.loader);

  const handleChangeToView = () => {
    props.history.push('/app/Orders/orders');
  };
  const dispatch = useDispatch();

  let [buttonName, setButtonName] = useState();
  let [suspendloader, setsuspendloader] = useState(false);

  const suspandOrder = async () => {
    if (currentOrder?.status?.name === 'suspended') {
      let apiData = {
        uid: currentOrder?.uid,
      };
      setsuspendloader(true);
      let res = await apiServices.suspandorder(apiData);
      if (res?.data?.response_code === 200) {
      setsuspendloader(false);
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/Orders/orders');
      } else {
      setsuspendloader(false);
        NotificationManager.error(
          'Error active This Admin',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      let apiData = {
        uid: currentOrder?.uid,
      };
      setsuspendloader(true);
      let res = await apiServices.suspandorder(apiData);
      if (res?.response_code === 200) {
      setsuspendloader(false);

        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/Orders/orders');
      } else {
      setsuspendloader(false);
        NotificationManager.error(
          res?.response_message,
          'Error',
          5000,
          null,
          ''
        );
      }
    }
  };



  // MODAL CLOSE FUCNTION
  const handleClose = () => {
    setShow(!show);
  };
  // MODAL OPEN FUCNTION
  const handleShow = () => {
    setShow(!show);
};

  
  
  return (
    <Card>
      <CardBody>
        <CardTitle>
           <Button
            onClick={handleChangeToView}
            style={{ marginRight: '20px', backgroundColor: '#0066b3' }}
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
                        fontWeight: '700',
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
                        fontWeight: '700',
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
                        fontWeight: '700',
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
                        fontWeight: '700',
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
                        fontWeight: '700',
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
                        fontWeight: '600',
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
                        fontWeight: '700',
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
                        fontWeight: '600',
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
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >Status</h6>
                  </Label>
                  <span>
                    <p
                      style={{
                        color: currentOrder.status.name === 'active'
                          ? 'green' : 'red',
                        fontSize: '0.9rem',
                        fontWeight: '600'
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
                        fontWeight: '700',
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
                style={{backgroundColor:'#0066b3'}}

                onClick={suspandOrder}
              >
                {suspendloader ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Suspending
                </div>
              ) : (
                buttonName
                )}
                
              </Button>

            <Button
              className="mx-2"
              onClick={handleShow}
              style={{
                backgroundColor: '#0066b3',
              }}
            >
              Update Status
            </Button>

            <StatuschangedModal show={show} onHide={handleClose} data={currentOrder} {...props} />

          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
