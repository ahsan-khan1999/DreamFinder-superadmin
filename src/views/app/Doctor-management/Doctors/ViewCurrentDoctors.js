/* eslint-disable */
import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';

import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Card, CardTitle, Label, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
  CreateDoctorsRecord,
  GetMarketsData,
  UpdateDoctor,
} from 'Store/Actions/ConcordDoctor/DoctorAction';
import { GetDoctorCategory } from 'Store/Actions/ConcordDoctorCategorys/DoctorCategorysAction';
import * as Yup from 'yup';
import moment from 'moment';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';
import apiServices from 'services/requestHandler';

export default function ViewCurrentDoctors(props) {
  const dispatch = useDispatch();
  let [buttonName, setButtonName] = useState();

  const [thisView, setThisView] = useState(true);

  const currentDoctor = props?.location?.state;

  console.log(currentDoctor, 'currentDoctor');


  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);

  let option_static_docCat_Category = [];
  staticdata?.doctor__doctor_categorys?.filter((item) =>
  option_static_docCat_Category.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );





  useEffect(() => {
    if (currentDoctor?.status?.name === 'suspended') {
      setButtonName('Active');
    } else if (currentDoctor?.status?.name === 'active') {
      setButtonName('Suspend');
    }
  }, []);

  const onSubmit = (event, errors, values) => {
    // console.log(errors);
    // console.log(values);
    if (errors.length === 0) {
      editData();
    } else {
      NotificationManager.error(
        'Please Enter Required Field',
        'Error',
        3000,
        null,
        ''
      );
    }
  };

  useEffect(() => {
    dispatch(GetMarketsData('', 'region'));
    dispatch(GetDoctorCategory());
  }, []);

  useEffect(() => {
    dispatch(StaticDataGet());
  }, []);

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

  const loading = useSelector((state) => state?.doctorsReducer?.updatedoctorloading);

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

    var specialDay_arr = []; 
  for(var i = 0; i < Object.keys(currentDoctor?.special_day).length; i++) {
    var objectspecialday = {}; 
    objectspecialday['day'] = Object.keys(currentDoctor?.special_day)[i];
    objectspecialday['date'] = Object.values(currentDoctor?.special_day)[i];
    specialDay_arr.push(objectspecialday);
    }




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
    name: currentDoctor?.name,
    phone_number: currentDoctor?.phone_number,
    degree: currentDoctor?.degree,
    designation: currentDoctor?.designation,
    organization: currentDoctor?.organization,
    doctor_category: currentDoctor?.doctor_category,
    station_type: currentDoctor?.station_type,
    speciality_uid: currentDoctor?.speciality.uid,
    market_uid: currentDoctor?.market.uid,
    special_day: currentDoctor?.special_day,
    uid: currentDoctor?.uid,
  };

  const [doctorCreate, setDoctorCreate] = useState(Doctor_obj);
  const [specialday, setSpecialday] = useState();
  const [specialdate, setSpecialdate] = useState('');
  let [array, setArray] = useState([]);
  const [obj, setObj] = useState();


  const handleChangeToView = () => {
    props.history.push('/app/doctor-management/viewDoctors');
  };

  const handlespecialdaydate = async (day, date) => {
    if(day!== undefined && date !== ""  )
    {
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
    }
    else{
      NotificationManager.error(
        'Please Enter Required Special Date Fields',
        'Error',
        3000,
        null,
        ''
      );
    }
  };
  let apiData = {
    name: currentDoctor?.name,
    phone_number: currentDoctor?.phone_number,
    degree: currentDoctor?.degree,
    designation: currentDoctor?.designation,
    organization: currentDoctor?.organization,
    doctor_category: currentDoctor?.doctor_category,
    station_type: currentDoctor?.station_type,
    speciality_uid: currentDoctor?.speciality?.uid,
    market_uid: currentDoctor?.market?.uid,
    special_day: obj,
    uid: currentDoctor?.uid,
  };

  const editProfile = (e) => {
    e.preventDefault();
    setThisView(!thisView);
  };

  const editData = async () => {
    console.log(apiData);
    apiData = {
      ...doctorCreate,
    }
    let res = await dispatch(UpdateDoctor(apiData));
    if (res) {
      NotificationManager.success(
        'Successful response',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/doctor-management/viewDoctors');
    }
  };

  let [suspendloader, setsuspendloader] = useState(false);


  const suspandDepartmenthead = async () => {
    if (currentDoctor?.status?.name === 'suspended') {
      let apiData = {
        uid: currentDoctor?.uid,
      };
      console.log(apiData);
      setsuspendloader(true);
      let res = await apiServices.suspanddoctors(apiData);
      console.log(res);
      if (res?.data?.response_code === 200) {
        setsuspendloader(false);
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/doctor-management/viewDoctors');
      } else {
        setsuspendloader(false);
        NotificationManager.error(
          'Error active This Admin',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      let apiData = {
        uid: currentDoctor?.uid,
      };
      setsuspendloader(true);
      let res = await apiServices.suspanddoctors(apiData);
      console.log(res);
      if (res?.response_code === 200) {
        setsuspendloader(false);
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/doctor-management/viewDoctors');
      } else {
        setsuspendloader(false);
        NotificationManager.error(
          res?.response_message,
          'Error',
          5000,
          null,
          ''
        );
      }
    }
  };

  return (
    <Card>
      <CardBody>
      <CardTitle>
        {thisView ? (
          <>
             <Button
         
              onClick={handleChangeToView}
              style={{ marginRight: '20px', backgroundColor:'#0066b3' }}
            >
              Back
            </Button>
            <IntlMessages id="Doctors" />
          </>
        ) : (
          <>
             <Button
                
              onClick={editProfile}
              style={{ marginRight: '20px',backgroundColor:'#0066b3' }}
            >
              Close Edit
            </Button>
            <IntlMessages id="Edit Doctors" />
          </>
        )}
       </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <AvForm
            className="av-tooltip tooltip-label-right"
            onSubmit={(event, errors, values) =>
              onSubmit(event, errors, values)
            }
          >
            <Row className="h-100">
 
              {thisView ? (
                <>
                  <Col lg={6}>
                    <AvGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Name
                        </h6>
                      </Label>

                      <span>
                        <p>{currentDoctor?.name.toUpperCase()}</p>
                      </span>
                    </AvGroup>
                  </Col>

                  <Col lg={6}>
                    <AvGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Phone Number
                        </h6>
                      </Label>

                      <span>
                        <p>{currentDoctor?.phone_number}</p>
                      </span>
                    </AvGroup>
                  </Col>

                  <Col lg={6}>
                    <AvGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Organization
                        </h6>
                      </Label>
                      <span>
                        <p>{currentDoctor?.organization.toUpperCase()}</p>
                      </span>
                    </AvGroup>
                  </Col>

                  <Col lg={6}>
                    <AvGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Speciality
                        </h6>
                      </Label>

                      <span>
                        <p>{currentDoctor?.speciality?.name.toUpperCase()}</p>
                      </span>
                    </AvGroup>
                  </Col>

                  <Col lg={6}>
                    <AvGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Station Type
                        </h6>
                      </Label>
                      <span>
                        <p>{currentDoctor?.station_type.toUpperCase()}</p>
                      </span>
                    </AvGroup>
                  </Col>
                  <Col lg={6}>
                    <AvGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Doctor Category
                        </h6>
                      </Label>
                      <span>
                        <p>{currentDoctor?.doctor_category.toUpperCase()}</p>
                      </span>
                    </AvGroup>
                  </Col>
                  <Col lg={6}>
                    <AvGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Market Name
                        </h6>
                      </Label>
                      <span>
                        <p>{currentDoctor?.market?.name?.toUpperCase()}</p>
                      </span>
                    </AvGroup>
                  </Col>
                </>
              ) : (
                <>
                  {/* Name */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
                      <Label>Name</Label>

                      <AvField
                        required
                        className="form-control"
                        name="name"
                        type="text"
                        value={currentDoctor?.name}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: 'Please enter your name',
                          },
                          pattern: {
                            value: '^[A-Za-z]+$',
                            errorMessage:
                              'Your name must be composed only with letters',
                          },
                          minLength: {
                            value: 2,
                            errorMessage: 'To Short',
                          },
                          maxLength: {
                            value: 25,
                            errorMessage: 'To Long',
                          },
                        }}
                        onChange={(e) =>
                          setDoctorCreate({
                            ...doctorCreate,
                            name: e.target.value,
                          })
                        }
                      />
                    </AvGroup>
                  </Col>

                  {/* Phone */}

                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
                      <Label>
                        <IntlMessages id="Phone" />
                      </Label>

                      <AvField
                        className="form-control"
                        type="text"
                        value={currentDoctor?.phone_number}
                        validate={{
                          number: {
                            value: true,
                            errorMessage: 'Value must be a number',
                          },
                          required: {
                            value: true,
                            errorMessage: 'Please enter a number',
                          },
                        }}
                        name="phone_number"
                        onChange={(e) =>
                          setDoctorCreate({
                            ...doctorCreate,
                            phone_number: e.target.value,
                          })
                        }
                      />
                    </AvGroup>
                  </Col>

                  {/* Degree */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
                      <Label>Degree</Label>

                      <AvField
                        className="form-control"
                        name="degree"
                        value={currentDoctor?.degree}
                        type="text"
                        validate={{
                          required: {
                            value: true,
                            errorMessage: 'Please enter your Degree',
                          },
                          pattern: {
                            value: '^[A-Za-z]+$',
                            errorMessage:
                              'Your degree must be composed only with letters',
                          },
                          minLength: {
                            value: 2,
                            errorMessage: 'To Short',
                          },
                          maxLength: {
                            value: 25,
                            errorMessage: 'To Long',
                          },
                        }}
                        onChange={(e) =>
                          setDoctorCreate({
                            ...doctorCreate,
                            degree: e.target.value,
                          })
                        }
                      />
                    </AvGroup>
                  </Col>

                  {/* Designation */}
                  <Col lg={6}>
                    <AvGroup
                      className="error-t-negative"
                      className="error-l-75"
                    >
                      <Label>Designation</Label>

                      <AvField
                        className="form-control"
                        name="designation"
                        type="text"
                        value={currentDoctor?.designation}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: 'Please enter your Designation',
                          },
                          pattern: {
                            value: '^[A-Za-z]+$',
                            errorMessage:
                              'Your designation must be composed only with letters',
                          },
                          minLength: {
                            value: 2,
                            errorMessage: 'To Short',
                          },
                          maxLength: {
                            value: 25,
                            errorMessage: 'To Long',
                          },
                        }}
                        onChange={(e) =>
                          setDoctorCreate({
                            ...doctorCreate,
                            designation: e.target.value,
                          })
                        }
                      />
                    </AvGroup>
                  </Col>

                  {/* Organization */}
                  <Col lg={6}>
                    <AvGroup
                      className="error-t-negative"
                      className="error-l-100"
                    >
                      <Label>Organization</Label>

                      <AvField
                        className="form-control"
                        name="organization"
                        value={currentDoctor?.organization}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: 'Please enter your Organization',
                          },
                          minLength: {
                            value: 2,
                            errorMessage: 'To Short',
                          },
                          maxLength: {
                            value: 25,
                            errorMessage: 'To Long',
                          },
                        }}
                        type="text"
                        onChange={(e) =>
                          setDoctorCreate({
                            ...doctorCreate,
                            organization: e.target.value,
                          })
                        }
                      />
                    </AvGroup>
                  </Col>

                  {/* Speciality */}
                  <Col lg={6}>
                    <AvGroup
                      className="error-t-negative"
                      
                    >
                      {/* <Label>Doctor Category</Label>

                      <AvField
                        className="form-control"
                        name="speciality"
                        value={currentDoctor?.doctor_category}
                        type="text"
                        onChange={(e) =>
                          setDoctorCreate({
                            ...doctorCreate,
                            organization: e.target.value,
                          })
                        }
                        onChange={(e) =>
                          setDoctorCreate({
                            ...doctorCreate,
                            speciality: e.target.value,
                          })
                        }
                      /> */}
                      <Label>
                        <IntlMessages id="Select Doctor Category" />
                      </Label>

                      <>
                        <Select
                        required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          required
                          defaultValue={{
                            label:currentDoctor?.doctor_category,
                            value:currentDoctor?.doctor_category,
                          }}
                          onChange={(e, index) => {
                            setDoctorCreate({
                              ...doctorCreate,
                              speciality_uid: e.value,
                            });
                          }}
                          options={option_static_docCat_Category}
                        />
                      </>
                    </AvGroup>
                  </Col>

                  {/* Doctors Category */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
                      <Label>
                        <IntlMessages id="Select Speciality Category" />
                      </Label>

                      <>
                        <Select
                        required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          required
                          defaultValue={{
                            label:currentDoctor?.speciality?.name,
                            value:currentDoctor?.speciality?.uid,
                          }}
                          onChange={(e, index) => {
                            setDoctorCreate({
                              ...doctorCreate,
                              speciality_uid: e.value,
                            });
                          }}
                          options={optiongetdoc_category}
                        />
                      </>
                    </AvGroup>
                  </Col>

                  {/* Select Region */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
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
                          defaultValue={{
                            label:currentDoctor?.market?.parent?.parent?.parent?.parent?.name,
                            value:currentDoctor?.market?.parent?.parent?.parent?.parent?.uid,
                          }}
                          onChange={(e, index) => {
                            dispatch(GetMarketsData(e.value, 'area'));
                          }}
                          options={optionregion}
                        />
                      </>
                    </AvGroup>
                  </Col>
                  {/* Select Areas */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
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
                          defaultValue={{
                            label:currentDoctor?.market?.parent?.parent?.parent?.name,
                            value:currentDoctor?.market?.parent?.parent?.parent?.uid,
                          }}
                          onChange={(e, index) => {
                            dispatch(GetMarketsData(e.value, 'thana'));
                          }}
                          options={optionarea}
                        />
                      </>
                    </AvGroup>
                  </Col>
                  {/* Select Thanas */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
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
                          defaultValue={{
                            label:currentDoctor?.market?.parent?.parent?.name,
                            value:currentDoctor?.market?.parent?.parent?.uid,
                          }}
                          onChange={(e, index) => {
                            dispatch(GetMarketsData(e.value, 'territory'));
                          }}
                          options={optionthana}
                        />
                      </>
                    </AvGroup>
                  </Col>

                  {/* Select Territory */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
                      <Label>
                        <IntlMessages id="Select Territory" />
                      </Label>

                      <>
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          defaultValue={{
                            label:currentDoctor?.market?.parent?.name,
                            value:currentDoctor?.market?.parent?.uid,
                          }}
                          required
                          onChange={(e, index) => {
                            dispatch(GetMarketsData(e.value, 'market'));
                          }}
                          options={optionterritory}
                        />
                      </>
                    </AvGroup>
                  </Col>

                  {/* Select Market */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
                      <Label>
                        <IntlMessages id="Select Market" />
                      </Label>

                      <>
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          defaultValue={{
                            label:currentDoctor?.market?.name,
                            value:currentDoctor?.market?.uid,
                          }}
                          onChange={(e, index) => {
                            setDoctorCreate({
                              ...doctorCreate,
                              market_uid: e.value,
                            });
                          }}
                          options={optionmarket}
                        />
                      </>
                    </AvGroup>
                  </Col>

                  {/* Station TYPE */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
                      <Label>
                        <IntlMessages id="Select Station Type" />
                      </Label>

                      <>
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          
                          defaultValue={{
                            label:currentDoctor?.station_type.toUpperCase(),
                            value:currentDoctor?.station_type,
                          }}

                          onChange={(e, index) => {
                            setDoctorCreate({
                              ...doctorCreate,
                              station_type: e.value,
                            });
                          }}
                          options={option_static_stationtype}
                        />
                      </>
                    </AvGroup>
                  </Col>

                  {/* Select Special Day */}
                  <Col lg={6}>
                    <AvGroup className="error-t-negative">
                      <Label>
                        <IntlMessages id="Select Special Day" />
                      </Label>

                      <>
                        <AvField
                          className="form-control"
                          name="specialday"
                          type="text"
                          // validate={validateEmail}
                          onChange={(e) => {
                            setSpecialday(e.target.value);
                          }}
                        />
                      </>
                    </AvGroup>
                  </Col>

                  <Col lg={10}>
                    <AvGroup className="error-t-negative">
                      <Label>
                        <IntlMessages id="Select Special Day Date" />
                      </Label>
                      <AvField
                        required
                        className="form-control"
                        name="date-dd"
                        type="date"
                        onChange={(e) => setSpecialdate(e.target.value)}
                      />
                    </AvGroup>
                  </Col>
                  <Col lg={2}>
                    <AvGroup className="error-t-negative" className="my-4">
                      <Button
                       style={{backgroundColor:'#0066b3'}}
                        size="sm"
                        onClick={() => {
                          handlespecialdaydate(specialday, specialdate);
                        }}
                      >
                        Add SpecialDay
                      </Button>
                    </AvGroup>
                  </Col>
                </>
              )}
            </Row>

            <Row>
              {thisView ? (
                <>
                  <Col xl={12}>
                    <AvGroup className="error-t-negative">
                      <div className="table-form">
                        <Table>
                          <thead>
                            <tr>
                              <th>Special Day</th>
                              <th>Special Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {specialDay_arr?.map((item, index) => {
                              return (
                                <tr>
                                  <td className="text-capitalize">{item?.day}</td>

                                  <td>{item?.date}</td>
                                 
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      </div>
                    </AvGroup>
                  </Col>
                </>
              ) : (
                <>
                 <Col xl={12}>
                <AvGroup className="error-t-negative">
                  <div className="table-form">
                    <Table>
                      <thead>
                        <tr>
                          <th>Special Day</th>
                          <th>Special Date</th>
                        </tr>
                      </thead>
                      <tbody>
                       
                        {specialDay_arr?.map((item, index) => {
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
                </AvGroup>
              </Col>
                </>
              )}
            </Row>

            {/* <Button
                style={{backgroundColor:'#0066b3'}}
              size="sm"
              // onClick={onSubmit}
              // type="submit"
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={16} width={18} type="Bars" color="#fff" />
                  &nbsp; Creating
                </div>
              ) : (
                'Add Doctor'
              )}
            </Button> */}

            {thisView ? (
               <Button style={{backgroundColor:'#0066b3'}} className="mr-3" onClick={editProfile}>
                Edit Doctor
              </Button>
            ) : (
               <Button style={{backgroundColor:'#0066b3'}} onClick={editData}>
                
                {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Updating
                </div> 
              ) : (
                'Save'
              )}
              </Button>
            )}

            {thisView ? (
              <Button
                style={{backgroundColor:'#0066b3'}}

                onClick={suspandDepartmenthead}
              >
             {suspendloader ? (
              <div className="d-flex justify-content-center">
                <Loader height={18} width={18} type="Oval" color="#fff" />
                &nbsp; Suspending
              </div>
            ) : (
              buttonName
              )}

              </Button>
            ) : (
              ''
            )}
          </AvForm>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
