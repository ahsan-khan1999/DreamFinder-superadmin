/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { RemovalRequestTable } from 'containers/ui/ReactTableCards';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import {
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Table,
} from 'reactstrap';
import {
  getCurrentRequest,
  RemovalRequestAction,
} from 'Store/Actions/RemovalRequest/removalRequestAction';
import { View_Doctor } from 'Store/Actions/User/Doctor/viewDoctorAction';
import { searchArray } from 'Utils/auth.util';

export default function viewRequests({ history, match }) {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

  const getDoctorRequest = async () => {
    let res = await dispatch(RemovalRequestAction());
  };
  useEffect(() => {
    getDoctorRequest();
  }, []);

  // useEffect(() => {
  //   getDoctor();
  // }, [doctor]);
  const changeRoute = async (item) => {
    // setView(true);

    let res = await dispatch(getCurrentRequest(item));
    item, history.push('/app/applications/viewCurrentRequest');
  };

  const requests = useSelector(
    (state) => state?.ViewDoctorRemovalRequest?.requests
  );

  let filteredRequest = [];
  const getAppoinmentRescheduleRequest = () => {
    requests?.map((item) => {
      if (item?.type === 'user') {
        filteredRequest.push(item);
      } else {
      }
    });
  };
  getAppoinmentRescheduleRequest();

  const [requestTable, setRequestTable] = useState(filteredRequest);
  useEffect(() => {
    setRequestTable(requests);
  }, [requests]);
  const loading = useSelector(
    (state) => state?.ViewDoctorRemovalRequest?.loading
  );
  const headers = ['Action', 'Request By', 'Status', 'Type', 'Actions'];
  // const headers = ['Action', 'Request By', 'Request For','Status', 'Type', 'Actions'];

  // console.log(requests);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setRequestTable(searchArray(requests, search));
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <h4>View All Request</h4>
          <Separator className="mb-5" />
        </CardTitle>
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
                <Loader type="Puff" height={100} width={100} color="#003766" />
              </div>
            ) : (
              <RemovalRequestTable
                header={headers}
                changeRoute={changeRoute}
                data={search === '' ? filteredRequest : requestTable}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}

// <div className="table-form" style={{width:"100%"}}>
//               <Table>
//                 <thead>
//                   <tr>
//                     <th>Action</th>

//                     <th>Request By</th>

//                     <th>Status</th>

//                     <th>Type</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {requests?.map((item, index = 0) => {
//                     return (
//                       <tr>
//                         <td>{item?.action}</td>

//                         <td>{item?.requested_by?.name}</td>

//                         <td>{item?.status?.name}</td>
//                         <td>{item?.type}</td>

//                         <td>
//                           <Button
//                             key={index}
//                             value={item}
//                             onClick={(e) => {
//                               changeRoute(item);
//                             }}
//                           >
//                             View
//                           </Button>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </Table>
//             </div>

// const matchId = () => {
//   doctor?.map((item) => {
//     requests?.map((item1) => {
//       if (item?.id === item1?.record_id) {
//         // alert('matched');
//         // item?.push({"Doctor Name" : item?.name})
//         // console.log(item1);
//       }
//     });
//   });
// };
// matchId()
// console.log(requests);
