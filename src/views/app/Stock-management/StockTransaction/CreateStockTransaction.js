/* eslint-disable */
import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'Utils/auth.util';
import BestSellers from 'containers/dashboards/BestSellers';
import AdvancedSearch from 'containers/dashboards/AdvancedSearch';
import { Link, NavLink } from 'react-router-dom';
import products from 'data/products';
import AddNewSurveyModal from 'containers/applications/AddNewSurveyModal';
import AddNewModal from 'containers/pages/AddNewModal';
import AddNewTodoModal from 'containers/applications/AddNewTodoModal';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CreateDepartmentHead } from 'Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';
import {
  CreateStocksTransaction,
  getCategoryDistributionCenter,
} from 'Store/Actions/ConcordStockTransaction/StockTransactionAction';
import { GetDistributionCenter } from 'Store/Actions/ConcordDistributionCenter/DistributionCenterAction';
import moment from 'moment';

export default function CreateStockTransaction({ history }) {
  const selectGender = [
    { label: 'IN', value: 'in', key: 1 },
    { label: 'OUT', value: 'out', key: 2 },
  ];
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectsinglecategory, setSelectsinglecategory] = useState({
    quantity: 0,
    transactiontype: '',
  });

  console.log('selectsinglecategory', selectsinglecategory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(StaticDataGet());
    dispatch(GetDistributionCenter());
  }, []);

  const [distributionuid, setDistributionuid] = useState('');

  const distributioncenter = useSelector(
    (state) => state?.distributionCenterReducer?.distributioncenter
  );
  let distributioncenterData = [];
  distributioncenter?.map((item) =>
    distributioncenterData.push({
      label: item?.areas[0].parent.name,
      value: item?.uid,
      key: item?.uid,
    })
  );

  const loading = useSelector(
    (state) => state?.stockTransactionReducer?.loader
  );
  const getstock_uid = useSelector(
    (state) =>
      state?.stockTransactionReducer
        ?.get_stock_transaction_distribution_category
  );

  let optioncategory = [];
  getstock_uid?.filter((item) =>
    optioncategory.push({
      label: item?.product?.name,
      value: item?.uid,
      key: item?.quantity,
    })
  );

  const getstockDataSelectedCategory = [];
  getstock_uid?.map((item) => getstockDataSelectedCategory.push(item?.uid));

  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);

  let option_static_Category = [];
  staticdata?.product_category__category_list?.filter((item) =>
    option_static_Category.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );

  const stocktransaction_obj = {
    stock_uid: '',

    executed_by: '',

    price: 0,

    quantity: 0,

    transaction_type: '',

    date: '',

    name: '',
  };

  const [stocktransaction, setStocktransaction] =
    useState(stocktransaction_obj);

  const onDepartHeadCreate = async () => {
    if (
      stocktransaction?.stock_uid === '' &&
      stocktransaction?.executed_by === '' &&
      stocktransaction?.price === '' &&
      stocktransaction?.quantity === '' &&
      stocktransaction?.transaction_type === '' &&
      stocktransaction?.date === ''
    ) {
      NotificationManager.error(
        'Please Enter Required Field',
        'Error',
        3000,
        null,
        ''
      );
      return;
    } else {
      // console.log({...stocktransaction});
      let res = await dispatch(
        CreateStocksTransaction({ ...stocktransaction })
      );

      if (res) {
        NotificationManager.success(
          'Stock Transaction Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/stocks-management/ViewStockTransaction');
      }
    }
  };

  const handleChangeToView = () => {
    history.push('/app/stocks-management/ViewStockTransaction');
  };

  return (
    <Card>
      <CardBody>
        <Button
          
          onClick={handleChangeToView}
          style={{ marginRight: '20px', backgroundColor:'#0066b3' }}
        >
          Back
        </Button>
        <CardTitle>
          <IntlMessages id="Create Stock Transaction" />
        </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Name" />
                  </Label>

                  <Input
                    value={stocktransaction.address}
                    className="form-control"
                    name="name"
                    type="text"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setStocktransaction({
                        ...stocktransaction,
                        name: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Distribution Center" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      onChange={(e) => {
                        setDistributionuid(e.value);
                      }}
                      required
                      options={distributioncenterData}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Product Category" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      onChange={(e) => {
                        setSelectedCategory(e.label);
                        dispatch(
                          getCategoryDistributionCenter(
                            distributionuid,
                            e.value
                          )
                        );
                      }}
                      required
                      options={option_static_Category}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select " />
                    {selectedCategory}
                  </label>

                  <>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      onChange={(e) => {
                        setStocktransaction({
                          ...stocktransaction,
                          stock_uid: e?.value,
                        });
                        setSelectsinglecategory({
                          quantity: e?.key,
                        });
                      }}
                      required
                      options={optioncategory}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Executed By" />
                  </Label>

                  <Input
                    required
                    value={stocktransaction.executed_by}
                    name="executed_by"
                    type="text"
                    onChange={(e) =>
                      setStocktransaction({
                        ...stocktransaction,
                        executed_by: e.target.value,
                      })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Price" />
                  </Label>

                  <Input
                    required
                    type="number"
                    min={0}
                    className="radio-in"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setStocktransaction({
                        ...stocktransaction,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Transition Type" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      onChange={(e) => {
                        setStocktransaction({
                          ...stocktransaction,
                          transaction_type: e.value,
                        });

                        setSelectsinglecategory({
                          ...selectsinglecategory,
                          transactiontype: e?.value,
                        });
                      }}
                      required
                      options={selectGender}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Quantity" />
                  </Label>

                  <Input
                    required
                    type="number"
                    min={0}
                    max={
                      selectsinglecategory.transactiontype === 'out'
                        ? selectsinglecategory.quantity
                        : ''
                    }
                    className="radio-in"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e, index) => {
                      if (selectsinglecategory.transactiontype === 'out') {
                        if (e.target.value <= Number(e.target.max)) {
                          setStocktransaction({
                            ...stocktransaction,
                            quantity: Number(e.target.value),
                          });
                        }
                      }
                      else{
                        setStocktransaction({
                          ...stocktransaction,
                          quantity: Number(e.target.value),
                        });
                      }
                    }}
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Date" />
                  </Label>

                  <Input
                    required
                    className="form-control"
                    name="date_of_birth"
                    type="date"
                    onChange={(e) =>
                      setStocktransaction({
                        ...stocktransaction,
                        date:
                          e.target.value +
                          ' ' +
                          moment(moment.utc().toDate()).format('hh:mm:ss'),
                      })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
                style={{backgroundColor:'#0066b3'}}
              size="sm"
              onClick={onDepartHeadCreate}
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Creating
                </div>
              ) : (
                'Add Stock Transaction'
              )}
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
