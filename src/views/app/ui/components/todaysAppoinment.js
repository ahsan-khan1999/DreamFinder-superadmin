/* eslint-disable */

import React, { useEffect, useState, Suspense } from 'react';
import {
  Alert,
  UncontrolledAlert,
  Row,
  Card,
  CardBody,
  CardTitle,
  Table,
  Button,
  Col,
} from 'reactstrap';
import Loader from 'react-loader-spinner';

import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import NotificationExamples from 'containers/ui/NotificationExamples';
import apiServices from 'services/requestHandler';
import { AppoinmentTable } from 'containers/ui/ReactTableCards';
import { NotificationManager } from 'components/common/react-notifications';
import { useDispatch } from 'react-redux';
import { cancalAppointmentAction } from 'Store/Actions/ApponimentRescheduleRequest/viewAppoinmentRescheduleReqAction';
import { searchArray } from 'Utils/auth.util';

const ViewAppoinment = ({ match, history }) => {
  let [todayAppoinmnet, setTodayAppoinmnet] = useState([]);
  const [loading, setLoading] = useState(false);
  const todaysAppoinment = async () => {
    setLoading(true);
    let res = await apiServices.getTodaysAppoinments();
    setLoading(false);
    setTodayAppoinmnet(res?.data?.response_data?.appointments);
  };
  useEffect(() => {
    todaysAppoinment();
  }, []);
  let headers = [
    'Condition',
    'Consultation Type',
    'Doctor Name',
    'Patient Name',
    'Status',
    'Action',
  ];
  const [search, setSearch]  = useState('');
  const [appointment, setAppointment] = useState(todayAppoinmnet)
  const changeRoute = async (item) => {
    // setView(true)
    // console.log(view);

    // let res = await dispatch(ViewCurrentPatientAction(item));
    // item,
    // setIsEdit(false)
    history.push('/app/ui/components/viewCurrentTodaysAppointment', item);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setAppointment(searchArray(todayAppoinmnet, search));
  };
  // TodaysAppoinment()
  return (
    <Card>
      <CardBody>
        <CardTitle>Today Appointment</CardTitle>
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
                  // timeout={3000} //3 secs
                  color="#003766"
                />{' '}
              </div>
            ) : todayAppoinmnet?.length === 0 ? (
              <div>
                <h3>No Appointment For Today</h3>
              </div>
            ) : (
              <AppoinmentTable
                header={headers}
                data={search === '' ? todayAppoinmnet : appointment}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
export default ViewAppoinment;

{
  /* <div className="table-form">
<Table>
  <thead>
    <tr>
      <th>Condition</th>
      <th>Consultation Type</th>

      <th>Date</th>

      <th>Description</th>

      <th>Doctor Name</th>

      <th>Patient Name</th>

      <th>Slot</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {todayAppoinmnet?.map((item) => {
      return (
        <tr>
          <td>{item?.condition?.name}</td>

          <td>{item?.consultation_type?.name}</td>

          <td>{item?.date}</td>

          <td>{item?.description}</td>

          <td>{item?.doctor_details?.name}</td>
          <td>{item?.patient_details?.name}</td>
          <td>
            {item?.slot?.day} {item?.slot?.time?.from} -{' '}
            {item?.slot?.time?.to}
          </td>
          <td>{item?.status?.name}</td>
        </tr>
      );
    })}
  </tbody>
</Table>
</div> */
}
