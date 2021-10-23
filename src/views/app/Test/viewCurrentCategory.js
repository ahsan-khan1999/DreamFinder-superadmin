/* eslint-disable */
import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { UpdateCategoryAction } from 'Store/Actions/TestsAction/testActions';

export default function viewCurrentCategory(props) {
  const currentCategory = props?.location?.state?.item;
  const view = props?.location?.state?.view;
  const [name, setName] = useState(currentCategory?.name);
  const [viewTest, setViewTest] = useState(view);
  const handleChangeToView = () => {
    props.history.push('/app/Test/viewCategory');
  };
  const editTest = () => {
    setViewTest(false);
  };

  const dispatch = useDispatch();
  const editTestField = async () => {
    let apiData = {
      category_id: currentCategory?.category_id,
      name: name,
    };
    if (name === undefined || name === null || name === '') {
      NotificationManager.error('Please Enter Details', 'ERROR', 5000, '', '');
      return;
    } else {
      let res = await dispatch(UpdateCategoryAction(apiData));
      if (res) {
        NotificationManager.success(
          'Sucessfully Updated',
          'SUCESS',
          5000,
          '',
          ''
        );
        props.history.push('/app/Test/viewCategory');
        return;
      }
    }
  };

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
          <h4>{viewTest ? 'View Category' : "Edit Category"}</h4>
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
                      <p>{currentCategory?.name}</p>
                    </span>
                  ) : (
                    <Input
                      type="text"
                      value={name}
                      defaultValue={currentCategory?.name}
                      onChange={(e) => setName(e.target.value)}
                    ></Input>
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
                Edit Category
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
