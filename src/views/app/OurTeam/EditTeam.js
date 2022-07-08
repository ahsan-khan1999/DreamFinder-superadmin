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
import { EditTeamAction } from 'Store/Actions/User/UserActions';

export default function EditTeam(props) {
  const authToken = JSON.parse(localStorage.getItem('token'));
  const [loadingSingle, setLoadingSingle] = useState(false);
  
  const currentTeamId = props?.location?.state;
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

  const [currentTeam, setCurrentTeam] = useState({});
  const [titledImage, setTitledImage] = useState(currentTeam?.image);
  const [editTeam, setEditTeam] = useState(false);
  const getCurrentTeam = async (uid) => {
    setLoading(true);
    let res = await axios.get(
      `https://dream-finder-backend.herokuapp.com/api/v1/our-teams/${uid}`,
      {}
    );
    setCurrentTeam(res?.data?.response_data?.our_team);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    getCurrentTeam(currentTeamId?.id);
  }, []);
  const [loading, setLoading] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [name, setName] = useState(currentTeam?.name);
  const [desc, setDesc] = useState(currentTeam?.short_description);
  const [email, setEmail] = useState(currentTeam?.email_address);

  const [fullDescription, setFullDescription] = useState(
    currentTeam?.full_description
  );
  const changeTeeam = () => setEditTeam(true);
  const [designation, setDesignation] = useState(currentTeam?.designation);
  const [social_media_links, setSocial_media_links] = useState({
    facebook: currentTeam?.social_media_links?.facebook,
    instagram: currentTeam?.social_media_links?.instagram,
    twitter: currentTeam?.social_media_links?.twitter,
    linkedIn: currentTeam?.social_media_links?.linkedIn,
  });
  useEffect(async () => {
    setName(currentTeam?.name);
    setDesc(currentTeam?.short_description);
    setFullDescription(currentTeam?.full_description);
    setEmail(currentTeam?.email_address);
    setDesignation(currentTeam?.designation);
    setSocial_media_links(currentTeam?.social_media_links);
  }, []);

  const editTeamData = async () => {
    setLoadingEdit(true);
    let apiData = {
      name: name,
      email_address: email,
      short_description: desc,
      designation: designation,
      full_description: fullDescription,
      image:titledImage
    };
    const res = await dispatch(EditTeamAction(apiData, currentTeam?.id));
    if (res) {
      setLoadingEdit(false);
      props.history.push('/app/OurTeam/ViewTeam');
    }
    setLoadingEdit(false);
  };
  const deleteMember = async () => {
    setLoadingDelete(true);
    let res = await axios.delete(
      `https://dream-finder-backend.herokuapp.com/api/v1/our-teams/${currentTeam?.id}`,
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
      props.history.push('/app/OurTeam/ViewTeam');
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
      setLoadingSingle(true);

      let res = await apiServices.UploadImages(formdata);

      setLoadingSingle(false);
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
          <IntlMessages id="View Team" />
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
                    <IntlMessages id="Short Description" />
                  </Label>
                  <span>
                    <p>{currentTeam?.short_description}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Full Description" />
                  </Label>
                  <span>
                    <p>{currentTeam?.full_description}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Designation" />
                  </Label>
                  <span>
                    <p>{currentTeam?.designation}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Email Address" />
                  </Label>
                  <span>
                    <p>{currentTeam?.email_address}</p>
                  </span>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Titled Image" />
                  </Label>
                  <div>
                    <img
                      src={currentTeam?.image}
                      style={{ maxHeight: '200px' }}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Button onClick={changeTeeam}>Edit Team</Button>
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
          <IntlMessages id="Edit Team" />
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
                    <IntlMessages id="Description" />
                  </Label>

                  <Input
                    required
                    defaultValue={currentTeam?.short_description}
                    className="form-control"
                    name="name"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Full Description" />
                  </Label>

                  <Input
                    required
                    defaultValue={currentTeam?.full_description}
                    className="form-control"
                    name="name"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) => setFullDescription(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Designation" />
                  </Label>

                  <Input
                    required
                    defaultValue={currentTeam?.designation}
                    className="form-control"
                    name="name"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Email Address" />
                  </Label>

                  <Input
                    required
                    defaultValue={currentTeam?.email_address}
                    type="email"
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
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
                        loadingSingle ? 'show-spinner' : ''
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
              <span className="label">Edit Team</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
