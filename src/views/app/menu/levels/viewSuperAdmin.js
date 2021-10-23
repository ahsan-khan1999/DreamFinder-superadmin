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
  View_Doctor,
  getItemIsEdit,
} from '../../../../Store/Actions/User/Doctor/viewDoctorAction';
import {
  ViewCurrentSuperAdminAction,
  ViewSuperAdminAction,
} from 'Store/Actions/User/SuperAdmin/ViewSuperAdminAction';
import { ReactTableWithPaginationCard, ReactTableWithPaginationCardAllUser } from 'containers/ui/ReactTableCards';

const ViewSuperAdmin = ({ match, history }) => {
  const [isEdit, setIsEdit] = useState();
  const [search, setSearch] = useState('');

  const [view, setView] = useState();
  let superAdmin = useSelector(
    (state) => state?.viewSuperAdmin?.superAdmin
  );
  let loading = useSelector((state) => state?.viewSuperAdmin?.loading);
  const [superAdminTable, setSuperAdminTable] = useState(superAdmin);
  // console.log(superAdmin);
  const [dropdownOpen, setOpen] = useState(false);
  //   const dispatch = useDispatch();
  // console.log(data);

  const toggle = () => setOpen(!dropdownOpen);
  // let [data, setData] = useState();
  const dispatch = useDispatch();
  const getSuperAdmin = async () => {
    let res = await dispatch(ViewSuperAdminAction());
    // console.log(res);
  };
  useEffect(() => {
    getSuperAdmin();
    // eslint-disable-next-line
  }, []);

  // console.log(doctors);
  useEffect(() => {
    setSuperAdminTable(superAdmin);
  }, [superAdmin]);
  const createSuperAdmin = () => {
    history.push('/app/menu/levels/CreateSuperAdmins');
  };
  const changeRoute = async (item) => {
    // setView(true)
    // console.log(view);

    let res = await dispatch(ViewCurrentSuperAdminAction(item));
    item,
      // setIsEdit(false)
      history.push('/app/menu/levels/createSuperAdmin');
  };
  //   const changeRouteToEdit =async (item) => {

  //     setIsEdit(true)

  //     let res = await dispatch(getItemIsEdit(item))
  //     // console.log(item,res);
  //     item,
  //     history.push('/app/menu/levels/third-level-1');
  //   };

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
    setSuperAdminTable(searchArray(superAdmin, search));
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
          <h4>Super Admin</h4>

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
          onClick={createSuperAdmin}
          style={{
            marginBottom: '15px',
            marginTop: '15px',
            'backgroundColor': '#003766',
          }}
        >
          Add Super Admin
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
                header={header}
                doctor={search === '' ? superAdmin : superAdminTable}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
export default ViewSuperAdmin;

// {superAdmin?.length === 0 ? (
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

//           <th>Speciality</th>
//           <th>Status</th>

//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {superAdmin?.map((item, index = 0) => {
//           return (
//             <tr>
//               <td>{item?.name}</td>
//               <td>{item.age}</td>

//               <td>{item?.date_of_birth}</td>

//               <td>{item?.gender?.name}</td>

//               <td>{item?.speciality?.name}</td>
//               <td>{item?.state?.name}</td>

//               <td>
//                 <Button
//                   key={index}
//                   value={item}
//                   onClick={(e) => {
//                     changeRoute(item);
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
