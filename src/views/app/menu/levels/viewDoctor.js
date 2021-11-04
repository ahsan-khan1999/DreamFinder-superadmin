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
// import { DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

import { DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { UncontrolledDropdown } from 'reactstrap';
import Loader from 'react-loader-spinner';
import {
  View_Doctor,
  getItemIsEdit,
} from '../../../../Store/Actions/User/Doctor/viewDoctorAction';
import {
  ReactTableDivided,
  ReactTableWithPaginationCard,
  // ReactTableDivided,
} from 'containers/ui/ReactTableCards';
import { ViewAdminAction } from 'Store/Actions/User/UserActions';
const ThirdLevel2 = ({ match, history }) => {
  const [dropdownOpen, setOpen] = useState(false);
  const doctor = useSelector((state) => state?.viewDoctorReducer?.doctor);
  const loading = useSelector((state) => state?.viewDoctorReducer?.loading);

  // data.push(doctor);
  const dispatch = useDispatch();
  const toggle = () => setOpen(!dropdownOpen);
  // let [data, setData] = useState();
  // let data = {
  //   doctor: doctor,
  // };

  useEffect(async () => {
    getDoctor();
  }, []);

  const getDoctor = async () => {
    let res = await dispatch(ViewAdminAction());
  };
  const [doc, setDoc] = useState(doctor);

  useEffect(() => {
    setDoc(doctor);
  }, [doctor]);
  const [search, setSearch] = useState('');

  const changeRoute = async (item) => {
    // setView(true);

    let res = await dispatch(getItemIsEdit(item));
    item, history.push('/app/menu/levels/viewCurrentDoctor');
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setDoc(searchArray(doctor, search));
  };

  const handleAdd = () => {
    // dispatch(clear_doctor())
    history.push('/app/menu/levels/CreateDoctors');
  };
  let header = [
    'Name',
    'DOB',
    'Designation',
    'Gender',
    'Phone Number',
    'Status',
    'Actions',
  ];

  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Doctors</h4>
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
         backgroundColor:'#0066b3',   
            marginTop: '10px',
          }}
        >
          Add User
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
              <ReactTableWithPaginationCard
                header={header}
                doctor={search === '' ? doctor : doc}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
        {/* </Colxx> */}
        {/* <ReactTableDivided/> */}
        {/* {doctor?.length === 0 ? (
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
              />
            </div>
          ) : (
            <div className="table-form" style={{width:"100%"}}>
              <Table >
                <thead>
                  <tr>

                    <th>Name</th>
                    <th>DOB</th>

                    <th>Designation</th>

                    <th>Gender</th>



                    <th>Speciality</th>
                    <th>Status</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {doctor?.map((item, index = 0) => {
                    return (
                      <tr>
                        <td>{item?.name}</td>

                        <td>{item?.date_of_birth}</td>

                        <td>{item?.designation}</td>

                        <td>{item?.gender?.name}</td>


                        <td>{item?.speciality?.name}</td>
                        <td>{item?.state?.name}</td>


                        <td>
                          <Button
                            key={index}
                            value={item}
                            onClick={(e) => {
                              changeRoute(item);
                            }}
                          >
                            View
                          </Button>



                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          )} */}
      </CardBody>
    </Card>
  );
};
export default ThirdLevel2;
{
  /*  */
}
