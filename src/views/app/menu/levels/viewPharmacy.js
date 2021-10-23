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
  ViewCurrentPharmacyAction,
  ViewPharmacyAction,
} from 'Store/Actions/User/Pharmacy/ViewPharmacyAction';
import { ReactTableWithPaginationCard, ReactTableWithPaginationCardAllUser } from 'containers/ui/ReactTableCards';

const ViewPharmacy = ({ match, history }) => {
  const [isEdit, setIsEdit] = useState();
  const [view, setView] = useState();
  const dispatch = useDispatch();
  const getPharmacyUser = async () => {
    let res = await dispatch(ViewPharmacyAction());
  };
  useEffect(() => {
    getPharmacyUser();
  }, []);
  const [search, setSearch] = useState('');

  const pharmacy = useSelector((state) => state?.ViewPharmacyReducer?.pharmacy);
  const loading = useSelector((state) => state?.ViewPharmacyReducer?.loading);
  const [pharmacyTable, setPharmacyTable] = useState(pharmacy);
  useEffect(() => {
    setPharmacyTable(pharmacy);
  }, [pharmacy]);
  // console.log(pharmacy);

  const [dropdownOpen, setOpen] = useState(false);
  //   const dispatch = useDispatch();
  // console.log(data);

  const goToPharmacyCreate = () => {
    history.push('/app/menu/levels/CreatePharmcyUser');
  };

  const toggle = () => setOpen(!dropdownOpen);
  // let [data, setData] = useState();

  //   const getDoctor = async () => {
  //     // alert("hello")
  //     let res = await dispatch(View_Doctor());
  //     // console.log(res);
  //   };
  //   useEffect(() => {
  //     getDoctor();
  //     // eslint-disable-next-line
  //   }, []);

  // console.log(doctors);
  const changeRoute = async (item) => {
    // setView(true)
    // console.log(view);

    let res = await dispatch(ViewCurrentPharmacyAction(item));
    item,
      // setIsEdit(false)
      history.push('/app/menu/levels/createPharmacy');
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
    setPharmacyTable(searchArray(pharmacyTable, search));
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Pharmacy Admin" match={match} /> */}
            <h4>Pharmacy</h4>

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
          onClick={goToPharmacyCreate}
          style={{
            marginBottom: '10px',
            marginTop: '15px',
            'backgroundColor': '#003766',
          }}
        >
          Add Pharmacy Admin
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
                doctor={search === '' ? pharmacy : pharmacyTable}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
export default ViewPharmacy;

// {pharmacy?.length === 0 ? (
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
//         {pharmacy?.map((item, index) => {
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
