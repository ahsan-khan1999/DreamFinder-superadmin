/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
/* eslint-disable */

import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';
import { Row, Card, CardTitle, Label, FormGroup } from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import axios from 'axios';

const AddBulkMedicineModal = (props) => {
  const [loading, setLoading] = useState(false);
  const { handleClose, show } = props;
  const [file, setFile] = useState();

  const uploadFile = async (event) => {
    setLoading(true);
    event.preventDefault();
    let formdata = new FormData();


    const authToken = JSON.parse(localStorage.getItem('token'));

    if (file === undefined || file === null) {
      NotificationManager.error('Enter Details', 'Error', 5000, '');
      return;
    } else {
      formdata.append('file', file[0]);
      let res = await axios.post(
        'https://dmfr-backend.herokuapp.com/api/v1/medicine/insert-file',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-session-key': authToken.token,
            'x-session-type': authToken.type,
          },
        }
      );
      setLoading(false);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Successfully Uploaded Report',
          'Success',
          5000,
          ''
        );
        props.history.push('/app/Medicines/viewMedicines');
      } else {
        NotificationManager.error(
          res?.data?.response_message,
          'Error',
          5000,
          ''
        );
      }
    }
  };
  // let showHideClassName = show ? 'display-block' : 'display-none';
  // console.log(show,"show value",showHideClassName);
  return (
    <Modal isOpen={show} size="sm" centered style={{ boxShadow: 'none' }}>
      <ModalHeader toggle={handleClose} style={{ padding: '15px 20px' }}>
        Add Medicine
      </ModalHeader>
      <ModalBody>
        <Col>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label className="">Select File :</label>
              <input
                type="file"
                className="form-control"
                name="upload_file"
                onChange={(e) => {
                  setFile(e.target.files);
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-6">
              <button
                type="submit"
                style={{ 'background-color': '#003766' }}
                className={`btn btn-primary btn-shadow btn-multiple-state ${
                  loading ? 'show-spinner' : ''
                }`}
                onClick={uploadFile}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                Save
              </button>
            </div>
          </div>
        </Col>
      </ModalBody>
    </Modal>
  );
};

export default AddBulkMedicineModal;
