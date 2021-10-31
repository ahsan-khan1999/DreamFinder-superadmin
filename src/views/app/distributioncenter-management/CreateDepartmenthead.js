/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CreateDepartmentHead } from 'Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import * as Yup from 'yup';

export default function CreateDepartmenthead({ history }) {


  const DepartmentHeadSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your name'),
    designation: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please provide your designation'),
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email address'),
    address: Yup.string().required('Please provide the address'),
    phone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .required('A phone number is required'),
  });

  const dispatch = useDispatch();


  const onSubmit = (values) => {
    onDepartHeadCreate(values);
    console.log(values,"Hello");
  };


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

  const onDepartHeadCreate = async (values) => {
    if (
      values?.name === '' &&
      values?.designation === '' &&
      values?.email === '' &&
      values?.address === '' &&
      values?.phone === ''
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
      console.log(values,"ResPnoseWala");
      let res = await dispatch(CreateDepartmentHead({ ...values }));

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
          style={{ marginRight: '20px' }}
        >
          Back
        </Button>
        <CardTitle>
          <IntlMessages id="Create Department Head" />
        </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik

          initialValues={{
            name: '',
            designation: '',
            email: '',
            address: '',
            phone: '',
          }}
          validationSchema={DepartmentHeadSchema}
          onSubmit={onSubmit}
        >
          {({
            handleSubmit,
            setFieldValue,
            setFieldTouched,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <Form className="av-tooltip tooltip-label-right"> 
              <Row className="h-100">
               
                <Col lg={6}>
                  <FormGroup>
                    <Label>Name</Label>

                    <Field
                      // value={departhead.name}
                      className="form-control"
                      name="name"
                      type="text"
                      // validate={validateEmail}
                      // onChange={(e) =>
                      //   setDeparthead({ ...departhead, name: e.target.value })
                      // }
                    />
                    {errors.name && touched.name ? (
                      <div className="invalid-feedback d-block">
                        {errors.name}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup className="error-l-75">
                    <Label>
                      Designation
                    </Label>

                    <Field
                      
                      // value={departhead.designation}
                      className="form-control"
                      name="designation"
                      type="text"
                      // onChange={(e) =>
                      //   setDeparthead({
                      //     ...departhead,
                      //     designation: e.target.value,
                      //   })
                      // }
                    />
                    {errors.designation && touched.designation ? (
                      <div className="invalid-feedback d-block">
                        {errors.designation}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup >
                    <Label>
                      <IntlMessages id="Email" />
                    </Label>

                    <Field
                      
                      // value={departhead.email}
                      className="form-control"
                      name="email"
                      type="email"
                      // onChange={(e) =>
                      //   setDeparthead({ ...departhead, email: e.target.value })
                      // }
                    />
                    {errors.email && touched.email ? (
                      <div className="invalid-feedback d-block">
                        {errors.email}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup className="error-l-75">
                    <Label>
                      <IntlMessages id="Address" />
                    </Label>

                    <Field
                      
                      // value={departhead.address}
                      className="form-control"
                      name="address"
                      type="text"
                      // validate={validateEmail}
                      // onChange={(e) =>
                      //   setDeparthead({ ...departhead, address: e.target.value })
                      // }
                    />
                    {errors.address && touched.address ? (
                      <div className="invalid-feedback d-block">
                        {errors.address}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup >
                    <Label>
                      <IntlMessages id="Phone" />
                    </Label>

                    <Field
                      
                      // value={departhead?.phone}
                      type="text"
                      className="form-control"
                      name="phone"
                      // validate={validateEmail}
                      // onChange={(e) => setNumber()}
                      // onChange={(e) =>
                      //   setDeparthead({ ...departhead, phone: e.target.value })
                      // }
                    />
                    {errors.phone && touched.phone ? (
                      <div className="invalid-feedback d-block">
                        {errors.phone}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>
              </Row>

              <Button
                className="btn btn-primary"
                size="sm"
                type="submit"
              >
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <Loader height={18} width={18} type="Oval" color="#fff" />
                    &nbsp; Creating
                  </div>
                ) : (
                  'Add DepartmentHead'
                )}
              </Button>
            </Form>


          )}

        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
