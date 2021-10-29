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
import { CreateProducts, getCategory } from 'Store/Actions/ConcordProduct/ProductAction';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';

export default function CreateProduct({ history }) {

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
  const product_obj = {
    name: '',

    category_uid: '',

    price: '',

  };

  const loading = useSelector((state) => state?.productReducer?.loading);
  const getProductCategory = useSelector((state) => state?.productReducer?.getProductCategory);
  
  
  
  const [product, setProduct] = useState(product_obj);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  let optioncategory = [];
  getProductCategory?.filter((item) =>
  optioncategory.push({
    label: item?.name,
    value: item?.uid,
    key: item?.uid,
  })
  );
  console.log(getProductCategory,"getProductCategory")
  
  const onDepartHeadCreate = async () => {
    if (
      product?.name === '' &&
      product?.category_uid === '' &&
      product?.price === ''
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
      console.log(product);
      let res = await dispatch(CreateProducts({ ...product }));

      if (res) {
        NotificationManager.success(
          'Department Head Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/stocks-management/viewProduct');
      }
    }
  };

  const handleChangeToView = () => {
    history.push('/app/stocks-management/viewProduct');
  };

  return (
    <Card>
      <CardBody>
        <Button
          className="btn btn-primary mb-4 "
          onClick={handleChangeToView}
          style={{ marginRight: '20px' }}
        >
          Back
        </Button>
        <CardTitle>
          <IntlMessages id="Create Product" />
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
                    required
                    value={product.name}
                    className="form-control"
                    name="name"
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>


              <Col lg={6}>
                <FormGroup>
                  <label>
                    <IntlMessages id="Select Category" />
                  </label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      onChange={(e) => {
                        dispatch(getCategory(e.value));
                        setSelectedCategory(e.label)
                        // setOrderCreate({
                        //   ...orderCreate,

                        //   payment_type: e?.value,
                        //   delivery_status: 'pending',
                        //   payment_status: 'pending',
                        // });
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
                      // onChange={(e) => {
                      //   setOrderCreate({
                      //     ...orderCreate,

                      //     payment_type: e?.value,
                      //     delivery_status: 'pending',
                      //     payment_status: 'pending',
                      //   });
                      // }}
                      required
                      options={optioncategory}
                    />
                  </>
                </FormGroup>
              </Col>


              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Price" />
                  </Label>

                  <Input
                    required
                    value={product?.phone}
                    type="number"
                    className="radio-in"
                    name="phone"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setProduct({ ...product, phone: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
              size="sm"
              onClick={onDepartHeadCreate}
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Creating
                </div>
              ) : (
                'Add Product'
              )}
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
