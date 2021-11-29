/* eslint-disable */

import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import {
  CreateAdminAction,
  CreateRoleAction,
  UpdateRoleAction,
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
import apiServices from 'services/requestHandler';

export default function EditRole(props) {
  let currentRole = props.location.state;
  const [view, setView] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const [loadingEdit, setLoadingEdit] = useState(false);

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [user_role_id, setUser_role_id] = useState('');
  const [nameTitle, setNameTitle] = useState('');
  const [title, setTitle] = useState('');
  const getStaticData = async () => {
    let res = await dispatch(ViewStaticDataAction());
  };

  useEffect(() => {
    getStaticData();
  }, []);

  const user_role = useSelector((state) => state.ViewUserReducer?.staticData);
  let categoryOption = [];
  user_role?.user_roles_and_rights?.map((item) =>
    categoryOption.push({
      label: item?.name,
      value: item,
      key: item?.user_role_id,
    })
  );

  const editProfile = () => {
    setView(false);
  };
  const suspandRole = async () => {
    setLoading(true)
    let res = await apiServices.suspandRoles({ uid: currentRole?.uid });
    if (res?.response_code === 200) {
      NotificationManager.success(
        'Successfully Suspanded',
        'Success',
        5000,
        null,
        ''
      );
    setLoading(false)

      props.history.push('/app/menu/levels/ViewRole');
    } else {
    setLoading(true)

      NotificationManager.success(
        res?.response_message,
        'Error',
        5000,
        null,
        ''
      );
    setLoading(false)

    }
  };
  const editData = async () => {
    setLoadingEdit(true);

    let apiData = {
      uid:currentRole?.uid,
      name: name,
      category: selectedRole,
    };

    let res = await dispatch(UpdateRoleAction(apiData));
    if (res) {
      NotificationManager.success(
        'Successfully Updated',
        'Success',
        5000,
        null,
        ''
      );
      setLoadingEdit(false);

      props.history.push('/app/menu/levels/ViewRole');
    }
    else{
      setLoadingEdit(false);

    }
  };
  const handleBack = () => {
    props.history.push('/app/menu/levels/ViewRole');
  };
  return (
    <Card>
      <CardBody>
        <Button
          className=""
          onClick={handleBack}
          style={{ backgroundColor: '0066B3', marginBottom: '10px' }}
        >
          Back
        </Button>
        <CardTitle>
          <IntlMessages id="View Role" />
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
                  {view ? (
                    <span>{currentRole?.name}</span>
                  ) : (
                    <Input
                      required
                      // value={name}
                      defaultValue={currentRole?.name}
                      className="form-control"
                      name="name"
                      type="test"
                      // validate={validateEmail}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="User Role Category" />
                  </Label>
                  {view ? (
                    <span>
                      <p>{currentRole?.category?.name}</p>
                    </span>
                  ) : (
                    <Select
                      required
                      defaultValue={{
                        label: currentRole?.category?.name,
                        value: currentRole?.category?.name,
                        key: currentRole?.category?.user_role_id,
                      }}
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
                  )}
                </FormGroup>
              </Col>
            </Row>
            {view ? (
              <Button onClick={editProfile}>Edit Role</Button>
            ) : (
              <Button
                className={`btn-shadow btn-multiple-state ${
                  loadingEdit ? 'show-spinner' : ''
                }`}
                onClick={editData}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Save</span>
              </Button>
            )}
            <Button
              //   className="btn btn-primary"
              // type="submit"
              style={{marginLeft:'5px'}}

              className={`btn-shadow btn-multiple-state ${
                loading ? 'show-spinner' : ''
              }`}
              size="sm"
              onClick={suspandRole}
            >
              <span className="spinner d-inline-block">
                <span className="bounce1" />
                <span className="bounce2" />
                <span className="bounce3" />
              </span>
              <span className="label">Suspend Role</span>
            </Button>
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
