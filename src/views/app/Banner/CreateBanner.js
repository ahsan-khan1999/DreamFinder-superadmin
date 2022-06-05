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
import { CreateBannerAction, CreateProjectAction } from 'Store/Actions/User/UserActions';

export default function CreateBanner(props) {
  const [loading, setLoading] = useState(false);
  const [loadingMulti, setLoadingMulti] = useState(false);
  const authToken = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch()
  const [loadingCreate, setLoadingCreate] = useState(false);

  const [titledImage, setTitledImage] = useState('');
  const [galleryImages, setGalleryImages] = useState([]);

  const [file, setFile] = useState();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const [gallery, setGallery] = useState([]);

  const onProjectCreate = async (e) => {
    e.preventDefault();
    if (name === '' || titledImage === '' || desc === '') {
      

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
        heading: name,
        paragraph: desc,
        image: titledImage,

      };
      let res  = await dispatch(CreateBannerAction(apiData))
      if(res) props.history.push('/app/Banner/ViewBanner') 
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
  
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Banner" />
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

                <div className="form-row mb-3">
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
              <span className="label">Create Banner</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
