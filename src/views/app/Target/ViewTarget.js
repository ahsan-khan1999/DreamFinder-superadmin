/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { TargetTable } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ViewTargetAction } from 'Store/Actions/Target/TargetAction';
import { searchArray, testSearch } from 'Utils/auth.util';

export default function ViewTarget(props) {
  const target = useSelector((state) => state?.TargetReducer?.target);
  const loading = useSelector((state) => state?.TargetReducer?.loading);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(ViewTargetAction());
  }, [dispatch]);
  const [doc, setDoc] = useState([]);

  const changeRoute = (item) => {
    props.history.push('/app/Target/EditTarget', item);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setDoc(testSearch(target, search));
  };

  const handleAdd = () => {
    props.history.push('/app/Target/CreateTarget');
  };
  let header = ['Name', 'Amount', 'Role', 'Start Date', 'Status', 'Actions'];
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Target</h4>
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
                  title="By Name Role And Status"
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
          Add Target
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
              <TargetTable
                header={header}
                data={search == '' ? target : doc}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
