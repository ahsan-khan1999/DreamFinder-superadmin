/* eslint-disable */
import axios from 'axios';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useState } from 'react';
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
import { BASEURL } from 'services/HttpProvider';
import apiServices from 'services/requestHandler';
import { CreateProjectAction } from 'Store/Actions/User/UserActions';

export default function CreateProject(props) {
  const [loading, setLoading] = useState(false);
  const [loadingMulti, setLoadingMulti] = useState(false);
  const authToken = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [projectVideo, setProjectVideo] = useState([]);

  const [titledImage, setTitledImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);

  const [file, setFile] = useState();
  const [link, setLink] = useState();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  const [gallery, setGallery] = useState([]);

  const onProjectCreate = async (e) => {
    e.preventDefault();
    if (name === '' || titledImage === '' || desc === '') {
      let apiData = {
        name: name,
        short_description: desc,
        full_description: fullDescription,
        titled_image: titledImage,
        gallery: galleryImages,
        banner_video: projectVideo,
      };

      NotificationManager.warning(
        'Please Enter All Field',
        'Warning',
        5000,
        null,
        ''
      );
      return '';
    } else {
      setLoadingCreate(true);
      let apiData = {
        name: name,
        short_description: desc,
        full_description: fullDescription,
        titled_image: titledImage,
        gallery: galleryImages,
        banner_video: projectVideo,

      };
      let res = await dispatch(CreateProjectAction(apiData));
      if (res) props.history.push('/app/Project/ViewProject');
      setLoadingCreate(false);
    }
  };
  const uploadImage = async (event) => {
    event.preventDefault();

    let formdata = new FormData();

    if (file === undefined || file === null) {
      NotificationManager.error('Enter Details', 'Error', 5000, '');
      return;
    } else {
      formdata.append('images', file[0]);
      setLoading(true);

      let res = await apiServices.UploadImages(formdata);

      setLoading(false);
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
  const addLink = () => {
    const list = [...projectVideo, link];
    setProjectVideo(list);
    setLink(null);
    NotificationManager.success('Video Added', 'Success', 3000, null, null);
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Project" />
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
                    value={name}
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
                    value={desc}
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
                    value={fullDescription}
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
                      Enter Link
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="link"
                      onChange={(e) => {
                        setLink(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="col-md-6">
                    <Button
                      style={{ 'background-color': '#fed000' }}
                      onClick={addLink}
                    >
                      <span className="spinner d-inline-block">
                        <span className="bounce1" />
                        <span className="bounce2" />
                        <span className="bounce3" />
                      </span>
                      <span className="label">Add Video</span>
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
                        loading ? 'show-spinner' : ''
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
              // disabled={loading ? true : false}
              style={{ backgroundColor: '#fed000' }}
              className={`btn-shadow btn-multiple-state ${
                loadingCreate ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onProjectCreate}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Create Project</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
