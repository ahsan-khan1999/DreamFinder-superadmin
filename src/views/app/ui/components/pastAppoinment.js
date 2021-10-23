/* eslint-disable */

import React, { useEffect, useState, Suspense } from 'react';
import {
  Alert,
  UncontrolledAlert,
  Row,
  Card,
  CardBody,
  CardTitle,
  Col,
} from 'reactstrap';
import { Table } from 'reactstrap';
import Loader from 'react-loader-spinner';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import NotificationExamples from 'containers/ui/NotificationExamples';
import apiServices from 'services/requestHandler';
import { AppoinmentTable } from 'containers/ui/ReactTableCards';
import { searchArray } from 'Utils/auth.util';

const PastAppoinment = ({ match, history }) => {
  const [loading, setLoading] = useState(false);

  let [pastAppoinmnets, setPastAppoinmnet] = useState([]);
  const pastAppoinment = async () => {
    setLoading(true);
    let res = await apiServices.getPastAppoinments();
    setPastAppoinmnet(res?.data?.response_data?.appointments);
    await setLoading(false);
  };
  useEffect(() => {
    pastAppoinment();
  }, []);
  // console.log(pastAppoinmnet);
  let headers = [
    'Condition',
    'Consultation Type',
    'Doctor Name',
    'Patient Name',
    'Status',
    'Action',
  ];
  const changeRoute = async (item) => {
    history.push('/app/ui/components/viewCurrentPastAppointment', item);
  };
  const [search, setSearch]  = useState('');
  const [appointment, setAppointment] = useState(pastAppoinmnets)
  // console.log(pastAppoinmnets);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setAppointment(searchArray(pastAppoinmnets, search));
  };
  // TodaysAppoinment()
  return (
    <Suspense fallback={<div className="loading" />}>
      <Card>
        <CardBody>
          <CardTitle>Past Appointments</CardTitle>
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
                    //  timeout={3000} //3 secs
                  />
                </div>
              ) : pastAppoinmnets?.length === 0 ? (
                <div>
                  <h3>No Past Appoinemnt </h3>
                </div>
              ) : (
                <AppoinmentTable
                  header={headers}
                  data={search === '' ?  pastAppoinmnets :appointment  }
                  changeRoute={changeRoute}
                />
              )}
            </Colxx>
          </Row>
        </CardBody>
      </Card>
    </Suspense>
  );
};
export default PastAppoinment;
{
  /* <div className="table-form" style={{ width: '100%' }}>
<Table>
  <thead>
    <tr>
      <th>Condition</th>
      <th>Consultation Type</th>

      <th>Doctor Name</th>

      <th>Patient Name</th>

      <th>Slot</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
    {pastAppoinmnet?.map((item) => {
      return (
        <tr>
          <td>{item?.condition?.name}</td>

          <td>{item?.consultation_type?.name}</td>

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
