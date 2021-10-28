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

export default function CreateProductCategory({ history }) {
  const dispatch = useDispatch();

  const productcategory_obj = {
    name: '',

    category: '',

    description: '',
  };

  const loading = useSelector((state) => state?.departmentHeadReducer?.loader);
  const [productcategory, setProductcategory] = useState(productcategory_obj);

  const onProductCategoryCreate = async () => {
    if (
      productcategory?.name === '' &&
      productcategory?.designation === '' &&
      productcategory?.email === '' &&
      productcategory?.address === '' &&
      productcategory?.phone === ''
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
      console.log(productcategory);
      let res = await dispatch(CreateDepartmentHead({ ...productcategory }));

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



  const [categoryarray,setCategoryarray] = useState([]);
  const categoryvalue = [];
  const handleChangeCategory = async (e, index) => {
    let options = e;
    options?.map((item, index) => {
      categoryvalue.push(item?.value);
    }); 
    await setCategoryarray(categoryvalue);
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
                    value={productcategory.name}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setDeparthead({ ...productcategory, name: e.target.value })
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
                      isMulti
                      required
                      onChange={(e, index) => {
                        handleChangeCategory(e, index);
                      }}
                      options={''}
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
                       value={productcategory.name}
                       className="form-control"
                       name="description"
                       // validate={validateEmail}
                       onChange={(e) =>
                        setProductcategory({ ...productcategory, description: e.target.value })
                       }
                      />
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
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
