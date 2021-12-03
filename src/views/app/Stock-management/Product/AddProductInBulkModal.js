/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
/* eslint-disable */

import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { Row, Card, CardTitle, Label, FormGroup } from 'reactstrap';
import { NotificationManager } from 'components/common/react-notifications';
import axios from 'axios';
import IntlMessages from 'helpers/IntlMessages';
import ProductsData from '../../../../static/files/ProductsData.xlsx'
import { BASEURL } from 'services/HttpProvider';

const AddBulkUploadModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  // console.log(selectedCategory.toLowerCase());
  const { handleClose, show } = props;
  const [file, setFile] = useState();
  const staticdata = useSelector((state) => state?.orderReducer?.staticdata);
  
  let option_static_Category = [];
  staticdata?.product_category__category_list?.filter((item) =>
    option_static_Category.push({
      label: item?.name,
      value: item?.value,
      key: item?.id,
    })
  );
  const uploadFile = async (event) => {
    event.preventDefault();
    let formdata = new FormData();

    const authToken = JSON.parse(localStorage.getItem('token'));

    if (file === undefined || file === null) {
      NotificationManager.error('Enter Details', 'Error', 5000, '');
      return;
    } else {
      setLoading(true);

      formdata.append('file', file[0]);
      let res = await axios.post(
        BASEURL+`/products/bulk_create/${selectedCategory?.toLowerCase()}`,
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            "x-session-key": authToken.token,
            "x-session-type": authToken.type,
          },
        }
      );
      setLoading(false);
      if (res?.data?.response_code === 200) {
        NotificationManager.success(
          'Successfully Uploaded Report',
          'Success',
          5000,
          ''
        );
        setLoading(false);

        props.history.push('/app/stocks-management/viewProduct');
      } else {
        NotificationManager.error(
          res?.data?.response_message,
          'Error',
          5000,
          ''
        );
      setLoading(false);

      }
      setLoading(false);
    }
  };

  const test = () => {
    handleClose(true);
  };
  // let showHideClassName = show ? 'display-block' : 'display-none';
  // console.log(show,"show value",showHideClassName);
  return (
    <Modal isOpen={show} size="sm" centered style={{ boxShadow: 'none' }}>
      <ModalHeader toggle={handleClose} style={{ padding: '15px 20px' }}>
        Add Bulk
      </ModalHeader>
      <ModalBody>
        <Col lg={12}>
          <FormGroup>
            <label>
              <IntlMessages id="Select Category" />
            </label>

            <Select
              required
              components={{ Input: CustomSelectInput }}
              className="react-select"
              classNamePrefix="react-select"
              onChange={(e) => {
                //   dispatch(getCategory(e.value));
                setSelectedCategory(e.label);
              }}
              required
              options={option_static_Category}
            />
          </FormGroup>
        </Col>
        <Col>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label className="">Select File :</label>
              <input
                type="file"
                className="form-control"
                name="upload_file"
                onChange={(e) => {
                  setFile(e.target.files);
                }}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="col-md-6">
              <Button
                type="submit"
                className="btn btn-primary"
                style={{ backgroundColor: '#0066b3' }}
                className={`btn btn-primary btn-shadow btn-multiple-state ${
                  loading ? 'show-spinner' : ''
                }`}
                onClick={uploadFile}
                size="sm"
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">Save</span>
              </Button>
            </div>
            <div className="col-md-6">
              <Button
                className="btn btn-primary"
                style={{ backgroundColor: '#0066b3' }}
                target="_blank"
                href={ProductsData}
                download={ProductsData}
                onClick={test}
                size="sm"
              >
                Sample File
              </Button>
            </div>
          </div>
        </Col>
      </ModalBody>
    </Modal>
  );
};

export default AddBulkUploadModal;
