/* eslint-disable */

import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
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
import { EditBannerAction, EditTestanomialAction } from 'Store/Actions/User/UserActions';

export default function EditTestanomial(props) {
    const authToken = JSON.parse(localStorage.getItem('token'));

  const currentTeam = props?.location?.state;
  const [editTeam, setEditTeam] = useState(false);
  const [titledImage, setTitledImage] = useState(currentTeam?.image);
  const dispatch = useDispatch()
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
    setName(currentTeam?.name);
    setDesc(currentTeam?.testimonial);
  }, []);

  const editTeamData = async () => {
    setLoadingEdit(true);
    let apiData = {
      name: name,
      testimonial: desc,
      image: titledImage,
    };
    const res = await dispatch(EditTestanomialAction(apiData, currentTeam?.id));
    if (res) {
      setLoadingEdit(false);
      props.history.push('/app/testanomial/ViewTestanomial');
    }
    setLoadingEdit(false);
  };
  const deleteMember = async () => {
    setLoadingDelete(true);
    let res = await axios.delete(
      `https://dream-finder-backend.herokuapp.com/api/v1/testimonials/${currentTeam?.id}`,
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
      props.history.push('/app/testanomial/ViewTestanomial');
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
  return (
    loading ? (
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
              <IntlMessages id="View Testinomial" />
            </CardTitle>
            <Formik>
              <Form>
                <Row className="h-100">
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Name" />
                      </Label>
                      <span>
                        <p>{currentTeam?.name}</p>
                      </span>
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Review" />
                      </Label>
                      <span>
                        <p>{currentTeam?.testimonial}</p>
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
                <Button onClick={changeTeeam}>Edit Testimonial</Button>
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
                  <span className="label">Delete Testimonial</span>
                </Button>
              </Form>
            </Formik>
          </CardBody>
        </Card>
      ) : (
        <Card>
          <CardBody>
            <CardTitle>
              <IntlMessages id="Edit Testimonial" />
            </CardTitle>
            <Formik>
              <Form>
                <Row className="h-100">
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Name" />
                      </Label>
    
                      <Input
                        required
                        type="text"
                        defaultValue={currentTeam?.name}
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
                        <IntlMessages id="Review" />
                      </Label>
    
                      <Input
                        required
                        defaultValue={currentTeam?.testimonial}
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
                  <span className="label">Edit Testimonial</span>
                </Button>
              </Form>
            </Formik>
          </CardBody>
        </Card>
      )
  )
}
