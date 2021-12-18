/* eslint-disable */

import axios from 'axios';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import {
  StockTable,
  StockTableForDistributionCenter,
} from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Button, Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { BASEURL } from 'services/HttpProvider';
import { getToken, testSearch } from 'Utils/auth.util';

export default function ViewStocks(props) {
  const [loading, setLoading] = useState(false);

  const distributionCenterUid = props?.location?.state;
  const [stocks, setStocks] = useState([]);
  const [search, setSearch] = useState('');
  const [stockTable, setStockTable] = useState(stocks);

  const getStocks = async (distributionCenterUid) => {
    setLoading(true);
    let token = await getToken();
    const response = await axios.get(
      BASEURL+
        `/stocks/read/medicine?distribution_center_uid=${distributionCenterUid}`,
      {
        headers: {
          'x-session-key': token.token,
          'x-session-type': token.type,
        },
      }
    );
    setStocks(response?.data?.response_data);
    setLoading(false);
  };
  useEffect(() => {
    getStocks(distributionCenterUid);
  }, []);

  useEffect(() => {
    setStockTable(stocks);
  }, [stocks]);
  const headers = [
    'Product Name',
    'Category Name',
    'Quantity',
    'Formula',
    'Price',
    'Status',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setStockTable(testSearch(stocks, search));
  };
  const handleChangeToView = () => {
    props.history.push('/app/distributioncenter-management/viewDistributioncenter')
  }
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            onClick={handleChangeToView}
            className='mb-2'
            style={{ marginRight: '0px', backgroundColor: '#0066b3' }}
          >
            Back

          </Button>
          <Separator className="mb-5" />

        </CardTitle>

     
        <Row>

          <Col lg={12}>
          <h4>Stocks</h4>
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
                  title="By Name Category Formula And Status"
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
                  color="#0066b3"
                />
              </div>
            ) : (
              <StockTableForDistributionCenter
                header={headers}
                data={search === '' ? stocks : stockTable}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
