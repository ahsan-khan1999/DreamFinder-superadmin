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
  getUsers,
} from 'Store/Actions/AttendanceActions/AttendanceAction';
import AsyncSelect from 'react-select/async';
import Loader from 'react-loader-spinner';
import { NotificationManager } from 'components/common/react-notifications';
import { CreateGift } from 'Store/Actions/GiftAction/GiftActions';
const delaultOptions = [
  { label: 'SM', value: 'SM', key: 2 },
  { label: 'RSM', value: 'RSM', key: 3 },

  { label: 'AM', value: 'AM', key: 4 },
  { label: 'MPO', value: 'MPO', key: 5 },
];
const CreateGifts = (props) => {
  const [array, setArray] = useState();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState('');
  
  const [stocks, setStocks] = useState([]);
  const gift_obj = {
    user_uid: '',
    assigned_gifts: [],
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
    dispatch(ViewDirectorAction());
  }, []);
  useEffect(() => {
    setGift(gift_obj);
  }, [])

  const director = useSelector((state) => state?.ViewUserReducer?.director);

  
  
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
  const getStocks = async (uid) => {
    setLoadingStocks(true);
    let token = await getToken();
    const response = await axios.get(
      `https://concord-backend-m2.herokuapp.com/api/stocks/read/gift`,
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
    if (e?.target?.value <= Number(e?.target?.max)) {
      obj.quantity = Number(e?.target?.value);
    }
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
    if(array === undefined){
      let apiData = {
        ...gift,
        assigned_gifts: currentGift?.assigned_gifts?.map((item) => {
          return {
            stock_uid: item?.stock_uid,
            medicine_quantity: item?.medicine_quantity,
          };
        }),
      };
      let res = await dispatch(CreateGift(apiData))
      if(res){
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        setLoading(false);
  
        props.history.push('/app/Gift/ViewGift');
      }else{

      setLoading(false);
  
      }
    }else{
      let apiData = {
        ...gift,
        assigned_gifts: array?.map((item) => {
          return {
            stock_uid: item?.medicine_uid,
            medicine_quantity: item?.quantity,
          };
        }),
      };
  
      let res = await dispatch(CreateGift(apiData))
      if(res){
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        setLoading(false);
  
        props.history.push('/app/Gift/ViewGift');
      }else{
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
        <Button style={{ backgroundColor: '#0066B3' }} onClick={handleBack}>Back</Button>
        <CardTitle>Create Gift</CardTitle>
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
                      <Label>Manager Name</Label>
                      {view ? (
                        ""
                      ) : (
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
                      )}
                    </FormGroup>
                  </Col>
                  <Col lg={6}>
                    <FormGroup>
                      <Label>Assigned To Name</Label>
                      {view ? (
                        ""
                      ) : loadingSM ? (
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
                            getStocks(val?.key);
                            setGift({ ...gift, user_uid: val.key });
                            dispatch(GetOldGiftsAction(val.key));
                          }}
                          options={salesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>Select Gift</Label>
                      {view ? (
                       ""
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
                          
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionFromStock}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'RSM' ? (
                <>
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
                            setGift({ ...gift, user_uid: val.key });
                            getStocks(val?.key);
                            dispatch(GetOldGiftsAction(val.key));
                          }}
                          options={regionalSalesManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>

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
                          
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionFromStock}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'AM' ? (
                <>
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
                            setGift({ ...gift, user_uid: val.key });
                            getStocks(val?.key);
                            dispatch(GetOldGiftsAction(val.key));
                          }}
                          options={areaManagerOption}
                        />
                      )}
                    </FormGroup>
                  </Col>

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
                          
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
                          }}
                          options={medicineOptionFromStock}
                        />
                      )}
                    </FormGroup>
                  </Col>
                </>
              ) : selected?.value === 'MPO' ? (
                <>
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
                            setGift({ ...gift, user_uid: val.key });
                            getStocks(val?.key);
                            dispatch(GetOldGiftsAction(val.key));
                          }}
                          options={mpoOption}
                        />
                      )}
                    </FormGroup>
                  </Col>

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
                         
                          onChange={(val, index) => {
                            handleChangeProduct(val, index);
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
                            <th>Gift Products</th>
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
export default CreateGifts;
