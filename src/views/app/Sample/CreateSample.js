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
import CreateSampleTransaction from './CreateSampleTransaction';
import { CreateSampleAction } from 'Store/Actions/SampleAction/SampleAction';
import Loader from 'react-loader-spinner';
import { BASEURL } from 'services/HttpProvider';

export default function CreateSample(props) {
  const [array, setArray] = useState([]);
  let [loadingMedicine, setLoadingMedicine] = useState(false);

  const [loading, setLoading] = useState(false);
  const loadingSM = useSelector((state) => state?.AttendanceReducer?.loadingSm);
  const loadingAM = useSelector((state) => state?.AttendanceReducer?.loadingAm);
  const loadingRSM = useSelector(
    (state) => state?.AttendanceReducer?.loadingRsm
  );
  const loadingMPO = useSelector(
    (state) => state?.AttendanceReducer?.loadingMpo
  );
  const [stock, setStock] = useState([]);
  const sampleObj = {
    assigned_to_uid: '',
    medicines: [],
  };
  const dispatch = useDispatch();
  const [sample, setSample] = useState(sampleObj);
  useEffect(() => {
    dispatch(ViewDirectorAction());
  }, []);
  // const loading = useSelector(state => state?.SampleReducer?.loading)
  let medicineOptionFromStock = [];
  stock?.map((item) =>
    medicineOptionFromStock?.push({
      label: item?.product?.name,
      value: item?.uid,
      key: item?.quantity,
    })
  );
  const getStocksMedicine = async (uid) => {
    setLoadingMedicine(true)

    let token = await getToken();
    const response = await axios.get(
      BASEURL+`/stocks/read/medicine?child_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );
    setLoadingMedicine(false)
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
    await setSample({
      ...sample,
      medicines: array?.map((item) => {
        return {
          stock_uid: item?.medicine_uid,
          medicine_quantity: item?.quantity,
        };
      }),
    });
  };
  const AddSample = async () => {
    // console.log(sample);
    setLoading(true);
    let res = await dispatch(CreateSampleAction(sample));
    if (res) {
      NotificationManager.success(
        'Successfully Created',
        'Success',
        5000,
        null,
        ''
      );
      setLoading(false);

      props.history.push('/app/Sample/ViewSample');
    } else {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>Create Sample</CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>Select Director</Label>

                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    onChange={async (val) => {
                      dispatch(getUsers(val.key, 'sm'));

                      //   await getDirectorTarget(val?.key);
                    }}
                    options={directorOption}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>Select Sales Manager</Label>
                    {loadingSM ? <div className="">
                      <Loader
                        height={18}
                        width={18}
                        type="Oval"
                        color="#0066B3"
                      />
                      &nbsp;
                    </div> : <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    onChange={async (val) => {
                      setSample({ ...sample, assigned_to_uid: val?.key });
                      getStocksMedicine(val.key);
                      //   setTimeout(async() => {
                      //     await console.log(targets[0]?.start_date);
                      //   }, 3000);
                    }}
                    options={salesManagerOption}
                  />}
                  
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>Select Medicine</Label>
                    {loadingMedicine ? <div className="">
                      <Loader
                        height={18}
                        width={18}
                        type="Oval"
                        color="#0066B3"
                      />
                      &nbsp;
                    </div> : <Select
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
                    options={medicineOptionFromStock}
                  />}
                  
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
          style={{ backgroundColor: '#0066B3' }}
          disabled={loading ? true : false}
          className={`btn-shadow btn-multiple-state ${
            loading ? 'show-spinner' : ''
          }`}
          onClick={AddSample}
        >
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">Add Sample</span>
        </Button>
      </CardBody>
    </Card>
  );
}
