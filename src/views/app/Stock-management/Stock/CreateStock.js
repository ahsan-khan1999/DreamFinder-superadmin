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
import { CreateStocks } from 'Store/Actions/ConcordStock/StockAction';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';
import { getStockProductCategory } from 'Store/Actions/ConcordStock/StockAction';
import { GetDistributionCenter } from 'Store/Actions/ConcordDistributionCenter/DistributionCenterAction';

export default function CreateStock({ history }) {


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


  console.log("distributioncenterData",distributioncenterData);
  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);
  
  let option_static_Category = [];
  staticdata?.product_category__category_list?.filter((item) =>
  option_static_Category.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );
  
  const dispatch = useDispatch();
  
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

    product_uid: '',

    distribution_centre_uid: '',

    quantity: 0,

  };

  
    const loading = useSelector(
      (state) => state?.stockReducer?.loader
    );
  const [stocksall, setStocksall] = useState(stock_obj);

  const onStockCreate = async () => {
    if (
      stocksall?.product_uid === '' &&
      stocksall?.distribution_centre_uid === '' &&
      stocksall?.quantity === ''
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
      console.log(stocksall);
        // console.log({...stocksall})
        let res = await dispatch(CreateStocks({ ...stocksall }));

      if (res) {
        NotificationManager.success(
          'Stocks Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/stocks-management/viewStock');
      }
    }
  };

  const handleChangeToView = () => {
    history.push('/app/stocks-management/viewStock');
  };

  return (
    <Card>
      <CardBody>
      <Button
            className="btn btn-primary mb-4 "
            onClick={handleChangeToView}
            style={{ marginRight: '20px'}}
          >
            Back
          </Button>
        <CardTitle>
          <IntlMessages id="Create Stock" />
        </CardTitle>
     
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
             
             
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
                        dispatch(getStockProductCategory(e.value));
                        setSelectedCategory(e.label)
                        
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
                    <IntlMessages id="Select "/>
                    {selectedCategory}
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
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
                  </>
                </FormGroup>
              </Col>

             

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Distribution Center"/>
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      onChange={(e) => {
                        setStocksall({
                          ...stocksall,

                          distribution_centre_uid: e?.value,
                          
                          
                        });
                      }}
                      required
                      options={distributioncenterData}
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
                    className="radio-in"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setStocksall({ ...stocksall, quantity: Number(e.target.value) })
                    }
                  />
                </FormGroup>
              </Col>




             
            </Row>

            <Button
                style={{backgroundColor:'#0066b3'}}
              size="sm"
              onClick={onStockCreate}
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Creating
                </div> 
              ) : (
                'Add Stock'
              )}
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
