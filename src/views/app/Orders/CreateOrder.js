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
import Select, { components } from 'react-select';

import {
  CreateOrder,
  getCustomer,
  getStockProductMedicine,
  getUsers,
  StaticDataGet,
} from 'Store/Actions/ConcordOrder/OrderAction';
import moment from 'moment';
import data from 'data/notifications';



import { set } from 'react-hook-form';
export default function CreateOrders(props) {
  const [assignto, setAssginto] = useState();
  const [mpouid, setMpouid] = useState();
  // const [mpofield,setMpofield] = useState();
  const [customeruid, setCustomeruid] = useState();
  const [medproductuid, setMedproductuid] = useState();
  const [availableproductquantity, setAvailableproductquantity] = useState();
  const [medproductquantity, setMedproductquantity] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [array, setArray] = useState([]);
  const [orderCreate, setOrderCreate] = useState(CreateOrder_obj);
  const [quantity, setQuantity] = useState(0);
  const [array1, setArray1] = useState();

  // console.log("assignto",assignto);
  // console.log("mpouid",mpouid);
  // console.log("customeruid",customeruid);
  // console.log("medproductuid",medproductuid);

  const dispatch = useDispatch();


  const usersm = useSelector((state) => state?.orderReducer?.usersm);
  const userrsm = useSelector((state) => state?.orderReducer?.userrsm);
  const useram = useSelector((state) => state?.orderReducer?.useram);
  const usermpo = useSelector((state) => state?.orderReducer?.usermpo);
  const getcustomers = useSelector(
    (state) => state?.orderReducer?.getCustomerOrder
  );
  const stockproductmedicine = useSelector(
    (state) => state?.orderReducer?.stockproductmedicine
  );
  const loading = useSelector(
    (state) => state?.orderReducer?.loader
  );
  // const loading = true;
  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);
  useEffect(() => {
    dispatch(getUsers('', 'sm'));
    dispatch(StaticDataGet());
  }, []);

  const CreateOrder_obj = {
    on_behalf_of_uid: '',
    customer_uid: '',
    medicines: array?.map(item => {
      return {
        medicine_uid: item?.medicine_uid,
        quantity: item?.quantity
      }
    }),
    payment_type: '',
    delivery_status: 'pending',
    payment_status: 'pending',
    order_datetime: '',
  };

  let option_static_PaymentType = [];
  staticdata?.list_order__payment_types?.filter((item) =>
    option_static_PaymentType.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
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
      key: item?.uid,
    })
  );
  let optionsm = [];
  usersm?.filter((item) =>
    optionsm.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );
  let optionrsm = [];
  userrsm?.filter((item) =>
    optionrsm.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );
  let optionam = [];
  useram?.filter((item) =>
    optionam.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );
  let optionmpo = [];
  usermpo?.filter((item) =>
    optionmpo.push({
      label: item?.name,
      value: item?.uid,
      key: item?.field_staff?.uid,
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
      console.log(orderCreate, "orderCreate");


      let res = await dispatch(CreateOrder(orderCreate));
      // setLoading(false);
      if (res) {
        NotificationManager.success(
          'New Order Added Sucessfully',
          'Sucess',
          3000,
          null,
          ''
        );
        props.history.push('/app/Orders/orders');
      }
    }
  };
  const provalue = [];
  const handleChangeProduct = async (e, index) => {
    // console.log(e);
    let options = e;
    options?.map((item, index) => {
      provalue.push({
        label: item?.label,
        medicine_uid: item?.value,
        availalbequantity: item?.key,
        quantity: array?.length > 0 ? array[index]?.quantity : 0,
      });
    }); 
    await setArray(provalue);
  };


  const QuantityHanle = async (e, index) => {
    console.log("max", e)
    const obj = array[index];
    if (e.target.value <= Number(e.target.max)) {
      obj.quantity = Number(e.target.value);
    }
    array[index] = obj;
    const testArary = [...array];
    console.log(testArary);
    setArray(testArary);
    
    
    await setOrderCreate({
      ...orderCreate,
      medicines: array?.map(item => {
        return {
          medicine_uid: item?.medicine_uid,
          quantity: item?.quantity 
        }
      }),
    })
  };


  


  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create New Orders" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Sales Manager(SM)" />
                  </label>

                  <>
                    <Select
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
                        // setMpofield(e.key);
                        setOrderCreate({
                          ...orderCreate,

                          on_behalf_of_uid: e.key,
                        });
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
                        });
                      }}
                      options={optiongetcustomer}
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
                      onChange={(e) => {
                        setOrderCreate({
                          ...orderCreate,

                          payment_type: e?.value,
                          delivery_status: 'pending',
                          payment_status: 'pending',
                        });
                      }}
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
                        order_datetime:
                          e.target.value +
                          ' ' +
                          moment(moment.utc(date).toDate()).format('hh:mm:ss'),
                      })
                    }
                  />
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
                      isMulti
                      required
                      
                      onChange={(e, index) => {
                        handleChangeProduct(e, index);
                      }}
                      options={optiongetstocksproductget}
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
                          <th>Medicine Products</th>
                          <th>Available Quantity</th>
                          <th>Add Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {array?.map((item, index) => {
                          return (
                            <tr>
                              <td>{item?.label}</td>

                              <td>{item?.availalbequantity}</td>
                              <td>
                                <Col lg={12}>
                                  <FormGroup>
                                    <Input
                                      required
                                      className="form-control"
                                      name="name"
                                      type="number"
                                      max={item?.availalbequantity}
                                      min={0}
                                      value={item?.quantity}
                                      className="radio-in"
                                      onChange={(e) => {
                                        QuantityHanle(e, index);
                                      }}
                                    />
                                  </FormGroup>
                                </Col>
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
                style={{backgroundColor:'#0066b3'}}
              size="sm"
              onClick={createNewOrder}
            >
              {loading ?
                <div className="d-flex justify-content-center">
                 <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Creating Order
                </div> : "Add Order"
              }

            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
