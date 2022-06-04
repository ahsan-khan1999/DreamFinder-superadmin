/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Button, Card, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import axios from 'axios';
import { getToken, searchArray, testSearch } from '../../../Utils/auth.util';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'react-loader-spinner';

import { AdminTable, BannerTable, ProjectTable } from 'containers/ui/ReactTableCards';

export default function ViewBanner(props) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAdmin();
  }, []);
  const dispatch = useDispatch();
  const getAdmin = async () => {
    setLoading(true);
    const res = await axios.get(
      'https://dream-finder-backend.herokuapp.com/api/v1/banner',
      {}
    );

    setData(res?.data?.response_data?.banner);
    setLoading(false);
  };
  const [doc, setDoc] = useState();

  const [search, setSearch] = useState('');

  const changeRoute = (item) => {
    props.history.push('/app/Banner/EditBanner', item);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    setDoc(testSearch(data, search));
  };

  const handleAdd = () => {
    props.history.push('/app/Banner/CreateBanner');
  };

  let header = ['Heading', 'Description', 'Action'];
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Banner</h4>
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
              Add Banner
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
                  // color="#003766"
                />
              </div>
            ) : (
                <BannerTable
                header={header}
                data={data}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
