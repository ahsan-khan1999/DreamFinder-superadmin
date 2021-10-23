/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import React, { useState } from 'react';
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
import apiServices from 'services/requestHandler';
import UploadReport from './uploadReport';

export default function viewCurrentReport(props) {
  const currentReport = props?.location?.state?.item;
  const view = props?.location?.state?.view;
  // console.log(currentReport, view);
  const [View, setView] = useState(true);
  const handleChangeToView = () => {
    props.history.push('/app/Reports/viewReports');
  };
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState();

  const uploadFile = async (event) => {
    setLoading(true);
    event.preventDefault();
    let formdata = new FormData();
    // console.log(formdata);

    // console.log(formdata.keys);

    const authToken = JSON.parse(localStorage.getItem('token'));

    if (file === undefined || file === null) {
      NotificationManager.error('Enter Details', 'Error', 5000, '');
      return;
    } else {
      formdata.append('report', file[0]);
      formdata.append('id', currentReport?.id);
      let res = await axios.post(
        'https://dmfr-backend.herokuapp.com/api/v1/user/upload/test-report',
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
        props.history.push('/app/Reports/viewReports');
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

  const deleteReport =async () => {
    let res =await apiServices.deleteReport({ report_id: currentReport?.id });
    // console.log(res);
    if (res?.response_code === 200) {
      NotificationManager.success(
        'Successfully Deleted Report',
        'Success',
        5000,
        ''
      );
      props.history.push('/app/Reports/viewReports')
      return;
    } else {
      NotificationManager.error(res?.response_message, 'Error', 5000, '');
    }
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            className="btn-btn-secondary"
            onClick={handleChangeToView}
            style={{ marginRight: '10px', 'background-color': '#003766' }}
          >
            Back
          </Button>
        </CardTitle>
        <CardTitle>
          <h4>View Report</h4>
        </CardTitle>

        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Patient Name</h6>
                  </Label>
                  {View === true ? (
                    <span>
                      <p>{currentReport?.patient?.name}</p>
                    </span>
                  ) : (
                    // <Input
                    //   type="text"
                    //   value={name}
                    //   defaultValue={currentCategory?.name}
                    //   onChange={(e) => setName(e.target.value)}
                    // ></Input> ""
                    ''
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Patient Age</h6>
                  </Label>
                  {View === true ? (
                    <span>
                      <p>{currentReport?.patient?.age}</p>
                    </span>
                  ) : (
                    // <Input
                    //   type="text"
                    //   value={name}
                    //   defaultValue={currentCategory?.name}
                    //   onChange={(e) => setName(e.target.value)}
                    // ></Input> ""
                    ''
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Patient Gender</h6>
                  </Label>
                  {View === true ? (
                    <span>
                      <p>{currentReport?.patient?.gender?.name}</p>
                    </span>
                  ) : (
                    // <Input
                    //   type="text"
                    //   value={name}
                    //   defaultValue={currentCategory?.name}
                    //   onChange={(e) => setName(e.target.value)}
                    // ></Input> ""
                    ''
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Patient Email</h6>
                  </Label>
                  {View === true ? (
                    <span>
                      <p>{currentReport?.patient?.email_address}</p>
                    </span>
                  ) : (
                    // <Input
                    //   type="text"
                    //   value={name}
                    //   defaultValue={currentCategory?.name}
                    //   onChange={(e) => setName(e.target.value)}
                    // ></Input> ""
                    ''
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Test Name</h6>
                  </Label>
                  {View === true ? (
                    <span>
                      <p>{currentReport?.test?.name}</p>
                    </span>
                  ) : (
                    // <Input
                    //   type="text"
                    //   value={name}
                    //   defaultValue={currentCategory?.name}
                    //   onChange={(e) => setName(e.target.value)}
                    // ></Input> ""
                    ''
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Status</h6>
                  </Label>
                  {View === true ? (
                    <span>
                      <p>{currentReport?.status?.name}</p>
                    </span>
                  ) : (
                    // <Input
                    //   type="text"
                    //   value={name}
                    //   defaultValue={currentCategory?.name}
                    //   onChange={(e) => setName(e.target.value)}
                    // ></Input> ""
                    ''
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Test Category</h6>
                  </Label>
                  {View === true ? (
                    <span>
                      <p>{currentReport?.test?.category?.name}</p>
                    </span>
                  ) : (
                    // <Input
                    //   type="text"
                    //   value={name}
                    //   defaultValue={currentCategory?.name}
                    //   onChange={(e) => setName(e.target.value)}
                    // ></Input> ""
                    ''
                  )}
                </FormGroup>
              </Col>
              <Col>
                <div className="form-row">
                  <div className="form-group col-md-6">
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
            </Row>
          </Form>
        </Formik>
        {currentReport?.status?.name === 'report uploaded' ? (
             <>
              {View === true ? (
                <div>
                  <span>
                    <p>
                      <Button style={{ 'background-color': '#003766' ,marginRight:"5px"}}>
                        <a
                          target="_blank"
                          href={currentReport?.url}
                          style={{ color: '#ffff' }}
                        >
                          Report
                        </a>
                      </Button>
                      <Button 
                      onClick={deleteReport}
                      style={{ 'background-color': '#003766' }}>
                        Delete Report
                      </Button>
                    </p>
                  </span>
                </div>
              ) : (
                // <Input
                //   type="text"
                //   value={name}
                //   defaultValue={currentCategory?.name}
                //   onChange={(e) => setName(e.target.value)}
                // ></Input> ""
                ''
              )}
          </>
        ) : (
          ''
        )}
      </CardBody>
    </Card>
  );
}
