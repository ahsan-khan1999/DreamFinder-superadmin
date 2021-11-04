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
  DoctorCategoryTable,
  OrderRequestTable,
  RemovalRequestTable,
} from 'containers/ui/ReactTableCards';
import { searchArray } from 'Utils/auth.util';

import { OrderAction } from 'Store/Actions/ConcordOrder/OrderAction';
import { StaticDataGet } from 'Store/Actions/StaticData/StaticDataAction';
import { GetDepartmentHead } from '../../../../Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import { GetDoctorCategory } from 'Store/Actions/ConcordDoctorCategorys/DoctorCategorysAction';

export default function ViewDoctorsCategory({ match, history }) {

  let dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {

    getDoctorCategory();

  }, []);
    


  const getDoctorCategory = async () => {

    let res = await dispatch(GetDoctorCategory());

    console.log("res Concord DoctorCategory",res);
  };

  const doctorcategory = useSelector((state) => state?.doctorCategoryReducer?.doctorcategory);
  const loading = useSelector((state) => state?.doctorCategoryReducer?.loading);
  console.log(doctorcategory);


  const changeRoute = async (item) => {
    history.push('/app/doctor-management/viewCurrentDoctorsCategory',item);
  };
  const [doctorcategoryTable, setDoctorcategoryTableTable] = useState(doctorcategory);


  const handleAdd = () => {
    history.push('/app/doctor-management/createDoctorsCategory');
  };

  useEffect(() => {
    setDoctorcategoryTableTable(doctorcategory);
  }, [doctorcategory]);
  const headers = [
    'Name',
    'Status',
    'Actions',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setDoctorcategoryTableTable(searchArray(doctorcategory, search));
  };


  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>DoctorsCategory</h4>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Button
           onClick={handleAdd}
         

          style={{
            marginBottom: '15px',
         backgroundColor:'#0066b3',   
            marginTop: '10px',
          }}
        >
          Add New Doctors Category
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
              <DoctorCategoryTable
                header={headers}
                changeRoute={changeRoute}
                data={doctorcategoryTable}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}

