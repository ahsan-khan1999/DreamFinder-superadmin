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
import apiServices from 'services/requestHandler';
import { updateOrderAction } from 'Store/Actions/Orders/ViewOrderAction';
export default function viewCurrentDepartmenthead(props) {
  // let view = useSelector((state) => state?.ViewCurrentOrderRedcuer?.view);
  let currentDepartmenthead = props?.location?.state;
  console.log(currentDepartmenthead)
  const formikData = useFormik({
    initialValues: {
      //   password: doctor_obj?.password,
      //   confirmPassword: confirmPassword,
    },
    // validate: validate,

    onSubmit: (values) => { },
  });
  useEffect(() => {
    if (currentDepartmenthead?.length === 0) {
      props.history.push('/app/distributioncenter-management/viewDepartmenthead');
    }
  }, []);

  useEffect(() => {
    // readRoles();
    if (currentDepartmenthead?.status?.name === 'suspended') {
      setButtonName('Active Order');
    } else if (currentDepartmenthead?.status?.name === 'active') {
      setButtonName('Suspend Order');
    }
  }, []);

  const handleChangeToView = () => {
    props.history.push('/app/distributioncenter-management/viewDepartmenthead');
  };
  const dispatch = useDispatch();

  let [buttonName, setButtonName] = useState();

  const suspandOrder = async () => {
    if (currentOrder?.status?.name === 'suspended') {
      let apiData = {
        uid: currentOrder?.uid,
      };
      let res = await apiServices.suspandorder(apiData);
      console.log(res);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/distributioncenter-management/viewDepartmenthead');
      } else {
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
      let res = await apiServices.suspandorder(apiData);
      console.log(res);
      if (res?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/Orders/orders');
      } else {
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


  const [show, setShow] = useState(false);

  // MODAL CLOSE FUCNTION
  const handleClose = () => {
    setShow(!show);
  };
  // MODAL OPEN FUCNTION
  const handleShow = () => {
    setShow(!show);
};

  const handleAdd = () => {

    history.push('/app/menu/levels/CreateOrders');
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            className="btn btn-primary"
            onClick={handleChangeToView}
            style={{ marginRight: '20px'}}
          >
            Back
          </Button>
          <IntlMessages id="View Order" />
        </CardTitle>

        <div
          style={{
            marginBottom: '10px',
            display:
            currentDepartmenthead?.delivery_status?.name === 'delivered' ? 'none' : '',
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
                    >Name</h6>
                  </Label>
                  <span>
                    <p>{currentDepartmenthead?.name.toUpperCase()}</p>
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
                    >Designation</h6>
                  </Label>
                  <span>
                    <p>{currentDepartmenthead?.designation.toUpperCase()}</p>
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
                    >Email</h6>
                  </Label>
                  <span>
                    <p>{currentDepartmenthead?.email.toUpperCase()}</p>
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
                    >Address</h6>
                  </Label>
                  <span>
                    <p>{currentDepartmenthead?.address.toUpperCase()}</p>
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
                    >Phone</h6>
                  </Label>
                  <span>
                    <p>{currentDepartmenthead.phone.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>
          
            </Row>
              <Button
                className="btn btn-primary"
                onClick={suspandOrder}
              >
                {buttonName}
              </Button>
         
        
            {/* <StatuschangedModal show={show} onHide={handleClose} data={currentDepartmenthead} {...props} /> */}

          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
