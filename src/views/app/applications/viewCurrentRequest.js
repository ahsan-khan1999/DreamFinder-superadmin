/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
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
} from 'reactstrap';
import { AcceptRemovalAction } from 'Store/Actions/RemovalRequest/removalRequestAction';

export default function viewCurrentRequest({ history }) {
  const dispatch = useDispatch();
  let currentRequest = useSelector(
    (state) => state?.ViewCurrentDoctorRemovalRequest?.currentRequst
  );
  let thisView = useSelector(
    (state) => state?.ViewCurrentDoctorRemovalRequest?.view
  );

  //   console.log(currentRequest, thisView);
  //   const pendingReq =  async () =>{
  //     let res = await dispatch(AcceptRemovalAction({id:currentRequest?.id,status:{id:1,name:"pending"}}))

  //   }
  const acceptRemoval = async () => {
    let res = await dispatch(
      AcceptRemovalAction({
        id: currentRequest?.id,
        status: { id: 2, name: 'approved' },
      })
    );
    if (res) {
      NotificationManager.success(
        'Sucessfully Accepted ',
        'Error',
        5000,
        null,
        ''
      );
      history.push('/app/applications/viewRequests');
    }
  };
  const rejectRemoval = async () => {
    let res = await dispatch(
      AcceptRemovalAction({
        id: currentRequest?.id,
        status: { id: 3, name: 'rejected' },
      })
    );
    if (res) {
      NotificationManager.success(
        'Sucessfully Accepted ',
        'Error',
        5000,
        null,
        ''
      );
      history.push('/app/applications/viewRequests');
    }
  };
  const submit = () => {
    confirmAlert({
      title: 'Confirm to submit',
      //   message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => acceptRemoval(),
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    if (currentRequest?.length === 0) {
      history.push('/app/applications/viewRequests');
    }
  }, []);
  const handleChangeToView = () => {
    history.push('/app/applications/viewRequests');
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
          <IntlMessages id="View Request" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}>
          {currentRequest?.status?.name === 'approved' ||
          currentRequest?.status?.name === 'rejected' ? (
            ''
          ) : (
            <div>
              <Button
                style={{backgroundColor:'#0066b3'}}

                onClick={submit}
                style={{ marginRight: '5px', 'background-color': '#003766' }}
              >
                Accept
              </Button>
              <Button
                style={{backgroundColor:'#0066b3'}}

                onClick={rejectRemoval}
                style={{ marginRight: '5px', 'background-color': '#003766' }}
              >
                Reject
              </Button>
            </div>
          )}

          {/* {thisView ? (
               <Button style={{backgroundColor:'#0066b3'}} onClick={suspandDoctor}>
                {buttonName}
              </Button>
            ) : (
              ''
            )} */}
        </div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Action</h6>
                  </Label>
                  <span>
                    <p>{currentRequest?.action}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Description</h6>
                  </Label>
                  <span>
                    {currentRequest?.description === '' ? (
                      <p>No description</p>
                    ) : (
                      <p>{currentRequest?.description}</p>
                    )}
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6> Record ID </h6>
                  </Label>
                  <span>
                    <p>{currentRequest?.record_id}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <h6>Request ID</h6>
                  </label>
                  <span>
                    <p>{currentRequest?.request_id}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Request By</h6>
                  </Label>
                  <span>
                    <p>{currentRequest?.requested_by?.name}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Status</h6>
                  </Label>
                  <span>
                    <p
                      style={{
                        color:
                          currentRequest?.state?.name === 'approved'
                            ? 'green'
                            : 'red',
                      }}
                    >
                      {currentRequest?.status?.name?.toUpperCase()}
                    </p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Type</h6>
                  </Label>
                  <span>
                    <p>{currentRequest?.type}</p>
                  </span>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
