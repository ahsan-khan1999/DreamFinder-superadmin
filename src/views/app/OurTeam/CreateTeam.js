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
import { CreateTeamAction } from 'Store/Actions/User/UserActions';

export default function CreateTeam(props) {
  const authToken = JSON.parse(localStorage.getItem('token'));
  const dispatch =useDispatch()
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [email, setEmail] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  const [designation, setDesignation] = useState('');
  const [social_media_links, setSocial_media_links] = useState({
    facebook: '',
    instagram: '',
    twitter: '',
  });

  const onTeamCreate = async () => {
    let res = {};
    if (name === '' || desc === '' || designation === '') {
      NotificationManager.warning(
        'Please Enter All Field',
        'Warning',
        5000,
        null,
        ''
      );
      return '';
    } else {
      setLoading(true);
      let apiData = {
        name: name,
        email_address: email,
        short_description: desc,
        designation: designation,
        full_description: fullDescription,
        social_media_links: social_media_links,
      };
      let res = await dispatch(CreateTeamAction(apiData));
      setLoading(false)
      if(res) props.history.push('/app/OurTeam/ViewTeam')
    }
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Team" />
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
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Designation" />
                  </Label>

                  <Input
                    required
                    value={designation}
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
                    value={email}
                    type="email"
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter FaceBook Link" />
                  </Label>

                  <Input
                    required
                    value={social_media_links.facebook}
                    type="email"
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setSocial_media_links({
                        ...social_media_links,
                        facebook: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Insta Link" />
                  </Label>

                  <Input
                    required
                    value={social_media_links.instagram}
                    type="email"
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setSocial_media_links({
                        ...social_media_links,
                        instagram: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Twitter Link" />
                  </Label>

                  <Input
                    required
                    value={social_media_links.twitter}
                    type="email"
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setSocial_media_links({
                        ...social_media_links,
                        twitter: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              {/* <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter LinkedIn Link" />
                  </Label>

                  <Input
                    required
                    value={social_media_links.linkedIn}
                    type="email"
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setSocial_media_links({
                        ...social_media_links,
                        linkedIn: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col> */}
            </Row>
            <Button
              disabled={loading ? true : false}
              style={{ backgroundColor: '#fed000' }}
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onTeamCreate}
              // #fed000
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Create Team</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
