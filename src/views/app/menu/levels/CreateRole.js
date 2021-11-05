/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  CreateAdminAction,
  CreateRoleAction,
  ViewAdminAction,
  ViewRoleAction,
  ViewStaticDataAction,
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
  const [selectedRole, setSelectedRole] = useState('');
  const [name, setName] = useState('');
  const [user_role_id, setUser_role_id] = useState('');
  const [nameTitle, setNameTitle] = useState('');
  const [title, setTitle] = useState('');

  const role_obj = {
    name: '',
    category: selectedRole,
  };
  const [role, setRole] = useState(role_obj);

  const getStaticData = async () => {
    let res = await dispatch(ViewStaticDataAction());
  };


  useEffect(() => {
    getStaticData();
  }, []);

  const user_role = useSelector((state) => state.ViewUserReducer?.staticData);
  let categoryOption = [];
  console.log(user_role?.user_roles_and_rights);
  user_role?.user_roles_and_rights?.map((item) =>
    categoryOption.push({
      label: item?.name,
      value: item,
      key: item?.user_role_id,
    })
  );
  
  const onRoleCreate = async () => {
    setLoading(true);
    if (role?.name === '') {
      NotificationManager.error('Enter valid Details', 'Error', 5000, null, '');
      setLoading(false);

      return;
    } else {
      setLoading(true);

      let apiData = {
        name: name,
        category: selectedRole,
      };
      console.log(apiData);
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

        props.history.push('/app/menu/levels/ViewRole');
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

                  <Select
                    required
                    components={{ Input: CustomSelectInput }}
                    className="react-select"
                    classNamePrefix="react-select"
                    name="form-field-name-gender"
                    // value={gender}

                    onChange={(val) => {
                      setSelectedRole(val?.value);
                    }}
                    options={categoryOption}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Button
              style={{ backgroundColor: '#0066B3' }}
              // type="submit"
              disabled={loading ? true : false}
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
              <span className="label">
                <IntlMessages id="Add Role" />
              </span>
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
