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
} from 'Store/Actions/ConcordDoctor/DoctorAction';
import { GetDoctorCategory } from 'Store/Actions/ConcordDoctorCategorys/DoctorCategorysAction';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';

export default function CreateDoctors({ history }) {
  
  
    const onSubmit = (event, errors, values) => {
      if (errors.length === 0) {
        onDoctorCreate();
      }
      else{
      NotificationManager.error(
        'Please Enter Required Field',
        'Error',
        3000,
        null,
        ''
      );  
      }
    };

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

  let option_static_docCat_Category = [];
  staticdata?.doctor__doctor_categorys?.filter((item) =>
  option_static_docCat_Category.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );
  let option_static_otherServices_Category = [];
  staticdata?.doctor__other_services?.filter((item) =>
  option_static_otherServices_Category.push({
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
  
  const hierarchy_region_loader = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_region_loader
  );

  const hierarchy_area_loader = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_area_loader
  );
  const hierarchy_thana_loader = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_thana_loader
  );
  const hierarchy_territory_loader = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_territory_loader
  );
  const hierarchy_market_loader = useSelector(
    (state) => state?.doctorsReducer?.hierarchy_market_loader
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
    doctor_category:'',
    station_type: '',
    speciality_uid: '',
    market_uid: '',
    other_service:'',
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
  const apiData = {
    name: doctorCreate?.name,
    phone_number: doctorCreate?.phone_number,
    degree: doctorCreate?.degree,
    designation: doctorCreate?.designation,
    organization: doctorCreate?.organization,
    doctor_category: doctorCreate?.doctor_category,
    other_service:doctorCreate?.other_service,
    station_type: doctorCreate?.station_type,
    speciality_uid: doctorCreate?.speciality_uid,
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
      doctorCreate?.doctor_category === '' &&
      doctorCreate?.station_type === '' &&
      doctorCreate?.speciality_uid === '' &&
      doctorCreate?.market_uid === '' &&
      doctorCreate?.other_service === '' 
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




  const values = {
    speciality_uid: undefined
  };
  
  const onChange = value => {
    values.speciality_uid = value;
  };


  return (
    <Card>
      <CardBody>
        <Button
          
          onClick={handleChangeToView}
          style={{ marginRight: '20px', backgroundColor:'#0066b3' }}
        >
          Back
        </Button>
        <CardTitle>
          <IntlMessages id="Create Doctors" />
        </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
        <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
        >
            <Row className="h-100">
              {/* Name */}
              <Col lg={6}>
                <AvGroup className="error-t-negative">
                  <Label>Name</Label>

                  <AvField
                    required
                    className="form-control"
                    name="name"
                    type="text"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'Please enter your name',
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
                      setDoctorCreate({ ...doctorCreate, name: e.target.value })
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
                    type="text"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'Please enter your Degree',
                      },
                      pattern: {
                        value: '^[A-Za-z]+$',
                        errorMessage: 'Your degree must be composed only with letters',
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
                <AvGroup className="error-t-negative" className="error-l-75">
                  <Label>Designation</Label>

                  <AvField
                    className="form-control"
                    name="designation"
                    type="text"

                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'Please enter your Designation',
                      },
                      pattern: {
                        value: '^[A-Za-z]+$',
                        errorMessage: 'Your designation must be composed only with letters',
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
                <AvGroup className="error-t-negative" className="error-l-100">
                  <Label>Organization</Label>

                  <AvField
                    className="form-control"
                    name="organization"

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

          

              {/*Speciality Category */}
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


              {/*Doctors Category */}
              <Col lg={6}>
                <AvGroup className="error-t-negative">
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
                          doctor_category: e.value,
                        });
                      }}
                      options={option_static_docCat_Category}
                    />
                  </>
                </AvGroup>
              </Col>


              {/*Other Services*/}
              <Col lg={6}>
                <AvGroup className="error-t-negative">
                  <Label>
                    <IntlMessages id="Select Other Services" />
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
                          other_service: e.value,
                        });
                      }}
                      options={option_static_otherServices_Category}
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
                  {hierarchy_region_loader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> : 
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
                    }
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
                  {hierarchy_area_loader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> : 
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
                    }
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
                  {hierarchy_thana_loader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> : 
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
                    }
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
                  {hierarchy_territory_loader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> : 
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
                    }
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
                  {hierarchy_market_loader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> : 
                    <Select
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
                    }
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
                </AvGroup>
              </Col>


              <Col lg={4}>
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
                    style={{ backgroundColor:'#0066b3' }}
                    size="sm"
                    onClick={() => {
                      handlespecialdaydate(specialday, specialdate);
                    }}
                  >
                    Add SpecialDay
                  </Button>
                </AvGroup>
              </Col>

            </Row>

            <Row>
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
            </Row>

            <Button
                style={{backgroundColor:'#0066b3'}}
              size="sm"
              // onClick={onSubmit}
              // type="submit"
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
            </AvForm>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
