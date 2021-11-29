/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
/* eslint-disable */

import React, { useEffect, useState } from 'react';
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
import {
  CreateRegionAction,
  ReadRegionAction,
  UpdateRegionClassificationActionTest,
  // UpdateRegionClassificationAction,
} from '../../../Store/Actions/RegionClassification/regionClassificationAction';
import apiServices from 'services/requestHandler';

const AddRegionModal = (props) => {
  const { handleClose, show, header, id, history, editField, action, cat } =
    props;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // console.log(header, editField);
  const [name, setName] = useState(editField);

  useEffect(() => {
    setName(editField);
  }, [editField]);
  const [category, setCategory] = useState('');
  const onCreateRegion = async (e) => {
    e.preventDefault();

    if (header === 'Add Region') {
      setLoading(true);

      let apiData = {
        name: name,
        category: 'region',
      };
      let res = await dispatch(CreateRegionAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          ''
        );
        setLoading(false);
        dispatch(ReadRegionAction())

        handleClose(true);
      }
    } else if (header === 'Add area') {
      setLoading(true);

      // console.log(header,id,"at prrent area id header");
      let apiData = {
        name: name,
        category: 'area',
        parent_uid: id,
      };
      let res = await dispatch(CreateRegionAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          ''
        );
        setLoading(false);
          dispatch(ReadRegionAction())
        handleClose(true);
      }
    } else if (header === 'Add thana') {
      setLoading(true);

      let apiData = {
        name: name,
        category: 'thana',
        parent_uid: id,
      };
      let res = await dispatch(CreateRegionAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          ''
        );
        setLoading(false);
          dispatch(ReadRegionAction())
        handleClose(true);
      }
    } else if (header === 'Add teritory') {
      setLoading(true);

      let apiData = {
        name: name,
        category: 'territory',
        parent_uid: id,
      };
      let res = await dispatch(CreateRegionAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          ''
        );
        handleClose(true);
        dispatch(ReadRegionAction())
        setLoading(false);
      }
    } else if (header === 'Add market') {
      setLoading(true);
      let apiData = {
        name: name,
        category: 'market',
        parent_uid: id,
      };
      let res = await dispatch(CreateRegionAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          ''
        );
          setLoading(false)
        handleClose(true);
        dispatch(ReadRegionAction())
        // history.push('/app/TreeView/RegionTreeView')
      } else {
        setLoading(false);
      }
    }
  };

  const editRegion = async (e) => {
    e.preventDefault();
    if (cat === 'region') {
      setLoading(true);

      // console.log(name);
      let apiData = {
        name: name,
        // category: 'region',
        uid: id,
      };
      let res = await dispatch(UpdateRegionClassificationActionTest(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Updated',
          'Success',
          5000,
          ''
        );
        setLoading(false);
        dispatch(ReadRegionAction());

        handleClose(true);
        // history.push('/app/TreeView/RegionTreeView')
      }
    } else if (cat === 'area') {
      // console.log(name);
      let apiData = {
        name: name,
        // category: 'area',
        uid: id,
      };
      let res = await dispatch(UpdateRegionClassificationActionTest(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Updated',
          'Success',
          5000,
          ''
        );
        handleClose(true);
        dispatch(ReadRegionAction())
        // history.push('/app/TreeView/RegionTreeView')
      }
    } else if (cat === 'thana') {
      // console.log(name);
      let apiData = {
        name: name,
        // category: 'thana',
        uid: id,
      };
      let res = await dispatch(UpdateRegionClassificationActionTest(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Updated',
          'Success',
          5000,
          ''
        );
        handleClose(true);
        // dispatch(ReadRegionAction())
        // history.push('/app/TreeView/RegionTreeView')
      }
    } else if (cat === 'territory') {
      setLoading(true)
      // console.log(name);
      let apiData = {
        name: name,
        // category: 'territory',
        uid: id,
      };
      let res = await dispatch(UpdateRegionClassificationActionTest(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Updated',
          'Success',
          5000,
          ''
        );
      setLoading(false)
          dispatch(ReadRegionAction())
        handleClose(true);
      }
    } else if (cat === 'market') {
      setLoading(true)

      let apiData = {
        name: name,
        // category: 'market',
        uid: id,
      };
      let res = await dispatch(UpdateRegionClassificationActionTest(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Updated',
          'Success',
          5000,
          ''
        );
      setLoading(false)
          dispatch(ReadRegionAction())
        handleClose(true);
      }
    }
  };

  // let showHideClassName = show ? 'display-block' : 'display-none';
  // console.log(show,"show value",showHideClassName);
  return (
    <Modal isOpen={show} size="sm" centered style={{ boxShadow: 'none' }}>
      <ModalHeader
        toggle={handleClose}
        style={{ padding: '15px 20px' }}
        className="text-capitalize"
      >
        {action === 'edit' ? `Edit ${cat}` : header}{' '}
      </ModalHeader>
      <ModalBody>
        <Formik
        // initialValues={formikData.initialValues}
        // onSubmit={formikData.handleSubmit}
        >
          <Form onSubmit={action === 'edit' ? editRegion : onCreateRegion}>
            <Row className="h-100">
              <Col lg={12}>
                <FormGroup>
                  <Label>
                    <h6 className="text-capitalize">Name</h6>
                  </Label>
                  {action === 'edit' ? (
                    <Input
                      required
                      value={name}
                      className="form-control"
                      name="name"
                      defaultValue={name}
                      // validate={validateEmail}
                      onChange={(e) => setName(e.target.value)}
                    />
                  ) : (
                    <Input
                      required
                      value={name}
                      className="form-control"
                      name="name"
                      // defaultValue={name}
                      // validate={validateEmail}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                </FormGroup>
              </Col>

              {/* <Col lg={12}>
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
              </Col> */}
            </Row>

            <Button
              style={{ backgroundColor: '#0066b3' }}
              // type="submit"
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={action === 'edit' ? editRegion : onCreateRegion}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Save</span>
            </Button>
          </Form>
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export default AddRegionModal;
