/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Button, Card, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { getToken, searchArray } from '../../../../Utils/auth.util';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { doc } from 'prettier';
import { items } from 'data/carouselItems';
import { useDispatch, useSelector } from 'react-redux';
import dot from '../../../../assets/img/dot.png';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { UncontrolledDropdown } from 'reactstrap';
// import './loader.css';
// import eye from '../../../../assets/img/eye.png'
import Loader from 'react-loader-spinner';
import {
  ViewAdministratorAction,
  ViewCurrentAdminAction,
} from 'Store/Actions/User/Administrator/ViewAdministratorAction';
import { ReactTableWithPaginationCard, ReactTableWithPaginationCardAllUser } from 'containers/ui/ReactTableCards';

const ViewAdministrator = ({ match, history }) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state?.viewAdmin?.administrator);
  const loading = useSelector((state) => state?.viewAdmin?.loading);

  const getAdministrator = async () => {
    let res = await dispatch(ViewAdministratorAction());
    // log
  };
  const [adminTable, setAdminTable] = useState(admin);

  useEffect(() => {
    getAdministrator();
    // setAdminTable(admin)
  }, []);
  useEffect(() => {
    setAdminTable(admin);
  }, [admin]);
  const [view, setView] = useState(false);

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const changeRoute = async (item) => {
    setView(true);
    let res = await dispatch(ViewCurrentAdminAction(item));
    history.push('/app/menu/levels/createAdministrator');

    item;
  };

  const changeRouteToCreate = () => {
    history.push('/app/menu/levels/CreateAdministrators');
  };

  //   const changeRouteToEdit =async (item) => {

  //     setIsEdit(true)

  //     let res = await dispatch(getItemIsEdit(item))
  //     // console.log(item,res);
  //     item,
  //     history.push('/app/menu/levels/third-level-1');
  //   };
  const [search, setSearch] = useState('');

  let header = [
    'Name',
    'DOB',
    'Designation',
    'Gender',
    'Status',
    'Actions',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setAdminTable(searchArray(admin, search));
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Aministrator" match={match} /> */}
            <h4>Administrator</h4>

            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Col lg={12}>
            <div className="header-search">
              <form action="#" className="form-inline">
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
          onClick={changeRouteToCreate}
          style={{
            marginBottom: '15px',
            marginTop: '15px',
            'backgroundColor': '#003766',
          }}
        >
          Add Administrator
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
                  // timeout={5000} //3 secs
                />
              </div>
            ) : (
              <ReactTableWithPaginationCardAllUser
                // className="r-table table table-responsive"
                header={header}
                doctor={search === '' ? admin : adminTable}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
export default ViewAdministrator;

// {admin?.length === 0 ? (
//   <div
//     style={{
//       width: '100%',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}
//   >
//     <Loader
//       type="Puff"
//       color="#00BFFF"
//       height={100}
//       width={100}
//       // timeout={5000} //3 secs
//     />
//   </div>
// ) : (
//   <div className="table-form" style={{width:"100%"}}>
//     <Table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Age</th>
//           <th>DOB</th>

//           <th>Gender</th>

//           {/* <th>Department</th> */}
//           <th>Status</th>

//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {admin?.map((item, index = 0) => {
//           return (
//             <tr>
//               <td>{item?.name}</td>
//               <td>{item.age}</td>

//               <td>{item?.date_of_birth}</td>

//               <td>{item?.gender?.name}</td>

//               {/* <td>{item?.departments[0]?.name}</td> */}
//               <td>{item?.state?.name}</td>

//               <td>
//                 <Button
//                   key={index}
//                   value={item}
//                   onClick={(e) => {
//                     changeRouteToView(item);
//                   }}
//                 >
//                   View
//                 </Button>
//               </td>
//             </tr>
//           );
//         })}
//       </tbody>
//     </Table>
//   </div>
// )}
