/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Button, Card, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { getToken, searchArray, testSearch } from '../../../../Utils/auth.util';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { doc } from 'prettier';
import { items } from 'data/carouselItems';
import { useDispatch, useSelector } from 'react-redux';
// import { DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

import { DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { UncontrolledDropdown } from 'reactstrap';
import Loader from 'react-loader-spinner';
import {
  View_Doctor,
  getItemIsEdit,
} from '../../../../Store/Actions/User/Doctor/viewDoctorAction';
import {
  AdminTable,
  ReactTableDivided,
  ReactTableWithPaginationCard,
  // ReactTableDivided,
} from 'containers/ui/ReactTableCards';
import {
  ViewAdminAction,
  ViewRoleAction,
} from 'Store/Actions/User/UserActions';
const ViewAdmin = ({ match, history }) => {
  useEffect(() => {
    getAdmin();
  }, []);
  const dispatch = useDispatch();
  const getAdmin = () => {
    dispatch(ViewAdminAction(history));
  };
  const [doc, setDoc] = useState();
  const user = useSelector((state) => state?.ViewUserReducer?.admin);
  const loading = useSelector((state) => state?.ViewUserReducer?.loading);
  // useEffect(() => {
  //   setDoc();
  // }, [user]);
  const [search, setSearch] = useState('');

  const changeRoute = (item) => {
    history.push('/app/menu/levels/EditAdmin', item);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    setDoc(testSearch(user, search));
  };

  const handleAdd = () => {
    history.push('/app/menu/levels/CreateAdmin');
  };

  let header = ['Name', 'Email', 'Role', 'Actions'];

  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Admin</h4>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Col lg={12}>
            <Button
              onClick={handleAdd}
              className="mb-3"
              style={{
                marginBottom: '15px',
                backgroundColor: '#fed000',
                marginTop: '10px',
              }}
            >
              Add User
            </Button>
          </Col>
        </Row>

        {/* <Button
          onClick={handleAddStaff}
          style={{
            marginBottom: '15px',
            backgroundColor: '#003766',
            marginTop: '10px',
          }}
        >
          Add Delivery Staff
        </Button> */}
        <Row>
          <Colxx xxs="12" className="mb-4">
            {loading ? (
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Loader
                  type="Puff"
                  color="#fed000"
                  height={100}
                  width={100}
                  // color="#003766"
                />
              </div>
            ) : (
              <AdminTable
                header={header}
                data={user}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
export default ViewAdmin;
{
  /*  */
}
