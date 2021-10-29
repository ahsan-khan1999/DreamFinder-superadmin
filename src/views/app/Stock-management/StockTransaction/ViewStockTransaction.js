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
  StockTransaction,
} from 'containers/ui/ReactTableCards';
import { searchArray } from 'Utils/auth.util';

import { OrderAction } from 'Store/Actions/ConcordOrder/OrderAction';
import { StaticDataGet } from 'Store/Actions/StaticData/StaticDataAction';
import { GetDepartmentHead } from '../../../../Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import { GetStocksTransaction } from 'Store/Actions/ConcordStockTransaction/StockTransactionAction';

export default function ViewStockTransaction({ match, history }) {

  let dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {

    getStocksTransaction();

  }, []);
    


  const getStocksTransaction = async () => {

    let res = await dispatch(GetStocksTransaction());

    console.log("res Concord DepartmentHeads",res);
  };

  const stocktransaction = useSelector((state) => state?.stockTransactionReducer?.stocktransaction);
  const loading = useSelector((state) => state?.stockTransactionReducer?.loading);
  console.log(stocktransaction);


  const changeRoute = async (item) => {
    history.push('/app/stocks-management/viewCurrentStockTransaction',item);
  };
  const [stocktransactionTable, setStocktransactionTableTable] = useState(stocktransaction);


  const handleAdd = () => {
    history.push('/app/stocks-management/CreateStockTransaction');
  };

  useEffect(() => {
    setStocktransactionTableTable(stocktransaction);
  }, [stocktransaction]);
  const headers = [
    'Name',
    'Category',
    'Product Name',
    'Date',
    'Price',
    'Quantity',
    'Transaction Type',
    'Status',
    'Actions',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setStocktransactionTableTable(searchArray(stocktransaction, search));
  };


  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>Stocks Transaction</h4>
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
          Add New Stock Transaction
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
              <StockTransaction
                header={headers}
                changeRoute={changeRoute}
                data={stocktransactionTable}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}

