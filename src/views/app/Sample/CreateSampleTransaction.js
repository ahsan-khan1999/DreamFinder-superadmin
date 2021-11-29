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
import Loader from 'react-loader-spinner';
import { BASEURL } from 'services/HttpProvider';
const delaultOptions = [
  { label: 'SM', value: 'SM', key: 2 },
  { label: 'RSM', value: 'RSM', key: 3 },

  { label: 'AM', value: 'AM', key: 4 },
  { label: 'MPO', value: 'MPO', key: 5 },
];
export default function CreateSampleTransaction(props) {
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  const loadingSM = useSelector((state) => state?.AttendanceReducer?.loadingSm);
  const loadingAM = useSelector((state) => state?.AttendanceReducer?.loadingAm);
  const loadingRSM = useSelector(
    (state) => state?.AttendanceReducer?.loadingRsm
  );
  const loadingMPO = useSelector(
    (state) => state?.AttendanceReducer?.loadingMpo
  );
  let [loadingMedicine, setLoadingMedicine] = useState(false);
  let [loadingStocks, setLoadingStocks] = useState(false);
  const [stock, setStock] = useState([]);
  const [parentStock, setParentStock] = useState([]);
  const sampleObj = {
    assigned_to_uid: '',
    medicines: [],
  };
  const dispatch = useDispatch();
  const [sampleTransaction, setSampleTransaction] = useState(sampleObj);
  const rsm = useSelector((state) => state?.AttendanceReducer?.rsm);
  const am = useSelector((state) => state?.AttendanceReducer?.am);
  const mpo = useSelector((state) => state?.AttendanceReducer?.mpo);
  useEffect(() => {
    dispatch(ViewDirectorAction());
    dispatch(ViewSampleAction());
    dispatch(ViewSalesManagerManagerAction());
  }, []);
  const sample = useSelector((state) => state?.SampleReducer?.sample);
  // const loading = useSelector((state) => state?.SampleReducer?.loading);

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
    setLoadingMedicine(true);
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
    setLoadingMedicine(false);

    setStock(response?.data?.response_data);
  };

  const getStockFromParent = async (uid) => {
    setLoadingStocks(true);
    let token = await getToken();
    const response = await axios.get(
      BASEURL+`/samples/read?assigned_to_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );
    setLoadingStocks(false);

    setParentStock(response?.data?.response_data);
  };
  // console.log(parentStock, 'parent stock');
  let medicineOptionFromParentSample = [];
  parentStock?.map((item) => {
    item?.medicines?.map((item_) => {
      medicineOptionFromParentSample.push({
        label: item_?.medicine_name,
        value: item_?.stock_uid,
        key: item_?.medicine_quantity,
      });
    });
  });
  let areaManagerOption = [];
  am?.map((item) =>
    areaManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let regionalSalesManagerOption = [];
  rsm?.map((item) =>
    regionalSalesManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let mpoOption = [];
  mpo?.map((item) =>
    mpoOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  const director = useSelector((state) => state?.ViewUserReducer?.director);
  let directorOption = [];
  director?.map((item) =>
    directorOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  const sm = useSelector((state) => state?.ViewUserReducer?.salesManager);
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
    if (
      sampleTransaction === undefined ||
      !('medicines' in sampleTransaction)
    ) {
      setLoading(true);
      NotificationManager.error(
        'Please Enter Details',
        'Error',
        5000,
        null,
        ''
      );
      setLoading(false);

      return;
    } else {
      if (sampleTransaction?.medicines?.length !== 0) {
        setLoading(true);

        let res = await dispatch(
          CreateSampleTransactionAction(sampleTransaction)
        );
        if (res) {
          NotificationManager.success(
            'Successfully Created',
            'Success',
            5000,
            null,
            ''
          );
          setLoading(false);

          props.history.push('/app/Sample/ViewSampleTransaction');
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);

        NotificationManager.error('Enter Details ', 'ERROR', 5000, null, '');
      }
    }
  };

  

  let [option, setOption] = useState('');
  const getSample = (uid) => {
    sample.map(
      (item) => (
        getStocksMedicine(item?.assigned_to?.uid),
        item?.uid === uid
          ? // option?.push({item})
            setOption(item)
          : // console.log(item)
            []
      )
    );
  };
  let medicineOptionsFromStock = [];
  stock?.map((item) =>
    medicineOptionsFromStock.push({
      label: item?.product?.name,
      value: item?.uid,
      key: item?.quantity,
    })
  );
  console.log(option, 'option');
  let filterOption = [];

  option?.medicines?.map((item) =>
    medicineOptionFromSample.push({
      label: item?.medicine_name,
      value: item?.stock_uid,
      key: item?.medicine_quantity,
    })
  );
  const handleBack = () => {
    props.history.push('/app/Sample/ViewSampleTransaction')
  }
  // option.medicines?.map((item) => )
  return (
    <Card>
      <CardBody>
        <Button style={{ backgroundColor: '#0066B3' }} onClick={handleBack}>
          Back
        </Button>
        <CardTitle>Create Sample Transaction</CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>Select to Whom You Want to Assign</Label>

                  <Select
                    required
                    isDisabled={selected === '' ? false : true}
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    onChange={(val) => {
                      setSelected(val);
                    }}
                    options={delaultOptions}
                  />
                </FormGroup>
              </Col>
              {selected?.value === 'SM' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Sales Manager</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          // getSample(val.key);

                          setSampleTransaction({
                            ...sampleTransaction,
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
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Medicine</Label>
                      {loadingMedicine ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          cacheOptions
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionsFromStock}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'RSM' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Sales Manager</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          // getSample(val.key);
                          dispatch(getUsers(val.key, 'rsm'));

                          getStockFromParent(val?.key);
                          //   setTimeout(async() => {
                          //     await console.log(targets[0]?.start_date);
                          //   }, 3000);
                        }}
                        options={salesManagerOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Regional Sales Manager</Label>
                      {loadingRSM ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            setSampleTransaction({
                              ...sampleTransaction,
                              assigned_to_uid: val?.key,
                            });
                          }}
                          options={regionalSalesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Medicine</Label>
                      {loadingStocks ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          cacheOptions
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionFromParentSample}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'AM' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Sales Manager</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          // getSample(val.key);
                          dispatch(getUsers(val.key, 'rsm'));

                          //   setTimeout(async() => {
                          //     await console.log(targets[0]?.start_date);
                          //   }, 3000);
                        }}
                        options={salesManagerOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Regional Sales Manager</Label>
                      {loadingRSM ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            // getSample(val.key);
                            dispatch(getUsers(val.key, 'am'));
                            getStockFromParent(val?.key);

                            // getStockFromParent(val?.key)
                            //   setTimeout(async() => {
                            //     await console.log(targets[0]?.start_date);
                            //   }, 3000);
                          }}
                          options={regionalSalesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Area Manager</Label>
                      {loadingAM ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            setSampleTransaction({
                              ...sampleTransaction,
                              assigned_to_uid: val?.key,
                            });
                            // getSample(val.key);
                            // dispatch(getUsers(val.key, 'sm'));

                            // getStockFromParent(val?.key)
                            //   setTimeout(async() => {
                            //     await console.log(targets[0]?.start_date);
                            //   }, 3000);
                          }}
                          options={areaManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Medicine</Label>
                      {loadingStocks ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          cacheOptions
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionFromParentSample}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'MPO' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Sales Manager</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          // getSample(val.key);
                          dispatch(getUsers(val.key, 'rsm'));

                          //   setTimeout(async() => {
                          //     await console.log(targets[0]?.start_date);
                          //   }, 3000);
                        }}
                        options={salesManagerOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Regional Sales Manager</Label>
                      {loadingRSM ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            // getSample(val.key);
                            dispatch(getUsers(val.key, 'am'));

                            // getStockFromParent(val?.key)
                            //   setTimeout(async() => {
                            //     await console.log(targets[0]?.start_date);
                            //   }, 3000);
                          }}
                          options={regionalSalesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Area Manager</Label>
                      {loadingAM ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            // getSample(val.key);
                            dispatch(getUsers(val.key, 'mpo'));
                            getStockFromParent(val?.key);

                            // getStockFromParent(val?.key)
                            //   setTimeout(async() => {
                            //     await console.log(targets[0]?.start_date);
                            //   }, 3000);
                          }}
                          options={areaManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select MPO</Label>
                      {loadingMPO ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            setSampleTransaction({
                              ...sampleTransaction,
                              assigned_to_uid: val?.key,
                            });
                            // getSample(val.key);
                            // dispatch(getUsers(val.key, 'sm'));

                            // getStockFromParent(val?.key)
                            //   setTimeout(async() => {
                            //     await console.log(targets[0]?.start_date);
                            //   }, 3000);
                          }}
                          options={mpoOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Medicine</Label>
                      {loadingStocks ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066B3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          cacheOptions
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionFromParentSample}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : null}
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
          onClick={AddSampleTransaction}
        >
          <span className="spinner d-inline-block">
            <span className="bounce1" />
            <span className="bounce2" />
            <span className="bounce3" />
          </span>
          <span className="label">Add Sample Transaction</span>
        </Button>
      </CardBody>
    </Card>
  );
}
