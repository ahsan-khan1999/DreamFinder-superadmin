/* eslint-disable */

import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
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
} from 'reactstrap';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTestAction } from 'Store/Actions/TestsAction/testActions';
import { ReadCategory } from 'Store/Actions/TestsAction/readCategoryAction';
import { NotificationManager } from 'components/common/react-notifications';
const currencyOption = [
  { label: 'BDT', value: 'bdt', key: 1 },
  { label: 'USD', value: 'usd', key: 2 },
];
const statusOPtion = [
  { label: 'Active', value: 'active', key: 1 },
  { label: 'Inactive', value: 'inactive', key: 2 },
];
export default function createTest({ history }) {
  const readCategory = () => {
    let res = dispatch(ReadCategory());
  };
  useEffect(() => {
    readCategory();
  }, []);
  const category = useSelector((state) => state?.ViewTestReducer?.category);
  let options = category?.map((item, index) => {return{label:item?.name,value:item?.name,key:item?.category_id}});
  const [selectedCategory, setSelectedCategory] = useState(options[0]);

  const [name, setName] = useState();
  const [currency, setCurrency] = useState();
  const [price, setPrice] = useState();
  const [categoryId, setCategoryId] = useState();
  const [status, setStatus] = useState();
  const dispatch = useDispatch();
  const onCreateTest = async () => {
    getTestCategoryId()
    let apiData = {
      name: name,
      category_id: selectedCategory?.id,
      price: price,
      currency: currency,
      status: status,
    };
    // console.log(apiData);
    if (
      name === undefined &&
      categoryId === undefined &&
      price === undefined &&
      currency === undefined &&
      status === undefined
    ) {
      NotificationManager.error('Please Enter Details', 'Error', 5000, '', '');
      return;
    } else {
      let res = await dispatch(CreateTestAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Create Test',
          'Sucess',
          5000,
          '',
          ''
        );
        history.push('/app/Test/viewTest');
      }
    }
  };

  const getTestCategoryId = () => {
   
      category?.map((item) =>
        item?.name === selectedCategory ? setCategoryId(item?.category_id) : ''
      );
    }
  

 

  // console.log(selectedCategory);
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Test" />
        </CardTitle>
        <div style={{ marginBottom: '30px' }}></div>
        <Formik
        // initialValues={formikData.initialValues}
        // onSubmit={formikData.handleSubmit}
        >
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Test Name</h6>
                  </Label>

                  <Input
                    required
                    value={name}
                    className="form-control"
                    name="name"
                    // validate={validateEmail}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              {/* <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Category</h6>
                  </Label>

                  <Input
                    type="select"
                    className=""
                    defaultValue={selectedCategory}
                    onChange={(val) => setSelectedCategory(val.target.value)}
                  >
                    {
                      // setSelectedCategory(category[0]?.name),

                    category?.map((item, index) => (
                      <option value={item?.name} key={index + 1}>
                        {item?.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col> */}

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Price</h6>
                  </Label>

                  <Input
                    required
                    value={price}
                    className="form-control"
                    name="email"
                    type="email"
                    // validate={validate}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormGroup>
              </Col>
 <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Category</h6>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-slot-duration"
                    //   value={currency}

                    defaultValue={options[0]}
                    onChange={(val) =>
                      setSelectedCategory({ id: val?.key, name: val?.value })
                    }
                    options={options}
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Currency</h6>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-slot-duration"
                    //   value={currency}

                    defaultValue={currency?.name}
                    onChange={(val) =>
                      setCurrency({ id: val?.key, name: val?.value })
                    }
                    options={currencyOption}
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Status</h6>
                  </Label>
                  <Select
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-slot-duration"
                    //   value={status}
                    defaultValue={status?.name}
                    onChange={(val) =>
                      setStatus({  id: val?.key,name: val?.value })
                    }
                    options={statusOPtion}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
                style={{backgroundColor:'#0066b3'}}
              style={{ 'background-color': '#003766' }}
              // type="submit"
              // className={`btn-shadow btn-multiple-state ${
              //   loading ? 'show-spinner' : ''
              // }`}
              size="sm"
              onClick={onCreateTest}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              Add Test
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
