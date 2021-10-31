/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { SampleTabel, SampleTransactionTabel, TargetTable } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ViewSampleAction, ViewSampleTransactionAction } from 'Store/Actions/SampleAction/SampleAction';
import { ViewTargetAction } from 'Store/Actions/Target/TargetAction';
import { searchArray } from 'Utils/auth.util';

export default function ViewSampleTransaction(props) {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(ViewSampleTransactionAction());
    }, []);
  
    const sampleTransaction = useSelector((state) => state?.SampleReducer?.sampleTransaction);
    const loading = useSelector((state) => state?.SampleReducer?.loading);
    const changeRoute = (item) => {
      props.history.push('/app/Sample/EditSampleTransaction', item);
    };
  
    const handleSearch = (event) => {
      setSearch(event.target.value);
      setDoc(searchArray(target, search));
    };
  
    const handleAdd = () => {
      props.history.push('/app/Sample/CreateSampleTransaction');
    };
    let header = ['Sample Assign To Name', 'Sample Assign To Manager', 'Desigination', 'Phone Number', 'Status', 'Actions'];
    return (
        <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Sample</h4>
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
        <Button
          onClick={handleAdd}
          style={{
            marginBottom: '15px',
            backgroundColor: '#003766',
            marginTop: '10px',
          }}
        >
          Add Sample
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
                  color="#00BFFF"
                  height={100}
                  width={100}
                  color="#003766"
                />
              </div>
            ) : (
              <SampleTransactionTabel
                header={header}
                data={sampleTransaction}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
    )
}
