/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { ViewPaymentTable } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { Card, CardBody, CardTitle, Col, Label, Row } from 'reactstrap';
import Select from 'react-select';

import apiServices from 'services/requestHandler';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { searchArray } from 'Utils/auth.util';
import { useDispatch, useSelector } from 'react-redux';
import { ViewPatientAction } from 'Store/Actions/User/Patient/ViewPatientAction';
import types from '../menu/types';
const statusOPtion = [
  { label: 'Both', value: 'both', key: 1 },

  { label: 'Unpaid', value: 'unpaid', key: 2 },
  { label: 'Paid', value: 'paid', key: 3 },
];
const orderFilter = [
  { label: 'Both', value: 'both', key: 0 },

  { label: 'Appointment', value: 'appointment', key: 1 },
  { label: 'Order', value: 'order', key: 2 },
];
export default function viewPayment({ history }) {
  const [search, setSearch] = useState('');
  const [patientName, setPatientName] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState([]);
  const readPayment = async () => {
    setLoading(true);
    let res = await apiServices.readPayment();
    setPayment(res?.data?.response_data?.payment);
    setLoading(false);
  };
  const [view, setView] = useState(false);
  const changeRoute = (item) => {
    history.push('/app/Payment/viewCurrentPayment', { item, view });
  };
  const dispatch = useDispatch();
  const getPatient = () => {
    dispatch(ViewPatientAction());
  };
  const patient = useSelector((state) => state?.ViewPatientReducer?.patient);
  const [paymentFilter, setPaymentFilter] = useState();
  useEffect(() => {
    readPayment();

    getPatient();
  }, []);

  const handleSearch = (event) => {
    // setSearch(event.target.value);
    // setReports(searchArray(report, search));
  };
  let header = ['Type', 'Amount', 'Date', 'User Name', 'Status', 'Action'];
  let options = patient?.map((item, index) => {
    return { label: item?.name, value: item?.name, key: index };
  });

  let payment_filter = payment?.slice();

  if (status) {
    payment_filter = payment?.filter(
      (item) => item?.status?.name?.toLowerCase() == status?.toLowerCase()
    );
  }

  if (type) {
    payment_filter = payment?.filter(
      (item) => item?.type?.toLowerCase() == type?.toLowerCase()
    );
  }
  if (status && type) {
    // console.log(type, status);
    payment_filter = payment?.filter(
      (item) =>
        item?.status?.name?.toLowerCase() == status?.toLowerCase() &&
        item?.type?.toLowerCase() == type?.toLowerCase()
    );
  }
  if (status === 'both' && type === 'both') {
    payment_filter = payment?.filter((item) => item);
  }
  // console.log(payment_filter, 'FilterArray');
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Patient" match={match} /> */}
            <h4>Payment</h4>

            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12"></Colxx>
        </Row>
        <Row>
          <Col lg={4} sm="4">
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
        <Row style={{ margin: '10px 0px' }}>
          {/* <Col lg={3} sm="4"> */}
          {/* <Label>By Name</Label>
            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name-slot-duration"
              //   value={status}
              defaultValue={
                {
                  // label: payment?.status?.name,
                  // value: payment?.status?.name,
                  // key: payment?.status?.id,
                }
              }
              onChange={(val) => setPatientName(val?.value)}
              options={options}
            />
          </Col> */}
          <Col lg={3} sm="4">
            <Label>By Status</Label>

            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name-slot-duration"
              //   value={status}
              defaultValue={{
                label: statusOPtion[0]?.value,
                value: statusOPtion[0]?.value,
                key: statusOPtion[0]?.key,
              }}
              onChange={(val) => setStatus(val?.value)}
              // onChange={handleChange}

              options={statusOPtion}
            />
          </Col>
          <Col lg={3} sm="4">
            <Label>By Order</Label>

            <Select
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              name="form-field-name-slot-duration"
              //   value={status}
              defaultValue={{
                label: orderFilter[0].value,
                value: orderFilter[0].value,
                key: orderFilter[0].key,
              }}
              onChange={(val) => setType(val?.value)}
              options={orderFilter}
            />
          </Col>
        </Row>
        <Row>
          <Colxx xxs="12" className="mb-4" lg="12">
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
              <ViewPaymentTable
                header={header}
                changeRoute={changeRoute}
                data={payment_filter}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
