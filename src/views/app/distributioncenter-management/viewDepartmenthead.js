/* eslint-disable */

import { React, useEffect, useState } from 'react';
import { Button, Card, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
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
import apiServices from 'services/requestHandler';

import {
  DepartmentHeadTable,
  OrderRequestTable,
  RemovalRequestTable,
} from 'containers/ui/ReactTableCards';
import { searchArray } from 'Utils/auth.util';

import { OrderAction } from 'Store/Actions/ConcordOrder/OrderAction';
import { StaticDataGet } from 'Store/Actions/StaticData/StaticDataAction';
import { GetDepartmentHead } from '../../../Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';

export default function viewDepartmenthead({ match, history }) {

  let dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {

    getDepartmentheads();

  }, []);
    


  const getDepartmentheads = async () => {

    let res = await dispatch(GetDepartmentHead());

    console.log("res Concord DepartmentHeads",res);
  };

  const departmenthead = useSelector((state) => state?.departmentHeadReducer?.departmenthead);
  const loading = useSelector((state) => state?.departmentHeadReducer?.loading);
  console.log(departmenthead);


  const changeRoute = async (item) => {
    history.push('/app/distributioncenter-management/viewCurrentDepartmenthead',item);
  };
  const [departmentTable, setDepartmentTable] = useState(departmenthead);


  const handleAdd = () => {
    history.push('/app/distributioncenter-management/CreateDepartmenthead');
  };

  useEffect(() => {
    setDepartmentTable(departmenthead);
  }, [departmenthead]);
  const headers = [
    'Name',
    'Designation',
    'Email',
    'Address',
    'Phone',
    'Status',
    'Actions',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setDepartmentTable(searchArray(departmenthead, search));
  };


  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>Department Head</h4>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Button
          onClick={handleAdd}
          style={{
            marginBottom: '15px',
            'backgroundColor': '#003766',
            marginTop: '10px',
          }}
        >
          Add New Department Head
        </Button>
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
                  onChange={handleSearch}
                />
                <button type="submit">
                  <i className="fas fa-search search-icon"></i>
                </button>
              </form>
            </div>
          </Col>
        </Row>
        
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
                  color="#00BFFF"
                  height={100}
                  width={100}
                  color="#003766"
                />
              </div>
            ) : (
              <DepartmentHeadTable
                header={headers}
                changeRoute={changeRoute}
                data={departmentTable}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}

