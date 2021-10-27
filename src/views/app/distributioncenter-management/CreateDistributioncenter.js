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

export default function CreateDistributioncenter({ history }) {

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
        history.push('/app/distributioncenter-management/viewDepartmenthead');
      }
    }
  };

  const handleChangeToView = () => {
    history.push('/app/distributioncenter-management/viewDepartmenthead');
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
          <IntlMessages id="Create Distribution Center" />
        </CardTitle>
     
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Regions Name" />
                  </Label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      isMulti
                      required
                      // onChange={(e) => {
                      //   setMedproductuid(e.value);
                      //   setAvailableproductquantity(e.key);
                      //   setOrderCreate({
                      //     ...orderCreate,
                      //   medicines: [{ medicine_uid: e.value ,quantity: medproductquantity}],
                      //   })
                      // }}
                      onChange={(e, index) => {
                        handleChangeProduct(e, index);
                      }}
                      options={{label:'Hello'}}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Area Name" />
                  </Label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      isMulti
                      required
                      // onChange={(e) => {
                      //   setMedproductuid(e.value);
                      //   setAvailableproductquantity(e.key);
                      //   setOrderCreate({
                      //     ...orderCreate,
                      //   medicines: [{ medicine_uid: e.value ,quantity: medproductquantity}],
                      //   })
                      // }}
                      onChange={(e, index) => {
                        handleChangeProduct(e, index);
                      }}
                      options={{label:'Hello'}  }
                    />
                  </>

                  {/* <Input
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
                  /> */}
                </FormGroup>
              </Col>

             
            </Row>

            <Button
              className="btn btn-primary w-15"
              size="sm"
              onClick={onDepartHeadCreate}
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={20} width={20} type="Oval" color="#fff" />
                </div> 
              ) : (
                'Add DistributionCenter'
              )}
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
