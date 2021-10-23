/* eslint-disable */

import axios from 'axios';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Row } from 'reactstrap';
import apiServices from 'services/requestHandler';

export default function UploadReport() {
  const [file, setFile] = useState();
  // console.log(file);

  // const test = useSelector(state => state?.ViewReportReducer?.)
  const uploadFile = async () => {
    let data = new FormData();
    // console.log(file);
    data.append('report', file);
    data.append('id', '2530d730-7083-4eb9-9faf-6da1317f1ebe');

    // console.log(data.keys, 'data');

    // let apiData = {
    //   id: '',
    //   report:data,
    // };
    // console.log(apiData);
    // let res = await apiServices.uploadReport(data);
    // console.log(res);
  };
  return (
    <Card>
      <CardBody>
        <Row>
          <Colxx xxs="12">
            <h4>Upload Test Report</h4>

            <Separator className="mb-5" />
          </Colxx>
        </Row>
        <Row>
          <Col>
            <h3 className="text-white">React File Upload - Nicesnippets.com</h3>
            <br />
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="text-white">Select File :</label>
                <input
                  type="file"
                  className="form-control"
                  name="upload_file"
                  onChange={(e) => {
                    // console.log(e.target.files[0]);
                    setFile(e.target.files);
                  }}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="col-md-6">
                <button
                  type="submit"
                  className="btn btn-dark"
                  onClick={uploadFile}
                >
                  Save
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
