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
import { CreateDoctorCategory, UpdateDoctorCategory } from 'Store/Actions/ConcordDoctorCategorys/DoctorCategorysAction';
import apiServices from 'services/requestHandler';

export default function ViewCurrentDoctorsCategory(props) {
 

  let [buttonName, setButtonName] = useState();
  
  const [thisView, setThisView] = useState(true);
  
  
  const CurrentDoctorCategory = props?.location?.state;


  const dispatch = useDispatch();



  const onSubmit = (event, errors, values) => {
    console.log(errors);
    console.log(values);
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


  useEffect(() => {

    if (CurrentDoctorCategory?.status?.name === 'suspended') {
      setButtonName('Active');
    } else if (CurrentDoctorCategory?.status?.name === 'active') {
      setButtonName('Suspend');
    }
  }, []);

 const doctorcategory_obj = {
    name: CurrentDoctorCategory.name,
    description: CurrentDoctorCategory.description,
    uid:CurrentDoctorCategory.uid
  };

  const loading = useSelector((state) => state?.doctorCategoryReducer?.loading);
  
  const [doctorcategory, setDoctorcategory] = useState(doctorcategory_obj);



  const editProfile = (e) => {
    e.preventDefault();
    setThisView(!thisView);
  };


  const editData = async () => {
    let res = await dispatch(UpdateDoctorCategory(doctorcategory));
    if (res) {
      NotificationManager.success(
        'Successful response',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/doctor-management/viewDoctorsCategory');
    }
  };


  
  const handleChangeToView = () => {
    props.history.push('/app/doctor-management/viewDoctorsCategory');
  };


 
  const suspandDepartmenthead = async () => {
    if (CurrentDoctorCategory?.status?.name === 'suspended') {
      let apiData = {
        uid: CurrentDoctorCategory?.uid,
      };
      console.log(apiData);
      let res = await apiServices.suspanddoctorcategorys(apiData);
      console.log(res);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/doctor-management/viewDoctorsCategory');
      } else {
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
        uid: CurrentDoctorCategory?.uid,
      };
      let res = await apiServices.suspanddoctorcategorys(apiData);
      console.log(res);
      if (res?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/doctor-management/viewDoctorsCategory');
      } else {
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
              style={{ marginRight: '20px',backgroundColor:'#0066b3'}}
            >
              Back
            </Button>
            <IntlMessages id="Doctor Category" />
            </>
            ) : (
              
              <>
              <Button
                onClick={editProfile}
                style={{ marginRight: '20px' , backgroundColor:'#0066b3'}}
              >
                Close Edit
              </Button>
              <IntlMessages id="Edit Doctor Category" />
              </>
              )}
        </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <AvForm
          className="av-tooltip tooltip-label-right"
          onSubmit={(event, errors, values) => onSubmit(event, errors, values)}
          >
            <Row className="h-100">
              <Col lg={12}>
                <AvGroup>
                <Label>
                    <h6
                      style={{
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >Name</h6>
                  </Label>


                  {thisView ? (
                  <span>
                    <p>{CurrentDoctorCategory?.name.toUpperCase()}</p>
                  </span>
                  ):(
                    <AvField
                    required
                    className="form-control"
                    value={doctorcategory?.name}
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
                  )}
                
                </AvGroup>
              </Col>

            
              <Col lg={12}>
                <AvGroup>
                <Label>
                    <h6
                      style={{
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >Description</h6>
                  </Label>
            
            
                  {thisView ? (
                  <span>
                    <p>{CurrentDoctorCategory?.description ? CurrentDoctorCategory?.description.toUpperCase() : 'N/A'}</p>
                  </span>
         
                  ):(
                      <AvField
                       type="textarea"
                       value={doctorcategory?.description}
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
                  )}
                </AvGroup>
              </Col>
            </Row>



            {thisView ? (
              <Button
                style={{backgroundColor:'#0066b3'}}
                className="mr-3"
                onClick={editProfile}
              >
              
                Edit Doctor Category
              </Button>
            ) : (
              <Button
                style={{backgroundColor:'#0066b3'}}

              
                onClick={editData}
              >
              
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
                {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Suspending
                </div>
              ) : (
                buttonName
                )}
                
              </Button>

            ) : (
                ""
            )}



            {/* <Button
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
            </Button> */}
          </AvForm>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}

