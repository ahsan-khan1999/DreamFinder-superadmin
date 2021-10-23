/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
/* eslint-disable */

import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Input,
  CardBody,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';
import { Row, Card, CardTitle, Label, FormGroup } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import AddRegionForm from './AddRegionForm';
import IntlMessages from 'helpers/IntlMessages';
import { NotificationManager } from 'components/common/react-notifications';
import { CreateRegionAction } from '../../../Store/Actions/RegionClassification/regionClassificationAction';

const AddRegionModal = (props) => {
  const { handleClose, show } = props;
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const onCreateRegion = async () => {
    let apiData = {
      name: name,
      category: category,
    };
    console.log(apiData);
    let res = await dispatch(CreateRegionAction(apiData));
    if(res){
        NotificationManager.success("Successfully Created","Success",5000,'')

    }
  };
  // let showHideClassName = show ? 'display-block' : 'display-none';
  // console.log(show,"show value",showHideClassName);
  return (
    <Modal isOpen={show} size="sm" centered style={{ boxShadow: 'none' }}>
      <ModalHeader toggle={handleClose} style={{ padding: '15px 20px' }}>
        Add Region
      </ModalHeader>
      <ModalBody>
        <Formik
        // initialValues={formikData.initialValues}
        // onSubmit={formikData.handleSubmit}
        >
          <Form>
            <Row className="h-100">
              <Col lg={12}>
                <FormGroup>
                  <Label>
                    <h6>Region Name</h6>
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

              <Col lg={12}>
                <FormGroup>
                  <Label>
                    <h6>Category</h6>
                  </Label>

                  <Input
                    required
                    value={category}
                    className="form-control"
                    name="email"
                    type="text"
                    // validate={validate}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
              style={{ 'background-color': '#003766' }}
              // type="submit"
              // className={`btn-shadow btn-multiple-state ${
              //   loading ? 'show-spinner' : ''
              // }`}
              size="sm"
              onClick={onCreateRegion}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              Add Region
            </Button>
          </Form>
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default AddRegionModal;
