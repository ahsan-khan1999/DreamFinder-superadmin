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
  ViewCurrentOrderAction,
  ViewOrderAction,
} from 'Store/Actions/Orders/ViewOrderAction';
import {
  OrderRequestTable,
  RemovalRequestTable,
} from 'containers/ui/ReactTableCards';
import { searchArray } from 'Utils/auth.util';

export default function Orders({ match, history }) {
  let dispatch = useDispatch();
  const [search, setSearch] = useState('');
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = async () => {
    // alert("in function")
    // alert('in get Order');
    let res = await dispatch(ViewOrderAction());
    // console.log(res);
  };

  const orders = useSelector((state) => state?.viewOrderRed?.order);
  const loading = useSelector((state) => state?.viewOrderRed?.loading);
  // console.log(orders);
  const changeRoute = async (item) => {
    let res = await dispatch(ViewCurrentOrderAction(item));
    item, history.push('/app/Orders/viewCurrentOrder');
  };
  const [orderTable, setOrderTable] = useState(orders);

  useEffect(() => {
    setOrderTable(orders);
  }, [orders]);
  const headers = [
    'Email Address',
    'Paid Status',
    'Delivery Status',
    'Actions',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setOrderTable(searchArray(orders, search));
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>Order</h4>
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
              <OrderRequestTable
                header={headers}
                changeRoute={changeRoute}
                data={orders}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}

// <div className="table-form" style={{width:"100%"}}>
//                 <Table>
//                   <thead>
//                     <tr>
//                       <th>Email Address</th>

//                       <th>Packages</th>

//                       <th>Paid Status</th>

//                       <th>Tests</th>

//                       <th>Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {console.log(orders)}
//                     {orders?.map((item,index = 0) => {
//                       return (
//                         <tr>

//                           <td>{item?.ordered_by?.email_address}</td>

//                           {/* item?.packages[0]?.name */}
//                           <td>{item?.packages?.map((item) => item?.name)}</td>

//                           <td>{item?.paid_status?.name}</td>

//                           <td>{item?.tests.map((item) => item?.test?.name)}</td>

//                           <td>
//                             <Button
//                               key={index}
//                               value={item}
//                               onClick={(e) => changeRoute(item)}
//                             >
//                               View
//                             </Button>

//                           </td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </Table>
//               </div>
