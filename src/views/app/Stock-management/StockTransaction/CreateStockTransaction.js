/* eslint-disable */
import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'Utils/auth.util';
import BestSellers from 'containers/dashboards/BestSellers';
import AdvancedSearch from 'containers/dashboards/AdvancedSearch';
import { Link, NavLink } from 'react-router-dom';
import products from 'data/products';
import AddNewSurveyModal from 'containers/applications/AddNewSurveyModal';
import AddNewModal from 'containers/pages/AddNewModal';
import AddNewTodoModal from 'containers/applications/AddNewTodoModal';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CreateDepartmentHead } from 'Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';

export default function CreateStockTransaction({ history }) {

    const dispatch = useDispatch();

  const dephead_obj = {
    name: '',

    designation: '',

    email: '',

    address: '',

    phone: '',
  };

  const loading = useSelector(
    (state) => state?.departmentHeadReducer?.loader
  );
  const [departhead, setDeparthead] = useState(dephead_obj);

  const onDepartHeadCreate = async () => {
    if (
      departhead?.name === '' &&
      departhead?.designation === '' &&
      departhead?.email === '' &&
      departhead?.address === '' &&
      departhead?.phone === ''
    ) {
      NotificationManager.error(
        'Please Enter Required Field',
        'Error',
        3000,
        null,
        ''
      );
      return;
    } else {
      console.log(departhead);
        let res = await dispatch(CreateDepartmentHead({ ...departhead }));

      if (res) {
        NotificationManager.success(
          'Department Head Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/stocks-management/ViewStockTransaction');
      }
    }
  };

  const handleChangeToView = () => {
    history.push('/app/stocks-management/ViewStockTransaction');
  };

  return (
    <Card>
      <CardBody>
      <Button
            className="btn btn-primary mb-4 "
            onClick={handleChangeToView}
            style={{ marginRight: '20px'}}
          >
            Back
          </Button>
        <CardTitle>
          <IntlMessages id="Create Stock Transaction" />
        </CardTitle>
     
        <div style={{ marginBottom: '30px' }}></div>
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
                    value={departhead.name}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDeparthead({ ...departhead, name: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Designation" />
                  </Label>

                  <Input
                    required
                    value={departhead.designation}
                    className="form-control"
                    name="designation"
                    type="text"
                    onChange={(e) =>
                      setDeparthead({
                        ...departhead,
                        designation: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Email" />
                  </Label>

                  <Input
                    required
                    value={departhead.email}
                    className="form-control"
                    name="email"
                    type="email"
                    onChange={(e) =>
                      setDeparthead({ ...departhead, email: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Address" />
                  </Label>

                  <Input
                    required
                    value={departhead.address}
                    className="form-control"
                    name="name"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDeparthead({ ...departhead, address: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Phone Number" />
                  </Label>

                  <Input
                    required
                    value={departhead?.phone}
                    type="text"
                    className="radio-in"
                    name="phone"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setDeparthead({ ...departhead, phone: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
              size="sm"
              onClick={onDepartHeadCreate}
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Creating
                </div> 
              ) : (
                'Add Stock Transaction'
              )}
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
