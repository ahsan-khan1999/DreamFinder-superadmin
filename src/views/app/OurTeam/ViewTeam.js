/* eslint-disable */

import { React, useState, useEffect } from 'react';
import { Button, Card, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import axios from 'axios';
import { getToken, searchArray, testSearch } from '../../../Utils/auth.util';
import { CardBody, Col, Table, CardTitle } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from 'react-loader-spinner';

import { AdminTable, TeamTable } from 'containers/ui/ReactTableCards';

export default function ViewTeam({history}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if(data?.length < 1){

      getAdmin();
    }
  }, []);
  const dispatch = useDispatch();
  const getAdmin = async () => {
    setLoading(true);
    const res = await axios.get(
      'https://dream-finder-backend.herokuapp.com/api/v1/our-teams',
      {}
    );

    setData(res?.data?.response_data?.our_team);
    setLoading(false)
  };
  const [doc, setDoc] = useState();

  const [search, setSearch] = useState('');

  const changeRoute = (item) => {
    history.push('/app/OurTeam/EditTeam', item);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);

    setDoc(testSearch(data, search));
  };

  const handleAdd = () => {
    history.push('/app/OurTeam/CreateTeam');
  };

  let header = ['Name', 'Designation', 'Description', 'Actions'];
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Doctors" match={match} /> */}
            <h4>Team</h4>
            <Separator className="mb-5" />
          </Colxx>
        </Row>
       
        <Button
          onClick={handleAdd}
          style={{
            marginBottom: '15px',
            backgroundColor: '#fed000',
            marginTop: '10px',
          }}
        >
          Add User
        </Button>
        {/* <Button
            onClick={handleAddStaff}
            style={{
              marginBottom: '15px',
              backgroundColor: '#fed000',
              marginTop: '10px',
            }}
          >
            Add Delivery Staff
          </Button> */}
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
              <TeamTable
                header={header}
                data={search === '' ? data : doc}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
