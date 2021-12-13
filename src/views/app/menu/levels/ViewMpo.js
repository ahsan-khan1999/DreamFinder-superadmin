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
import dot from '../../../../assets/img/dot.png';
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
  ViewDirectorAction,
  ViewMPOManagerAction,
  ViewRegionalSalesManagerManagerAction,
  ViewRoleAction,
  ViewSalesManagerManagerAction,
} from 'Store/Actions/User/UserActions';
const ViewMpo = ({ match, history }) => {
  const dispatch = useDispatch();
  const getAdmin = () => {
    dispatch(ViewMPOManagerAction());
  };

  useEffect(() => {
    getAdmin();
  }, []);
  const [doc, setDoc] = useState();
  const user = useSelector((state) => state?.ViewUserReducer?.mpo);
  const loading = useSelector((state) => state?.ViewUserReducer?.loading);
  // useEffect(() => {
  //   setDoc();
  // }, [user]);
  const [search, setSearch] = useState('');

  const changeRoute =  (item) => {
    history.push('/app/menu/levels/EditMpo', item);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setDoc(testSearch(user, search));
  };

  const handleAdd = () => {
    history.push('/app/menu/levels/CreateMpo');
  };
  const handleAddStaff = () => {
    history.push('/app/menu/levels/CreateDeliveryStaff');
  };

  let header = [
    'Name',
    'DOB',
    'Designation',
    'Gender',
    'Phone Number',
    'Status',
    'Actions',
  ];
  // const filterAdmin = user?.filter((item) =>
  //   item?.role?.category?.user_role_id === 1 ? item : null
  // );
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>View Mpo</h4>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Col lg={12}>
            {/* <label htmlFor="search">
              <input id="search" type="text" onChange={handleSearch} />
            </label> */}
            <div className="header-search">
              <form action="#" className="">
                <i className="fas fa-search search-icon"></i>
                <input
                  type="text"
                  placeholder="Search"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="By Name Designation Gender And Status"
                  onChange={handleSearch}
                />
                <button type="submit">
                  <i className="fas fa-search search-icon"></i>
                </button>
              </form>
            </div>
          </Col>
        </Row>
        <Button
          onClick={handleAdd}
          style={{
            marginBottom: '15px',
            backgroundColor: '#0066B3',
            marginTop: '10px',
          }}
        >
          Add User
        </Button>
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
                  color="#0066B3"
                  height={100}
                  width={100}
                  // color="#003766"
                />
              </div>
            ) : (
              <AdminTable
                header={header}
                data={search === '' ? user : doc}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
export default ViewMpo;
{
  /*  */
}
