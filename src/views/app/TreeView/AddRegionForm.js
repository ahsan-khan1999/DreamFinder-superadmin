/* eslint-disable */

import { Formik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import { CreateRegionAction } from '../../../Store/Actions/RegionClassification/regionClassificationAction';

export default function AddRegionForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const onCreateRegion = async() => {
    let res = await dispatch(CreateRegionAction());
    
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Test" />
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
                    <h6>Region Name</h6>
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

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Category</h6>
                  </Label>

                  <Input
                    required
                    value={category}
                    className="form-control"
                    name="email"
                    type="text"
                    // validate={validate}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
              style={{ 'background-color': '#003766' }}
              // type="submit"
              // className={`btn-shadow btn-multiple-state ${
              //   loading ? 'show-spinner' : ''
              // }`}
              size="sm"
              onClick={onCreateRegion}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              Add Package
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
