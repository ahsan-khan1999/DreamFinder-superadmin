/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { DCPTable, ScheduleTabel, TargetTable } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ReadScheduleAction, ViewDcpAction } from 'Store/Actions/FieldWorkManagmentAction/FieldWorkManagmentAction';
import { ViewTargetAction } from 'Store/Actions/Target/TargetAction';
import { searchArray } from 'Utils/auth.util';

export default function ViewSchedule(props) {

  const [search, setSearch] = useState('');
  const [doc, setDoc] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ReadScheduleAction());
  }, []);

  const schedule = useSelector((state) => state?.DcpReducer?.schedule);
  console.log(schedule);
  const loading = useSelector((state) => state?.DcpReducer?.loading);
  const changeRoute = (item) => {
    props.history.push('/app/FieldWorkManagment/EditSchedule', item);
  };


  const handleSearch = (event) => {
    setSearch(event.target.value);
    setDoc(searchArray(schedule, search));
  };

  const handleAdd = () => {
    props.history.push('/app/FieldWorkManagment/CreateDcp');
  };
  let header = ['Assign To Name', 'Assign To Role', 'Redscheduled By Name', 'Approval Status', 'Actions'];
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Schedule</h4>
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
                  // color="#00BFFF"
                  height={100}
                  width={100}
                  color="#0066B3"
                />
              </div>
            ) : (
              <ScheduleTabel
                header={header}
                data={search === '' ? schedule : doc}
                changeRoute={changeRoute}
              />
        )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
