/* eslint-disable */

import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { React, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import {
  ViewAreaManagerAction,
  ViewDirectorAction,
  ViewMPOManagerAction,
  ViewRegionalSalesManagerManagerAction,
  ViewSalesManagerManagerAction,
} from 'Store/Actions/User/UserActions';
import { getToken } from 'Utils/auth.util';
import axios from 'axios';
import moment from 'moment';
import {
  CreateTargetAction,
  GetDistributionCenter,
  OrderRead,
} from 'Store/Actions/Target/TargetAction';
const animatedComponents = makeAnimated();

import { NotificationManager } from 'components/common/react-notifications';
import { getUsers } from 'Store/Actions/AttendanceActions/AttendanceAction';
import {
  CreateSampleAction,
  CreateSampleTransactionAction,
  ViewSampleAction,
} from 'Store/Actions/SampleAction/SampleAction';
import { SampleReducer } from 'Store/Reducers/SampleReducer/SampleReducer';

export default function CreateSampleTransaction(props) {
  const [array, setArray] = useState([]);
  // const [loading, setLoading] = useState(false);

  const [stock, setStock] = useState([]);

  const dispatch = useDispatch();
  const [sampleTransaction, setSampleTransaction] = useState(sampleObj);
  useEffect(() => {
    dispatch(ViewDirectorAction());
    dispatch(ViewSampleAction());
  }, []);
  const sample = useSelector((state) => state?.SampleReducer?.sample);
  const loading = useSelector((state) => state?.SampleReducer?.loading);

  // console.log(sample);
  let sampleOptions = [];
  sample?.map((item) =>
    sampleOptions?.push({
      label: item?.assigned_to?.name,
      value: item?.assigned_to?.name,
      key: item?.uid,
    })
  );

  let medicineOptionFromSample = [];

  
 
  const getStocksMedicine = async (uid) => {
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/stocks/read/medicine?child_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );

    setStock(response?.data?.response_data);
  };
  const director = useSelector((state) => state?.ViewUserReducer?.director);
  let directorOption = [];
  director?.map((item) =>
    directorOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  const sm = useSelector((state) => state?.AttendanceReducer?.sm);
  let salesManagerOption = [];
  sm?.map((item) =>
    salesManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  const sampleObj = {
    sample_uid: '',
    medicines: [],
  };

  const provalue = [];
  const handleChangeProduct = async (e, index) => {
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
    const obj = array[index];
    if (e.target.value <= Number(e.target.max)) {
      obj.quantity = Number(e.target.value);
    }
    array[index] = obj;
    const testArary = [...array];
    setArray(testArary);
    await setSampleTransaction({
      ...sampleTransaction,
      medicines: array?.map((item) => {
        return {
          stock_uid: item?.medicine_uid,
          medicine_quantity: item?.quantity,
        };
      }),
    });
  };
  const AddSampleTransaction = async () => {
  


    let res = await dispatch(CreateSampleTransactionAction(sampleTransaction));
    if (res) {
      NotificationManager.success(
        'Successfully Created',
        'Success',
        5000,
        null,
        ''
      );

      props.history.push('/app/Sample/ViewSampleTransaction');
    } else {
    }

  };
  let [option, setOption] = useState('');
  const getSample = (uid) => {
    sample.map((item) =>
      item?.uid === uid
        ? // option?.push({item})
          setOption(item)
        : // console.log(item)
          []
    );
  };
  console.log(option, 'option');
  let filterOption = [];

  option?.medicines?.map((item) =>
    medicineOptionFromSample.push({
      label: item?.medicine_name,
      value: item?.stock_uid,
      key: item?.medicine_quantity,
    })
  );
  // option.medicines?.map((item) => )
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Sample Transaction" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Sample TO create Transaction" />
                  </Label>

                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    onChange={async (val) => {
                      setSampleTransaction({
                        // ...sampleTransaction,
                        sample_uid: val.key,
                      });

                      getSample(val.key);
                    }}
                    options={sampleOptions}
                  />
                </FormGroup>
              </Col>
              {/* <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Sales Manager" />
                  </Label>

                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    onChange={async (val) => {
                      setSampleTransaction({
                        ...sample,
                        assigned_to_uid: val?.key,
                      });
                      getStocksMedicine(val.key);
                      //   setTimeout(async() => {
                      //     await console.log(targets[0]?.start_date);
                      //   }, 3000);
                    }}
                    options={salesManagerOption}
                  />
                </FormGroup>
              </Col> */}

              <Col lg={6}>
                <FormGroup>
                  <Label>Select Medicine</Label>
                  <Select
                    cacheOptions
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    // value={admin?.service_location_uid}
                    onChange={(val, index) => {
                      handleChangeProduct(val, index);

                      //   setSample({
                      //     ...sample,
                      //     start_date: moment
                      //       .unix(targets[0]?.start_date)
                      //       .format('YYYY-MM-DD h:mm:ss'),
                      //   });
                    }}
                    options={medicineOptionFromSample}
                  />
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
          </Form>
        </Formik>
        <Button
        style={{backgroundColor:"#0066B3"}}
          className={`btn-shadow btn-multiple-state ${
            loading ? 'show-spinner' : ''
          }`}
          onClick={AddSampleTransaction}
        >
          Add Sample
        </Button>
      </CardBody>
    </Card>
  );
}
