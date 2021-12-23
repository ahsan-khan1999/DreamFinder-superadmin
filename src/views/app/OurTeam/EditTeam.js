/* eslint-disable */

import axios from 'axios';
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

export default function EditTeam(props) {
  const currentTeam = props?.location?.state;
  const [editTeam, setEditTeam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [name, setName] = useState(data?.name);
  const [desc, setDesc] = useState(data?.short_description);
  const [email, setEmail] = useState(data?.email_address);
  const [fullDescription, setFullDescription] = useState(data?.full_description);
  const changeTeeam = () => setEditTeam(true);
  const [designation, setDesignation] = useState(data?.designation);
  const [social_media_links, setSocial_media_links] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
    linkedIn: '',
  });
  useEffect(async () => {
    const res = await axios.get(
      `https://dream-finder-backend.herokuapp.com/api/v1/our-teams/${currentTeam}`,
      {}
    );
    setLoading(false);
    setData(res?.data?.response_data?.our_team);
    let da = {...data}
    console.log(da,"da");
    // setName(data?.name)
  }, []);
  const editTeamData = () => {
      let apiData= {
        name: name,
        email_address: email,
        short_description: desc,
        designation: designation,
        full_description: fullDescription,
      }
      console.log(apiData,"apiData");
  }

  return loading ? (
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
        color="#0066B3"
        height={100}
        width={100}
        // color="#003766"
      />
    </div>
  ) : !editTeam ? (
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
                    <span><p>{data?.name}</p></span>
                  
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Short Description" />
                  </Label>
                  <span><p>{data?.short_description}</p></span>

                 
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Full Description" />
                  </Label>
                  <span><p>{data?.full_description}</p></span>

                  
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Designation" />
                  </Label>
                  <span><p>{data?.designation}</p></span>

                  
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Email Address" />
                  </Label>
                  <span><p>{data?.email_address}</p></span>

                  
                </FormGroup>
              </Col>
              
            </Row>
            <Button onClick={changeTeeam}>Edit Team</Button>
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
                    defaultValue={data?.name}

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
                    defaultValue={data?.short_description}
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
                    defaultValue={data?.full_description}
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
                    defaultValue={data?.designation}
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
                    defaultValue={data?.email_address}
                    type="email"
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
              
            </Row>
            <Button
              disabled={loading ? true : false}
              style={{ backgroundColor: '#0066B3' }}
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
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
