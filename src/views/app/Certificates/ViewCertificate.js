/* eslint-disable */

import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardTitle, Button, Col } from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';

import CloseIcon from '@mui/icons-material/Close';
import { FileUploader } from 'react-drag-drop-files';
export default function ViewCertificate(props) {
  const [certificate, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const authToken = JSON.parse(localStorage.getItem('token'));

  const getCertificates = async () => {
    let res = await axios.get(
      'https://dream-finder-backend.herokuapp.com/api/v1/certificates',
      {},
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${authToken?.token}`,
        },
      }
    );
    setCertificates(res?.data?.response_data?.certificate);
  };
  useEffect(() => {
    getCertificates();
  }, []);
  const deleteCertificate = async (uid) => {
    let res = await axios.delete(
      `https://dream-finder-backend.herokuapp.com/api/v1/certificates/${uid?.id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${authToken?.token}`,
        },
      }
    );
    if (res?.data?.response_code === 200) {
      NotificationManager.success(
        'Successfully Deleted',
        'Success',
        5000,
        '',
        null
      );
      getCertificates();
    } else {
      NotificationManager.error(
        res?.data?.response_message,
        'Error',
        5000,
        '',
        null
      );
    }
  };
  const uploadImage = async (event, item) => {
    // event.preventDefault();
    console.log(event, 'event');
    let formdata = new FormData();

    formdata.append('images', event);
    const authToken = JSON.parse(localStorage.getItem('token'));

    setLoading(true);

    let res = await axios.post(
      'https://dream-finder-backend.herokuapp.com/api/v1/firebase/image/upload',
      formdata,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${authToken?.token}`,
        },
      }
    );
    setLoading(false);

    if (res?.data?.response_code === 201) {
      NotificationManager.success(
        'Successfully Created Certifcate',
        'Success',
        5000,
        ''
      );
      setImage(res?.data?.response_data?.image_urls[0]);
      createCertificate(res?.data?.response_data?.image_urls[0], item);
    } else {
      NotificationManager.error(res?.data?.response_message, 'Error', 5000, '');
    }
  };
  const createCertificate = async (url, item) => {
    if (item) {
      let res = await axios.put(
        `https://dream-finder-backend.herokuapp.com/api/v1/certificates/${item?.id}`,
        {
          certificate_image: url,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${authToken?.token}`,
          },
        }
      );
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        getCertificates();
      } else {
        NotificationManager.error(
          res?.data?.response_message,
          'Error',
          5000,
          null,
          ''
        );
      }
    } else {
      let res = await axios.post(
        `https://dream-finder-backend.herokuapp.com/api/v1/certificates`,
        {
          certificate_image: url,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `Bearer ${authToken?.token}`,
          },
        }
      );
      if (res?.data?.response_code === 201) {
        NotificationManager.success(
          'Successfully Created',
          'Success',
          5000,
          null,
          ''
        );
        getCertificates();
      } else {
        NotificationManager.error(
          res?.data?.response_message,
          'Error',
          5000,
          null,
          ''
        );
      }
    }
  };
  const handleView = (item) => {
    window.open(item?.certificate_image, '_blank');
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <IntlMessages id="View Certificates" />
        </CardTitle>
        <div
          className="row"
          style={{ display: certificate?.length < 1 ? 'block' : 'none' }}
        >
          <Col lg={6}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <FileUploader
                  multiple={false}
                  handleChange={(e) => {
                    uploadImage(e);
                  }}
                  name="file"

                  // types={fileTypes}
                />
              </div>
            </div>

            {/* <div className="form-row">
              <div className="col-md-6 mb-5 ml-0 p-0">
                <Button
                  type="submit"
                  style={{ 'background-color': '#fed000' }}
                  className={`btn-shadow btn-multiple-state ${
                    loading ? 'show-spinner' : ''
                  }`}
                  onClick={uploadImage}
                >
                  <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  Save
                </Button>
              </div>
            </div> */}
          </Col>
        </div>
        <div className="row ">
          {certificate?.map((item) => (
            <div className="col-lg-6 my-5">
              <FileUploader
                multiple={false}
                handleChange={(e) => {
                  uploadImage(e, item);
                }}
                name="file"

                // types={fileTypes}
              />
              <div className="row">
                <div className="col-2">
                  <Button style={{backgroundColor:"#fed000"}} className="test" onClick={() => handleView(item)}>
                    View
                  </Button>
                </div>
                <div className="col-2">
                  <Button style={{backgroundColor:"#fed000"}} className="test" onClick={() => deleteCertificate(item)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            // <img src={item?.certificate_image} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
}
