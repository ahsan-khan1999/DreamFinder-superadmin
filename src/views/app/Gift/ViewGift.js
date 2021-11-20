/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { AssignedGiftTabel } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ViewGiftAction } from 'Store/Actions/GiftAction/GiftActions';
import { searchArray } from 'Utils/auth.util';

export default function ViewGift(props) {
  const [search, setSearch] = useState('');
  const [doc, setDoc] = useState();

  const dispatch = useDispatch();
  const gifts = useSelector((state) => state?.GiftReducer?.gifts);
  const loading = useSelector((state) => state?.GiftReducer?.loading);
  useEffect(() => {
    gifts?.length === 0 ? dispatch(ViewGiftAction()) : null
  }, []);

  
  const changeRoute = (item) => {
    props.history.push('/app/Gift/gift', item);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setDoc(searchArray(gifts, search));
  };
  const handleAdd = () => {
    props.history.push('/app/Gift/gift');
  };
  const headers = [
    'Assigned To Name',
    'Email Address',
    'Contact Number',
    'Action',
  ];
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>View Gift</h4>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Col lg={12}>
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
                <Loader type="Puff" height={100} width={100} color="#0066B3" />
              </div>
            ) : (
              <AssignedGiftTabel
                header={headers}
                data={search === '' ? gifts : doc}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
