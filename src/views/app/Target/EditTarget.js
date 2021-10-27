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
import { ViewDirectorAction } from 'Store/Actions/User/UserActions';
import { getToken } from 'Utils/auth.util';
import axios from 'axios';
import moment from 'moment';
import {
  CreateTargetAction,
  OrderRead,
  EditTargetAction,
  SuspandTargetAction,
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

export default function EditTarget(props) {
  let currentTarget = props?.location?.state;
  const [array, setArray] = useState([]);
  const [target, setTarget] = useState(target_obj);
  const [view, setView] = useState(true);
  const [targets, setTargets] = useState([]);
  const [selected, setSelected] = useState({
    label: 'Director',
    value: 'Director',
    key: 1,
  });
  console.log(selected);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ViewDirectorAction());
    dispatch(OrderRead());
  }, []);

  const director = useSelector((state) => state?.ViewUserReducer?.director);
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

    amount: currentTarget?.amount?.amount,
    medicines: currentTarget?.medicines,
    no_orders: currentTarget?.no_orders?.no_orders,
    no_prescriptions: currentTarget?.no_prescriptions?.no_prescriptions,
    start_date: currentTarget?.start_date,
    by_customer_visits: currentTarget?.by_customer_visits?.by_customer_visits,
    by_doctor_visits: currentTarget?.by_doctor_visits?.by_doctor_visits,
    end_date: currentTarget?.end_date,
  };
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
  const editProfile = () => {
    setView(false);
  };
  const suspandTarget = async () => {
    let res = await dispatch(SuspandTargetAction({ uid: currentTarget?.uid }));
    if (res) {
      NotificationManager.success(
        'Successfully Suspanded',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/Target/ViewTarget');
    }
  };
  const editData = async () => {
    let medi = currentTarget?.medicines;
    let test = { ...target, medicines: medi };

    let apiData = {
      ...test,
      uid:currentTarget?.uid,
      start_date: moment(test?.start_date).format('YYYY-MM-DD h:mm:ss'),
      end_date: moment(test?.end_date).format('YYYY-MM-DD h:mm:ss'),
      no_prescriptions:currentTarget?.no_prescriptions,
      by_customer_visits:currentTarget?.by_customer_visits,
      by_doctor_visits:currentTarget?.by_doctor_visits

    };
    let res = await dispatch(EditTargetAction(apiData))
    if(res){
      NotificationManager.success("Successfully Updated",'Success',5000,null,'')
      props?.history.push('/app/Target/ViewTarget')
    }
  };
  // console.log(currentTarget);
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
                  {view ? (
                    <span>
                      <p>{currentTarget?.assigned_to?.role?.name}</p>
                    </span>
                  ) : (
                    <Select
                      required
                      disabled
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      defaultValue={{
                        label: currentTarget?.assigned_to?.role?.name,
                        value: currentTarget?.assigned_to?.role?.name,
                        key: currentTarget?.assigned_to?.role?.uid,
                      }}
                      name="form-field-name-gender"
                      onChange={(val) => setSelected(val)}
                      options={delaultOptions}
                    />
                  )}
                </FormGroup>
              </Col>

              {selected?.value === 'SM' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Enter Amount" />
                      </Label>
                      {view ? (
                        <span>
                          <p>{currentTarget?.amount?.amount}</p>
                        </span>
                      ) : (
                        <Input
                          name="amount"
                          type="number"
                          defaultValue={currentTarget?.amount?.amount}
                          onChange={(e) =>
                            setTarget({
                              ...target,
                              amount: Number(e.target.value),
                            })
                          }
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Select Director" />
                      </Label>
                      {view ? (
                        <span>
                          <p>{currentTarget?.assigned_to?.name}</p>
                        </span>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          defaultValue={{
                            label: currentTarget?.assigned_to?.name,
                            value: currentTarget?.assigned_to?.name,
                            key: currentTarget?.assigned_to?.uid,
                          }}
                          onChange={async (val) => {
                            setTarget({ ...target, assigned_to_uid: val?.key });
                            await getDirectorTarget(val?.key);

                            //   setTimeout(async() => {
                            //     await console.log(targets[0]?.start_date);
                            //   }, 3000);
                          }}
                          options={directorOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Medicine</Label>
                      {view ? (
                        currentTarget?.medicines?.map((item) => (
                          <span>
                            <p>{item?.name}</p>
                          </span>
                        ))
                      ) : (
                        <Select
                          cacheOptions
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          defaultValue={{
                            label: currentTarget?.medicines?.map(
                              (item) => item?.name
                            ),
                            value: currentTarget?.medicines?.map(
                              (item) => item?.name
                            ),
                            key: currentTarget?.medicines?.map(
                              (item) => item?.medicine_uid
                            ),
                          }}
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
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Orders</Label>
                      {view ? (
                        <span>
                          <p>{currentTarget?.no_orders?.no_orders}</p>
                        </span>
                      ) : (
                        <Input
                          value={target?.no_orders}
                          defaultValue={currentTarget?.no_orders?.no_orders}
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              no_orders: Number(e.target.value),
                            });
                          }}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Prescription</Label>
                      {view ? (
                        <span>
                          <p>
                            {currentTarget?.no_prescriptions?.no_prescriptions}
                          </p>
                        </span>
                      ) : (
                        <Input
                          value={target?.no_prescriptions}
                          defaultValue={
                            currentTarget?.no_prescriptions?.no_prescriptions
                          }
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              no_prescriptions: Number(e.target.value),
                            });
                          }}
                        />
                      )}
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
                      {view ? (
                        <span>
                          <p>{currentTarget?.amount?.amount}</p>
                        </span>
                      ) : (
                        <Input
                          name="amount"
                          type="number"
                          defaultValue={currentTarget?.amount?.amount}
                          onChange={(e) =>
                            setTarget({
                              ...target,
                              amount: Number(e.target.value),
                            })
                          }
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Select Director" />
                      </Label>
                      {view ? (
                        <span>
                          <p>{currentTarget?.assigned_to?.name}</p>
                        </span>
                      ) : (
                        <Select
                          disabled
                          required
                          defaultValue={{
                            label: currentTarget?.assigned_to?.name,
                            value: currentTarget?.assigned_to?.name,
                            key: currentTarget?.assigned_to?.uid,
                          }}
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            setTarget({ ...target, assigned_to_uid: val?.key });
                          }}
                          options={directorOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Medicine</Label>
                      {view ? (
                        currentTarget?.medicines?.map((item) => (
                          <span>
                            <p>{item?.name}</p>
                          </span>
                        ))
                      ) : (
                        <Select
                          cacheOptions
                          closeMenuOnSelect={false}
                          components={animatedComponents}
                          isMulti
                          defaultValue={{
                            label: currentTarget?.medicines?.map(
                              (item) => item?.name
                            ),
                            value: currentTarget?.medicines?.map(
                              (item) => item?.name
                            ),
                            key: currentTarget?.medicines?.map(
                              (item) => item?.medicine_uid
                            ),
                          }}
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionFromOrder}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Start Date</Label>
                      {view ? (
                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.start_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      ) : (
                        <Input
                          type="datetime-local"
                          value={target?.start_date}
                          defaultValue={moment
                            .unix(currentTarget?.start_date)
                            .format('YYYY-MM-DD h:mm:ss')}
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              start_date: e.target.value,
                            });
                          }}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>End Date</Label>
                      {view ? (
                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.end_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      ) : (
                        <Input
                          type="datetime-local"
                          value={target?.end_date}
                          defaultValue={moment
                            .unix(currentTarget?.end_date)
                            .format('YYYY-MM-DD h:mm:ss')}
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              end_date: e.target.value,
                            });
                          }}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>By Customer Visit</Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.by_customer_visits
                                ?.by_customer_visits
                            }
                          </p>
                        </span>
                      ) : (
                        <Input
                          type="number"
                          disabled
                          value={target?.by_customer_visits}
                          defaultValue={
                            currentTarget?.by_customer_visits
                              ?.by_customer_visits
                          }
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              by_customer_visits: e.target.value,
                            });
                          }}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>By Doctor Visit</Label>
                      {view ? (
                        <span>
                          <p>
                            {currentTarget?.by_doctor_visits?.by_doctor_visits}
                          </p>
                        </span>
                      ) : (
                        <Input
                          type="number"
                          disabled
                          value={target?.by_doctor_visits}
                          defaultValue={
                            currentTarget?.by_doctor_visits?.by_doctor_visits
                          }
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              by_doctor_visits: e.target.value,
                            });
                          }}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Orders</Label>
                      {view ? (
                        <span>
                          <p>{currentTarget?.no_orders?.no_orders}</p>
                        </span>
                      ) : (
                        <Input
                          value={target?.no_orders}
                          defaultValue={currentTarget?.no_orders?.no_orders}
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              no_orders: Number(e.target.value),
                            });
                          }}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter No Of Prescription</Label>
                      {view ? (
                        <span>
                          <p>{currentTarget?.no_orders?.no_orders}</p>
                        </span>
                      ) : (
                        <Input
                          value={target?.no_prescriptions}
                          defaultValue={currentTarget?.no_orders?.no_orders}
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              no_prescriptions: Number(e.target.value),
                            });
                          }}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'RSM' ? (
                <p></p>
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

            {view ? (
              <>
                <Button
                  className="btn btn-primary"
                  // type="submit"
                  // className={`btn-shadow btn-multiple-state ${
                  //   loading ? 'show-spinner' : ''
                  // }`}
                  size="sm"
                  onClick={editProfile}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  Edit Profile
                </Button>
                <Button
                  className="btn btn-primary"
                  // type="submit"
                  // className={`btn-shadow btn-multiple-state ${
                  //   loading ? 'show-spinner' : ''
                  // }`}
                  size="sm"
                  onClick={suspandTarget}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  Suspand Target
                </Button>
              </>
            ) : (
              <Button
                className="btn btn-primary"
                // type="submit"
                // className={`btn-shadow btn-multiple-state ${
                //   loading ? 'show-spinner' : ''
                // }`}
                size="sm"
                onClick={editData}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                save
              </Button>
            )}
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
