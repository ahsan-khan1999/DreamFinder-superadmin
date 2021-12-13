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
  CreateTargetAction,
  GetDistributionCenter,
  OrderRead,
} from 'Store/Actions/Target/TargetAction';
import {
  ViewAreaManagerAction,
  ViewDirectorAction,
  ViewMPOManagerAction,
  ViewRegionalSalesManagerManagerAction,
  ViewSalesManagerManagerAction,
} from 'Store/Actions/User/UserActions';
import { getToken } from 'Utils/auth.util';
import axios from 'axios';

const animatedComponents = makeAnimated();

import {
  GetOldGiftsAction,
  getParentHirarchy,
  getUsers,
} from 'Store/Actions/AttendanceActions/AttendanceAction';
import AsyncSelect from 'react-select/async';
import Loader from 'react-loader-spinner';
import { NotificationManager } from 'components/common/react-notifications';
import { CreateGift } from 'Store/Actions/GiftAction/GiftActions';
import { BASEURL } from 'services/HttpProvider';

const Gift = (props) => {
  let currentGift = props.location.state;
  const [array, setArray] = useState();
  const [loading, setLoading] = useState(false);
  const parents = useSelector((state) => state?.AttendanceReducer?.parents);
  let smName = '';
  let amName = '';
  let rsmName = '';

  const handleParents = () => {
    parents?.map((item) => {
      if (item?.role?.category?.user_role_id === 3) {
        smName = item?.name;
      } else if (item?.role?.category?.user_role_id === 4) {
        rsmName = item?.name;
      } else if (item?.role?.category?.user_role_id === 5) {
        amName = item?.name;
      }
    });
  };

  let optionDefault = [];
  currentGift?.assigned_gifts?.map((item) => {
    optionDefault.push({
      medicine_quantity: item?.medicine_quantity,
      stock_uid: item?.stock_uid,
    });
  });
  const [stocks, setStocks] = useState([]);
  const gift_obj = {
    user_uid: currentGift?.uid,
    assigned_gifts: optionDefault,
  };
  const [gift, setGift] = useState(gift_obj);

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
  const oldGifts = useSelector((state) => state?.AttendanceReducer?.oldGifts);
  const laodingGifts = useSelector(
    (state) => state?.AttendanceReducer?.loadingGift
  );
  const mpo = useSelector((state) => state?.AttendanceReducer?.mpo);
  let [loadingMedicine, setLoadingMedicine] = useState(false);
  let [loadingStocks, setLoadingStocks] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getParentHirarchy(currentGift?.uid));
    getStocks(currentGift?.uid);
    dispatch(GetOldGiftsAction(currentGift?.uid));
    dispatch(ViewDirectorAction());
  }, []);
  useEffect(() => {
    setGift(gift_obj);
  }, []);

  const director = useSelector((state) => state?.ViewUserReducer?.director);

  // console.log(currentGift);

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

  const [view, setView] = useState(false);
  const [viewTest, setViewTest] = useState(true);

  const getStocks = async (uid) => {
    setLoadingStocks(true);
    let token = await getToken();
    const response = await axios.get(
      BASEURL + `/stocks/read/gift?child_uid=${uid}`,
      {
        headers: {
          'x-session-key': token.token,
          'x-session-type': token.type,
        },
      }
    );
    setLoadingStocks(false);

    setStocks(response?.data?.response_data);
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
    // if (e?.target?.value <= Number(e?.target?.max)) {
    //   obj.quantity = Number(e?.target?.value);
    // }
    obj.quantity = Number(e?.target?.value);
    array[index] = obj;
    const testArary = [...array];
    setArray(testArary);
    await setGift({
      ...gift,
      assigned_gifts: array?.map((item) => {
        return {
          stock_uid: item?.medicine_uid,
          medicine_quantity: item?.quantity,
        };
      }),
    });
  };

  const onCreateGift = async () => {
    setLoading(true);
    if (array === undefined) {
      let apiData = {
        ...gift,
        assigned_gifts: currentGift?.assigned_gifts?.map((item) => {
          return {
            stock_uid: item?.stock_uid,
            medicine_quantity: item?.medicine_quantity,
          };
        }),
      };
      let res = await dispatch(CreateGift(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        setLoading(false);

        props.history.push('/app/Gift/ViewGift');
      } else {
        setLoading(false);
      }
    } else {
      let apiData = {
        ...gift,
        assigned_gifts: array?.map((item) => {
          return {
            stock_uid: item?.medicine_uid,
            medicine_quantity: item?.quantity,
          };
        }),
      };

      let res = await dispatch(CreateGift(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        setLoading(false);

        props.history.push('/app/Gift/ViewGift');
      } else {
        setLoading(false);
      }
    }

    setLoading(false);
  };
  const handleBack = () => {
    props.history.push('/app/Gift/ViewGift');
  };

  return (
    <Card>
      <CardBody>
        <Button style={{ backgroundColor: '#0066B3' }} onClick={handleBack}>
          Back
        </Button>
        <CardTitle>Edit Gift</CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              {currentGift?.role?.category?.name === 'sm' ? (
                <>
                  {parents?.map((item, index) => (
                    <>
                      <Col lg={6}>
                        <FormGroup>
                          <Label>{`${item?.name}`}</Label>

                          <Select
                            required
                            isDisabled={true}
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            defaultValue={{
                              label: item?.name,
                              value: item?.uid,
                              key: item?.uid,
                            }}
                            classNamePrefix="react-select"
                            name="form-field-name-gender"
                            onChange={async (val) => {
                              dispatch(getUsers(val.key, 'sm'));
                            }}
                            options={directorOption}
                          />
                        </FormGroup>
                      </Col>
                    </>
                  ))}

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Gift</Label>
                      {view ? (
                        currentGift?.field_staff?.assigned_gifts?.map(
                          (item) => (
                            <span>
                              <p>{item?.medicine_name}</p>
                            </span>
                          )
                        )
                      ) : laodingGifts ? (
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
                          defaultValue={currentGift?.field_staff?.assigned_gifts?.map(
                            (item, index) => {
                              return {
                                label: item?.medicine_name,
                                key: item?.medicine_quantity,
                                value: item?.stock_uid,
                              };
                            }
                          )}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                            setViewTest(false);
                          }}
                          options={medicineOptionFromStock}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : currentGift?.role?.category?.name === 'rsm' ? (
                <>
                  {parents?.map((item, index) => (
                    <>
                      <Col lg={6}>
                        <FormGroup>
                          <Label>{`${item?.name}`}</Label>

                          <Select
                            required
                            isDisabled={true}
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            defaultValue={{
                              label: item?.name,
                              value: item?.uid,
                              key: item?.uid,
                            }}
                            classNamePrefix="react-select"
                            name="form-field-name-gender"
                            onChange={async (val) => {
                              dispatch(getUsers(val.key, 'sm'));
                            }}
                            options={directorOption}
                          />
                        </FormGroup>
                      </Col>
                    </>
                  ))}
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Gift</Label>
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
                          defaultValue={currentGift?.field_staff?.assigned_gifts?.map(
                            (item) => {
                              return {
                                label: item?.medicine_name,
                                key: item?.medicine_quantity,
                                value: item?.stock_uid,
                              };
                            }
                          )}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                            setViewTest(false);
                          }}
                          options={medicineOptionFromStock}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : currentGift?.role?.category?.name === 'am' ? (
                <>
                  {parents?.map((item, index) => (
                    <>
                      <Col lg={6}>
                        <FormGroup>
                          <Label>{`${item?.name}`}</Label>

                          <Select
                            required
                            isDisabled={true}
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            defaultValue={{
                              label: item?.name,
                              value: item?.uid,
                              key: item?.uid,
                            }}
                            classNamePrefix="react-select"
                            name="form-field-name-gender"
                            onChange={async (val) => {
                              dispatch(getUsers(val.key, 'sm'));
                            }}
                            options={directorOption}
                          />
                        </FormGroup>
                      </Col>
                    </>
                  ))}

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Gift</Label>
                      {laodingGifts ? (
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
                          defaultValue={currentGift?.field_staff?.assigned_gifts?.map(
                            (item) => {
                              return {
                                label: item?.medicine_name,
                                key: item?.medicine_quantity,
                                value: item?.stock_uid,
                              };
                            }
                          )}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                            setViewTest(false);
                          }}
                          options={medicineOptionFromStock}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : currentGift?.role?.category?.name === 'mpo' ? (
                <>
                  {parents?.map((item, index) => (
                    <>
                      <Col lg={6}>
                        <FormGroup>
                          <Label>{`${item?.name}`}</Label>

                          <Select
                            required
                            isDisabled={true}
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            defaultValue={{
                              label: item?.name,
                              value: item?.uid,
                              key: item?.uid,
                            }}
                            classNamePrefix="react-select"
                            name="form-field-name-gender"
                            onChange={async (val) => {
                              dispatch(getUsers(val.key, 'sm'));
                            }}
                            options={directorOption}
                          />
                        </FormGroup>
                      </Col>
                    </>
                  ))}

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Gift</Label>
                      {laodingGifts ? (
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
                          defaultValue={currentGift?.field_staff?.assigned_gifts?.map(
                            (item) => {
                              return {
                                label: item?.medicine_name,
                                key: item?.medicine_quantity,
                                value: item?.stock_uid,
                              };
                            }
                          )}
                          // value={admin?.service_location_uid}
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                            setViewTest(false);
                          }}
                          options={medicineOptionFromStock}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : (
                <p></p>
              )}
            </Row>
            {viewTest ? (
              <Row>
                <Col lg={12}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Product Quanity</th>
                      </tr>
                    </thead>

                    <tbody>
                      {currentGift?.field_staff?.assigned_gifts?.map((item) => (
                        <tr>
                          <td>{item?.medicine_name}</td>
                          <td>{item?.medicine_quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            ) : null}

            {viewTest ? (
              ''
            ) : (
              <Row>
                <Col xl={12}>
                  <FormGroup>
                    <div className="table-form table-reponsive">
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
                                        // max={item?.availalbequantity}
                                        min={0}
                                        defaultValue={item?.quantity}
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
            <Button
              // className="btn btn-primary"
              // type="submit"
              style={{ backgroundColor: '#0066B3' }}
              disabled={loading ? true : false}
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onCreateGift}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Assign Gift</span>
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
};
export default Gift;
