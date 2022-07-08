/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Button, Card, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import axios from 'axios';
import { getToken, searchArray, testSearch } from '../../../Utils/auth.util';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'react-loader-spinner';

import {
  AdminTable,
  BannerTable,
  ProjectTable,
  TestanomialTable,
} from 'containers/ui/ReactTableCards';
import { ViewTestanomialAction } from 'Store/Actions/User/UserActions';

export default function ViewTestenomial(props) {
  const { testanomial, loading } = useSelector(
    (state) => state.ViewUserReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ViewTestanomialAction());
  }, []);

  const [doc, setDoc] = useState();

  const [search, setSearch] = useState('');

  const changeRoute = (item) => {
    props.history.push('/app/testanomial/EditTestanomial', item);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    setDoc(testSearch(data, search));
  };

  const handleAdd = () => {
    props.history.push('/app/testanomial/CreateTestanomial');
  };

  let header = ['Name', 'Review', 'Action'];
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Testanomial</h4>
            <Separator className="mb-5" />
          </Colxx>
        </Row>

        <Row className="mb-5 mx-0">
          <Col lg={12}>
            <Button
              onClick={handleAdd}
              style={{
                marginBottom: '15px',
                backgroundColor: '#fed000',
                marginTop: '10px',
              }}
            >
              Add Testanomial
            </Button>
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
                  color="#fed000"
                  height={100}
                  width={100}
                  // color="#fed000"
                />
              </div>
            ) : (
              <TestanomialTable
                header={header}
                data={testanomial}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
