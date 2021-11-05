/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { ViewReportTable } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import apiServices from 'services/requestHandler';
import { ViewReportAction } from 'Store/Actions/ReportAction/reportAction';
import { searchArray } from 'Utils/auth.util';

export default function ViewReports({ history }) {
  const [search, setSearch] = useState('');

  const [url, seturl] = useState();
  const header = ['Patient Name', 'Test Name','Test Category','Report Status' , 'Action'];
  const dispatch = useDispatch();
  const readReports = async () => {
    let res = await dispatch(ViewReportAction());
  };

  const report = useSelector(state => state?.ViewReportReducer?.reports)
  const loading = useSelector(state => state?.ViewReportReducer?.loading)
  const [reports, setReports] = useState(report);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setReports(searchArray(report, search));
  };
  useEffect(() => {
    readReports();
  }, []);
  const [view, setview] = useState(false)
  const changeRoute = (item) => {
    history.push('/app/Reports/viewCurrentReport',{item,view});
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Patient" match={match} /> */}
            <h4>Test Report</h4>

            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            
            {/* <Button
              style={{ backgroundColor: '#003766' }}
              onClick={addCategory}
            >
              Add Category
            </Button> */}
          </Colxx>
        </Row>
        <Row>
          <Col lg={12} sm="4">
            <div className="header-search">
              <form action="#" className="form-inline">
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
          <Colxx xxs="12" className="mb-4" lg="12">
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
              <ViewReportTable header={header} changeRoute={changeRoute} data={search === '' ? report : reports}/>
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
