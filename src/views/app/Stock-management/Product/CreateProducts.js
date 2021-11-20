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
import AddNewSurveyModal from 'containers/applications/AddNewSurveyModal';
import AddNewModal from 'containers/pages/AddNewModal';
import AddNewTodoModal from 'containers/applications/AddNewTodoModal';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CreateDepartmentHead } from 'Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import {
  CreateProducts,
  getCategory,
} from 'Store/Actions/ConcordProduct/ProductAction';
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';
import axios from 'axios';
import AddBulkUploadModal from './AddProductInBulkModal';
import { TrainRounded } from '@mui/icons-material';

export default function CreateProduct({ history }) {
  const [totalPrice, setTotalPrice] = useState(0);
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

  const [imageUploadData, setImageUploadData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingFileUpload, setLoadingFileUpload] = useState(false);
  let [show, setShow] = useState(false);
  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);

  useEffect(() => {
    dispatch(StaticDataGet());
  }, []);
  const product_obj = {
    name: '',

    category_uid: '',

    price: 0,

    formula: '',

    product_image: imageUploadData?.product__image__url,

    barcode: '',

    description: '',
    code: '',
    pack_size: '',
    total_price: 0,
    vat_rate: 0,
  };

  // const loading = useSelector((state) => state?.productReducer?.loading);
  const getProductCategory = useSelector(
    (state) => state?.productReducer?.getProductCategory
  );
  const getProductCategoryloader = useSelector(
    (state) => state?.productReducer?.getProductCategoryloader
  );

  const [product, setProduct] = useState(product_obj);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [file, setFile] = useState();
  let optioncategory = [];
  getProductCategory?.filter((item) =>
    optioncategory.push({
      label: item?.name,
      value: item?.uid,
      key: item?.uid,
    })
  );
  // console.log(getProductCategory, 'getProductCategory');

  const onDepartHeadCreate = async () => {
    if (
      product?.name === ''
      // product?.category_uid === '' &&
      // product?.price === ''
    ) {
      setLoading(true);

      NotificationManager.error(
        'Please Enter Required Field',
        'Error',
        3000,
        null,
        ''
      );
      setLoading(false);
      return;
    } else {
      setLoading(true);
      let cal = product?.price + product?.vat_rate;
      let apiData = {
        ...product,
        product_image: imageUploadData?.product__image__url,
        total_price: cal,
        // vat_rate:`${product?.vat_rate}.00`)
      };

      // console.log(apiData);
      let res = await dispatch(CreateProducts(apiData));

      if (res) {
        NotificationManager.success(
          'Products Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        setLoading(false);

        history.push('/app/stocks-management/viewProduct');
      }

    }
  };

  const handleChangeToView = () => {
    history.push('/app/stocks-management/viewProduct');
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
    <>
      <Card>
        <CardBody>
          <Button
            onClick={handleChangeToView}
            style={{ marginRight: '20px', backgroundColor: '#0066b3' }}
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
                      <IntlMessages id="Select" />
                      {selectedCategory}
                    </label>

                    <>
                      {getProductCategoryloader ? (
                        <div className="">
                          <Loader
                            height={18}
                            width={18}
                            type="Oval"
                            color="#0066b3"
                          />
                          &nbsp;
                        </div>
                      ) : (
                        <Select
                          required
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          onChange={(e) =>
                            setProduct({ ...product, category_uid: e.value })
                          }
                          required
                          options={optioncategory}
                        />
                      )}
                    </>
                  </FormGroup>
                </Col>
                {/* New Field Addes */}
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Code" />
                    </Label>

                    <Input
                      required
                      value={product?.code}
                      type="text"
                      className="radio-in"
                      name="phone"
                      // validate={validateEmail}
                      // onChange={(e) => setNumber()}
                      onChange={(e) =>
                        setProduct({ ...product, code: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="VAT Price" />
                    </Label>

                    <Input
                      required
                      value={product?.vat_rate}
                      type="number"
                      className="radio-in"
                      name="phone"
                      // validate={validateEmail}
                      // onChange={(e) => setNumber()}
                      onChange={(e) =>
                        setProduct({
                          ...product,
                          vat_rate: Number(e.target.value),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Pack Size" />
                    </Label>

                    <Input
                      required
                      value={product?.pack_size}
                      type="number"
                      className="radio-in"
                      name="phone"
                      // validate={validateEmail}
                      // onChange={(e) => setNumber()}
                      onChange={(e) =>
                        setProduct({ ...product, pack_size: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>

                {/* New Fields */}
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
                      onChange={(e) => {
                        setProduct({
                          ...product,
                          price: Number(e.target.value),
                        });
                      }}
                    />
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Formula Name" />
                    </Label>

                    <Input
                      required
                      // value={product.formula}
                      className="form-control"
                      name="formula"
                      onChange={(e) =>
                        setProduct({ ...product, formula: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                {/* <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <IntlMessages id="Total Price" />
                    </Label>

                    <Input
                      required
                      value={calculatedPrice}
                      className="form-control"
                      disabled
                      name="totalPrice"
                      
                    />
                  </FormGroup>
                </Col> */}

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
                      name="formula"
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
              </Row>

              <Button
                style={{ backgroundColor: '#0066b3' }}
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
              <Button
                className="btn btn-primary ml-1"
                style={{ 'background-color': '#0066b3' }}
                size="sm"
                onClick={showModal}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                Add Bulk
              </Button>
            </Form>
          </Formik>
          <div style={{ marginTop: '30px' }} />
        </CardBody>
      </Card>
      <AddBulkUploadModal
        show={show}
        handleClose={hideModal}
        history={history}
      />
    </>
  );
}
