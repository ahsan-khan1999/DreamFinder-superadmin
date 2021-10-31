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
import { CreateProductCategories, UpdateProductCategory } from 'Store/Actions/ConcordProductCategory/ProductCategoryAction';
import apiServices from 'services/requestHandler';

export default function ViewCurrentProductCategory(props) {
  let [buttonName, setButtonName] = useState();
  
  const [thisView, setThisView] = useState(true);
  
  
  const CurrentProductCategory = props?.location?.state;


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

    if (CurrentProductCategory?.status?.name === 'suspended') {
      setButtonName('Active');
    } else if (CurrentProductCategory?.status?.name === 'active') {
      setButtonName('Suspend');
    }
  }, []);


  useEffect(() => {
    dispatch(StaticDataGet());
  }, []);

  const productcategory_obj = {
    name: CurrentProductCategory.name,

    category: CurrentProductCategory.category,

    description: CurrentProductCategory.description,

    uid : CurrentProductCategory.uid,
  };

  const loading = useSelector((state) => state?.productCategoryReducer?.loader);
  const [productcategory, setProductcategory] = useState(productcategory_obj);



  const editProfile = (e) => {
    e.preventDefault();
    setThisView(!thisView);
  };


  const editData = async () => {
    let res = await dispatch(UpdateProductCategory(productcategory));
    if (res) {
      NotificationManager.success(
        'Successful response',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/stocks-management/viewProductCategory');
    }
  };


  
  const handleChangeToView = () => {
    props.history.push('/app/stocks-management/viewProductCategory');
  };


  console.log(CurrentProductCategory,"CurrentProductCategory")

  const suspandDepartmenthead = async () => {
    if (CurrentProductCategory?.status?.name === 'suspended') {
      let apiData = {
        uid: CurrentProductCategory?.uid,
      };
      console.log(apiData);
      let res = await apiServices.suspandproductcategory(apiData);
      console.log(res);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/stocks-management/viewProductCategory');
      } else {
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
        uid: CurrentProductCategory?.uid,
      };
      let res = await apiServices.suspandproductcategory(apiData);
      console.log(res);
      if (res?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/stocks-management/viewProductCategory');
      } else {
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
              className="btn btn-primary"
              onClick={handleChangeToView}
              style={{ marginRight: '20px'}}
            >
              Back
            </Button>
            <IntlMessages id="View Product Category" />
            </>
            ) : (
              
              <>
              <Button
                className="btn btn-primary"
                onClick={editProfile}
                style={{ marginRight: '20px'}}
              >
                Close Edit
              </Button>
              <IntlMessages id="Edit Product Category" />
              </>
              )}
        </CardTitle>

        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                <Label>
                    <h6
                      style={{
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >Name</h6>
                  </Label>

                  {thisView ? (
                  <span>
                    <p>{CurrentProductCategory?.name.toUpperCase()}</p>
                  </span>
         
                  ):(

                  <Input
                    value={productcategory?.name}
                    required
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) =>
                      setProductcategory({ ...productcategory, name: e.target.value })
                    }
                  />
                  )}

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
                    >Select Category</h6>
                  </Label>

                  {thisView ? (
                  <span>
                    <p>{CurrentProductCategory?.category.toUpperCase()}</p>
                  </span>
         
                  ):(
                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      defaultValue={{
                        label:productcategory?.category,
                        value:productcategory?.category
                      }}
                      classNamePrefix="react-select"
                      required
                      onChange={(e, index) => {
                        setProductcategory({ ...productcategory, category: e.value })
                      }}
                      options={option_static_Category}
                    />
                  </>

                  )}

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
                    >Description</h6>
                  </Label>

                  {thisView ? (
                  <span>
                    <p>{CurrentProductCategory?.description ? CurrentProductCategory?.description.toUpperCase() : 'N/A'}</p>
                  </span>
         
                  ):(
                    <Input
                     type="textarea"
                    value={productcategory?.description}
                     className="form-control"
                     name="description"
                     onChange={(e) =>
                      setProductcategory({ ...productcategory, description: e.target.value })
                     }
                    />
                    
                  )}
                </FormGroup>
              </Col>
            </Row>


            {thisView ? (
              <Button
                className="btn btn-primary mr-3"
              
                onClick={editProfile}
              >
              
                Edit Profile
              </Button>
            ) : (
              <Button
                className="btn btn-primary"
              
                onClick={editData}
              >
              
                Save
              </Button>
            )}



            {thisView ? (
              <Button
                className="btn btn-primary"
                onClick={suspandDepartmenthead}
              >
                {buttonName}
              </Button>

            ) : (
                ""
            )}
            {/* <Button
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
            </Button> */}
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
