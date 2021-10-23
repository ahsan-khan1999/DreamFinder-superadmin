/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Button, Card, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { doc } from 'prettier';
import { items } from 'data/carouselItems';
import { useDispatch, useSelector } from 'react-redux';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { UncontrolledDropdown } from 'reactstrap';
// import './loader.css';
// import eye from '../../../../assets/img/eye.png'
import Loader from 'react-loader-spinner';
import { Formik, useFormik } from 'formik';
import { CreateLabAdmin } from 'Store/Actions/User/LabAdmin/CreateLabAdminAction';
import { NotificationManager } from 'components/common/react-notifications';
import Select from 'react-select';

import { getUsers } from 'Store/Actions/ConcordOrder/OrderAction';
export default function AddOrder() {
        
  const [assignto, setAssginto] = useState();


  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(getUsers('','sm'));


  }, []);

  const CreateOrder_obj = {
    on_behalf_of_uid: '',
    customer_uid: '',
    medicines: [
        {
            medicine_uid: '',
            quantity: ''
        }
    ],
    payment_type: '',
    delivery_status: 'pending',
    payment_status: 'pending',
    order_datetime: '',
  };

  let [orderCreate, setOrderCreate] = useState(CreateOrder_obj);

  const usersm = useSelector((state) => state?.orderReducer?.usersm);
  const userrsm = useSelector((state) => state?.orderReducer?.userrsm);
  const useram = useSelector((state) => state?.orderReducer?.useram);
  const usermpo = useSelector((state) => state?.orderReducer?.usermpo);
  console.log("user",usersm)
  
  

  let optionsm = [];
  usersm?.filter((item) =>
    optionsm.push({ 
         label: item?.name,
         value: item?.uid,
         key: item?.uid
         })
  );
  let optionrsm = [];
  ////////////////////////////// Set
  userrsm?.filter((item) =>
    optionsm.push({ 
         label: item?.name,
         value: item?.uid,
         key: item?.uid
         })
  );
  let optionam = [];
  useram?.filter((item) =>
    optionsm.push({ 
         label: item?.name,
         value: item?.uid,
         key: item?.uid
         })
  );
  let optionmpo = [];
  usermpo?.filter((item) =>
    optionsm.push({ 
         label: item?.name,
         value: item?.uid,
         key: item?.uid
         })
  );
  const formikData = useFormik({
    initialValues: {},
    onSubmit: (values) => {
    },
  });



//   const createNewOrder = async () => {
//     setLoading(true);
//     if (
//       orderCreate?.orderCreate === '' &&
//       orderCreate?.customer_uid === '' &&
//       orderCreate?.medicines[0].medicine_uid === '' &&
//       orderCreate?.medicines[0].quantity === '' &&
//       orderCreate?.payment_type === '' &&
//       orderCreate?.payment_status === ''
//     ) {
//       NotificationManager.error(
//         'Please Enter Required Field',
//         'Error',
//         3000,
//         null,
//         ''
//       );
//       return;
//     } else {
//       setLabAdmin({
//         ...orderCreate,
//         // timings: { [selectedOptionsDay?.value]: { from: timeFrom, to: timeTo } },
//       });

//       let res = await dispatch(CreateLabAdmin(orderCreate));
//       setLoading(false);
//       if (res) {
//         NotificationManager.success(
//           'Lab Admin Added Sucessfully',
//           'Sucess',
//           3000,
//           null,
//           ''
//         );
//         history.push('/app/menu/levels/viewLabAdmin');
//       } else if (confirmPassword !== orderCreate.password) {
//         NotificationManager.warning(
//           'Password Doesnt match',
//           'Error',
//           3000,
//           null,
//           ''
//         );
//       }
//     }
//   };


  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create New Orders" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik
        //   initialValues={formikData.initialValues}
        //   onSubmit={formikData.handleSubmit}
        >
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Sales Manager(SM)" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      required
                      onChange={(e) => {
                        dispatch(getUsers(e.target.value, 'rsm'));
                        setAssginto(e.target.value);
                      }}
                      options={optionsm}
                    />
                  </>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Regional Sales Manager(RSM)" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      required
                     
                      onChange={(val) => {
                        dispatch(getUsers(e.target.value, 'am'));
                        setAssginto(e.target.value);
                      }}
                      options={optionrsm}
                    />
                  </>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Area Manager(AM)" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      required
                    
                      onChange={(val) => {
                        dispatch(getUsers(e.target.value, 'mpo'));
                        setAssginto(e.target.value);
                      }}
                      options={optionam}
                    />
                  </>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select MPO" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      required
                    
                      onChange={(val) => {
                        
                        setAssginto(e.target.value);
                      }}
                      options={optionmpo}
                    />
                  </>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Customer" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      required
                     
                    //   options={options}
                    />
                  </>
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Stock Product" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      required
                     
                    //   options={options}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Payment Method" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      required
                     
                    //   options={options}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Date Of Birth" />
                  </Label>

                  <Input
                    required
                    // value={labAdmin.date_of_birth}
                    className="form-control"
                    name="date_of_birth"
                    type="date"
                    // onChange={(e) =>
                    //   setLabAdmin({
                    //     ...labAdmin,
                    //     date_of_birth: e.target.value,
                    //   })
                    // }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
              // type="submit"
              //   onClick={createLabAdmin}
              //   className={`btn-shadow btn-multiple-state ${
              //     loading ? 'show-spinner' : ''
              //   }`}
            >
              Add Order
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
}
