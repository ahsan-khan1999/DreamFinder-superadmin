/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { ReadCategoryTable } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ReadCategory } from 'Store/Actions/TestsAction/readCategoryAction';

export default function viewCategory({ history }) {
  const header = ['Name', 'Category Id', 'Actions'];
  const [search, setSearch] = useState('');
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setTestTable(searchArray(test, search));
  };
  const [view, setView] = useState(true);

  const changeRoute = async (item) => {
    history.push('/app/Test/viewCurrentCategory', { item, view });
  };
  const dispatch = useDispatch();
  const readCategory = () => {
    let res = dispatch(ReadCategory());
  };
  useEffect(() => {
    readCategory();
  }, []);
  const category = useSelector((state) => state?.ViewTestReducer?.category);

  const loading = useSelector((state) => state.ViewTestReducer?.loading);
  const [categoryTable, setCategoryTable] = useState(category);
  const addCategory = () => {
    history.push('/app/Test/CreateCategory');
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            {/* <Breadcrumb heading="Patient" match={match} /> */}
            <h4>Category</h4>

            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <Button
              style={{ backgroundColor: '#003766' }}
              onClick={addCategory}
            >
              Add Category
            </Button>
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
                  color="#003766"
                />
              </div>
            ) : (
              <ReadCategoryTable
                header={header}
                data={search === '' ? category : categoryTable}
                changeRoute={changeRoute}
              />
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
