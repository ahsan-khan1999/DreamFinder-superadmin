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
import { CreateDepartmentHead } from 'Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';
import { CreateProducts } from 'Store/Actions/ConcordProduct/ProductAction';
import { CreateProductCategories } from 'Store/Actions/ConcordProductCategory/ProductCategoryAction';

export default function CreateProductCategory({ history }) {
  const dispatch = useDispatch();

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

  const productcategory_obj = {
    name: '',

    category: '',

    description: '',
  };

  const loading = useSelector((state) => state?.productCategoryReducer?.loader);
  const [productcategory, setProductcategory] = useState(productcategory_obj);

  const onProductCategoryCreate = async () => {
    if (
      productcategory?.name === '' &&
      productcategory?.category === '' &&
      productcategory?.description === ''
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
      let res = await dispatch(CreateProductCategories({ ...productcategory }));

      if (res) {
        NotificationManager.success(
          'Product Category Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/stocks-management/viewProductCategory');
      }
    }
  };

  const handleChangeToView = () => {
    history.push('/app/stocks-management/viewProductCategory');
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
          <IntlMessages id="Create Product Category" />
        </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Name"/>
                  </Label>

                  <Input
                    required
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setProductcategory({ ...productcategory, name: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Category" />
                  </Label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      required
                      onChange={(e, index) => {
                        setProductcategory({ ...productcategory, category: e.value })
                      }}
                      options={option_static_Category}
                    />
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Description" />
                  </Label>
                      <Input
                       type="textarea"
                       className="form-control"
                       name="description"
                       onChange={(e) =>
                        setProductcategory({ ...productcategory, description: e.target.value })
                       }
                      />
                </FormGroup>
              </Col>
            </Row>

            <Button
                style={{backgroundColor:'#0066b3'}}
              size="sm"
              onClick={onProductCategoryCreate}
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp; Creating
                </div>
              ) : (
                'Add Product Category'
              )}
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
