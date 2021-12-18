/* eslint-disable */
import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { useState } from 'react';
import { AvForm, AvField, AvGroup } from 'availity-reactstrap-validation';
import { Formik, Form, Field, useFormik } from 'formik';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CreateDoctorCategory } from 'Store/Actions/ConcordDoctorCategorys/DoctorCategorysAction';

export default function CreateDoctorsCategory({ history }) {
 

  const onSubmit = (event, errors, values) => {
    if (errors.length === 0) {
      onDoctorCategoryCreate();
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


 const doctorcategory_obj = {
    name: '',
    description: '',
  };

  const loading = useSelector((state) => state?.doctorCategoryReducer?.loader);
  
  const [doctorcategory, setDoctorcategory] = useState(doctorcategory_obj);

  const onDoctorCategoryCreate = async () => {
    if (
      doctorcategory?.name === '' &&
      doctorcategory?.description === ''
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
      let res = await dispatch(CreateDoctorCategory({ ...doctorcategory }));

      if (res) {
        NotificationManager.success(
          'Doctor Speciality Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/doctor-management/viewDoctorsCategory');
      }
    }
  };

  const handleChangeToView = () => {
    history.push('/app/doctor-management/viewDoctorsCategory');
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
          <IntlMessages id="Create Doctor Speciality" />
        </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
          >
            <Row className="h-100">
              <Col lg={6}>
                <AvGroup>
                  <Label>
                    <IntlMessages id="Name"/>
                  </Label>

                  <AvField
                    required
                    className="form-control"
                    name="name"
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
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDoctorcategory({ ...doctorcategory, name: e.target.value })
                    }
                  />
                </AvGroup>
              </Col>

            
              <Col lg={6}>
                <AvGroup>
                  <Label>
                    <IntlMessages id="Description" />
                  </Label>
                      <AvField
                       type="textarea"
                       validate={{
                        required: {
                          value: true,
                          errorMessage: 'Please enter descirption',
                        },
                        
                        minLength: {
                          value: 2,
                          errorMessage: 'To Short',
                        },
                        
                      }}
                       className="form-control"
                       name="description"
                       onChange={(e) =>
                        setDoctorcategory({ ...doctorcategory, description: e.target.value })
                       }
                      />
                </AvGroup>
              </Col>
            </Row>

            <Button
                style={{backgroundColor:'#0066b3'}}
              size="sm"
              onClick={onDoctorCategoryCreate}
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Creating
                </div>
              ) : (
                'Add Doctor Category'
              )}
            </Button>
          </AvForm>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
