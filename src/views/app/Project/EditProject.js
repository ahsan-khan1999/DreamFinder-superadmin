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
import { EditProjectAction } from 'Store/Actions/User/UserActions';

export default function EditProject(props) {
  const authToken = JSON.parse(localStorage.getItem('token'));

  const currentTeamId = props?.location?.state;
  const [currentTeam, setCurrentTeam] = useState({});
  const [editTeam, setEditTeam] = useState(false);
  const getCurrentTeam = async (uid) => {
    setLoading(true);
    let res = await axios.get(
      `https://dream-finder-backend.herokuapp.com/api/v1/projects/${uid}`,
      {}
    );
    setCurrentTeam(res?.data?.response_data?.project);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    getCurrentTeam(currentTeamId?.id);
  }, []);
  const [titledImage, setTitledImage] = useState(currentTeam?.titled_image);
  const [file, setFile] = useState(null);
  const [galleryImages, setGalleryImages] = useState(currentTeam?.gallery);
  const [loading, setLoading] = useState(false);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const dispatch = useDispatch()
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingMulti, setLoadingMulti] = useState(false);
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
    setTitledImage(currentTeam?.titled_image);
    setGalleryImages(currentTeam?.gallery);
  }, [currentTeam]);

  const editTeamData = async () => {
    setLoadingEdit(true);
    let apiData = {
      name: name,
      short_description: desc,
      full_description: fullDescription,
      titled_image: titledImage,
      gallery: galleryImages,
    };
    try {
      const res = await dispatch(EditProjectAction(apiData, currentTeam?.id));
      if(res){

        setLoadingEdit(false);
        props.history.push('/app/Project/ViewProject')
      }
      setLoadingEdit(false);

    } catch (e) {
      console.log(e, 'error');
    }
  };
  const deleteMember = async () => {
    setLoadingDelete(true);
    let res = await axios.delete(
      `https://dream-finder-backend.herokuapp.com/api/v1/projects/${currentTeam?.id}`,
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
      props.history.push('/app/Project/ViewProject');
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
  const uploadImageGallery = async (event) => {
    event.preventDefault();

    let formdata = new FormData();

    if (file === undefined || file === null) {
      NotificationManager.error('Enter Details', 'Error', 5000, '');
      return;
    } else {
      // file?.map((item) => formdata?.append('images', item));
      const test = Object.values(file);
      test?.map((item, index) => {
        formdata.append('images', file[index]);
      });
      // formdata?.append("images",file[0])
      // formdata?.append("images",file[1])

      console.log(formdata, 'formdata');
      // formdata.append('images', file);
      setLoadingMulti(true);

      let res = await apiServices.UploadImages(formdata);

      setLoadingMulti(false);
      if (res?.data?.response_code === 201) {
        NotificationManager.success(
          'Successfully Uploaded Image',
          'Success',
          5000,
          ''
        );
        setGalleryImages(res?.data?.response_data?.image_urls);
      } else {
        NotificationManager.error(
          res?.data?.response_message,
          'Error',
          5000,
          ''
        );
        setLoadingMulti(false);
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
          <IntlMessages id="View Project" />
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
                    <IntlMessages id="Titled Image" />
                  </Label>
                  <div>
                    <img
                      src={currentTeam?.titled_image}
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                </FormGroup>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col lg={12}>
                {currentTeam?.gallery?.map((it) => (
                  <Col lg={3}>
                    <a href={it} target="_blank">
                      <img
                        src={it}
                        style={{ maxHeight: '300px', maxWidth: '200px' }}
                      />
                    </a>
                  </Col>
                ))}
              </Col>
            </Row>
            <Button onClick={changeTeeam}>Edit Project</Button>
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
              <span className="label">Delete Project</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  ) : (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Edit Project" />
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

              <Col lg={6}>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label
                      className=""
                      style={{ fontSize: '1rem', fontWeight: 'bold' }}
                    >
                      Select Gallery Image :
                    </label>
                    <input
                      type="file"
                      multiple
                      className="form-control"
                      name="upload_file"
                      onChange={(e) => {
                        setFile(e.target.files);
                      }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6 mb-3">
                    <Button
                      type="submit"
                      style={{ 'background-color': '#fed000' }}
                      className={`btn-shadow btn-multiple-state ${
                        loadingMulti ? 'show-spinner' : ''
                      }`}
                      onClick={uploadImageGallery}
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
              <span className="label">Edit Project</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}































// if (res?.data?.response_code === 200) {
//         setLoadingEdit(false);
//         NotificationManager.success(
//           'Successfully Updated',
//           'Success',
//           5000,
//           null,
//           ''
//         );
//         props.history.push('/app/Project/ViewProject');
//       } else {
//         setLoadingEdit(false);
//         NotificationManager.success(
//           res?.data?.response_message,
//           'Error',
//           5000,
//           null,
//           ''
//         );
//       }