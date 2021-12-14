/* eslint-disable */

import { React, useEffect, useState } from 'react';
import { Button, Card, Row } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import axios from 'axios';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { doc } from 'prettier';
import { items } from 'data/carouselItems';
import { useDispatch, useSelector } from 'react-redux';
// import { DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';

import { DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { UncontrolledDropdown } from 'reactstrap';
import Loader from 'react-loader-spinner';
import apiServices from 'services/requestHandler';

import {
  DepartmentHeadTable,
  DistributionCenter,
  OrderRequestTable,
  RemovalRequestTable,
} from 'containers/ui/ReactTableCards';
import { searchArray, testSearch } from 'Utils/auth.util';

import { OrderAction } from 'Store/Actions/ConcordOrder/OrderAction';
import { StaticDataGet } from 'Store/Actions/StaticData/StaticDataAction';
import { GetDepartmentHead } from '../../../Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import { GetDistributionCenter } from 'Store/Actions/ConcordDistributionCenter/DistributionCenterAction';
import { CheckConditionArray } from 'Utils/functions';

export default function viewDistributioncenter({ match, history }) {
  let dispatch = useDispatch();

  const [search, setSearch] = useState('');

  useEffect(() => {
    getDistributionCenter();
  }, []);

  const getDistributionCenter = async () => {
    let res = await dispatch(GetDistributionCenter());
  };

  const distributioncenter = useSelector(
    (state) => state?.distributionCenterReducer?.distributioncenter
  );
  const distributioncenterloader = useSelector(
    (state) => state?.distributionCenterReducer?.distributioncenterloader
  );

  // console.log(distributioncenter,"distributioncenter")

  let distributioncenterData = [];
  distributioncenter?.map((item) =>
    distributioncenterData.push({
      name: item?.name,
      designation: CheckConditionArray(
        item?.depot_managers,
        'is_primary',
        'designation'
      ),
      email: CheckConditionArray(
        item?.depot_managers,
        'is_primary',
        'email_address'
      ),
      address:
        CheckConditionArray(
              item?.depot_managers,
              'is_primary',
              'address',
              'street_address'
            ) +
            ' ' +
            CheckConditionArray(
              item?.depot_managers,
              'is_primary',
              'address',
              'area'
            ) +
            ' ' +
            CheckConditionArray(
              item?.depot_managers,
              'is_primary',
              'address',
              'province'
            ) +
            ' ' +
            CheckConditionArray(
              item?.depot_managers,
              'is_primary',
              'address',
              'city'
            ),
      phone: CheckConditionArray(
        item?.depot_managers,
        'is_primary',
        'phone_number'
      ),
      status: item?.status.name,
      depo_uid: CheckConditionArray(item?.depot_managers, 'is_primary', 'uid'),
      regions: item?.regions,
      depo_name: CheckConditionArray(
        item?.depot_managers,
        'is_primary',
        'name'
      ),
      uid: item?.uid,

      depomanagersSelect: item?.depot_managers,
      areasSelect: item?.areas,
    })
  );


  console.log(distributioncenterData,"Testing Now")
  const loading = useSelector(
    (state) => state?.distributionCenterReducer?.loading
  );

  const changeRoute = async (item) => {
    history.push(
      '/app/distributioncenter-management/viewCurrentDistributioncenter',
      item
    );
  };
  const [distributionTable, setDistributionTable] = useState(
    distributioncenterData
  );

  const handleAdd = () => {
    history.push('/app/distributioncenter-management/CreateDistributioncenter');
  };

  useEffect(() => {
    setDistributionTable(distributioncenterData);
  }, [distributioncenter]);
  const headers = [
    'Name',
    'Designation',
    'Email',
    'Address',
    'Phone',
    'Status',
    'Actions',
  ];
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setDistributionTable(testSearch(distributioncenterData, search));
  };

  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>Distribution Center</h4>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Button
          onClick={handleAdd}
          style={{
            marginBottom: '15px',
            backgroundColor: '#0066b3',
            marginTop: '10px',
          }}
        >
          Add New Distribution Center
        </Button>
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
                  data-toggle="tooltip"
                  data-placement="top"
                  title="By Name And Status"
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
            {distributioncenterloader ? (
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
              <DistributionCenter
                header={headers}
                changeRoute={changeRoute}
                data={distributionTable}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
