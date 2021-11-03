import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
/* eslint-disable */
import AddBulkMedicineModal from './addMedicineBulkModal'
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from 'reactstrap';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { CreateTestAction } from 'Store/Actions/TestsAction/testActions';
import { ReadCategory } from 'Store/Actions/TestsAction/readCategoryAction';
import { NotificationManager } from 'components/common/react-notifications';
import { CreateMedicinesAction } from 'Store/Actions/MedicinesAction/medicinesAction';
import apiServices from 'services/requestHandler';
const currencyOption = [
  { label: 'BDT', value: 'bdt', key: 1 },
  { label: 'USD', value: 'usd', key: 2 },
];
export default function CreateMedicines({ history }) {
  const [currency, setCurrency] = useState();
  let [show, setShow] = useState(false);
  let [hide, setHide] = useState(false);

  const showModal = () => setShow(true);
  const hideModal = () => setShow(false);
  const medicine_obj = {
    name: '',
    item_id: '',
    formula: '',
    unit_of_measure: '',
    route: '',
    medicine_type: '',
    manufacturer_number: '',
    manufacturer_name: '',
    sales_price: '',
    purchase_price: '',
    discountable: false,
    currency: '',
    quantity: '',
  };
  const [medicines, setMedicines] = useState(medicine_obj);
  const dispatch = useDispatch();
  const onCreateMedicine = async () => {
    // console.log(medicines);
    let res = await dispatch(CreateMedicinesAction({ medicines: [medicines] }));
    if (res) {
      NotificationManager.success('Sucessfully Created ', 'Sucsese', 5000, '');
      history.push('/app/Medicines/viewMedicines');
    }
  };
  const createMedicineInBulk = async () => {
    let res = await apiServices.insertMedicine(data);
  };
  // console.log(medicines?.currency);
  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>
            <IntlMessages id="Create Medicine" />
          </CardTitle>
          <div style={{ marginBottom: '30px' }}></div>
          <Formik
          // initialValues={formikData.initialValues}
          // onSubmit={formikData.handleSubmit}
          >
            <Form>
              <Row className="h-100">
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Name</h6>
                    </Label>

                    <Input
                      required
                      value={medicines.name}
                      className="form-control"
                      name="name"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({ ...medicines, name: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Item Id</h6>
                    </Label>

                    <Input
                      required
                      value={medicines.item_id}
                      className="form-control"
                      name="itemId"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({ ...medicines, item_id: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Formula</h6>
                    </Label>

                    <Input
                      required
                      value={medicines.formula}
                      className="form-control"
                      name="formula"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({ ...medicines, formula: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Unit Of Measure</h6>
                    </Label>
                    <Input
                      required
                      value={medicines.unit_of_measure}
                      className="form-control"
                      name="unitofMeasure"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          unit_of_measure: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Route</h6>
                    </Label>
                    <Input
                      required
                      value={medicines.route}
                      className="form-control"
                      name="route"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({ ...medicines, route: e.target.value })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Medicine Type</h6>
                    </Label>
                    <Input
                      required
                      value={medicines.medicine_type}
                      className="form-control"
                      name="medType"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          medicine_type: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Manufacture Number</h6>
                    </Label>
                    <Input
                      required
                      value={medicines.manufacturer_number}
                      className="form-control"
                      name="manfNum"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          manufacturer_number: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Manufacture Name</h6>
                    </Label>
                    <Input
                      required
                      value={medicines.manufacturer_name}
                      className="form-control"
                      name="manuName"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          manufacturer_name: e.target.value,
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Sale Price</h6>
                    </Label>
                    <Input
                      required
                      value={medicines.sales_price}
                      className="form-control"
                      name="salePrice"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          sales_price: Number(e.target.value),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Purchase Price</h6>
                    </Label>
                    <Input
                      required
                      value={medicines.purchase_price}
                      className="form-control"
                      name="purchasePrice"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          purchase_price: Number(e.target.value),
                        })
                      }
                    />
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Currency</h6>
                    </Label>
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-slot-duration"
                      // value={medicines?.currency}
                      // defaultValue={medicines?.currency?.name}
                      onChange={(val) =>{

                        console.log("ye log value select",val)
                        setMedicines({
                          ...medicines,
                          currency: { id: val?.key, name: val?.value },
                        })
                      }
                      }
                      options={currencyOption}
                    />
                  </FormGroup>
                </Col>

                <Col lg={6}>
                  <FormGroup>
                    <Label>
                      <h6>Quantity</h6>
                    </Label>
                    <Input
                      required
                      value={medicines.quantity}
                      className="form-control"
                      name="quantity"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                  </FormGroup>
                </Col>
              </Row>

              <Button
                style={{backgroundColor:'#0066b3'}}

                style={{ 'background-color': '#003766' ,marginRight:'5px'}}
                // type="submit"
                // className={`btn-shadow btn-multiple-state ${
                //   loading ? 'show-spinner' : ''
                // }`}
                size="sm"
                onClick={onCreateMedicine}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                Add Medicine
              </Button>
              <Button
                style={{backgroundColor:'#0066b3'}}

                style={{ 'background-color': '#003766' }}
                // type="submit"
                // className={`btn-shadow btn-multiple-state ${
                //   loading ? 'show-spinner' : ''
                // }`}
                size="sm"
                onClick={showModal}
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                Add Bulk Medicine
              </Button>
            </Form>
          </Formik>
        </CardBody>
      </Card>
      <AddBulkMedicineModal show={show} handleClose={hideModal} history={history}/>
    </>
  );
}
