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
  ViewCurrentLabAdminAction,
  ViewLabAdminAction,
} from 'Store/Actions/User/LabAdmin/ViewLabAdminAction';
import { ReactTableWithPaginationCard, ReactTableWithPaginationCardAllUser } from 'containers/ui/ReactTableCards';
import LabAdmin from './createLabAdmin';

const ViewAdministrator = ({ match, history }) => {
  const labAdmin = useSelector((state) => state?.ViewLabAdminReducer?.labAdmin);
  const loading = useSelector((state) => state?.ViewLabAdminReducer?.loading);

  const [view, setView] = useState();

  const [dropdownOpen, setOpen] = useState();
  //   const dispatch = useDispatch();
  // console.log(data);

  const toggle = () => setOpen(!dropdownOpen);
  const [labAdminTable, setLabAdminTable] = useState(labAdmin);
  const [search, setSearch] = useState('');

  // let [data  , setData] = useState();
  const dispatch = useDispatch();
  const getLabAdmin = async () => {
    // alert("hello")
    let res = await dispatch(ViewLabAdminAction());
    // console.log(res);
  };
  useEffect(() => {
    getLabAdmin();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setLabAdminTable(labAdmin);
  }, [labAdmin]);
  const handleCreate = () => {
    history.push('/app/menu/levels/CreateLabAdmins');
  };
  const changeRoute = async (item) => {
    setView(true);

    let res = await dispatch(ViewCurrentLabAdminAction(item));
    // item,
    // setIsEdit(false)
    history.push('/app/menu/levels/createLabAdmin');
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
    setLabAdminTable(searchArray(labAdmin, search));
  };
  // console.log(search);
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>Lab Admin</h4>
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
          onClick={handleCreate}
          style={{
            marginBottom: '15px',
            marginTop: '15px',
            'backgroundColor': '#003766',
          }}
        >
          Add Lab Admin
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
                  // timeout={10000} //3 secs
                />
              </div>
            ) : (
              <ReactTableWithPaginationCardAllUser
                header={header}
                doctor={search === '' ? labAdmin : labAdminTable}
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

// {labAdmin?.length === 0 ? (
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
//       // timeout={10000} //3 secs
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

//           <th>Status</th>

//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//         {labAdmin?.map((item, index) => {
//           return (
//             <tr>
//               {/* {console.log(item)} */}
//               <td>{item.name}</td>
//               <td>{item.age}</td>

//               <td>{item?.date_of_birth}</td>

//               <td>{item?.gender?.name}</td>

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
