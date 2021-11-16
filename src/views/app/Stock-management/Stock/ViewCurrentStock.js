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
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import {
  CreateStocks,
  UpdateStocks,
} from 'Store/Actions/ConcordStock/StockAction';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';
import { getStockProductCategory } from 'Store/Actions/ConcordStock/StockAction';
import { GetDistributionCenter } from 'Store/Actions/ConcordDistributionCenter/DistributionCenterAction';
import apiServices from 'services/requestHandler';

export default function ViewCurrentStock(props) {
  let [buttonName, setButtonName] = useState();

  const [thisView, setThisView] = useState(true);

  const CurrentStocks = props?.location?.state;

  const dispatch = useDispatch();

  useEffect(() => {
    if (CurrentStocks?.status?.name === 'suspended') {
      setButtonName('Active');
    } else if (CurrentStocks?.status?.name === 'active') {
      setButtonName('Suspend');
    }
  }, []);

  const distributioncenter = useSelector(
    (state) => state?.distributionCenterReducer?.distributioncenter
  );
  const getstockCategoryloader = useSelector(
    (state) => state?.stockReducer?.getstockCategoryloader
  );
  const distributioncenterloader = useSelector(
    (state) => state?.distributionCenterReducer?.distributioncenterloader
  );
  let distributioncenterData = [];
  distributioncenter?.map((item) =>
    distributioncenterData.push({
      label: item?.areas[0].parent.name,
      value: item?.uid,
      key: item?.uid,
    })
  );

  console.log('distributioncenterData', distributioncenterData);
  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);

  let option_static_Category = [];
  staticdata?.product_category__category_list?.filter((item) =>
    option_static_Category.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );

  useEffect(() => {
    dispatch(StaticDataGet());
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('');

  const getstockCategory = useSelector(
    (state) => state?.stockReducer?.getstockCategory
  );

  let optioncategory = [];
  getstockCategory?.filter((item) =>
    optioncategory.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );

  const stock_obj = {
    product_uid: CurrentStocks?.product?.uid,

    distribution_centre_uid: CurrentStocks?.distribution_centre?.uid,

    quantity: CurrentStocks.quantity,

    uid: CurrentStocks.uid,
  };

  const loading = useSelector((state) => state?.stockReducer?.updatestockloading);
  const [stocksall, setStocksall] = useState(stock_obj);

  const handleChangeToView = () => {
    props.history.push('/app/stocks-management/viewStock');
  };

  const editProfile = (e) => {
    e.preventDefault();
    setThisView(!thisView);
  };

  const editData = async () => {
    let res = await dispatch(UpdateStocks(stocksall));
    if (res) {
      NotificationManager.success(
        'Successful response',
        'Success',
        5000,
     
     
        
        ''
      );
      props.history.push('/app/stocks-management/viewStock');
    }
  };

  let [suspendloader, setsuspendloader] = useState(false);


  const suspandDepartmenthead = async () => {
    if (CurrentStocks?.status?.name === 'suspended') {
      let apiData = {
        uid: CurrentStocks?.uid,
      };
      console.log(apiData);
      setsuspendloader(true);
      let res = await apiServices.suspandstocks(apiData);
      console.log(res);
      if (res?.data?.response_code === 200) {
      setsuspendloader(false);
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/stocks-management/viewStock');
      } else {
      setsuspendloader(false);
        NotificationManager.error(
          'Error active This Admin',
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      let apiData = {
        uid: CurrentStocks?.uid,
      };
      setsuspendloader(true);
      let res = await apiServices.suspandstocks(apiData);
      console.log(res);
      if (res?.response_code === 200) {
      setsuspendloader(false);
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/stocks-management/viewStock');
      } else {
      setsuspendloader(false);
        NotificationManager.error(
          res?.response_message,
          'Error',
          5000,
          null,
          ''
        );
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          {thisView ? (
            <>
              <Button
               onClick={handleChangeToView}
                style={{ marginRight: '20px', backgroundColor:'#0066b3' }}
              >
                Back
              </Button>
              <IntlMessages id="Stock" />
            </>
          ) : (
            <>
              <Button
                onClick={editProfile}
                style={{ marginRight: '20px', backgroundColor:'#0066b3' }}
              >
                Close Edit
              </Button>
              <IntlMessages id="Edit Stock" />
            </>
          )}
        </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              {thisView ? (
                <>


                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Name
                        </h6>
                      </Label>

                      <span>
                        <p>{CurrentStocks?.product?.name.toUpperCase()}</p>
                      </span>
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Category
                        </h6>
                      </Label>

                      <span>
                        <p>{CurrentStocks?.product?.category?.category.toUpperCase()}</p>
                      </span>
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Price
                        </h6>
                      </Label>
                      <span>
                        <p>{CurrentStocks?.product?.price}</p>
                      </span>
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Quantity
                        </h6>
                      </Label>

                      <span>
                        <p>{CurrentStocks?.quantity}</p>
                      </span>
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Formula
                        </h6>
                      </Label>
                      <span>
                        <p>
                          {CurrentStocks?.product?.formula
                            ? CurrentStocks?.product?.formula
                            : 'N/A'}
                        </p>
                      </span>
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          BarCode
                        </h6>
                      </Label>
                      <span>
                        <p>
                          {CurrentStocks?.product?.barcode
                            ? CurrentStocks?.product?.barcode
                            : 'N/A'}
                        </p>
                      </span>
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <Label>
                        <h6
                          style={{
                            fontWeight: '700',
                            fontSize: '0.9rem',
                          }}
                        >
                          Description
                        </h6>
                      </Label>
                      <span>
                        <p>
                          {CurrentStocks?.product?.description
                            ? CurrentStocks?.product?.description
                            : 'N/A'}
                        </p>
                      </span>
                    </FormGroup>
                  </Col>
                </>
              ) : (
                <>
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
                          defaultValue={{
                            label:CurrentStocks?.product?.category.category,
                            value:CurrentStocks?.product?.category.category
                          }}
                          onChange={(e) => {
                            dispatch(getStockProductCategory(e.value));
                            setSelectedCategory(e.label);
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
                      {getstockCategoryloader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> : 
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          defaultValue={{
                            label:CurrentStocks?.product?.category.name,
                            value:CurrentStocks?.product?.category.name
                          }}
                          onChange={(e) => {
                            setStocksall({
                              ...stocksall,

                              product_uid: e?.value,
                            });
                            dispatch(GetDistributionCenter());
                          }}
                          required
                          options={optioncategory}
                        />
                        }
                      </>
                    </FormGroup>
                  </Col>

                  <Col lg={6}>
                    <FormGroup>
                      <label>
                        <IntlMessages id="Select Distribution Center" />
                      </label>

                      <>
                      {distributioncenterloader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> : 
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          defaultValue={{
                            label:CurrentStocks?.distribution_centre.areas[0].parent.name,
                            value:CurrentStocks?.distribution_centre.uid
                          }}
                          onChange={(e) => {
                            setStocksall({
                              ...stocksall,

                              distribution_centre_uid: e?.value,
                            });
                          }}
                          required
                          options={distributioncenterData}
                        />
                        }
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
                        className="radio-in"
                        value={stocksall?.quantity}
                        onChange={(e) =>
                          setStocksall({
                            ...stocksall,
                            quantity: Number(e.target.value),
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                </>
              )}
            </Row>


            {thisView ? (
              <Button
                style={{backgroundColor:'#0066b3'}}
                className="mr-3"
                onClick={editProfile}
              >
              
                Edit Product
              </Button>
            ) : (
              <Button
                style={{backgroundColor:'#0066b3'}}

              
                onClick={editData}
              >
              
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Updating
                </div> 
              ) : (
                'Save'
              )}
              </Button>
            )}



            {thisView ? (
              <Button
                style={{backgroundColor:'#0066b3'}}

                onClick={suspandDepartmenthead}
              >

            {suspendloader ? (
              <div className="d-flex justify-content-center">
                <Loader height={18} width={18} type="Oval" color="#fff" />
                &nbsp; Suspending
              </div>
            ) : (
              buttonName
              )}

              </Button>

            ) : (
                ""
            )}
      
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
