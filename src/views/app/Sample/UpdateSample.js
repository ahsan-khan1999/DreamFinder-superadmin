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

import {
  CreateSampleAction,
  SuspandSampleAction,
  UpdateSampleAction,
} from 'Store/Actions/SampleAction/SampleAction';

export default function UpdateSample(props) {
  let currentSample = props?.location?.state;
  console.log(currentSample);
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSuspand, setLoadingSuspand] = useState(false);

  const [view, setView] = useState(true);

  const [stock, setStock] = useState([]);

  const dispatch = useDispatch();
  const [sample, setSample] = useState(sampleObj);
  useEffect(() => {
    dispatch(ViewDirectorAction());
  }, []);
  let medicineOptionFromStock = [];
  stock?.map((item) =>
    medicineOptionFromStock?.push({
      label: item?.product?.name,
      value: item?.uid,
      key: item?.quantity,
    })
  );
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
    uid: currentSample?.uid,
    assigned_to_uid: '',
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
  const editSample = async () => {
    setLoading(true);

    let apiData = {
      uid: currentSample?.uid,
      ...sample,
    };
    let res = await dispatch(UpdateSampleAction(apiData));
    if (res) {
      NotificationManager.success(
        'Successfully Edit',
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
  const editProfile = () => {
    setView(false);
  };
  const handleBack = () => {
    props.history.push('/app/Sample/ViewSample');
  };
  const suspandSample = async () => {
    setLoadingSuspand(true);
    let res = await dispatch(SuspandSampleAction({ uid: currentSample?.uid }));
    if (res) {
      NotificationManager.success(
        'Successfully Suspanded',
        'Success',
        5000,
        null,
        ''
      );
      setLoadingSuspand(false);

      props.history.push('/app/Sample/ViewSample');
    } else {
      setLoadingSuspand(false);
    }
  };
  return (
    <Card>
      <CardBody>
        <Button
        style={{backgroundColor:"#0066B3"}}
        onClick={handleBack} style={{ marginTop: '10px' }}>
          Back
        </Button>
        <CardTitle>
          <IntlMessages id="View Sample" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Manager Name" />
                  </Label>
                  {view ? (
                    <span>
                      <p>
                        {currentSample?.assigned_to?.field_staff?.manager?.name}
                      </p>
                    </span>
                  ) : (
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      defaultValue={{
                        label:
                          currentSample?.assigned_to?.field_staff?.manager
                            ?.name,
                        value:
                          currentSample?.assigned_to?.field_staff?.manager
                            ?.name,
                        key: currentSample?.assigned_to?.field_staff?.manager
                          ?.uid,
                      }}
                      classNamePrefix="react-select"
                      name="form-field-name-gender"
                      onChange={async (val) => {
                        dispatch(getUsers(val.key, 'sm'));

                        //   await getDirectorTarget(val?.key);
                      }}
                      options={directorOption}
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Assigned To Name" />
                  </Label>
                  {view ? (
                    <span>
                      <p>{currentSample?.assigned_to?.name}</p>
                    </span>
                  ) : (
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      defaultValue={{
                        label: currentSample?.assigned_to?.name,
                        value: currentSample?.assigned_to?.name,
                        key: currentSample?.assigned_to?.uid,
                      }}
                      name="form-field-name-gender"
                      onChange={async (val) => {
                        setSample({ ...sample, assigned_to_uid: val?.key });
                        getStocksMedicine(val.key);
                        //   setTimeout(async() => {
                        //     await console.log(targets[0]?.start_date);
                        //   }, 3000);
                      }}
                      options={salesManagerOption}
                    />
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>Select Medicine</Label>
                  {view ? (
                    currentSample?.medicines?.map((item) => (
                      <span>
                        <p>{item?.medicine_name}</p>
                      </span>
                    ))
                  ) : (
                    <Select
                      cacheOptions
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      isMulti
                      defaultValue={{
                        label: currentSample?.medicines?.map(
                          (item) => item?.medicine_name
                        ),
                        value: currentSample?.medicines?.map(
                          (item) => item?.medicine_name
                        ),
                        key: currentSample?.medicines?.map(
                          (item) => item?.medicine_quantity
                        ),
                      }}
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
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>
            {view ? (
              ''
            ) : (
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
            )}
          </Form>
        </Formik>

        {view ? (
          <Button
          style={{backgroundColor:"#0066B3"}}
          onClick={editProfile}>Edit Sample</Button>
        ) : (
          <Button
          style={{backgroundColor:"#0066B3"}}
            className={`btn-shadow btn-multiple-state ${
              loading ? 'show-spinner' : ''
            }`}
            onClick={editSample}
          >
            Save
          </Button>
        )}
        <Button
        style={{backgroundColor:"#0066B3"}}
          className={`btn-shadow btn-multiple-state ${
            loading ? 'show-spinner' : ''
          }`}
          onClick={suspandSample}
        >
          Suspand Sample
        </Button>
      </CardBody>
    </Card>
  );
}
