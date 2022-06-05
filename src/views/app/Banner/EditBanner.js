/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
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
} from 'reactstrap';
import apiServices from 'services/requestHandler';

export default function EditTeam(props) {
  const authToken = JSON.parse(localStorage.getItem('token'));

  const currentTeam = props?.location?.state;
  const [editTeam, setEditTeam] = useState(false);
  const [titledImage, setTitledImage] = useState(currentTeam?.image);

  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const [loadingDelete, setLoadingDelete] = useState(false);

  const [name, setName] = useState(currentTeam?.name);
  const [file, setFile] = useState(currentTeam?.image);

  const [desc, setDesc] = useState(currentTeam?.short_description);
  const [email, setEmail] = useState(currentTeam?.email_address);

  const [fullDescription, setFullDescription] = useState(
    currentTeam?.full_description
  );
  const changeTeeam = () => setEditTeam(true);
  useEffect(async () => {
    setName(currentTeam?.heading);
    setDesc(currentTeam?.paragraph);
  }, []);

  const editTeamData = async () => {
    setLoadingEdit(true);
    let apiData = {
      heading: name,
      paragraph: desc,
      image:titledImage
    };
    const res = await axios.put(
      `https://dream-finder-backend.herokuapp.com/api/v1/banner/${currentTeam?.id}`,
      apiData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${authToken?.token}`,
        },
      }
    );
    if (res?.data?.response_code === 200) {
      setLoadingEdit(false);
      NotificationManager.success(
        'Successfully Updated',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/Banner/ViewBanner');
    } else {
      setLoadingEdit(false);
      NotificationManager.success(
        res?.data?.response_message,
        'Error',
        5000,
        null,
        ''
      );
    }
    setLoadingEdit(false);
  };
  const deleteMember = async () => {
    setLoadingDelete(true);
    let res = await axios.delete(
      `https://dream-finder-backend.herokuapp.com/api/v1/banner/${currentTeam?.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${authToken?.token}`,
        },
      }
    );
    if (res?.data?.response_code === 200) {
      setLoadingDelete(false);

      NotificationManager.success(
        'Successfully Deleted',
        'Success',
        5000,
        null,
        null
      );
      props.history.push('/app/Banner/ViewBanner');
    } else {
      setLoadingDelete(false);

      NotificationManager.success(
        res?.data?.response_message,
        'Error',
        5000,
        null,
        null
      );
    }
    setLoadingDelete(false);
  };

  const uploadImage = async (event) => {
    event.preventDefault();

    let formdata = new FormData();

    if (file === undefined || file === null) {
      NotificationManager.error('Enter Details', 'Error', 5000, '');
      return;
    } else {
      formdata.append('images', file[0]);
      setLoadingUpload(true);

      let res = await apiServices.UploadImages(formdata);

      setLoadingUpload(false);
      if (res?.data?.response_code === 201) {
        NotificationManager.success(
          'Successfully Uploaded Image',
          'Success',
          5000,
          ''
        );
        setTitledImage(res?.data?.response_data?.image_urls[0]);
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
  return loading ? (
    <Card>
      <CardBody>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loader
            type="Puff"
            color="#fed000"
            height={100}
            width={100}
            // color="#fed000"
          />
        </div>
      </CardBody>
    </Card>
  ) : !editTeam ? (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="View Banner" />
        </CardTitle>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Heading" />
                  </Label>
                  <span>
                    <p>{currentTeam?.heading}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Description" />
                  </Label>
                  <span>
                    <p>{currentTeam?.paragraph}</p>
                  </span>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Image" />
                  </Label>
                  <div>
                    <img
                      src={currentTeam?.image}
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Button onClick={changeTeeam}>Edit Banner</Button>
            <Button
              disabled={loadingDelete ? true : false}
              style={{ backgroundColor: '#fed000' }}
              className={`ml-2 btn-shadow btn-multiple-state ${
                loadingDelete ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={deleteMember}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Delete Member</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  ) : (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Edit Banner" />
        </CardTitle>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Heading" />
                  </Label>

                  <Input
                    required
                    type="text"
                    defaultValue={currentTeam?.heading}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Description" />
                  </Label>

                  <Input
                    required
                    defaultValue={currentTeam?.paragraph}
                    className="form-control"
                    name="name"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg={6} className="mb-3">
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label
                      className=""
                      style={{ fontSize: '1rem', fontWeight: 'bold' }}
                    >
                      Select Title Image :
                    </label>
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
                    <Button
                      type="submit"
                      style={{ 'background-color': '#fed000' }}
                      className={`btn-shadow btn-multiple-state ${
                        loadingUpload ? 'show-spinner' : ''
                      }`}
                      onClick={uploadImage}
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Save</span>
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
            <Button
              disabled={loadingEdit ? true : false}
              style={{ backgroundColor: '#fed000' }}
              className={`btn-shadow btn-multiple-state ${
                loadingEdit ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={editTeamData}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Edit Banner</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
