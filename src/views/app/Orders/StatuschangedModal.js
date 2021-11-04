/* eslint-disable */

import React, { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  FormGroup,
} from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

// import {
//   statusChange,
// } from "../../../../Store/Actions/deportmanagerActions";

import { useDispatch, useSelector } from 'react-redux';
import { StaticDataGet, statusChange } from 'Store/Actions/ConcordOrder/OrderAction';
import IntlMessages from 'helpers/IntlMessages';
import Select, { components } from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

const StatuschangedModal = (props) => {
  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);
  const loading = useSelector((state) => state?.orderReducer?.loader);
  let option_static_DeliveryStatus = [];
  staticdata?.list_order__delivery_statuses?.filter((item) =>
    option_static_DeliveryStatus.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );
  let option_static_PaymentStatus = [];
  staticdata?.list_order__payment_statuses?.filter((item) =>
    option_static_PaymentStatus.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );

  console.log('option_static_DeliveryStatus', option_static_DeliveryStatus);
  console.log('option_static_PaymentStatus', option_static_PaymentStatus);

  useEffect(() => {
    dispatch(StaticDataGet());
  }, []);

  const dispatch = useDispatch();

  
  useEffect(() => {
    setupdateStatus({ ...updateStatus, 
      delivery_status: currentData?.delivery_status,
      payment_status: currentData?.payment_status
    ,uid: currentData?.uid
    })
  }, []);


  const apiData = {
    delivery_status: currentData?.delivery_status,
    payment_status: currentData?.payment_status,
    uid: currentData?.uid,
  };
  
  const [updateStatus, setupdateStatus] = useState(apiData);


  const currentData = props?.data;
  console.log('currentData', updateStatus);

  const onSubmit = async () => {
    
    // const apiDataall = {
    //   ...updateStatus,
    //   uid: currentData?.uid,
    // };
    console.log(updateStatus)
    let res = await dispatch(statusChange(updateStatus));
    if (res) {
        NotificationManager.success(
          'Status Updated Sucessfully',
          'Sucess',
          3000,
          null,
          ''
        );
        props.history.push('/app/Orders/orders');
      }
    props.onHide();
  };
  return (
    <>
      <Modal
        isOpen={props.show}
        isClose={props.onHide}
        centered
        size="sm"
        style={{ boxShadow: 'none' }}
      >
        <ModalHeader toggle={props.onHide} style={{ padding: '15px 20px' }}>
          <span
            className=""
            style={{ fontWeight: '600', fontSize: '22px', color: '#0066b3' }}
          >
            {' '}
            Status{' '}
          </span>
        </ModalHeader>
        <ModalBody className="p-0">
          <div className="row ">
            <div className="col mb-5">
              <div className="row "></div>
              <div className="d-flex justify-content-center  me-3 ">
                <div
                  className="card cardlogmodel"
                  style={{ minWidth: '50%', width: '400px', height: '200px' }}
                >
                  <div className="">
                    <div
                      className="form  px-3 pt-4"
                      style={{ padding: '10px', height: '180px' }}
                    >
                      <Col lg={12}>
                        <FormGroup>
                          <label>
                            <IntlMessages id="Select Delivery Status" />
                          </label>

                          <>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              required
                              defaultValue={{
                                label:currentData?.delivery_status,
                                value:currentData?.delivery_status
                              }}
                              onChange={(e) => {
                                setupdateStatus({ ...updateStatus, delivery_status: e.value })
                              }}
                              options={option_static_DeliveryStatus}
                            />
                          </>
                        </FormGroup>
                      </Col>

                      
                      <Col lg={12}>
                        <FormGroup>
                          <label>
                            <IntlMessages id="Select Payment Status" />
                          </label>

                          <>
                            <Select
                              components={{ Input: CustomSelectInput }}
                              className="react-select"
                              classNamePrefix="react-select"
                              required
                              defaultValue={{
                                label:currentData?.payment_status,
                                value:currentData?.payment_status
                              }}
                              onChange={(e) => {
                                setupdateStatus({ ...updateStatus, payment_status: e.value })
                              }}
                              options={option_static_PaymentStatus}
                            />
                          </>
                        </FormGroup>
                      </Col>
                      
                      <div className="d-flex justify-content-center">
                      <Button
                        className="btn btn-primary w-50"
                        size="md"
                        onClick={onSubmit}
                      >
                         {loading ?
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Updating
                </div> : "Change Status"
              }
                      </Button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default StatuschangedModal;
