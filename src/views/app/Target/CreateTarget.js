/* eslint-disable */

import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { React, useEffect, useState, useRef } from 'react';
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
import { getToken, getUser } from 'Utils/auth.util';
import axios from 'axios';
import moment from 'moment';
import {
  CreateTargetAction,
  GetDistributionCenter,
  OrderRead,
} from 'Store/Actions/Target/TargetAction';
import { NotificationManager } from 'components/common/react-notifications';
import { getUsers } from 'Store/Actions/AttendanceActions/AttendanceAction';
import Loader from 'react-loader-spinner';

const animatedComponents = makeAnimated();
const delaultOptions = [
  { label: 'Director', value: 'Director', key: 1 },
  { label: 'SM', value: 'SM', key: 2 },
  { label: 'RSM', value: 'RSM', key: 3 },

  { label: 'AM', value: 'AM', key: 4 },
  { label: 'MPO', value: 'MPO', key: 5 },
];
export default function CreateTarget(props) {
  const selectInputRef = useRef();
  const [array, setArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [readTarget, setReadTarget] = useState({});
  const onClear = () => {
    selectInputRef.current.setValue([], '');
  };
  const [targets, setTargets] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [selected, setSelected] = useState('');
  const target_obj = {
    assigned_to_uid: selected,

    amount: '',
    medicines: '',
    no_orders: '',
    no_prescriptions: '',
    start_date: '',
    by_customer_visits: '',
    by_doctor_visits: '',
    end_date: '',
  };
  const [target, setTarget] = useState(target_obj);

  const [selectedMedicine, setSelectedMedicine] = useState('');
  const loadingSM = useSelector((state) => state?.AttendanceReducer?.loadingSm);
  const loadingAM = useSelector((state) => state?.AttendanceReducer?.loadingAm);
  const loadingRSM = useSelector(
    (state) => state?.AttendanceReducer?.loadingRsm
  );
  const loadingMPO = useSelector(
    (state) => state?.AttendanceReducer?.loadingMpo
  );
  const sm = useSelector((state) => state?.AttendanceReducer?.sm);
  const rsm = useSelector((state) => state?.AttendanceReducer?.rsm);
  const am = useSelector((state) => state?.AttendanceReducer?.am);
  const mpo = useSelector((state) => state?.AttendanceReducer?.mpo);
  let [loadingMedicine, setLoadingMedicine] = useState(false);
  let [loadingStocks, setLoadingStocks] = useState(false);

  const clearState = () => {
    setTarget(target_obj_initial);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetDistributionCenter());

    dispatch(ViewDirectorAction());
  }, []);

  const director = useSelector((state) => state?.ViewUserReducer?.director);
  
  const distributionCenter = useSelector(
    (state) => state?.TargetReducer?.distributionCenter
  );
  const distributionCenterOption = [];
  distributionCenter?.map((item) =>
    distributionCenterOption.push({
      label: item?.name,
      value: item?.name,
      key: item?.uid,
    })
  );
  // console.log(distributionCenterOption);

  const order = useSelector((state) => state?.TargetReducer?.order);
  let directorOption = [];
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
  let mpoOption = [];
  mpo?.map((item) =>
    mpoOption?.push({
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
  let medicineOptionFromStock = [];
  stocks?.map((item) =>
    medicineOptionFromStock?.push({
      label: item?.product?.name,
      value: item?.uid,
      key: item?.quantity,
    })
  );

  // console.log(targets);
  targets?.map(
    (item) =>
      medicineOption.push({
        label: item?.name,
        value: item?.medicine_uid,
        key: item?.quantity,
      })
    // item?.medicines?.map((item_) =>
    //   medicineOption.push({
    //     label: item_?.name,
    //     value: item_?.medicine_uid,
    //     key: item_?.quantity,
    //   })
    // )
  );
  const target_obj_initial = {
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
  const getStocks = async (uid) => {
    setLoadingStocks(true);
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/stocks/read/medicine?distribution_center_uid=${uid}`,
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );
    setLoadingStocks(false);

    setStocks(response?.data?.response_data);
  };
  const getParentTarget = async (uid) => {
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/targets/read_current_target?assigned_to_uid=${uid}`,

      // /${user}?manager_uid=${uid}
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );

    setReadTarget(response?.data?.response_data);
  };
  // console.log(readTarget,"parent Sm Target");
  const getDirectorTarget = async (uid) => {
    setLoadingMedicine(true);
    let token = await getToken();
    const response = await axios.get(
      // `https://concord-backend-m2.herokuapp.com/api/targets/read?manager_uid=${uid}`,
      `https://concord-backend-m2.herokuapp.com/api/targets/read_stocks?child_uid=${uid}`,

      // /${user}?manager_uid=${uid}
      {
        headers: {
          x_session_key: token.token,
          x_session_type: token.type,
        },
      }
    );
    setLoadingMedicine(false);

    setTargets(response?.data?.response_data);
  };
  // console.log(readTarget,"target");
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
  // console.log(readTarsget,"read");

  const onTargetCreate = async () => {
    setLoading(true);
    if (selected?.value === 'Director') {
      let startDate = moment(target?.start_date).format('YYYY-MM-DD h:mm:ss');
      let endDate = moment(target?.end_date).format('YYYY-MM-DD h:mm:ss');
      let apiData = {
        ...target,
        start_date: startDate,
        end_date: endDate,
        medicines: array?.map((item) => {
          return {
            medicine_uid: item?.medicine_uid,
            quantity: item?.quantity,
          };
        }),
        no_orders: target?.no_orders,
        no_prescriptions: target?.no_prescriptions,
        by_customer_visits: Number(target?.by_customer_visits),
        by_doctor_visits: Number(target?.by_doctor_visits),
      };
      if (
        target?.by_customer_visits === undefined ||
        target?.by_doctor_visits === undefined ||
        target?.no_orders === undefined ||
        target?.no_prescriptions === undefined ||
        target?.medicines === [] ||
        target?.medicines?.length === 0
      ) {
        NotificationManager.error('Enter Details', 'Error', 5000, null, '');
      } else {
        let res = await dispatch(CreateTargetAction(apiData));
        if (res) {
          NotificationManager.success(
            'Successfully Created',
            'Success',
            5000,
            null,
            ''
          );
          setLoading(false);

          props.history.push('/app/Target/ViewTarget');
        }
      }
    } else if (selected?.value === 'SM') {
      // console.log(targets);
      // console.log(targe);
      let startDate = moment
        .unix(readTarget?.start_date)
        .format('YYYY-MM-DD h:mm:ss');
      let endDate = moment
        .unix(readTarget?.end_date)
        .format('YYYY-MM-DD h:mm:ss');
      let apiData = {
        ...target,
        start_date: startDate,
        end_date: endDate,
        // by_customer_visits: targets[0]?.by_customer_visits,
        // by_doctor_visits: targets[0]?.by_doctor_visits,
        medicines: array?.map((item) => {
          return {
            medicine_uid: item?.medicine_uid,
            quantity: item?.quantity,
          };
        }),
        no_orders: target?.no_orders,
        no_prescriptions: target?.no_prescriptions,
        by_customer_visits: Number(target?.by_customer_visits),
        by_doctor_visits: Number(target?.by_doctor_visits),
      };
      if (
        target?.by_customer_visits === undefined ||
        target?.by_doctor_visits === undefined ||
        target?.no_orders === undefined ||
        target?.no_prescriptions === undefined ||
        target?.medicines === [] ||
        target?.medicines?.length === 0
      ) {
        NotificationManager.error('Enter Details', 'Error', 5000, null, '');
      } else {
        let res = await dispatch(CreateTargetAction(apiData));
        if (res) {
          NotificationManager.success(
            'Successfully Created',
            'Success',
            5000,
            null,
            ''
          );
          setLoading(false);

          props.history.push('/app/Target/ViewTarget');
        }
      }
    } else if (selected?.value === 'RSM') {
      let startDate = moment
        .unix(readTarget?.start_date)
        .format('YYYY-MM-DD h:mm:ss');
      let endDate = moment
        .unix(readTarget?.end_date)
        .format('YYYY-MM-DD h:mm:ss');
      let apiData = {
        ...target,
        start_date: startDate,
        end_date: endDate,
        medicines: array?.map((item) => {
          return {
            medicine_uid: item?.medicine_uid,
            quantity: item?.quantity,
          };
        }),
        no_orders: target?.no_orders,
        no_prescriptions: target?.no_prescriptions,
        by_customer_visits: Number(target?.by_customer_visits),
        by_doctor_visits: Number(target?.by_doctor_visits),
        // by_customer_visits: targets[0]?.by_customer_visits,
        // by_doctor_visits: targets[0]?.by_doctor_visits,
      };
      if (
        target?.by_customer_visits === undefined ||
        target?.by_doctor_visits === undefined ||
        target?.no_orders === undefined ||
        target?.no_prescriptions === undefined ||
        target?.medicines === [] ||
        target?.medicines?.length === 0 ||
        target?.medicines === ''
      ) {
        NotificationManager.error('Enter Details', 'Error', 5000, null, '');
      } else {
        let res = await dispatch(CreateTargetAction(apiData));
        if (res) {
          NotificationManager.success(
            'Successfully Created',
            'Success',
            5000,
            null,
            ''
          );
          setLoading(false);

          props.history.push('/app/Target/ViewTarget');
        }
      }
    } else if (selected?.value === 'AM') {
      let startDate = moment
        .unix(readTarget?.start_date)
        .format('YYYY-MM-DD h:mm:ss');
      let endDate = moment
        .unix(readTarget?.end_date)
        .format('YYYY-MM-DD h:mm:ss');
      let apiData = {
        ...target,
        start_date: startDate,
        end_date: endDate,
        medicines: array?.map((item) => {
          return {
            medicine_uid: item?.medicine_uid,
            quantity: item?.quantity,
          };
        }),
        no_orders: target?.no_orders,
        no_prescriptions: target?.no_prescriptions,
        by_customer_visits: Number(target?.by_customer_visits),
        by_doctor_visits: Number(target?.by_doctor_visits),
      };
      if (
        target?.by_customer_visits === undefined ||
        target?.by_doctor_visits === undefined ||
        target?.no_orders === undefined ||
        target?.no_prescriptions === undefined ||
        target?.medicines === [] ||
        target?.medicines?.length === 0
      ) {
        NotificationManager.error('Enter Details', 'Error', 5000, null, '');
      } else {
        let res = await dispatch(CreateTargetAction(apiData));
        if (res) {
          NotificationManager.success(
            'Successfully Created',
            'Success',
            5000,
            null,
            ''
          );
          setLoading(false);

          props.history.push('/app/Target/ViewTarget');
        }
      }
    } else if (selected?.value === 'MPO') {
      let startDate = moment
        .unix(readTarget?.start_date)
        .format('YYYY-MM-DD h:mm:ss');
      let endDate = moment
        .unix(readTarget?.end_date)
        .format('YYYY-MM-DD h:mm:ss');
      let apiData = {
        ...target,
        start_date: startDate,
        end_date: endDate,
        medicines: array?.map((item) => {
          return {
            medicine_uid: item?.medicine_uid,
            quantity:
              item?.quantity === undefined
                ? NotificationManager.error(
                    'Enter Quantity',
                    'Error',
                    5000,
                    null,
                    ''
                  )
                : item?.quantity,
          };
        }),
        no_orders: target?.no_orders,
        no_prescriptions: target?.no_prescriptions,
        by_customer_visits: Number(target?.by_customer_visits),
        by_doctor_visits: Number(target?.by_doctor_visits),
      };
      if (
        target?.by_customer_visits === undefined ||
        target?.by_doctor_visits === undefined ||
        target?.no_orders === undefined ||
        target?.no_prescriptions === undefined ||
        target?.medicines?.map((item) => item?.quantity === 0) ||
        target?.medicines === [] ||
        target?.medicines?.length === 0
      ) {
        alert('at if mpo');
        NotificationManager.error('Enter Details', 'Error', 5000, null, '');
        return;
      } else {
        let res = await dispatch(CreateTargetAction(apiData));
        if (res) {
          NotificationManager.success(
            'Successfully Created',
            'Success',
            5000,
            null,
            ''
          );
          setLoading(false);

          props.history.push('/app/Target/ViewTarget');
        }
      }
    } else {
      setLoading(false);
    }
    setLoading(false);
  };
  // console.log(targets[0]?.by_customer_visits?.by_customer_visits);
  const handleBack = () => {
    props.history.push('/app/Target/ViewTarget');
  };

  return (
    <Card>
      <CardBody>

        <Button style={{ backgroundColor: '#0066B3' }} onClick={handleBack}>
          Back
        </Button>
        <CardTitle>Create Target</CardTitle>
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
                      clearState();
                    }}
                    options={delaultOptions}
                  />
                </FormGroup>
              </Col>

              {selected?.value === 'SM' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter Amount</Label>

                      <Input
                        name="amountTest"
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
                      <Label>Select Director</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        ref={selectInputRef}
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          getParentTarget(val?.key);
                          dispatch(getUsers(val.key, 'sm'));
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Sales Manager</Label>

                      {loadingSM ? (
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
                          ref={selectInputRef}
                          classNamePrefix="react-select"
                          name="form-field-name-gender"
                          onChange={async (val) => {
                            setTarget({ ...target, assigned_to_uid: val?.key });
                            await getDirectorTarget(val?.key);
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

                            setTarget({
                              ...target,
                              // start_date: moment
                              //   .unix(targets[0]?.start_date)
                              //   .format('YYYY-MM-DD h:mm:ss'),
                            });
                          }}
                          options={medicineOption}
                        />
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter By Customer Visits</Label>

                      <Input
                        name="visit"
                        type="number"
                        // value={targets[0]?.by_customer_visits?.by_customer_visits}
                        // min=[0]
                        // max={targets[0]?.by_customer_visits?.by_customer_visits}
                        onChange={(e) => {
                          let va = 0;
                          if (e.target?.value <= Number(e.target.max)) {
                            va = Number(e.target.value);
                          }
                          setTarget({
                            ...target,
                            by_customer_visits: Number(va),
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter By Doctor Visits</Label>

                      <Input
                        name="visitByDoctor"
                        type="number"
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            by_doctor_visits: Number(e.target.value),
                          })
                        }
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
                      <Label>Enter Amount</Label>

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
                      <Label>Select Director</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        ref={selectInputRef}
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
                      <Label>Select Distribtion Center</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        ref={selectInputRef}
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          // setTarget({ ...target, assigned_to_uid: val?.key });
                          // console.log(val);
                          getStocks(val?.key);
                        }}
                        options={distributionCenterOption}
                      />
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
                          ref={selectInputRef}
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionFromStock}
                        />
                      )}
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
                      <Label>Enter Amount</Label>

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
                      <Label>Select Director</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          dispatch(getUsers(val.key, 'sm'));
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Sales Manager</Label>
                      {loadingSM ? (
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
                            dispatch(getUsers(val.key, 'rsm'));
                            getParentTarget(val?.key);
                          }}
                          options={salesManagerOption}
                        />
                      )}
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
                            setTarget({ ...target, assigned_to_uid: val?.key });
                            // await getDirectorTarget(val?.key);
                            await getDirectorTarget(val?.key);
                          }}
                          options={regionalSalesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter By Customer Visits</Label>

                      <Input
                        name="visit"
                        type="number"
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            by_customer_visits: Number(e.target.value),
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter By Doctor Visits</Label>

                      <Input
                        name="visitByDoctor"
                        type="number"
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            by_doctor_visits: Number(e.target.value),
                          })
                        }
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
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter Amount</Label>

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
                      <Label>Select Director</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          dispatch(getUsers(val.key, 'sm'));
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Sales Manager</Label>
                      {loadingSM ? (
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
                            dispatch(getUsers(val.key, 'rsm'));

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
                            dispatch(getUsers(val.key, 'am'));
                            getParentTarget(val?.key);

                            // await getDirectorTarget(val?.key);
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
                            setTarget({ ...target, assigned_to_uid: val?.key });
                            // await getDirectorTarget(val?.key);
                            await getDirectorTarget(val?.key);
                          }}
                          options={areaManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter By Customer Visits</Label>

                      <Input
                        name="visit"
                        type="number"
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            by_customer_visits: Number(e.target.value),
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter By Doctor Visits</Label>

                      <Input
                        name="visitByDoctor"
                        type="number"
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            by_doctor_visits: Number(e.target.value),
                          })
                        }
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
              ) : selected?.value === 'MPO' ? (
                <>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter Amount</Label>

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
                      <Label>Select Director</Label>

                      <Select
                        required
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name-gender"
                        onChange={async (val) => {
                          dispatch(getUsers(val.key, 'sm'));
                        }}
                        options={directorOption}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Sales Manager</Label>
                      {loadingSM ? (
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
                            dispatch(getUsers(val.key, 'rsm'));

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
                            dispatch(getUsers(val.key, 'am'));
                            // await getDirectorTarget(val?.key);

                            // await getDirectorTarget(val?.key);
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
                            dispatch(getUsers(val.key, 'mpo'));
                            getParentTarget(val?.key);

                            // await getDirectorTarget(val?.key);
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
                            setTarget({ ...target, assigned_to_uid: val?.key });
                            // await getDirectorTarget(val?.key);
                            await getDirectorTarget(val?.key);
                          }}
                          options={mpoOption}
                        />
                      )}
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter By Customer Visits</Label>

                      <Input
                        name="visit"
                        type="number"
                        min={1}
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            by_customer_visits: Number(e.target.value),
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Enter By Doctor Visits</Label>

                      <Input
                        name="visitByDoctor"
                        type="number"
                        onChange={(e) =>
                          setTarget({
                            ...target,
                            by_doctor_visits: Number(e.target.value),
                          })
                        }
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
                          options={medicineOption}
                        />
                      )}
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
                        min={1}
                        value={target?.no_prescriptions}
                        type="number"
                        min={1}
                        onChange={(e) => {
                          let va = 1;
                          if (e.target?.value <= Number(e.target.max)) {
                            va = Number(e.target.value);
                          }
                          setTarget({
                            ...target,
                            no_prescriptions: Number(e.target.value),
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </>
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
              // className="btn btn-primary"
              // type="submit"
              style={{ backgroundColor: '#0066B3' }}
              disabled={loading ? true : false}
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onTargetCreate}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Add Target</span>
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
