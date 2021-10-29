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

export default function ViewProduct({ match, history }) {

  let dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {

    getGetProduct();

  }, []);
    


  const getGetProduct = async () => {

    let res = await dispatch(GetProduct());

    console.log("res Concord product",res);
  };

  const product = useSelector((state) => state?.productReducer?.product);
  const loading = useSelector((state) => state?.productReducer?.loading);
  console.log(product);


  const changeRoute = async (item) => {
    history.push('/app/stocks-management/viewCurrentProducts',item);
  };
  const [productTable, setProductTable] = useState(product);


  const handleAdd = () => {
    history.push('/app/stocks-management/CreateProducts');
  };

  useEffect(() => {
    setProductTable(product);
  }, [product]);
  const headers = [
    'Name',
    'Category Name',
    'Price',
    'Created By',
    'Status',
    'Actions',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setProductTable(searchArray(product, search));
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
            'backgroundColor': '#003766',
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

