/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Button, Card, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import axios from 'axios';
import { getToken, searchArray, testSearch } from '../../../Utils/auth.util';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'react-loader-spinner';

import {
  AdminTable,
  BannerTable,
  ProjectTable,
  TestanomialTable,
} from 'containers/ui/ReactTableCards';
import { CreateTestanomialAction, ViewTestanomialAction } from 'Store/Actions/User/UserActions';
import IntlMessages from 'helpers/IntlMessages';
import { Formik } from 'formik';
import apiServices from 'services/requestHandler';
import { NotificationManager } from 'components/common/react-notifications';

export default function CreateTestanomial(props) {
  const [loading, setLoading] = useState(false);
  const [loadingMulti, setLoadingMulti] = useState(false);
  const authToken = JSON.parse(localStorage.getItem('token'));
  const dispatch = useDispatch();
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
      );
      return '';
    } else {
      setLoadingCreate(true);
      let apiData = {
        name: name,
        testimonial: desc,
        image: titledImage,
      };
      let res = await dispatch(CreateTestanomialAction(apiData));
      if (res) props.history.push('/app/testanomial/ViewTestanomial');
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
          <IntlMessages id="Create Testanomial" />
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
              <span className="label">Create Testanomial</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
