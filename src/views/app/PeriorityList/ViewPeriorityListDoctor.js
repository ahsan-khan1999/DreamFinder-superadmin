/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { TargetTable, ViewCustomerPeriorityTabel, ViewDoctorPeriorityTabel } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ViewDoctorPeriorityListAction, ViewPeriorityListAction } from 'Store/Actions/PeriorityListAction/PeriorityListAction';
import { ViewTargetAction } from 'Store/Actions/Target/TargetAction';
import { searchArray } from 'Utils/auth.util';

export default function ViewPeriorityListDoctor(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(ViewDoctorPeriorityListAction())    
    }, [])
    const customerList = useSelector(state => state?.ViewPeriorityRedcuer?.doctorList)
    const loading = useSelector(state => state?.ViewPeriorityRedcuer?.loading)

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setDoc(searchArray(target, search));
      };
      const handleAdd = () => {
        props.history.push('/app/PeriorityList/CreateDoctorPeriority');

      }
      const header = ['Customer Name','Designation','Phone Number','Speciality','Status','Action']
    const changeRoute = (item) => {
        props.history.push('/app/PeriorityList/EditDoctorPeriorityList', item);
      };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Periority List</h4>
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
            backgroundColor: '#0066B3',
            marginTop: '10px',
          }}
        >
          Add Periority List
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
                <ViewDoctorPeriorityTabel
                  header={header}
                  data={customerList}
                  changeRoute={changeRoute}
                />
              
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
