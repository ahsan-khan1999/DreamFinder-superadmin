/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Button, Card, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { getToken } from '../../../../Utils/auth.util';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { doc } from 'prettier';
import { items } from 'data/carouselItems';
import { useDispatch, useSelector } from 'react-redux';
import dot from '../../../../assets/img/dot.png';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';

import { UncontrolledDropdown } from 'reactstrap';
// import './loader.css';
// import eye from '../../../../assets/img/eye.png'
import Loader from 'react-loader-spinner';
import { Formik, useFormik } from 'formik';
import { CreateLabAdmin } from 'Store/Actions/User/LabAdmin/CreateLabAdminAction';
import { NotificationManager } from 'components/common/react-notifications';
import Select from 'react-select';
import { CreatePharmacyAction } from 'Store/Actions/User/Pharmacy/CreatePharmacyAction';

const PharmacyUser = ({ history }) => {
  const [gender, setGender] = useState();

  const selectGender = [
    { label: 'Male', value: 'male', key: 1 },
    { label: 'Female', value: 'female', key: 2 },
  ];

  const selectDay = [
    { label: 'Monday', value: 'monday', key: 1 },
    { label: 'Tuesday', value: 'tuesday', key: 2 },
    { label: 'Wednesday', value: 'wednesday', key: 3 },
    { label: 'Thursday', value: 'thursday', key: 4 },
    { label: 'Friday', value: 'friday', key: 5 },
    { label: 'Saturday', value: 'saturday', key: 6 },
    { label: 'Sunday', value: 'sunday', key: 7 },
  ];
  const [selectedOptionsDay, setSelectedOptionsDay] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();
  let pharmacy_length = useSelector(
    (state) => state?.ViewPharmacyReducer?.pharmacy
  );
  let len = pharmacy_length.length;
  const [loading, setLoading] = useState(false);

  const pharmacy_obj = {
    email_address: '',

    employee_id: '',
    name: '',
    // password: "alpha",
    password: '',

    gender: '',

    phone_number: '',
    role: {
      user_role_id: 9,
      name: 'pharmacy',
      title: 'Pharmacy User',
      rights: [],
    },
    // timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },

    // departments: ['1'],
    date_of_birth: '',

    designation: '',
  };

  const formikData = useFormik({
    initialValues: {},
    onSubmit: (values) => {
      // console.log(values);
    },
  });
  let [confirmPassword, setConfirmPassword] = useState();
  // console.log(selectedOptionsDay?.value, timeTo, timeFrom);
  let [pharmacy, setPharmacy] = useState(pharmacy_obj);

  useEffect(() => {
    // let day = selectedOptionsDay?.value;
    // pharmacy.timings = { [day]: { from: timeFrom, to: timeTo } };
    // setPharmacy(pharmacy);
  }, []);
  const dispatch = useDispatch();
  const createPharmacyUser = async (event) => {
    event.preventDefault();

    if (
      pharmacy?.email_address === '' &&
      pharmacy?.name === '' &&
      pharmacy?.password === '' &&
      pharmacy?.employee_id === '' &&
      pharmacy?.gender === ''
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
      setLoading(true);
      // setPharmacy({
      //   ...pharmacy,
      //   timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },
      // });
      let res = await dispatch(
        CreatePharmacyAction({
          ...pharmacy,
          // timings: {
          //   [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo },
          // },
        })
      );
      setLoading(false);
      if (res) {
        NotificationManager.success(
          'Sucessfully Created',
          'Scuess',
          5000,
          null,
          ''
        );
        history.push('/app/menu/levels/viewPharmacy');
      } else if (pharmacy?.password !== confirmPassword) {
        NotificationManager.error(
          'Password Does not match ',
          'error',
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
          <IntlMessages id="Create Pharmacy" />
        </CardTitle>

        {/* <h2>Register Doctor</h2> */}
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
                    required

                    className="form-control"
                    name="name"

                    type="text"
                    value={pharmacy?.employee_id}
                    onChange={(e) =>
                      setPharmacy({
                        ...pharmacy,
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
                    required

                    type="text"
                    value={pharmacy?.name}
                    onChange={(e) =>
                      setPharmacy({
                        ...pharmacy,
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
                    value={pharmacy?.email_address}
                    className="form-control"
                    name="email"
                    required

                    type="email"
                    onChange={(e) =>
                      setPharmacy({
                        ...pharmacy,
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
                    value={pharmacy?.password}
                    className="form-control"
                    name="password"
                    type="password"
                    required

                    onChange={(e) =>
                      setPharmacy({
                        ...pharmacy,
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
                    value={confirmPassword}
                    className="form-control"
                    name="password"
                    required

                    type="password"
                    onChange={(e) => setConfirmPassword(e?.target?.value)}
                  />
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
                    value={gender}
                    required

                    onChange={(val) =>
                      setPharmacy({
                        ...pharmacy,
                        gender: { id: val?.key, name: val?.value },
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
                    value={pharmacy?.phone_number}
                    className="radio-in"
                    name="phone_number"
                    required

                    type="number"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setPharmacy({
                        ...pharmacy,
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
                    value={pharmacy?.date_of_birth}
                    className="form-control"
                    name="date_of_birth"
                    type="date"
                    required

                    // validate={validateEmail}
                    onChange={(e) =>
                      setPharmacy({
                        ...pharmacy,
                        date_of_birth: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Enter Designation" />
                  </Label>

                  <Input
                    value={pharmacy?.designation}
                    className="form-control"
                    name="designation"
                    type="text"
                    required

                    // validate={validateEmail}
                    onChange={(e) =>
                      setPharmacy({
                        ...pharmacy,
                        designation: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>
              {/* <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Day" />
                  </label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name"
                    value={selectedOptionsDay}
                    onChange={(val) => setSelectedOptionsDay(val)}
                    options={selectDay}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Timmings From" />
                  </label>
                  <Input
                    value={timeFrom}
                    className="form-control"
                    name="time"
                    type="time"
                    // validate={validateEmail}
                    onChange={(e) => setTimeFrom(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Timmings To" />
                  </label>
                  <Input
                    value={timeTo}
                    className="form-control"
                    name="time"
                    type="time"
                    // min={timeFrom}
                    // validate={validateEmail}
                    onChange={(e) => setTimeTo(e.target.value)}
                  />
                </FormGroup>
              </Col> */}
            </Row>
            <Button
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              className="btn btn-primary"
              type="submit"
              onClick={createPharmacyUser}
            >
              Add Pharmacy
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
};
export default PharmacyUser;
