/* eslint-disable */

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
import { CreateCategoeyAction } from 'Store/Actions/TestsAction/testActions';

export default function CreateCategory({ history }) {
  const [name, setName] = useState();
  const dispatch = useDispatch();
  // console.log(name);

  const onCreateCategory = async () => {
    let apiData = {
      name: name,
    };
    if (name === undefined) {
      NotificationManager.error('Please Enter Details', 'Error', 5000, '', '');

      return;
    }
    let res = await dispatch(CreateCategoeyAction(apiData));
    if (res) {
      NotificationManager.success(
        'Sucessfully Created',
        'Sucess',
        5000,
        '',
        ''
      );
      history.push('/app/Test/viewCategory');
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <h6>Create Category</h6>
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik
        // initialValues={formikData.initialValues}
        // onSubmit={formikData.handleSubmit}
        >
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Test Name</h6>
                  </Label>

                  <Input
                    required
                    value={name}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
                style={{backgroundColor:'#0066b3'}}
              style={{ 'background-color': '#003766' }}
              // type="submit"
              // className={`btn-shadow btn-multiple-state ${
              //   loading ? 'show-spinner' : ''
              // }`}
              size="sm"
              onClick={onCreateCategory}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              Add Category
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
