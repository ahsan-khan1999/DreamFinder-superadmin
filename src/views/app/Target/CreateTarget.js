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
  ViewSalesManagerManagerAction,
} from 'Store/Actions/User/UserActions';
import { getToken } from 'Utils/auth.util';
import axios from 'axios';
import moment from 'moment';
import {
  CreateTargetAction,
  OrderRead,
} from 'Store/Actions/Target/TargetAction';
import { NotificationManager } from 'components/common/react-notifications';

const animatedComponents = makeAnimated();
const delaultOptions = [
  { label: 'Director', value: 'Director', key: 1 },
  { label: 'SM', value: 'SM', key: 2 },
  { label: 'RSM', value: 'RSM', key: 3 },

  { label: 'AM', value: 'AM', key: 4 },
  { label: 'MPO', value: 'MPO', key: 5 },
];
export default function CreateTarget(props) {
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(target_obj);

  const [targets, setTargets] = useState([]);
  const [selected, setSelected] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ViewDirectorAction());
    dispatch(OrderRead());
    dispatch(ViewAreaManagerAction());
    dispatch(ViewSalesManagerManagerAction());
  }, []);

  const director = useSelector((state) => state?.ViewUserReducer?.director);
  const salesManager = useSelector(
    (state) => state?.ViewUserReducer?.salesManager
  );

  const areaManager = useSelector(
    (state) => state?.ViewUserReducer?.areaManager
  );

  const order = useSelector((state) => state?.TargetReducer?.order);
  //   console.log(order);
  let directorOption = [];
  director?.map((item) =>
    directorOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let areaManagerOption = [];
  areaManager?.map((item) =>
    areaManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let salesManagerOption = [];
  salesManager?.map((item) =>
    salesManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let medicineOption = [];
  let medicineOptionFromOrder = [];
  order?.map((item) =>
    item?.medicines?.map((_item) =>
      medicineOptionFromOrder?.push({
        label: _item?.name,
        value: _item?.medicine_uid,
        key: _item?.quantity,
      })
    )
  );
  //   console.log(medicineOptionFromOrder);
  targets?.map((item) =>
    item?.medicines?.map((item_) =>
      medicineOption.push({
        label: item_?.name,
        value: item_?.medicine_uid,
        key: item_?.quantity,
      })
    )
  );
  const target_obj = {
    assigned_to_uid: selected,

    amount: '',
    medicines: [],
    no_orders: '',
    no_prescriptions: '',
    start_date: '',
    by_customer_visits: '',
    by_doctor_visits: '',
    end_date: '',
  };
  //   console.log(target);
  const getDirectorTarget = async (uid) => {
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/targets/read?assigned_to_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );

    setTargets(response?.data?.response_data);
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
    await setTarget({
      ...target,
      medicines: array?.map((item) => {
        return {
          medicine_uid: item?.medicine_uid,
          quantity: item?.quantity,
        };
      }),
    });
  };
  const onTargetCreate = async () => {
    if (selected?.value === 'Director') {
      let startDate = moment(target?.start_date).format('YYYY-MM-DD h:mm:ss');
      let endDate = moment(target?.end_date).format('YYYY-MM-DD h:mm:ss');
      let apiData = {
        ...target,
        start_date: startDate,
        end_date: endDate,
        //   end_date: moment.unix(target?.end_date).format('YYYY-MM-DD h:mm:ss'),
        //   by_customer_visits: targets[0]?.by_customer_visits,
        //   by_doctor_visits: targets[0]?.by_doctor_visits,
      };

      let res = await dispatch(CreateTargetAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        props.history.push('/app/Target/ViewTarget');
      }
    } else if (selected?.value === 'SM') {
      let startDate = moment(target?.start_date).format('YYYY-MM-DD h:mm:ss');
      let endDate = moment(target?.end_date).format('YYYY-MM-DD h:mm:ss');
      let apiData = {
        ...target,
        start_date: startDate,
        end_date: endDate,
        by_customer_visits: targets[0]?.by_customer_visits,
        by_doctor_visits: targets[0]?.by_doctor_visits,
      };
      let res = await dispatch(CreateTargetAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        props.history.push('/app/Target/ViewTarget');
      }
    } else if (selected?.value === 'RSM') {
      let startDate = moment(target?.start_date).format('YYYY-MM-DD h:mm:ss');
      let endDate = moment(target?.end_date).format('YYYY-MM-DD h:mm:ss');
      let apiData = {
        ...target,
        start_date: startDate,
        end_date: endDate,
        by_customer_visits: targets[0]?.by_customer_visits,
        by_doctor_visits: targets[0]?.by_doctor_visits,
      };
      let res = await dispatch(CreateTargetAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        props.history.push('/app/Target/ViewTarget');
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Target" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select to Whom You Want to Assign" />
                  </Label>

                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    onChange={(val) => setSelected(val)}
                    options={delaultOptions}
                  />
                </FormGroup>
              </Col>

              {selected?.value === 'SM' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Enter Amount" />
                      </Label>

                      <Input
                        name="amount"
                        type="number"
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            amount: Number(e.target.value),
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Select Director" />
                      </Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          setTarget({ ...target, assigned_to_uid: val?.key });

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
                      <Label>
                        <IntlMessages id="Select Director" />
                      </Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          await getDirectorTarget(val?.key);
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
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

                          setTarget({
                            ...target,
                            start_date: moment
                              .unix(targets[0]?.start_date)
                              .format('YYYY-MM-DD h:mm:ss'),
                          });
                        }}
                        options={medicineOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Orders</Label>
                      <Input
                        value={target?.no_orders}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            no_orders: Number(e.target.value),
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Prescription</Label>
                      <Input
                        value={target?.no_prescriptions}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            no_prescriptions: Number(e.target.value),
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'Director' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Enter Amount" />
                      </Label>

                      <Input
                        name="amount"
                        type="number"
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            amount: Number(e.target.value),
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Select Director" />
                      </Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          setTarget({ ...target, assigned_to_uid: val?.key });
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
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
                        }}
                        options={medicineOptionFromOrder}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Start Date</Label>
                      <Input
                        type="datetime-local"
                        value={target?.start_date}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            start_date: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>End Date</Label>
                      <Input
                        type="datetime-local"
                        value={target?.end_date}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            end_date: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>By Customer Visit</Label>
                      <Input
                        type="number"
                        value={target?.by_customer_visits}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            by_customer_visits: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>By Doctor Visit</Label>
                      <Input
                        type="number"
                        value={target?.by_doctor_visits}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            by_doctor_visits: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Orders</Label>
                      <Input
                        value={target?.no_orders}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            no_orders: Number(e.target.value),
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Prescription</Label>
                      <Input
                        value={target?.no_prescriptions}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            no_prescriptions: Number(e.target.value),
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'RSM' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Enter Amount" />
                      </Label>

                      <Input
                        name="amount"
                        type="number"
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            amount: Number(e.target.value),
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
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
                          setTarget({ ...target, assigned_to_uid: val?.key });
                          await getDirectorTarget(val?.key);
                        }}
                        options={salesManagerOption}
                      />
                    </FormGroup>
                  </Col>
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

                          setTarget({
                            ...target,
                            start_date: moment
                              .unix(targets[0]?.start_date)
                              .format('YYYY-MM-DD h:mm:ss'),
                          });
                        }}
                        options={medicineOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Orders</Label>
                      <Input
                        value={target?.no_orders}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            no_orders: Number(e.target.value),
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Prescription</Label>
                      <Input
                        value={target?.no_prescriptions}
                        onChange={(e) => {
                          setTarget({
                            ...target,
                            no_prescriptions: Number(e.target.value),
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'AM' ? (
                <p></p>
              ) : selected?.value === 'MPO' ? (
                <p></p>
              ) : (
                <p></p>
              )}
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
              className="btn btn-primary"
              // type="submit"
              // className={`btn-shadow btn-multiple-state ${
              //   loading ? 'show-spinner' : ''
              // }`}
              size="sm"
              onClick={onTargetCreate}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              Add Admin
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
