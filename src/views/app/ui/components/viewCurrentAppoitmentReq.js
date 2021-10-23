/* eslint-disable */

import { Separator } from 'components/common/CustomBootstrap';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
  Button,
  Input,
} from 'reactstrap';
import { AcceptAppointmentAction } from 'Store/Actions/ApponimentRescheduleRequest/viewAppoinmentRescheduleReqAction';
import { AcceptRemovalAction } from 'Store/Actions/RemovalRequest/removalRequestAction';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import apiServices from 'services/requestHandler';
import { AvilableSlotsAction } from 'Store/Actions/AvilableSlotsAction/avilableSlotsAction';
import SlotsModal from './SlotsModal';
export default function ViewCurrentAppoitmentReq({ history }) {
  const dispatch = useDispatch();
  const handleChangeToView = () => {
    history.push('/app/ui/components/rescheduleRequest');
  };

  let currentRequest = useSelector(
    (state) => state?.ViewCurrentAppointmentRemovalRequest?.currentAppointment
  );
  let thisView = useSelector(
    (state) => state?.ViewCurrentAppointmentRemovalRequest?.view
  );
  let slots = useSelector((state) => state?.GetAvilableSlotsReducer?.slots);
  let [show, setShow] = useState(false);
  let [hide, setHide] = useState(false);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  useEffect(() => {
    currentRequest?.length === 0
      ? history.push('/app/ui/components/rescheduleRequest')
      : '';
  }, []);

  const rejectRechedule = async () => {
    let res = await dispatch(
      AcceptAppointmentAction({
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
      history.push('/app/ui/components/rescheduleRequest');
    }
  };
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <h4>Appointment Reschedule Request</h4>
            <Button
              className="btn-btn-secondary"
              onClick={handleChangeToView}
              style={{ marginRight: '20px', 'background-color': '#003766' }}
            >
              Back
            </Button>
          </CardTitle>
          <div style={{ marginBottom: '30px' }}>
            {currentRequest?.status?.name === 'approved' ||
            currentRequest?.status?.name === 'rejected' ? (
              ''
            ) : (
              <div>
                <Button
                  className="btn btn-primary"
                  onClick={showModal}
                  style={{ marginRight: '5px', 'background-color': '#003766' }}
                >
                  Accept
                </Button>
                <Button
                  className="btn btn-primary"
                  onClick={rejectRechedule}
                  style={{ marginRight: '5px', 'background-color': '#003766' }}
                >
                  Reject
                </Button>
              </div>
            )}
          </div>
          <Formik>
            <Form>
              <Row className="h-100">
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Action" />
                    </Label>
                    <span>
                      <p>{currentRequest?.action}</p>
                    </span>
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Description" />
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
                      <IntlMessages id="Record ID" />
                    </Label>
                    <span>
                      <p>{currentRequest?.record_id}</p>
                    </span>
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <label>
                      <IntlMessages id="Request ID" />
                    </label>
                    <span>
                      <p>{currentRequest?.request_id}</p>
                    </span>
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Request By" />
                    </Label>
                    <span>
                      <p>{currentRequest?.requested_by?.name}</p>
                    </span>
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Status" />
                    </Label>
                    <span>
                      <p>{currentRequest?.status?.name}</p>
                    </span>
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Type" />
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
      <SlotsModal show={show} handleClose={hideModal} history={history}></SlotsModal>
    </>
  );
}
