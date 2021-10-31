/* eslint-disable */
import { arrowFunctionExpression } from '@babel/types';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik, useFormik } from 'formik';

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
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';
import apiServices from 'services/requestHandler';
import { UpdateDepartmentHead } from 'Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';



export default function viewCurrentDepartmenthead(props) {
  let [buttonName, setButtonName] = useState();
  
  const [thisView, setThisView] = useState(true);
  
  
  const currentDepartmenthead = props?.location?.state;
  
  // console.log("currentDepartmenthead",currentDepartmenthead.uid)
  
  const dephead_obj = {
    name: currentDepartmenthead?.name,
    designation: currentDepartmenthead?.designation,
    email: currentDepartmenthead?.email,
    address: currentDepartmenthead?.address,
    phone: currentDepartmenthead?.phone,
    uid: currentDepartmenthead?.uid,
  };
  const [departhead, setDeparthead] = useState(dephead_obj);
  
  console.log("departhead",departhead?.uid)


  const dispatch = useDispatch();

  useEffect(() => {

    if (currentDepartmenthead?.status?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentDepartmenthead?.status?.name === 'active') {
      setButtonName('Suspend');
    }
  }, []);


  const handleChangeToView = () => {
    props.history.push('/app/distributioncenter-management/viewDepartmenthead');
  };


  let options = [];



  const editProfile = (e) => {
    e.preventDefault();
    setThisView(!thisView);
  };


  const editData = async () => {
    let res = await dispatch(UpdateDepartmentHead(departhead));
    if (res) {
      NotificationManager.success(
        'Successful response',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/distributioncenter-management/viewDepartmenthead');
    }
  };
  const suspandDepartmenthead = async () => {
    if (currentDepartmenthead?.status?.name === 'suspended') {
      let apiData = {
        uid: currentDepartmenthead?.uid,
      };
      console.log(apiData);
      let res = await apiServices.suspanddepartmentHead(apiData);
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
        uid: currentDepartmenthead?.uid,
      };
      let res = await apiServices.suspanddepartmentHead(apiData);
      console.log(res);
      if (res?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/distributioncenter-management/viewDepartmenthead');
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
  return (
    <Card>
      <CardBody>
        <CardTitle>
          {thisView ? (
            <>
            <Button
              className="btn btn-primary"
              onClick={handleChangeToView}
              style={{ marginRight: '20px'}}
            >
              Back
            </Button>
            <IntlMessages id="View Department Head" />
            </>
            ) : (
              
              <>
              <Button
                className="btn btn-primary"
                onClick={editProfile}
                style={{ marginRight: '20px'}}
              >
                Close Edit
              </Button>
              <IntlMessages id="Edit Department Head" />
              </>
              )}
        </CardTitle>

        <div
          style={{
            marginBottom: '10px',
            display:
            currentDepartmenthead?.delivery_status?.name === 'delivered' ? 'none' : '',
          }}
        ></div>

        <Formik>
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

                  {thisView ? (
                  <span>
                    <p>{currentDepartmenthead?.name.toUpperCase()}</p>
                  </span>
         
                  ):(
                    <Input
                      
                        value={departhead?.name}
                        className="form-control"
                        name="name"
                        type="text"
                        // validate={validateEmail}
                        onChange={(e) =>
                          setDeparthead({ ...departhead, name: e.target.value })
                        }
                    />
                  )}

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

                  {thisView ? (
                  <span>
                    <p>{currentDepartmenthead?.designation.toUpperCase()}</p>
                  </span>

                  ):(
                    <Input
                      
                    value={departhead?.designation}
                    className="form-control"
                    name="designation"
                    type="text"
                    onChange={(e) =>
                      setDeparthead({
                        ...departhead,
                        designation: e.target.value,
                      })
                    }
                  />
                  )}

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
                  {thisView ? (
                  <span>
                    <p>{currentDepartmenthead?.email.toUpperCase()}</p>
                  </span>

                  ):(
                    <Input
                      
                    value={departhead?.email}
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={(e) =>
                      setDeparthead({ ...departhead, email: e.target.value })
                    }
                  />
                  )}
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


              {thisView ? (
                  <span>
                    <p>{currentDepartmenthead?.address.toUpperCase()}</p>
                  </span>
              ): (
                <Input
                      
                value={departhead?.address}
                className="form-control"
                name="address"
                type="text"
                // validate={validateEmail}
                onChange={(e) =>
                  setDeparthead({ ...departhead, address: e.target.value })
                }
              />
              )}

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
                  {thisView ? (
                  <span>
                    <p>{currentDepartmenthead?.phone}</p>
                  </span>

                  ): (
                    <Input
                      
                    value={departhead?.phone}
                    type="text"
                    className="form-control"
                    name="phone"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setDeparthead({ ...departhead, phone: e.target.value })
                    }
                  />
                  )}
                </FormGroup>
              </Col>
          
            </Row>





            {thisView ? (
              <Button
                className="btn btn-primary mr-3"
              
                onClick={editProfile}
              >
              
                Edit Profile
              </Button>
            ) : (
              <Button
                className="btn btn-primary"
              
                onClick={editData}
              >
              
                Save
              </Button>
            )}



            {thisView ? (
              <Button
                className="btn btn-primary"
                onClick={suspandDepartmenthead}
              >
                {buttonName}
              </Button>

            ) : (
                ""
            )}
         
        
            {/* <StatuschangedModal show={show} onHide={handleClose} data={currentDepartmenthead} {...props} /> */}

          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}