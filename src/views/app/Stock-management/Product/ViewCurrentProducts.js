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
import { getCategory, UpdateProduct } from 'Store/Actions/ConcordProduct/ProductAction';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';
import axios from 'axios';
import apiServices from 'services/requestHandler';

export default function ViewCurrentProduct(props) {





  let [buttonName, setButtonName] = useState();
  
  const [thisView, setThisView] = useState(true);
  
  
  const CurrentProduct = props?.location?.state;


  const [imageUploadData, setImageUploadData] = useState({});
  const [loadingFileUpload, setLoadingFileUpload] = useState(false);
  const [file, setFile] = useState();


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

    if (CurrentProduct?.status?.name === 'suspended') {
      setButtonName('Active');
    } else if (CurrentProduct?.status?.name === 'active') {
      setButtonName('Suspend');
    }
  }, []); 
  
  
  useEffect(() => {
    dispatch(StaticDataGet());
  }, []);

  const product_obj = {
    name: CurrentProduct?.name,

    category_uid: CurrentProduct?.category?.uid,

    price: CurrentProduct?.price,

    formula: CurrentProduct?.formula,

    product_image: imageUploadData?.product__image__url,

    barcode: CurrentProduct?.barcode,

    description: CurrentProduct?.description,

    uid: CurrentProduct?.uid
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
  

  const editProfile = (e) => {
    e.preventDefault();
    setThisView(!thisView);
  };


  const editData = async () => {
    let apiData = {
      ...product,
      uid: CurrentProduct?.uid,
      product_image: imageUploadData?.product__image__url,
    };
    let res = await dispatch(UpdateProduct(apiData));
    if (res) {
      NotificationManager.success(
        'Successful response',
        'Success',
        5000,
        null,
        ''
      );
      props.history.push('/app/stocks-management/viewProduct');
    }
  };


  
  const handleChangeToView = () => {
    props.history.push('/app/stocks-management/viewProduct');
  };



  const suspandDepartmenthead = async () => {
    if (CurrentProduct?.status?.name === 'suspended') {
      let apiData = {
        uid: CurrentProduct?.uid,
      };
      console.log(apiData);
      let res = await apiServices.suspandproducts(apiData);
      console.log(res);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Activated',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/stocks-management/viewProduct');
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
        uid: CurrentProduct?.uid,
      };
      let res = await apiServices.suspandproducts(apiData);
      console.log(res);
      if (res?.response_code === 200) {
        NotificationManager.success(
          'Sucessfully Suspaned',
          'Sucess',
          5000,
          null,
          ''
        );
        props.history.push('/app/stocks-management/viewProduct');
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

  const uploadFile = async (event) => {
    event.preventDefault();
    let formdata = new FormData();
    const authToken = JSON.parse(localStorage.getItem('token'));
    if (file === undefined || file === null) {
      NotificationManager.error('Enter Details', 'Error', 5000, '');
      setLoading(false);
      return;
    } else {
      formdata.append('file', file[0]);
      formdata.append('purpose', 'product__image');
      let res = await axios.post(
        'https://concord-backend-m2.herokuapp.com/api/media/upload/image',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-session-key': authToken.token,
            'x-session-type': authToken.type,
          },
        }
      );
      setLoadingFileUpload(false);
      setImageUploadData(res?.data?.response_data);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Successfully Uploaded Image',
          'Success',
          5000,
          ''
        );
        // props.history.push('/app/Reports/viewReports');
        setLoadingFileUpload(false);
      } else {
        NotificationManager.error(
          res?.data?.response_message,
          'Error',
          5000,
          ''
        );
        setLoadingFileUpload(false);
      }
      setLoadingFileUpload(false);
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
              style={{ marginRight: '20px',backgroundColor:'#0066b3'}}
            >
              Back
            </Button>
            <IntlMessages id="Product" />
            </>
            ) : (
              
              <>
              <Button
                onClick={editProfile}
                style={{ marginRight: '20px' , backgroundColor:'#0066b3'}}
              >
                Close Edit
              </Button>
              <IntlMessages id="Edit Product" />
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
                    >Name</h6>
                  </Label>

                  <span>
                    <p>{CurrentProduct?.name.toUpperCase()}</p>
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
                    >Category</h6>
                  </Label>

                  <span>
                    <p>{CurrentProduct?.category?.name.toUpperCase()}</p>
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
                    >Price</h6>
                  </Label>
                  <span>
                    <p>{CurrentProduct?.price}</p>
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
                    >Created By</h6>
                  </Label>


                  <span>
                    <p>{CurrentProduct?.created_by?.name.toUpperCase()}</p>
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
                    >Formula</h6>
                  </Label>
                  <span>
                    <p>{CurrentProduct?.formula ? CurrentProduct?.formula : 'N/A'}</p>
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
                    >BarCode</h6>
                  </Label>
                  <span>
                    <p>{CurrentProduct?.barcode ? CurrentProduct?.barcode : 'N/A' }</p>
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
                    >Description</h6>
                  </Label>
                  <span>
                    <p>{CurrentProduct?.description ? CurrentProduct?.description : 'N/A' }</p>
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
                    >Product Image</h6>
                  </Label>
                  <span>
                    {CurrentProduct?.product_image ? 
                    (
                      <img src={CurrentProduct?.product_image} alt="" width="20%" height="100%"/>

                    ):
                    (
                      <p>{'N/A'}</p>  
                      
                    )
                  }
                    
                  </span>
                </FormGroup>
              </Col>
              
              
              </>
            ):(
              <>
              
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Name" />
                  </Label>

                  <Input
                    required
                    value={product?.name}
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
                      defaultValue={{
                        label:CurrentProduct.category.category,
                        value:CurrentProduct.category.category
                      }}
                      onChange={(e) => {
                        dispatch(getCategory(e.value));
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
                      defaultValue={{
                        label:CurrentProduct.category.name,
                        value:CurrentProduct.category.uid
                      }}
                      onChange={(e) => 

                        setProduct({ ...product, category_uid: e.value })
                    }
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
                    value={product?.price}
                    type="number"
                    className="radio-in"
                    name="phone"
                    // validate={validateEmail}
                    // onChange={(e) => setNumber()}
                    onChange={(e) =>
                      setProduct({ ...product, price: Number(e.target.value) })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Formula" />
                  </Label>

                  <Input
                    required
                    value={product?.formula}
                    className="form-control"
                    name="formula"
                    onChange={(e) =>
                      setProduct({ ...product, formula: e.target.value })
                    }
                  />
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
                    value={product?.description}
                    name="description"
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="BarCode" />
                  </Label>

                  <Input
                    required
                    className="form-control"
                    name="barcode"
                    value={product?.barcode}
                    onChange={(e) =>
                      setProduct({ ...product, barcode: e.target.value })
                    }
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <div className="form-row">
                  <div className="form-group col-md-9">
                    <label className="">Select File :</label>
                    <input
                      type="file"
                      className="form-control"
                      name="upload_file"
                      onChange={async (e) => {
                        await setFile(e.target.files);
                      }}
                    />
                  </div>
                  <div
                    className="form-group col-md-3"
                    style={{ marginTop: '25px' }}
                  >
                    <Button
                       className={`btn-shadow btn-multiple-state ${
                        loadingFileUpload ? 'show-spinner' : ''
                      }`}
                      size="sm"
                      onClick={uploadFile}
                      variant="outlined"
                    >
                      Save
                    </Button>
                  </div>
                </div>
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
              
                Save
              </Button>
            )}



            {thisView ? (
              <Button
                style={{backgroundColor:'#0066b3'}}

                onClick={suspandDepartmenthead}
              >
                {buttonName}
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
