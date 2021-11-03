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
import { CreateCustomerRecord } from 'Store/Actions/ConcordCustomer/CustomerAction';

export default function CreateCustomers({ history }) {
  const onSubmit = (event, errors, values) => {
    console.log(errors);
    console.log(values);
    if (errors.length === 0) {
      onCustomerCreate();
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetMarketsData('', 'region'));
  }, []);

  useEffect(() => {
    dispatch(StaticDataGet());
  }, []);
  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);

  let option_static_client_types = [];
  staticdata?.customer__client_types?.filter((item) =>
    option_static_client_types.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );

  const loading = useSelector((state) => state?.customerReducer?.loader);

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

  const Customer_obj = {
    name: '',
    phone_number: '',
    email_address: '',
    client_type: '',
    street_address: '',
    market_uid: '',
  };

  const [CustomerCreate, setCustomerCreate] = useState(Customer_obj);
  const [specialday, setSpecialday] = useState();
  const [specialdate, setSpecialdate] = useState('');
  const [array, setArray] = useState([]);
  const [obj, setObj] = useState();

  const handleChangeToView = () => {
    history.push('/app/customer-management/viewCustomers');
  };

  const handlespecialdaydate = async (day, date) => {
    console.log(day,"day")
    console.log(date,"date")
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
    name: CustomerCreate?.name,
    phone_number: CustomerCreate?.phone_number,
    email_address: CustomerCreate?.email_address,
    client_type: CustomerCreate?.client_type,
    street_address: CustomerCreate?.street_address,
    market_uid: CustomerCreate?.market_uid,
    special_day: obj,
  };

  const onCustomerCreate = async () => {
    if (
      CustomerCreate?.name === '' &&
      CustomerCreate?.phone_number === '' &&
      CustomerCreate?.email_address === '' &&
      CustomerCreate?.client_type === '' &&
      CustomerCreate?.street_address === '' &&
      CustomerCreate?.market_uid === ''
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
      console.log(apiData, 'CustomerCreate');
      let res = await dispatch(CreateCustomerRecord({ ...apiData }));

      if (res) {
        NotificationManager.success(
          'Customer Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/customer-management/viewCustomers');
      }
    }
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
          <IntlMessages id="Create Customer" />
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
                      setCustomerCreate({
                        ...CustomerCreate,
                        name: e.target.value,
                      })
                    }
                  />
                </AvGroup>
              </Col>

              {/* Email */}
              <Col lg={6}>
                <AvGroup className="error-t-negative">
                  <Label>Email</Label>

                  <AvField
                    required
                    className="form-control"
                    name="email"
                    type="email"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'Please enter your email address',
                      },
                      email: {
                        value: true,
                        errorMessage: 'Please enter a valid email address',
                      },
                    }}
                    onChange={(e) =>
                      setCustomerCreate({
                        ...CustomerCreate,
                        email_address: e.target.value,
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
                      setCustomerCreate({
                        ...CustomerCreate,
                        phone_number: e.target.value,
                      })
                    }
                  />
                </AvGroup>
              </Col>

           

              {/* street_address */}
              <Col lg={6}>
                <AvGroup className="error-t-negative">
                  <Label>Address</Label>

                  <AvField
                    className="form-control"
                    name="street_address"
                    type="text"
                    validate={{
                      required: {
                        value: true,
                        errorMessage: 'Please enter your Street Address',
                      },
                     
                      minLength: {
                        value: 5,
                        errorMessage: 'To Short',
                      },
                      maxLength: {
                        value: 25,
                        errorMessage: 'To Long',
                      },
                    }}
                    onChange={(e) =>
                      setCustomerCreate({
                        ...CustomerCreate,
                        street_address: e.target.value,
                      })
                    }
                  />
                </AvGroup>
              </Col>

               {/* Client TYPE */}
               <Col lg={6}>
                <AvGroup className="error-t-negative">
                  <Label>
                    <IntlMessages id="Select Client Type" />
                  </Label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      required
                      onChange={(e, index) => {
                        setCustomerCreate({
                          ...CustomerCreate,
                          client_type: e.value,
                        });
                      }}
                      options={option_static_client_types}
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
                      required
                      onChange={(e, index) => {
                        setCustomerCreate({
                          ...CustomerCreate,
                          market_uid: e.value,
                        });
                      }}
                      options={optionmarket}
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
                      // value={CustomerCreate.name}
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
            </Row>

            <Button
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
                'Add Customer'
              )}
            </Button>
          </AvForm>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
