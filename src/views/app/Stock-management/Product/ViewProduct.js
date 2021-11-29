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
  ProductTable,
  RemovalRequestTable,
} from 'containers/ui/ReactTableCards';
import { searchArray } from 'Utils/auth.util';

import { OrderAction } from 'Store/Actions/ConcordOrder/OrderAction';
import { StaticDataGet } from 'Store/Actions/StaticData/StaticDataAction';
import { GetDepartmentHead } from '../../../../Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import { GetProduct } from 'Store/Actions/ConcordProduct/ProductAction';
import DashboardBtnList from '../../applications/DashboardBtnList';

export default function ViewProduct({ match, history }) {
  let dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {
    getGetProduct();
  }, []);

  const getGetProduct = async () => {
    let res = await dispatch(GetProduct('', ''));

  };

  const product = useSelector((state) => state?.productReducer?.product);
  const loading = useSelector((state) => state?.productReducer?.loading);

  const buttonname = ['All Category', 'Medicine', 'Gift'];
  const buttonnew_old = ['All', 'New', 'Old'];

  const changeRoute = async (item) => {
    history.push('/app/stocks-management/viewCurrentProducts', item);
  };
  const [productTable, setProductTable] = useState(product);

  const [selectedTab1, setSelectedTab1] = useState('All Category');
  const [selectedTab2, setSelectedTab2] = useState('All');

  const handleAdd = () => {
    history.push('/app/stocks-management/CreateProducts');
  };

  useEffect(() => {
    setProductTable(product);
  }, [product]);
  const headers = [
    'Name',
    'Category',
    'Price',
    'VAT Rate',
    'Total Price',
    'Created By',
    'Status',
    'Actions',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setProductTable(searchArray(product, search));
  };

  // Tabhandler Medicine And Gift
  const tabHandler = (item) => {
    setSelectedTab1(item);
    if (item === 'All Category') {
      dispatch(GetProduct('', ''));
    } else if (item === 'Medicine') {
      setSelectedTab2('All');
      dispatch(GetProduct('/medicine', ''));
    } else if (item === 'Gift') {
      setSelectedTab2('All');
      dispatch(GetProduct('/gift', ''));
    }
  };


  // Tabhandler All New Old
  const tabHandler1 = (item) => {
    setSelectedTab2(item);
    if (item === 'All') {
      if (selectedTab1 === 'Medicine') {
        dispatch(GetProduct('/medicine', ''));
      } else if (selectedTab1 === 'Gift') {
        dispatch(GetProduct('/gift', ''));
      }
    } else if (item === 'New') {
      if (selectedTab1 === 'Medicine') {
        dispatch(GetProduct('/medicine', '/new'));
      } else if (selectedTab1 === 'Gift') {
        dispatch(GetProduct('/gift', '/new'));
      }
    } else if (item === 'Old') {
      if (selectedTab1 === 'Medicine') {
        dispatch(GetProduct('/medicine', '/old'));
      } else if (selectedTab1 === 'Gift') {
        dispatch(GetProduct('/gift', '/old'));
      }
    }
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>Products</h4>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Button
          onClick={handleAdd}
          style={{
            marginBottom: '15px',
            backgroundColor: '#0066b3',
            marginTop: '10px',
          }}
        >
          Add New Product
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
        <Row className="mb-3">
          <Col lg={12}>
            {buttonname.map((item, index) => (
              <div
                className="d-flex d-inline-flex "
                key={index + 1}
                onClick={() => tabHandler(item)}
              >
                <DashboardBtnList
                  label={item}
                  bntStyle={{
                    borderRadius:
                      index === 0
                        ? '10px 0px 0px 10px'
                        : index === buttonname.length - 1
                        ? '0px 10px 10px 0px'
                        : '',
                    width:
                      index === 0
                        ? '120px'
                        : index === buttonname.length - 1
                        ? '120px'
                        : '',
                  }}
                  className={
                    selectedTab1 === item
                      ? 'dashboardBtnList-item-active'
                      : 'default-color-and-hover '
                  }
                />
              </div>
            ))}
          </Col>
        </Row>

        <Row>
          <Col lg={12}>
            {selectedTab1 !== 'All Category'
              ? buttonnew_old.map((item, index) => (
                  <div
                    className="d-flex d-inline-flex "
                    key={index + 1}
                    onClick={() => tabHandler1(item)}
                  >
                    <DashboardBtnList
                      label={item}
                      bntStyle={{
                        borderRadius:
                          index === 0
                            ? '10px 0px 0px 10px'
                            : index === buttonnew_old.length - 1
                            ? '0px 10px 10px 0px'
                            : '',
                        width:
                          index === 0
                            ? '80px'
                            : index === buttonnew_old.length - 1
                            ? '80px'
                            : '',
                      }}
                      className={
                        selectedTab2 === item
                          ? 'dashboardBtnList-item-active'
                          : 'default-color-and-hover '
                      }
                    />
                  </div>
                ))
              : ''}
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
                  color="#0066b3"
                />
              </div>
            ) : (
              <ProductTable
                header={headers}
                changeRoute={changeRoute}
                data={productTable}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
