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

import { CreateOrder, getCustomer, getStockProductMedicine, getUsers, StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';
import moment from 'moment';
export default function AddOrder() {
        
  const [assignto, setAssginto] = useState();
  const [mpouid,setMpouid] = useState();
  const [customeruid,setCustomeruid] = useState();
  const [medproductuid,setMedproductuid] = useState();
  const [availableproductquantity,setAvailableproductquantity] = useState();
  const [medproductquantity,setMedproductquantity] = useState();
  const [date,setDate] = useState();
  const [time,setTime] = useState();




  // console.log("assignto",assignto);
  // console.log("mpouid",mpouid);
  // console.log("customeruid",customeruid);
  // console.log("medproductuid",medproductuid);

  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  
  
  
  useEffect(() => {
    dispatch(getUsers('','sm'));
    dispatch(StaticDataGet());

  },[]);

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
  
  // console.log(orderCreate)

  const usersm = useSelector((state) => state?.orderReducer?.usersm);
  const userrsm = useSelector((state) => state?.orderReducer?.userrsm);
  const useram = useSelector((state) => state?.orderReducer?.useram);
  const usermpo = useSelector((state) => state?.orderReducer?.usermpo);
  const getcustomers = useSelector((state) => state?.orderReducer?.getCustomerOrder);
  const stockproductmedicine = useSelector((state) => state?.orderReducer?.stockproductmedicine);
  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);
  
  

  let option_static_PaymentType = [];
  staticdata?.filter((item) =>
  option_static_PaymentType.push({ 
         label: item?.name,
         value: item?.value,
         key: item?.id
         })
  );
  let optiongetstocksproductget = [];
  stockproductmedicine?.filter((item) =>
  optiongetstocksproductget.push({ 
         label: item?.product?.name,
         value: item?.uid,
         key: item?.quantity,
         })
  );
  let optiongetcustomer = [];
  getcustomers?.filter((item) =>
  optiongetcustomer.push({ 
         label: item?.name,
         value: item?.uid,
         key: item?.uid
         })
  );
  let optionsm = [];
  usersm?.filter((item) =>
    optionsm.push({ 
         label: item?.name,
         value: item?.uid,
         key: item?.uid
         })
  );
  let optionrsm = [];
  userrsm?.filter((item) =>
    optionrsm.push({ 
         label: item?.name,
         value: item?.uid,
         key: item?.uid
         })
  );
  let optionam = [];
  useram?.filter((item) =>
    optionam.push({ 
         label: item?.name,
         value: item?.uid,
         key: item?.uid
         })
  );
  let optionmpo = [];
  usermpo?.filter((item) =>
    optionmpo.push({ 
         label: item?.name,
         value: item?.uid,
         key: item?.uid
         })
  );
  const formikData = useFormik({
    // initialValues: {},
    // onSubmit: (values) => {
    //   createNewOrder();
    // },
  });


  const createNewOrder = async () => {
    // setLoading(true);
    if (
      orderCreate?.on_behalf_of_uid === '' &&
      orderCreate?.customer_uid === '' &&
      orderCreate?.payment_type === '' &&
      orderCreate?.order_datetime === '' 
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
      alert("hit")
      let res = await dispatch(CreateOrder(...orderCreate));
      console.log("OrderResponse",res)
      // setLoading(false);
      if (res) {
        NotificationManager.success(
          'New Order Added Sucessfully',
          'Sucess',
          3000,
          null,
          ''
        );
        // history.push('/app/Orders/orders');
      } 
    }
  };


  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create New Orders" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik
         
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
                      
                      required
                      onChange={(e) => {
                        dispatch(getUsers(e.value, 'rsm'));
                        setAssginto(e.value);
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
                      
                      required
                     
                      onChange={(e) => {
                        dispatch(getUsers(e.value, 'am'));
                        setAssginto(e.value);
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
                      
                      required
                    
                      onChange={(e) => {
                        dispatch(getUsers(e.value, 'mpo'));
                        setAssginto(e.value);
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
                      
                      required
                    
                      onChange={(e) => {
                        dispatch(getCustomer(e.value));
                        setAssginto(e.value);
                        setMpouid(e.value);
                        setOrderCreate({
                          ...orderCreate,
                        
                          on_behalf_of_uid: e.value,
                        })
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
                      
                      required
                      onChange={(e) => {
                        dispatch(getStockProductMedicine(mpouid));
                        // setAssginto(e.value);
                        setCustomeruid(e.value);
                        setOrderCreate({
                          ...orderCreate,
                        
                          customer_uid: e.value,
                        })
                      }}
                      options={optiongetcustomer}
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
                      
                      required
                      onChange={(e) => {
                        setMedproductuid(e.value);
                        setAvailableproductquantity(e.key);
                        setOrderCreate({
                          ...orderCreate,
                        medicines: { medicine_uid: e.value ,quantity: medproductquantity},
                        })
                      }}
                      options={optiongetstocksproductget}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Quantity" />
                  </Label>
                  <Label style={{float:'right'}}>
                    <IntlMessages id="Available Quantity :"/>
                    {availableproductquantity ? availableproductquantity : '00'}
                  </Label>
                  <Input
                    required
                    className="form-control"
                    name="name"
                    type="number"
                    max={availableproductquantity}
                    min={0}
                    className="radio-in"
                    onChange={(e) =>
                      {
                        setMedproductquantity(e.target.value);
                        setOrderCreate({
                          ...orderCreate,
                        
                          medicines: { medicine_uid: medproductuid ,quantity: e.target.value},
                        })
                      }
            
                    }
                  />
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
                      onChange={(e) =>{
                        setOrderCreate({
                          ...orderCreate,
                        
                          payment_type: e?.value,
                        })
                      }
                      }  
                      required
                     
                      options={option_static_PaymentType}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Date" />
                  </Label>

                  <Input
                    required
                    className="form-control"
                    name="date_of_birth"
                    type="date"
                    onChange={(e) =>
                      setOrderCreate({
                        ...orderCreate,
                        order_datetime: e.target.value + " " + moment(moment.utc(date).toDate()).format("hh:mm"),
                      })
                    }
                  />
                </FormGroup>
              </Col>
             
            </Row>

            <Button
             className="btn btn-primary"
              // type="submit"
                onClick={createNewOrder}
                // className={`btn-shadow btn-multiple-state ${
                //   loading ? 'show-spinner' : ''
                // }`}
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
