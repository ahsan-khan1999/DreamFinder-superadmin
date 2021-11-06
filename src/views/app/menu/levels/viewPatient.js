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
  ViewCurrentPatientAction,
  ViewPatientAction,
} from 'Store/Actions/User/Patient/ViewPatientAction';
import { ReactTableWithPaginationCardPatient } from 'containers/ui/ReactTableCards';

const Patient = ({ match, history }) => {
  const patient = useSelector((state) => state?.ViewPatientReducer?.patient);
  const loading = useSelector((state) => state?.ViewPatientReducer?.loading);

  // console.log(patient);
  const handleCreate = () => {
    history.push('/app/menu/levels/CreatePatients');
  };
  const [isEdit, setIsEdit] = useState();
  const [view, setView] = useState();

  const [dropdownOpen, setOpen] = useState(false);
  //   const dispatch = useDispatch();
  const [patientTable, setPatientTable] = useState(patient);

  // console.log(data);
  const dispatch = useDispatch();
  const toggle = () => setOpen(!dropdownOpen);
  // let [data, setData] = useState();
  const [search, setSearch] = useState('');

  const getPatients = async () => {
    // alert("hello")
    let res = await dispatch(ViewPatientAction());
    // console.log(res);
  };
  useEffect(() => {
    getPatients();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setPatientTable(patient);
  }, [patient]);

  // console.log(doctors);
  const changeRoute = async (item) => {
    // setView(true)
    // console.log(view);

    let res = await dispatch(ViewCurrentPatientAction(item));
    item,
      // setIsEdit(false)
      history.push('/app/menu/levels/createPatient');
  };
  //   const changeRouteToEdit =async (item) => {

  //     setIsEdit(true)

  //     let res = await dispatch(getItemIsEdit(item))
  //     // console.log(item,res);
  //     item,
  //     history.push('/app/menu/levels/third-level-1');
  //   };
  let header = [
    'id',
    'Name',
    'DOB',
    'Gender',
    'Status',
    'Actions',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPatientTable(searchArray(patient, search));
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Patient" match={match} /> */}
            <h4>Patient</h4>

            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Col lg={12} sm="4">
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
                  color="#0066b3"
                />
              </div>
            ) : (
              <ReactTableWithPaginationCardPatient
                header={header}
                doctor={search === '' ? patient : patientTable}
                changeRoute={changeRoute}
              />
            )}

            {/* <Button onClick={handleCreate} style={{ marginBottom: '15px' }}>
          Create Patient
        </Button> */}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
};
export default Patient;

{
  /* <Row>
{patient?.length === 0 ? (
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
    <Table>
      <thead>
        <tr>
        <th>ID</th>

          <th>Name</th>
          <th>Age</th>
          <th>DOB</th>


          <th>Gender</th>

          <th>Status</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {patient?.map((item, index) => {
          return (
            <tr>
              <td>{item?.patient_id}</td>

              <td>{item.name}</td>
              <td>{item.age}</td>

              <td>{item?.date_of_birth}</td>


              <td>{item?.gender?.name}</td>

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
)}
</Row> */
}
