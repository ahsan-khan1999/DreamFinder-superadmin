/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import { Formik, useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CreatePatientAction } from 'Store/Actions/User/Patient/CreatePatientAction';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';


import { CardBody, Col, Row, Table ,Card,CardTitle, Form, FormGroup, Label, Input} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';

const selectGender = [
    { label: 'male', value: 'male', key: 1 },
    { label: 'female', value: 'female', key: 2 },
  ];
export default function CreatePatients() {
    const formikData = useFormik({
        initialValues: {
          //   password: doctor_obj?.password,
          //   confirmPassword: confirmPassword,
        },
        // validate: validate,
    
        onSubmit: (values) => {
          // console.log(values);
        },
      });
  const patient_obj = {
    email_address: '',

    employee_id: '',
    name: '',
    // password: "alpha",
    password: '',

    gender: '',

    phone_number: '',
    role: {
      user_role_id: 3,
      name: 'patient',
      title: 'Patient User',
      rights: [],
    },
    date_of_birth: '',
  };
  //   console.log(selectedOptionsDay?.value, timeTo, timeFrom);

  let [patient, setPatient] = useState(patient_obj);
  let [confirmPassword, setConfirmPassword] = useState();

  const dispatch = useDispatch();
  const createPatient = async () => {
    let res = await dispatch(CreatePatientAction(patient));
    // let res = true;
    if (res) {
      NotificationManager.success(
        'Patient Added Sucessfully',
        'Scuess',
        3000,
        null,
        ''
      );
      history.push('/app/menu/levels/viewPatient');
    } else if (confirmPassword !== patient.password) {
      NotificationManager.warning(
        'Password Doesnt match',
        'Error',
        3000,
        null,
        ''
      );
    }
  };
  return (
    <Card>
    <CardBody>
      <CardTitle>
        <IntlMessages id="Create Patient" />
      </CardTitle>
      <div style={{ marginBottom: '30px' }}></div>
      <Formik
        initialValues={formikData.initialValues}
        onSubmit={formikData.handleSubmit}
      >
        <Form>
          <Row className="h-100">


          <Col lg={6}>
              <FormGroup>
                <Label>
                  <IntlMessages id="Employee ID" />
                </Label>

                <Input
                  className="form-control"
                  required
                  name="name"
                  type="text"
                  value={patient?.employee_id}
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      employee_id: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <Label>
                  <IntlMessages id="Name" />
                </Label>

                <Input
                  className="form-control"
                  name="name"
                  type="text"
                  value={patient?.name}
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      name: e.target.value,
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
                  value={patient?.email_address}
                  className="form-control"
                  name="email"
                  type="email"
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      email_address: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>

            <Col lg={6}>
              <FormGroup>
                <Label>
                  <IntlMessages id="Password" />
                </Label>

                <Input
                  value={patient?.password}
                  className="form-control"
                  name="password"
                  type="password"
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      password: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <Label>
                  <IntlMessages id="Confirm Password" />
                </Label>
                <Input
                  required
                  value={confirmPassword}
                  className="form-control"
                  name="confirm password"
                  type="password"
                  // validate={validate}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {formikData.errors.password ? (
                  <div>{formikData.errors.confirmPassword}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <label>
                  <IntlMessages id="Select Gender" />
                </label>

                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name-gender"
                  // value={gender}
                  defaultValue={{
                    label: patient?.gender?.name,
                    value: patient?.gender?.name,
                    key: patient?.gender?.id,
                  }}
                  onChange={(val) =>
                    setPatient({
                      ...patient,
                      gender: { id: val.key, name: val.label },
                    })
                  }
                  options={selectGender}
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <Label>
                  <IntlMessages id="Phone Number" />
                </Label>

                <Input
                  value={patient.phone_number}
                  className="radio-in"
                  name="phone_number"
                  // validate={validateEmail}
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      phone_number: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={6}>
              <FormGroup>
                <Label>
                  <IntlMessages id="Date Of Birth" />
                </Label>

                <Input
                  value={patient.date_of_birth}
                  className="form-control"
                  name="date_of_birth"
                  type="date"
                  // validate={validateEmail}
                  onChange={(e) =>
                    setPatient({
                      ...patient,
                      date_of_birth: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>

         
          </Row>

          <Button
            className="btn btn-primary"
            type="submit"
            onClick={createPatient}
          >
            Add Administrator
          </Button>
        </Form>
      </Formik>
    </CardBody>
  </Card>
  );
}
