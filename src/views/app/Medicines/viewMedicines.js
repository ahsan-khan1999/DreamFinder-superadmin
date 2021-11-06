/* eslint-disable */

import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { ReadMedicinesTable, ReadTestTable } from 'containers/ui/ReactTableCards';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { loopHooks } from 'react-table';
import { Button, Card, CardBody, Col, Row } from 'reactstrap';
import { ViewMedicinesAction } from 'Store/Actions/MedicinesAction/medicinesAction';
import { searchArray } from 'Utils/auth.util';

export default function viewMedicines({ history }) {
  const addMedicines = () => {
    history.push('/app/Medicines/CreateMedicines');
  };
  const [search, setSearch] = useState('');
  // console.log(search);
  const [medicinesTable, setMedicinesTable] = useState()
  const handleSearch = (event) => {
    setSearch(event.target.value);
    setMedicinesTable(searchArray(medicines, search));
  };
  const dispatch = useDispatch();
  const getMedicines =async () => {
    let res =await dispatch(ViewMedicinesAction());
  };
  useEffect(() => {
    getMedicines();
  }, []);
  const medicines = useSelector((state) => state?.ViewMedicinesReducer?.medicines);

  const loading = useSelector((state) => state?.ViewMedicinesReducer?.loading);
  let header = ['Name', 'Formula', 'sales_price', 'purchase_price', 'availability','Action'];
  const [view, setView] = useState(true);

  const changeRoute = (item) => {
      history.push('/app/Medicines/viewCurrentMedicines',{item,view})
  }
//   const [medicineTable, setMedicineTable] = useState(category);
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>Medicines</h4>

            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Colxx xxs="12">
            <Button
              style={{ backgroundColor: '#003766' }}
              onClick={addMedicines}
            >
              Add Medicine
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
                  color="#0066b3"
                />
              </div>
            ) : (
                <ReadMedicinesTable
                  header={header}
                  data={search === '' ? medicines : medicinesTable}
                  changeRoute={changeRoute}
                />
              
            )}
          </Colxx>
        </Row>
      </CardBody>
    </Card>
  );
}
