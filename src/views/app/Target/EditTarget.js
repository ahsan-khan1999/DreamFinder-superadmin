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
  OrderRead,
  EditTargetAction,
  SuspandTargetAction,
  GetDistributionCenter,
} from 'Store/Actions/Target/TargetAction';
import { NotificationManager } from 'components/common/react-notifications';
import { getUsers } from 'Store/Actions/AttendanceActions/AttendanceAction';
import { currentUser } from 'constants/defaultValues';

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
  console.log(currentTarget);
  const [array, setArray] = useState();
  const [loadingSuspand, setLoadingSuspand] = useState(false);
  const [target, setTarget] = useState(target_obj);
  // console.log(target, 'targte');
  const [view, setView] = useState(true);
  const [stocks, setStocks] = useState([]);

  const [targets, setTargets] = useState([]);
  const [currentTargets, setCurrentTargets] = useState([]);
  // console.log(currentTargets,"currentTarget");
  const [selected, setSelected] = useState({
    label: 'Director',
    value: 'Director',
    key: 1,
  });
  // console.log(selected);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDistributionCenter());

    dispatch(ViewDirectorAction());
    dispatch(OrderRead());
    setTarget(target_obj);
    // dispatch(ViewAreaManagerAction());
    // dispatch(ViewSalesManagerManagerAction());
    // dispatch(ViewRegionalSalesManagerManagerAction());
    // dispatch(ViewMPOManagerAction());
  }, []);

  const director = useSelector((state) => state?.ViewUserReducer?.director);
  const order = useSelector((state) => state?.TargetReducer?.order);
  const Mpo = useSelector((state) => state?.ViewUserReducer?.mpo);
  const sm = useSelector((state) => state?.AttendanceReducer?.sm);
  const rsm = useSelector((state) => state?.AttendanceReducer?.rsm);
  const am = useSelector((state) => state?.AttendanceReducer?.am);
  const mpo = useSelector((state) => state?.AttendanceReducer?.mpo);
  const salesManager = useSelector(
    (state) => state?.ViewUserReducer?.salesManager
  );
  const regionalSalesManager = useSelector(
    (state) => state?.ViewUserReducer?.regionalSalesManager
  );
  const areaManager = useSelector(
    (state) => state?.ViewUserReducer?.areaManager
  );
  const distributionCenter = useSelector(
    (state) => state?.TargetReducer?.distributionCenter
  );
  const loading = useSelector((state) => state?.TargetReducer?.loading);
  const distributionCenterOption = [];
  distributionCenter?.map((item) =>
    // console.log(item?.areas[0]?.parent?.name)
    distributionCenterOption.push({
      label: item?.areas[0]?.parent?.name,
      value: item?.areas[0]?.parent?.name,
      key: item?.uid,
    })
  );
  let medicineOptionFromStock = [];
  // console.log(stocks,"stocks");
  stocks?.map((item) =>
    medicineOptionFromStock?.push({
      label: item?.product?.name,
      value: item?.uid,
      key: item?.quantity,
    })
  );

  //   console.log(order);
  let directorOption = [];
  let mpoOption = [];
  mpo?.map((item) =>
    mpoOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  director?.map((item) =>
    directorOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let areaManagerOption = [];
  am?.map((item) =>
    areaManagerOption?.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  let salesManagerOption = [];
  sm?.map((item) =>
    salesManagerOption?.push({
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
  let medicineOption = [];
  let medicineOptionFromOrder = [];
  order?.map((_item) =>
    medicineOptionFromOrder?.push({
      label: _item?.product?.name,
      value: _item?.uid,
      key: _item?.quantity,
    })
  );
  //   console.log(medicineOptionFromOrder);
  // targets?.map((item) =>
  //   item?.medicines?.map((item_) =>
  //     medicineOption.push({
  //       label: item_?.name,
  //       value: item_?.medicine_uid,
  //       key: item_?.quantity,
  //     })
  //   )
  // );
  targets?.map((item) => {
    medicineOption.push({
      label: item?.name,
      value: item?.medicine_uid,
      key: item?.quantity,
    });
  });
  const target_obj = {
    uid: currentTarget?.uid,
    amount: currentTarget?.amount?.amount,
    medicines: currentTarget?.medicines,
    no_orders: currentTarget?.no_orders?.no_orders,
    no_prescriptions: currentTarget?.no_prescriptions?.no_prescriptions,
    start_date: currentTarget?.start_date,
    by_customer_visits: Number(
      currentTarget?.by_customer_visits?.by_customer_visits
    ),
    by_doctor_visits: Number(currentTarget?.by_doctor_visits?.by_doctor_visits),
    end_date: currentTarget?.end_date,
  };
  const getStocks = async (uid) => {
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/stocks/read/medicine?distribution_centre_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );

    setStocks(response?.data?.response_data);
  };
  const getDirectorTarget = async (uid) => {
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/targets/read_stocks?child_uid=${uid}`,
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
    setLoadingSuspand(true);
    let res = await dispatch(SuspandTargetAction({ uid: currentTarget?.uid }));
    if (res) {
      NotificationManager.success(
        'Successfully Suspanded',
        'Success',
        5000,
        null,
        ''
      );
      setLoadingSuspand(false);

      props.history.push('/app/Target/ViewTarget');
    }
  };
  const readCurentTarget = async (uid) => {
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/targets/read_current_target?assigned_to_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );

    setCurrentTargets(response?.data?.response_data);
  };
  let medicineOptionsForChilds = [];
  currentTargets?.medicines?.map((item) =>
    medicineOptionsForChilds.push({
      label: item?.name,
      value: item?.medicine_uid,
      key: item?.quantity,
    })
  );
  // console.log(medicineOptionsForChilds, 'curent Tragte');
  const editData = async () => {
    // console.log(array,"arrayu tyest");
    if (array === undefined) {
      let apiData = {
        ...target,
        start_date: moment
          .unix(currentTarget?.start_date)
          .format('YYYY-MM-DD h:mm:ss'),
        end_date: moment
          .unix(currentTarget?.end_date)
          .format('YYYY-MM-DD h:mm:ss'),
      };
      let res = await dispatch(EditTargetAction(apiData));

      if (res) {
        NotificationManager.success(
          'Successfully Updated',
          'Success',
          5000,
          null,
          ''
        );
        props?.history.push('/app/Target/ViewTarget');
      }
    } else {
      // console.log(currentTarget);
      let medi = currentTarget?.medicines;
      let test = { ...target, medicines: medi };
      let apiData = {
        // ...test,
        uid: currentTarget?.uid,
        start_date: moment
          .unix(currentTarget?.start_date)
          .format('YYYY-MM-DD h:mm:ss'),
        end_date: moment
          .unix(currentTarget?.end_date)
          .format('YYYY-MM-DD h:mm:ss'),
        no_prescriptions: target?.no_prescriptions,
        by_customer_visits: target?.by_customer_visits,
        by_doctor_visits: target?.by_doctor_visits,
        amount: target?.amount,
        no_orders: target?.no_orders,
        // medicines:currentTarget?.medicines,
        medicines: array?.map((item) => {
          return {
            medicine_uid: item?.medicine_uid,
            quantity: item?.quantity,
          };
        }),
      };

      // console.log(apiData);
      let res = await dispatch(EditTargetAction(apiData));

      if (res) {
        NotificationManager.success(
          'Successfully Updated',
          'Success',
          5000,
          null,
          ''
        );
        props?.history.push('/app/Target/ViewTarget');
      }
    }
  };
  const handleBack = () => {
    props.history.push('/app/Target/ViewTarget');
  };

  return (
    <Card>
      <CardBody>
        <Button style={{ backgroundColor: '#0066B3' }} onClick={handleBack}>
          Back
        </Button>
        <CardTitle>
          View Target
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              {/* <Col lg={6}>
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
              </Col> */}

              {currentTarget?.assigned_to?.role?.category?.name === 'sm' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Enter Amount
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
                        Select Director
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                .name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          disabled
                          required
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                .name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                .name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager.uid,
                          }}
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'sm'));
                            readCurentTarget(val?.key);
                          }}
                          options={directorOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Select Sales Manager
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
                            getDirectorTarget(val?.key);

                            setTarget({ ...target, assigned_to_uid: val?.key });
                            // await getDirectorTarget(val?.key);

                            //   setTimeout(async() => {
                            //     await console.log(targets[0]?.start_date);
                            //   }, 3000);
                          }}
                          options={salesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>

                  {/* <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <IntlMessages id="Select Distribtion Center" />
                      </Label>
                      {view ? (
                        <span>
                          <p>{}</p>
                        </span>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            // setTarget({ ...target, assigned_to_uid: val?.key });
                            // console.log(val);
                            getStocks(val?.key);
                          }}
                          options={distributionCenterOption}
                        />
                      )}
                    </FormGroup>
                  </Col> */}
                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>Start Date</Label>

                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.start_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}

                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>Start Date</Label>

                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.end_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}

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
                          defaultValue={currentTarget?.medicines?.map(
                            (item) => {
                              return {
                                label: item?.name,
                                value: item?.medicine_uid,
                                key: item?.quantity,
                              };
                            }
                          )}
                          isMulti
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                            // getDirectorTarget(val?.key);
                            // setTarget({
                            //   ...target,
                            //   start_date: moment
                            //     .unix(targets[0]?.start_date)
                            //     .format('YYYY-MM-DD h:mm:ss'),
                            // });
                          }}
                          options={medicineOption}
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
                          value={target?.by_customer_visits}
                          defaultValue={
                            currentTarget?.by_customer_visits
                              ?.by_customer_visits
                          }
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              by_customer_visits: Number(e.target.value),
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
                          value={target?.by_doctor_visits}
                          defaultValue={
                            currentTarget?.by_doctor_visits?.by_doctor_visits
                          }
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              by_doctor_visits: Number(e.target.value),
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
              ) : currentTarget?.assigned_to?.role?.category?.name ===
                'director' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Enter Amount
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
                        Select Director
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
                      {view ? (
                        // <span>
                        //   <p>{}</p>
                        // </span>
                        <></>
                      ) : (
                        <>
                          <Label>
                            Select Distribtion Center
                          </Label>
                          <Select
                            required
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            defaultValue={{}}
                            name="form-field-name-gender"
                            onChange={async (val) => {
                              // setTarget({ ...target, assigned_to_uid: val?.key });
                              // console.log(val);
                              getStocks(val?.key);
                            }}
                            options={distributionCenterOption}
                          />
                        </>
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
                          defaultValue={currentTarget?.medicines?.map(
                            (item) => {
                              return {
                                label: item?.name,
                                value: item?.medicine_uid,
                                key: item?.quantity,
                              };
                            }
                          )}
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionFromStock}
                        />
                      )}
                    </FormGroup>
                  </Col>

                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>Start Date</Label>

                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.start_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}

                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>Start Date</Label>

                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.end_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}
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
              ) : currentTarget?.assigned_to?.role?.category?.name === 'rsm' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Enter Amount
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
                        Select Director
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          disabled
                          required
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager?.field_staff?.manager?.uid,
                          }}
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'sm'));
                          }}
                          options={directorOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Select Sales Manager
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                .name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          required
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                .name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                .name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager.uid,
                          }}
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'rsm'));
                            // getParentTarget(val?.key)
                            readCurentTarget(val?.key);

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
                      <Label>
                        Select Regional Sales Manager
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
                          defaultValue={{
                            label: currentTarget?.assigned_to?.name,
                            value: currentTarget?.assigned_to?.name,
                            key: currentTarget?.assigned_to?.uid,
                          }}
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            setTarget({ ...target, assigned_to_uid: val?.key });
                            await getDirectorTarget(val?.key);
                          }}
                          options={regionalSalesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>Start Date</Label>
                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.start_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>End Date</Label>
                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.end_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}

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
                          defaultValue={currentTarget?.medicines?.map(
                            (item) => {
                              return {
                                label: item?.name,
                                value: item?.medicine_uid,
                                key: item?.quantity,
                              };
                            }
                          )}
                          components={animatedComponents}
                          isMulti
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);

                           
                          }}
                          options={medicineOption}
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
                          value={target?.by_customer_visits}
                          defaultValue={
                            currentTarget?.by_customer_visits
                              ?.by_customer_visits
                          }
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              by_customer_visits: Number(e.target.value),
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
                          value={target?.by_doctor_visits}
                          defaultValue={
                            currentTarget?.by_doctor_visits?.by_doctor_visits
                          }
                          onChange={(e) => {
                            setTarget({
                              ...target,
                              by_doctor_visits: Number(e.target.value),
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
              ) : currentTarget?.assigned_to?.role?.category?.name === 'am' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Enter Amount
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
                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>Start Date</Label>
                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.start_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>End Date</Label>
                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.end_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}

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
                      <Label>
                        Select Director
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.field_staff?.manager
                                ?.name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          disabled
                          required
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.field_staff?.manager
                                ?.name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.field_staff?.manager
                                ?.name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager?.field_staff?.manager?.field_staff
                              ?.manager?.uid,
                          }}
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'sm'));
                          }}
                          options={directorOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Select Sales Manager
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager.name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          required
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager.name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager.name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager?.field_staff?.manager.uid,
                          }}
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'rsm'));
                            // getParentTarget(val?.key)
                            // readCurentTarget(val?.key);

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
                      <Label>
                        Select Regional Sales Manager
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                .name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                .name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                .name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager.uid,
                          }}
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'rsm'));

                            readCurentTarget(val?.key);

                            // await getDirectorTarget(val?.key);
                          }}
                          options={regionalSalesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Select Area Manager
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
                          defaultValue={{
                            label: currentTarget?.assigned_to?.name,
                            value: currentTarget?.assigned_to?.name,
                            key: currentTarget?.assigned_to?.uid,
                          }}
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            setTarget({ ...target, assigned_to_uid: val?.key });
                            await getDirectorTarget(val?.key);
                          }}
                          options={areaManagerOption}
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
                          defaultValue={currentTarget?.medicines?.map(
                            (item) => {
                              return {
                                label: item?.name,
                                value: item?.medicine_uid,
                                key: item?.quantity,
                              };
                            }
                          )}
                          components={animatedComponents}
                          isMulti
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);

                            // setTarget({
                            //   ...target,
                            //   start_date: moment
                            //     .unix(targets[0]?.start_date)
                            //     .format('YYYY-MM-DD h:mm:ss'),
                            // });
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
              ) : currentTarget?.assigned_to?.role?.category?.name === 'mpo' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Enter Amount
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

                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>Start Date</Label>
                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.start_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}
                  {view ? (
                    <Col lg={6}>
                      <FormGroup>
                        <Label>End Date</Label>
                        <span>
                          <p>
                            {moment
                              .unix(currentTarget?.end_date)
                              .format('YYYY-MM-DD h:mm:ss')}
                          </p>
                        </span>
                      </FormGroup>
                    </Col>
                  ) : null}

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
                      <Label>
                        Select Director
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.field_staff?.manager
                                ?.field_staff?.manager?.name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          disabled
                          required
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.field_staff?.manager
                                ?.field_staff?.manager?.name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.field_staff?.manager
                                ?.field_staff?.manager?.name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager?.field_staff?.manager?.field_staff
                              ?.manager?.field_staff?.manager?.uid,
                          }}
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'sm'));
                          }}
                          options={directorOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Select Sales Manager
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.field_staff?.manager
                                ?.name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          required
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.field_staff?.manager
                                ?.name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.field_staff?.manager
                                ?.name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager?.field_staff?.manager?.field_staff
                              ?.manager?.uid,
                          }}
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'rsm'));
                            // getParentTarget(val?.key)
                            // readCurentTarget(val?.key);

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
                      <Label>
                        Select Regional Sales Manager
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.field_staff?.manager?.name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager?.field_staff?.manager?.uid,
                          }}
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'am'));

                            // await getDirectorTarget(val?.key);
                          }}
                          options={regionalSalesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Select Area Manager
                      </Label>
                      {view ? (
                        <span>
                          <p>
                            {
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.name
                            }
                          </p>
                        </span>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          defaultValue={{
                            label:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.name,
                            value:
                              currentTarget?.assigned_to?.field_staff?.manager
                                ?.name,
                            key: currentTarget?.assigned_to?.field_staff
                              ?.manager?.uid,
                          }}
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            dispatch(getUsers(val.key, 'mpo'));

                            readCurentTarget(val?.key);

                            // await getDirectorTarget(val?.key);
                          }}
                          options={areaManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        Select MPO
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
                          }}
                          options={mpoOption}
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
                          defaultValue={currentTarget?.medicines?.map(
                            (item) => {
                              return {
                                label: item?.name,
                                value: item?.medicine_uid,
                                key: item?.quantity,
                              };
                            }
                          )}
                          components={animatedComponents}
                          isMulti
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);

                            // setTarget({
                            //   ...target,
                            //   start_date: moment
                            //     .unix(targets[0]?.start_date)
                            //     .format('YYYY-MM-DD h:mm:ss'),
                            // });
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
              ) : (
                <p></p>
              )}
            </Row>
            {array === undefined ? (
              <Row>
                <Col xl={12}>
                  <FormGroup>
                    <div className="table-form">
                      <Table>
                        <thead>
                          <tr>
                            <th>Medicine Products</th>
                            <th>Available Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentTarget?.medicines?.map((item, index) => {
                            return (
                              <tr>
                                <td>{item?.name}</td>

                                <td>{item?.quantity}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            ) : !view ? (
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
            ) : null}

            {view ? (
              <>
                <Button
                  // className="btn btn-primary"
                  style={{ backgroundColor: '#0066B3', marginRight: '5px' }}
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
                  Edit Target
                </Button>
                <Button
                  // className="btn btn-primary"
                  style={{ backgroundColor: '#0066B3' }}
                  // type="submit"
                  className={`btn-shadow btn-multiple-state ${
                    loadingSuspand ? 'show-spinner' : ''
                  }`}
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
                // className="btn btn-primary"
                // type="submit"
                style={{ backgroundColor: '#0066B3' }}
              disabled={loading ? true : false}

                className={`btn-shadow btn-multiple-state ${
                  loading ? 'show-spinner' : ''
                }`}
                size="sm"
                onClick={editData}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                Save
              </span>
                
              </Button>
            )}
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
