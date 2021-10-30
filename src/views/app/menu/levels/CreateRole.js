/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  CreateAdminAction,
  CreateRoleAction,
  ViewAdminAction,
  ViewRoleAction,
} from 'Store/Actions/User/UserActions';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from '../../../../components/common/CustomSelectInput';

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import {
  CreateDoctor,
  UpdateDoctorAction,
} from '../../../../Store/Actions/User/Doctor/createDoctorAction';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../../../Utils/auth.util';
import BestSellers from 'containers/dashboards/BestSellers';
import AdvancedSearch from 'containers/dashboards/AdvancedSearch';
import { Link, NavLink } from 'react-router-dom';
import products from '../../../../data/products';
import AddNewSurveyModal from 'containers/applications/AddNewSurveyModal';
import AddNewModal from 'containers/pages/AddNewModal';
import AddNewTodoModal from 'containers/applications/AddNewTodoModal';
import ModalExample from './ModelTo';
import data from 'data/notifications';
import { object } from 'prop-types';
import { objectOf } from 'prop-types';

export default function CreateRole(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [role, setRole] = useState(role_obj);
  const [name, setName] = useState('');
  const [user_role_id, setUser_role_id] = useState('');
  const [nameTitle, setNameTitle] = useState('');
  const [title, setTitle] = useState('');



  const role_obj = {
    name: '',
    category: {
      user_role_id: 0,
      name: '',
      title: '',
      right: [],
    },
  };
  const onRoleCreate = async () => {
    setLoading(true);
    if (
      role?.name === '' &&
      role?.category?.user_role_id === 0 &&
      role?.category?.title === '' &&
      role?.category?.name === ''
    ) {
      NotificationManager.error('Enter valid Details', 'Error', 5000, null, '');
      setLoading(false);

      return;
    } else {
      let apiData = {
        name: name,
        category: {
          user_role_id: Number(user_role_id),
          name: nameTitle,
          title: title,
          rights: [],
        },
      };
        let res = await dispatch(CreateRoleAction(apiData));
      if (res) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        setLoading(false);

        // props.history.push('/app/menu/levels/ViewRole');
      }
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="Create Role" />
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
                    value={name}
                    className="form-control"
                    name="name"
                    type="test"
                    // validate={validateEmail}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="User Role ID" />
                  </Label>

                  <Input
                    required
                    value={user_role_id}
                    className="form-control"
                    name="id"
                    type="number"
                    onChange={(e) => setUser_role_id(e.target.value)}
                  />
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Role Name" />
                  </Label>
                  <Input
                    required
                    value={nameTitle}
                    className="form-control"
                    name="password"
                    type="text"
                    //   validate={validate}
                    onChange={(e) => setNameTitle(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Role Title" />
                  </Label>
                  <Input
                    required
                    value={title}
                    className="form-control"
                    name="password"
                    type="text"
                    //   validate={validate}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              className="btn btn-primary"
              // type="submit"
              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={onRoleCreate}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              Add Role
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
