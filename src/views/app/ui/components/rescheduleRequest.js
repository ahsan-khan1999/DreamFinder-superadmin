/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { RemovalRequestTable } from 'containers/ui/ReactTableCards';
import React, { Suspense, useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { ViewAppoinmentRescheduleRequestAction } from 'Store/Actions/ApponimentRescheduleRequest/viewAppoinmentRescheduleReqAction';
import { getCurrentRequest } from 'Store/Actions/ApponimentRescheduleRequest/viewAppoinmentRescheduleReqAction';
import { searchArray } from 'Utils/auth.util';
export default function rescheduleRequest({ history }) {
  const dispatch = useDispatch();
  const getRescheduleRequest = async () => {
    let res = await dispatch(ViewAppoinmentRescheduleRequestAction());
    // console.log(res);
  };

  useEffect(() => {
    getRescheduleRequest();
  }, []);

  const request = useSelector(
    (state) => state.ViewAppoinmentRescheduleRequest?.rescheduleRequest
  );
  const loading = useSelector(
    (state) => state.ViewAppoinmentRescheduleRequest?.loading
  );
  let filteredRequest = [];
  const getAppoinmentRescheduleRequest = () => {
    request?.map((item) => {
      if (item?.type === 'appointment') {
        // alert("true");
        // alert("in if")
        filteredRequest.push(item);
        // alert("hello")
      } else {
      }
    });
  };
  const [search, setSearch] = useState('');
  const [appointment, setAppointment] = useState(request);
  const changeRoute = async (item) => {
    // setView(true);

    let res = await dispatch(getCurrentRequest(item));
    item, history.push('/app/ui/components/viewCurrentAppoitmentReq');
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setAppointment(searchArray(request, search));
  };
  getAppoinmentRescheduleRequest();
  //   console.log(filteredRequest);
  const headers = ['Action', 'Request By', 'Status', 'Type', 'Actions'];

  return (
    <Suspense fallback={<div className="loading" />}>
      <Card>
        <CardBody>
          <CardTitle>Appointment Reschedule Request</CardTitle>
          <Separator className="mb-5" />
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
                <RemovalRequestTable
                  header={headers}
                  changeRoute={changeRoute}
                  data={filteredRequest}
                />
              )}
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </Suspense>
  );
}
