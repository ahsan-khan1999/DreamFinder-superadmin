/* eslint-disable */

import React, { useEffect, useState } from 'react';
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
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import NotificationExamples from 'containers/ui/NotificationExamples';
import apiServices from 'services/requestHandler';
import Loader from 'react-loader-spinner';
import { AppoinmentTable } from 'containers/ui/ReactTableCards';
import { cancalAppointmentAction } from 'Store/Actions/ApponimentRescheduleRequest/viewAppoinmentRescheduleReqAction';
import { useDispatch } from 'react-redux';
import { NotificationManager } from 'components/common/react-notifications';
import { searchArray } from 'Utils/auth.util';

const UpcommingAppoinment = ({ match, history }) => {
  const [loading, setLoading] = useState(false);

  let [upcomingAppoinmnets, setUpcomingAppoinmnet] = useState([]);
  const upcomingAppoinment = async () => {
    setLoading(true);
    let res = await apiServices.getUpcomingAppoinments();
    // console.log(res);
    setLoading(false);

    setUpcomingAppoinmnet(res?.data?.response_data?.appointments);
  };
  useEffect(() => {
    upcomingAppoinment();
  }, []);
  // TodaysAppoinment()
  let headers = [
    'Condition',
    'Consultation Type',
    'Doctor Name',
    'Patient Name',
    'Status',
    'Action',
  ];
  const changeRoute = async (item) => {
    history.push('/app/ui/components/viewCurrentUpcomingAppointment', item);
  };
  const [search, setSearch] = useState('');
  const [appointment, setAppointment] = useState(upcomingAppoinmnets);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setAppointment(searchArray(upcomingAppoinmnets, search));
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>Upcoming Appointment</CardTitle>
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
                  // timeout={3000} //3 secs
                />{' '}
              </div>
            ) : upcomingAppoinmnets?.length === 0 ? (
              <div>
                <h3>No Upcomming Appointment</h3>
              </div>
            ) : upcomingAppoinmnets?.length === 0 ? (
              <div>
                <h3>No Upcomming Appointment</h3>
              </div>
            ) : (
              <AppoinmentTable
                header={headers}
                data={search === '' ? upcomingAppoinmnets : appointment}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
export default UpcommingAppoinment;

// <div className="table-form">
//                 <Table>
//                   <thead>
//                     <tr>
//                       <th>Condition</th>
//                       <th>Consultation Type</th>

//                       <th>Doctor Name</th>

//                       <th>Patient Name</th>

//                       <th>Slot</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {upcomingAppoinmnet?.map((item) => {
//                       return (
//                         <tr>
//                           <td>{item?.condition?.name}</td>

//                           <td>{item?.consultation_type?.name}</td>

//                           <td>{item?.doctor_details?.name}</td>
//                           <td>{item?.patient_details?.name}</td>
//                           <td>
//                             {item?.slot?.day} {item?.slot?.time?.from} -{' '}
//                             {item?.slot?.time?.to}
//                           </td>
//                           <td>{item?.status?.name}</td>
//                         </tr>
//                       );
//                     })}
//                   </tbody>
//                 </Table>
//               </div>
