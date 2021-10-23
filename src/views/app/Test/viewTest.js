/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { ReadTestTable } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { loopHooks } from 'react-table';
import { Button, Card, CardBody, Col, Input, Row } from 'reactstrap';
import { ViewTestAction } from 'Store/Actions/TestsAction/testActions';
import { searchArray } from 'Utils/auth.util';
import CustomSelectInput from 'components/common/CustomSelectInput';

const statusOPtion = [
  { label: '50', value: '50', key: 1 },
  { label: '100', value: '100', key: 2 },
  { label: '150', value: '150', key: 3 },
  { label: '200', value: '200', key: 4 },
  { label: '250', value: '250', key: 5 },
];
export default function viewTest({ history }) {
  const test = useSelector((state) => state.ViewTestReducer?.test);
  const loading = useSelector((state) => state.ViewTestReducer?.loading);
  const [testTable, setTestTable] = useState(test);
  const handleCreate = () => {
    history.push('/app/Test/createTest');
  };
  const [view, setView] = useState(true);
  const [count, setCount] = useState(50);
  // console.log(count);
  const changeRoute = async (item) => {
    history.push('/app/Test/viewCurrentTest', { item, view });
  };
  let header = ['Name', 'Currency', 'Price', 'Status', 'Actions'];
  const [search, setSearch] = useState('');
  // console.log(search);
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setTestTable(searchArray(test, search));
  };
  const dispatch = useDispatch();
  const getTests = async () => {
    let res = await dispatch(ViewTestAction());
  };
  // const [myTableData,setMyTableData] = useState(test)
  // const setTableData = (data, count) => {
  //   let array =[]
  //   data.map((item) => {
  //     if(data?.length < count){
  //       array.push(item)
  //     }
  //   });
  //   return array;
  // };
  useEffect(() => {
    getTests(); 
  }, []);
  const addTest = () => {
    history.push('/app/Test/createTest');
  };
  // const handleChange = (e) => {
  //   setCount(e.value)
  //   setMyTableData(setTableData(test,count))
  // }

  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Patient" match={match} /> */}
            <h4>Test</h4>

            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <Button style={{ backgroundColor: '#003766' }} onClick={addTest}>
              Add Test
            </Button>
          </Colxx>
        </Row>

        <div className="d-flex bd-highlight">
          <div className="p-2 w-100 bd-highlight">
            <Row>
              <Col lg={12} sm="4" style={{ padding: '0px 10px' }}>
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
          </div>
          {/* <div className="container">
            <Col lg={12}>
              <div className="d-flex justify-content-end">
                <Select
                  components={{ Input: CustomSelectInput }}
                  className="react-select"
                  classNamePrefix="react-select"
                  name="form-field-name-slot-duration"
                  //   value={status}
                  // defaultValue={status?.name}
                  onChange={(val) => setCount(val?.value)}
                  options={statusOPtion}
                />
              </div>
            </Col>
          </div> */}
        </div>
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
              <ReadTestTable
                header={header}
                data={search === '' ? test : testTable}
                changeRoute={changeRoute}
                // count={count}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
