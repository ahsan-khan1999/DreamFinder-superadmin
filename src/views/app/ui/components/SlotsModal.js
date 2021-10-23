/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from 'reactstrap';
import { AcceptAppointmentAction } from 'Store/Actions/ApponimentRescheduleRequest/viewAppoinmentRescheduleReqAction';
import { AvilableSlotsAction } from 'Store/Actions/AvilableSlotsAction/avilableSlotsAction';

const SlotsModal = ({ handleClose, show, history }) => {
  const dispatch = useDispatch();
  const acceptReschedule = () => {
    if (date === undefined && selectedSolt === undefined) {
      NotificationManager.error('Enter Valid Details', 'Error', 5000, null, '');
      handleClose(true);
    } else {
      let apiData = {
        id: currentRequest?.id,
        slot_id: slotId,
        date: date,
        status: { id: 2, name: 'approved' },
      };
      let res = dispatch(AcceptAppointmentAction(apiData));
      if (res) {
        NotificationManager.success(
          'Sucessfully Accepted ',
          'Sucess',
          5000,
          null,
          ''
        );
        handleClose(true);
        history.push('/app/ui/components/rescheduleRequest');
      } else {
        NotificationManager.error('Not Accepted ', 'Error', 5000, null, '');
      }
    }
  };
  const getAvilableSlots = async (data) => {
    dispatch(AvilableSlotsAction(data));
  };
  const [date, setDate] = useState();

  //   const {  } = props;
  let currentRequest = useSelector(
    (state) => state?.ViewCurrentAppointmentRemovalRequest?.currentAppointment
  );
  let thisView = useSelector(
    (state) => state?.ViewCurrentAppointmentRemovalRequest?.view
  );
  let slots = useSelector((state) => state?.GetAvilableSlotsReducer?.slots);
  const [slotId, setslotId] = useState();

  const [selectedSolt, setselectedSolt] = useState();
  const getSlotId = () => {
    slots?.map((item) =>
      item?.duration === selectedSolt ? setslotId(item?.slot_id) : ''
    );
  };
  useEffect(() => {
    let apiData = {
      id: currentRequest?.requested_by?.id,
      date: date,
    };
    getAvilableSlots(apiData);
  }, [date]);
  useEffect(() => {
    getSlotId();
  }, [selectedSolt]);
  return (
    <Modal isOpen={show} size="sm" centered style={{ boxShadow: 'none' }}>
      <ModalHeader toggle={handleClose} style={{ padding: '15px 20px' }}>
        {currentRequest?.description}
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Enter Date</Label>
          <Input type="date" onChange={(e) => setDate(e.target.value)}></Input>
        </FormGroup>
        <FormGroup>
          <Label>Avilable Slots</Label>

          <Input
            type="select"
            className=""
            // value={selectedSolt}
            defaultValue={selectedSolt}
            onChange={(val) => setselectedSolt(val.target.value)}
          >
            {slots?.map((item, index) => (
              <option value={item?.duration} key={index + 1}>
                {item?.duration}
              </option>
            ))}
          </Input>
        </FormGroup>
        <div
          style={{
            'justify-content': 'center',
            'align-items': 'center',
            display: 'flex',
          }}
        >
          <Button onClick={acceptReschedule}>Submit</Button>
        </div>
      </ModalBody>
    </Modal>
  );
};
export default SlotsModal;
