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
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CreateDoctorsRecord, GetMarketsData } from 'Store/Actions/ConcordDoctor/DoctorAction';
import { GetDoctorCategory } from 'Store/Actions/ConcordDoctorCategorys/DoctorCategorysAction';
import * as Yup from 'yup';


const DoctorSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please enter your name'),
  designation: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please provide your designation'),
  degree: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please provide your degree'),
  organization: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please provide your Organization Name'),
  speciality: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please provide your Speciality'),
  station_type: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Please provide your Station Type'),
  phone_number: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .required('A phone number is required'),
});



export default function CreateDoctors({ history }) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetMarketsData('', 'region'));
    dispatch(GetDoctorCategory());
  }, []);

  const doctorcategory = useSelector((state) => state?.doctorCategoryReducer?.doctorcategory);
  console.log(doctorcategory);


  const loading = useSelector(
    (state) => state?.doctorsReducer?.loader
  );

  
  const hierarchy_region = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_region
  );

  const hierarchy_area = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_area
  );
  const hierarchy_thana = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_thana
  );
  const hierarchy_territory = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_territory
  );
  const hierarchy_market = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_market
  );

  let optiongetdoc_category = [];
  doctorcategory?.filter((item) =>
  optiongetdoc_category.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );

  let optionregion = [];
  hierarchy_region?.filter((item) =>
  optionregion.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );
  let optionarea = [];
  hierarchy_area?.filter((item) =>
  optionarea.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );
  let optionthana = [];
  hierarchy_thana?.filter((item) =>
  optionthana.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );
  let optionterritory = [];
  hierarchy_territory?.filter((item) =>
  optionterritory.push({
      label: item?.name,
      value: item?.uid,
      key: item?.field_staff?.uid,
    })
  );
  let optionmarket = [];
  hierarchy_market?.filter((item) =>
  optionmarket.push({
      label: item?.name,
      value: item?.uid,
      key: item?.field_staff?.uid,
    })
  );

  
  const onSubmit = (values) => {
    onDoctorCreate(values);
    console.log(values, "DoctorValues");
  };


  const onDoctorCreate = async (values) => {
    if (
      values?.name === '' &&
      values?.phone_number === '' &&
      values?.degree === '' &&
      values?.designation === '' &&
      values?.organization === '' &&
      values?.speciality === '' &&
      values?.station_type === '' &&
      values?.doctor_category_uid === '' &&
      values?.market_uid === '' &&
      values?.special_day === ''
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
      console.log(values);
      let res = await dispatch(CreateDoctorsRecord({ ...values }));

      if (res) {
        NotificationManager.success(
          'Doctor Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/doctor-management/viewDoctors');
      }
    }
  };

  const handleChangeToView = () => {
    history.push('/app/doctor-management/viewDoctors');
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
          <IntlMessages id="Create Doctors" />
        </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik

          initialValues={{
            name: '',
            phone_number: '',
            degree: '',
            designation: '',
            organization: '',
            speciality: '',
            station_type: '',
            doctor_category_uid: '',
            market_uid: '',
            special_day: {
              birthday: '',
              marriage_date: '',
            }
          }}
          validationSchema={DoctorSchema}
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

                {/* Name */}
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



                {/* Phone */}

                <Col lg={6}>
                  <FormGroup >
                    <Label>
                      <IntlMessages id="Phone" />
                    </Label>

                    <Field

                      // value={departhead?.phone}
                      type="text"
                      className="form-control"
                      name="phone_number"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    // onChange={(e) =>
                    //   setDeparthead({ ...departhead, phone_number: e.target.value })
                    // }
                    />
                    {errors.phone_number && touched.phone_number ? (
                      <div className="invalid-feedback d-block">
                        {errors.phone_number}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>


                {/* Degree */}
                <Col lg={6}>
                  <FormGroup>
                    <Label>Degree</Label>

                    <Field
                      // value={departhead.name}
                      className="form-control"
                      name="degree"
                      type="text"
                    // validate={validateEmail}
                    // onChange={(e) =>
                    //   setDeparthead({ ...departhead, name: e.target.value })
                    // }
                    />
                    {errors.degree && touched.degree ? (
                      <div className="invalid-feedback d-block">
                        {errors.degree}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>



                {/* Designation */}
                <Col lg={6}>
                  <FormGroup className="error-l-75">
                    <Label>Designation</Label>

                    <Field
                      // value={departhead.name}
                      className="form-control"
                      name="designation"
                      type="text"
                    // validate={validateEmail}
                    // onChange={(e) =>
                    //   setDeparthead({ ...departhead, name: e.target.value })
                    // }
                    />
                    {errors.designation && touched.designation ? (
                      <div className="invalid-feedback d-block">
                        {errors.designation}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>


                {/* Organization */}
                <Col lg={6}>
                  <FormGroup className="error-l-100">
                    <Label>Organization</Label>

                    <Field
                      // value={departhead.name}
                      className="form-control"
                      name="organization"
                      type="text"
                    // validate={validateEmail}
                    // onChange={(e) =>
                    //   setDeparthead({ ...departhead, name: e.target.value })
                    // }
                    />
                    {errors.organization && touched.organization ? (
                      <div className="invalid-feedback d-block">
                        {errors.organization}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>



                {/* Speciality */}
                <Col lg={6}>
                  <FormGroup className="error-l-75">
                    <Label>Speciality</Label>

                    <Field
                      // value={departhead.name}
                      className="form-control"
                      name="speciality"
                      type="text"
                    // validate={validateEmail}
                    // onChange={(e) =>
                    //   setDeparthead({ ...departhead, name: e.target.value })
                    // }
                    />
                    {errors.speciality && touched.speciality ? (
                      <div className="invalid-feedback d-block">
                        {errors.speciality}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>






                {/* Station Type */}
                <Col lg={6}>
                  <FormGroup className="error-l-100">
                    <Label>Station Type</Label>

                    <Field
                      // value={departhead.name}
                      className="form-control"
                      name="station_type"
                      type="text"
                    // validate={validateEmail}
                    // onChange={(e) =>
                    //   setDeparthead({ ...departhead, name: e.target.value })
                    // }
                    />
                    {errors.station_type && touched.station_type ? (
                      <div className="invalid-feedback d-block">
                        {errors.station_type}
                      </div>
                    ) : null}
                  </FormGroup>
                </Col>


                {/* Doctors Category */}
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Select Doctors Category" />
                    </Label>

                    <>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        required
                        onChange={(e, index) => {

                          

                        }}
                        options={optiongetdoc_category}
                      />
                    </>
                  </FormGroup>
                </Col>


                {/* Select Region */}
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Select Regions" />
                    </Label>

                    <>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        required
                        onChange={(e, index) => {

                        }}
                        options={{ label: 'hello', value: '2' }}
                      />
                    </>
                  </FormGroup>
                </Col>
                {/* Select Areas */}
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Select Areas" />
                    </Label>

                    <>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        required
                        onChange={(e, index) => {

                        }}
                        options={{ label: 'hello', value: '2' }}
                      />
                    </>
                  </FormGroup>
                </Col>
                {/* Select Thanas */}
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Select Thana" />
                    </Label>

                    <>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        required
                        onChange={(e, index) => {

                        }}
                        options={{ label: 'hello', value: '2' }}
                      />
                    </>
                  </FormGroup>
                </Col>

                {/* Select Territory */}
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Select Territory" />
                    </Label>

                    <>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        required
                        onChange={(e, index) => {

                        }}
                        options={{ label: 'hello', value: '2' }}
                      />
                    </>
                  </FormGroup>
                </Col>

                {/* Select Market */}
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Select Market" />
                    </Label>

                    <>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        required
                        onChange={(e, index) => {

                        }}
                        options={{ label: 'hello', value: '2' }}
                      />
                    </>
                  </FormGroup>
                </Col>

                {/* Select Special Day */}
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Select Special Day" />
                    </Label>

                    <>
                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        required
                        onChange={(e, index) => {

                        }}
                        options={{ label: 'hello', value: '2' }}
                      />
                    </>
                  </FormGroup>
                </Col>



              </Row>




              <Row>
                <Col xl={12}>
                  <FormGroup>
                    <div className="table-form">
                      <Table>
                        <thead>
                          <tr>
                            <th>Special Day</th>
                            <th>Select Date</th>
                          </tr>
                        </thead>
                      
                      </Table>
                    </div>
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
                  'Add Doctor'
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
