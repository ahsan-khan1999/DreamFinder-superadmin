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
import {
  CreateDoctorsRecord,
  GetMarketsData,
} from 'Store/Actions/ConcordDoctor/DoctorAction';
import { GetDoctorCategory } from 'Store/Actions/ConcordDoctorCategorys/DoctorCategorysAction';
import * as Yup from 'yup';
import moment from 'moment';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';

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

  useEffect(() => {
    dispatch(StaticDataGet());
  }, []);
  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);

  let option_static_stationtype = [];
  staticdata?.doctor__station_type?.filter((item) =>
    option_static_stationtype.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );

  const doctorcategory = useSelector(
    (state) => state?.doctorCategoryReducer?.doctorcategory
  );

  const loading = useSelector((state) => state?.doctorsReducer?.loader);

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
      key: item?.uid,
    })
  );
  let optionmarket = [];
  hierarchy_market?.filter((item) =>
    optionmarket.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );

  const Doctor_obj = {
    name: '',
    phone_number: '',
    degree: '',
    designation: '',
    organization: '',
    speciality: '',
    station_type: '',
    doctor_category_uid: '',
    market_uid: '',
  };

  const [doctorCreate, setDoctorCreate] = useState(Doctor_obj);
  const [specialday, setSpecialday] = useState();
  const [specialdate, setSpecialdate] = useState('');
  const [array, setArray] = useState([]);
  const [obj, setObj] = useState();


  const handleChangeToView = () => {
    history.push('/app/doctor-management/viewDoctors');
  };

  const handlespecialdaydate = async (day, date) => {
    const prearray = [...array];
    prearray.push({
      day: day,
      date: date,
    });
    setArray(prearray);
    const object = {
      ...obj,
      [day]: date,
    };
    setObj(object);
  };
  const apiData = {
    name: doctorCreate?.name,
    phone_number: doctorCreate?.phone_number,
    degree: doctorCreate?.degree,
    designation: doctorCreate?.designation,
    organization: doctorCreate?.organization,
    speciality: doctorCreate?.speciality,
    station_type: doctorCreate?.station_type,
    doctor_category_uid: doctorCreate?.doctor_category_uid,
    market_uid: doctorCreate?.market_uid,
    special_day: obj,
  };

  const onDoctorCreate = async () => {
    if (
      doctorCreate?.name === '' &&
      doctorCreate?.phone_number === '' &&
      doctorCreate?.degree === '' &&
      doctorCreate?.designation === '' &&
      doctorCreate?.organization === '' &&
      doctorCreate?.speciality === '' &&
      doctorCreate?.station_type === '' &&
      doctorCreate?.doctor_category_uid === '' &&
      doctorCreate?.market_uid === ''
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
    console.log(apiData, 'doctorCreate');
    let res = await dispatch(CreateDoctorsRecord( {...apiData} ));

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
        <Formik>
          <Form className="av-tooltip tooltip-label-right">
            <Row className="h-100">
              {/* Name */}
              <Col lg={6}>
                <FormGroup>
                  <Label>Name</Label>

                  <Input
                    required
                    // value={doctorCreate.name}
                    className="form-control"
                    name="name"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctorCreate({ ...doctorCreate, name: e.target.value })
                    }
                  />
                  {/* {errors.name && touched.name ? (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  ) : null} */}
                </FormGroup>
              </Col>

              {/* Phone */}

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Phone" />
                  </Label>

                  <Input
                    // value={doctorCreate?.phone}
                    className="form-control"
                    type="text"
                    name="phone_number"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setDoctorCreate({
                        ...doctorCreate,
                        phone_number: e.target.value,
                      })
                    }
                  />
                  {/* {errors.phone_number && touched.phone_number ? (
                    <div className="invalid-feedback d-block">
                      {errors.phone_number}
                    </div>
                  ) : null} */}
                </FormGroup>
              </Col>

              {/* Degree */}
              <Col lg={6}>
                <FormGroup>
                  <Label>Degree</Label>

                  <Input
                    // value={doctorCreate.name}
                    className="form-control"
                    name="degree"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctorCreate({
                        ...doctorCreate,
                        degree: e.target.value,
                      })
                    }
                  />
                  {/* {errors.degree && touched.degree ? (
                    <div className="invalid-feedback d-block">
                      {errors.degree}
                    </div>
                  ) : null} */}
                </FormGroup>
              </Col>

              {/* Designation */}
              <Col lg={6}>
                <FormGroup className="error-l-75">
                  <Label>Designation</Label>

                  <Input
                    // value={doctorCreate.name}
                    className="form-control"
                    name="designation"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctorCreate({
                        ...doctorCreate,
                        designation: e.target.value,
                      })
                    }
                  />
                  {/* {errors.designation && touched.designation ? (
                    <div className="invalid-feedback d-block">
                      {errors.designation}
                    </div>
                  ) : null} */}
                </FormGroup>
              </Col>

              {/* Organization */}
              <Col lg={6}>
                <FormGroup className="error-l-100">
                  <Label>Organization</Label>

                  <Input
                    // value={doctorCreate.name}
                    className="form-control"
                    name="organization"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctorCreate({
                        ...doctorCreate,
                        organization: e.target.value,
                      })
                    }
                  />
                  {/* {errors.organization && touched.organization ? (
                    <div className="invalid-feedback d-block">
                      {errors.organization}
                    </div>
                  ) : null} */}
                </FormGroup>
              </Col>

              {/* Speciality */}
              <Col lg={6}>
                <FormGroup className="error-l-75">
                  <Label>Speciality</Label>

                  <Input
                    // value={doctorCreate.name}
                    className="form-control"
                    name="speciality"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctorCreate({
                        ...doctorCreate,
                        speciality: e.target.value,
                      })
                    }
                  />
                  {/* {errors.speciality && touched.speciality ? (
                    <div className="invalid-feedback d-block">
                      {errors.speciality}
                    </div>
                  ) : null} */}
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
                        setDoctorCreate({
                          ...doctorCreate,
                          doctor_category_uid: e.value,
                        });
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
                        dispatch(GetMarketsData(e.value, 'area'));
                      }}
                      options={optionregion}
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
                        dispatch(GetMarketsData(e.value, 'thana'));
                      }}
                      options={optionarea}
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
                        dispatch(GetMarketsData(e.value, 'territory'));
                      }}
                      options={optionthana}
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
                        dispatch(GetMarketsData(e.value, 'market'));
                      }}
                      options={optionterritory}
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
                        setDoctorCreate({
                          ...doctorCreate,
                          market_uid: e.value,
                        });
                      }}
                      options={optionmarket}
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
                    <Input
                      // value={doctorCreate.name}
                      className="form-control"
                      name="specialday"
                      type="text"
                      // validate={validateEmail}
                      onChange={(e) => {
                        setSpecialday(e.target.value);
                      }}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={10}>
                <FormGroup>
                  <Input
                    required
                    className="form-control"
                    name="date-dd"
                    type="date"
                    onChange={(e) => setSpecialdate(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={2}>
                <FormGroup>
                  <Button
                    className="btn btn-primary"
                    size="sm"
                    onClick={() => {
                      handlespecialdaydate(specialday, specialdate);
                    }}
                  >
                    Add SpecialDay
                  </Button>
                </FormGroup>
              </Col>

              {/* Station TYPE */}
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Station Type" />
                  </Label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      required
                      onChange={(e, index) => {
                        setDoctorCreate({
                          ...doctorCreate,
                          station_type: e.value,
                        });
                      }}
                      options={option_static_stationtype}
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
                      <tbody>
                        {array?.map((item, index) => {
                          return (
                            <tr>
                              <td>{item?.day}</td>

                              <td>{item?.date}</td>
                              <td>
                                <i
                                  onClick={() => {
                                    const test = [...array];
                                    test.splice(index, 1);
                                    console.log(test);
                                    setArray(test);
                                  }}
                                  style={{ fontSize: '20px', color: 'red' }}
                                  className="simple-icon-close"
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
              size="sm"
              onClick={onDoctorCreate}
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={16} width={18} type="Bars" color="#fff" />
                  &nbsp; Creating
                </div>
              ) : (
                'Add Doctor'
              )}
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
