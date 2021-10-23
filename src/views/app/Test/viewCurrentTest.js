/* eslint-disable */

import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { UpdateTestAction } from 'Store/Actions/TestsAction/testActions';
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
export default function viewCurrentTest(props) {
  const currentTest = props?.location?.state?.item;
  const [selectedCategory, setSelectedCategory] = useState(
    currentTest?.category?.name
  );

  const [name, setName] = useState(currentTest?.name);
  const [currency, setCurrency] = useState({
    id: currentTest?.currency?.id,
    name: currentTest?.currency?.name,
  });
  const [price, setPrice] = useState(currentTest?.price);
  const [categoryId, setCategoryId] = useState(
    currentTest?.category?.category_id
  );
  const [status, setStatus] = useState({
    id: currentTest?.status?.id,
    name: currentTest?.status?.name,
  });

  let view = props?.location?.state?.view;
  const [viewTest, setViewTest] = useState(view);
  // console.log(name, currency, price, status, selectedCategory);

  const handleChangeToView = () => {
    props.history.push('/app/Test/ViewTest');
  };
  const editTest = () => {
    setViewTest(false);
  };

  const readCategory = () => {
    let res = dispatch(ReadCategory());
  };
  useEffect(() => {
    readCategory();
  }, []);

  const category = useSelector((state) => state?.ViewTestReducer?.category);

  const dispatch = useDispatch();
  const editTestField = async () => {
    let apiData = {
      status: status,
      price: price,
      currency: currency,
      name: name,
      test_id: currentTest?.test_id,
      category_id: categoryId,
    };
    let res = await dispatch(UpdateTestAction(apiData));
    if (res) {
      NotificationManager.success(
        'Successfully Update',
        'SUCCESS',
        5000,
        '',
        ''
      );
      props.history.push('/app/Test/viewTest');
    }
  };

  const getTestCategoryId = () => {
    category?.map((item) =>
      item?.name === selectedCategory ? setCategoryId(item?.category_id) : ''
    );
  };

  useEffect(() => {
    getTestCategoryId();
  }, [selectedCategory]);
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            className="btn-btn-secondary"
            onClick={handleChangeToView}
            style={{ marginRight: '10px', 'background-color': '#003766' }}
          >
            Back
          </Button>
        </CardTitle>
        <CardTitle>
          {/* <IntlMessages id="View Test" /> */}
          <h4>{viewTest ? 'View Test' : 'Edit Test'}</h4>
        </CardTitle>

        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Name</h6>
                  </Label>
                  {viewTest === true ? (
                    <span>
                      <p>{currentTest?.name}</p>
                    </span>
                  ) : (
                    <Input
                      type="text"
                      value={name}
                      defaultValue={currentTest?.name}
                      onChange={(e) => setName(e.target.value)}
                    ></Input>
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Currency</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentTest?.currency?.name}</p>
                    </span>
                  ) : (
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-slot-duration"
                      //   value={currency}

                      // defaultValue={currentTest?.currency?.name}
                      defaultValue={{
                        label: currentTest?.currency?.name,
                        value: currentTest?.currency?.name,
                        key: currentTest?.currency?.id,
                      }}
                      onChange={(val) =>
                        setCurrency({ id: val?.key, name: val?.value })
                      }
                      options={currencyOption}
                    />
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Price</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentTest?.price}</p>
                    </span>
                  ) : (
                    <Input
                      type="text"
                      value={price}
                      defaultValue={currentTest?.price}
                      onChange={(e) => setPrice(e.target.value)}
                    ></Input>
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Category</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentTest?.category?.name}</p>
                    </span>
                  ) : (
                    <Input
                      type="select"
                      className=""
                      // value={selectedSolt}
                      // defaultValue={selectedCategory}
                      defaultValue={{
                        label: currentTest?.category?.name,
                        value: currentTest?.category?.name,
                        key: currentTest?.category?.id,
                      }}
                      onChange={(val) => setSelectedCategory(val.target.value)}
                    >
                      {category?.map((item, index) => (
                        <option value={item?.name} key={index + 1}>
                          {item?.name}
                        </option>
                      ))}
                    </Input>
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <label>
                    <h6>Status</h6>
                  </label>
                  {viewTest ? (
                    <span
                      style={{
                        color: props?.value === 'active' ? 'green' : 'red',
                        'font-size': '0.9rem',
                      }}
                    >
                      <p>{currentTest?.status?.name?.toUpperCase()}</p>
                    </span>
                  ) : (
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-slot-duration"
                      //   value={status}
                      defaultValue={{
                        label: currentTest?.status?.name,
                        value: currentTest?.status?.name,
                        key: currentTest?.status?.id,
                      }}
                      onChange={(val) =>
                        setStatus({ name: val?.value, id: val?.key })
                      }
                      options={statusOPtion}
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>
            {viewTest ? (
              <Button
                className="btn-btn-secondary"
                onClick={editTest}
                style={{ 'background-color': '#003766' }}
              >
                Edit Test
              </Button>
            ) : (
              <Button
                className="btn-btn-secondary"
                onClick={editTestField}
                style={{ 'background-color': '#003766' }}
              >
                Save
              </Button>
            )}
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
