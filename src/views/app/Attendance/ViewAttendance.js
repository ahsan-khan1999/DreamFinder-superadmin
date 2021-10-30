/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { AttendanceTabel, TargetTable } from 'containers/ui/ReactTableCards';
import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ViewAttendanceAction } from 'Store/Actions/AttendanceActions/AttendanceAction';

export default function ViewAttendance(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewAttendanceAction());
  }, []);
  const attendance = useSelector(
    (state) => state?.AttendanceReducer?.attendance
  );
  const loading = useSelector((state) => state?.AttendanceReducer?.loading);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setDoc(searchArray(target, search));
  };

  const handleAdd = () => {
    props.history.push('/app/Attendance/CreateAttendance');
  };
  let header = ['User Name', 'Email', 'Manager Name', 'Phone Number', 'Attendance Status', 'Date','Action'];
  const changeRoute = (item) => {
    props.history.push('/app/Attendance/EditAttendance', item);
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Attendance</h4>
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
          Add Attendance
        </Button>

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
              <AttendanceTabel
                header={header}
                data={attendance}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
