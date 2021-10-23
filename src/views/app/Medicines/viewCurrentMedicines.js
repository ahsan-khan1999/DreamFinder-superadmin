/* eslint-disable */
import { NotificationManager } from 'components/common/react-notifications';
import { Formik } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { UpdateMedicinesAction } from 'Store/Actions/MedicinesAction/medicinesAction';
import CustomSelectInput from 'components/common/CustomSelectInput';
import Select from 'react-select';
const currencyOption = [
  { label: 'BDT', value: 'bdt', key: 1 },
  { label: 'USD', value: 'usd', key: 2 },
];
export default function viewCurrentMedicines(props) {
  const currentMedicines = props?.location?.state?.item;
  const view = props?.location?.state?.view;
  const [viewTest, setViewTest] = useState(view);
  const handleChangeToView = () => {
    props.history.push('/app/Medicines/viewMedicines');
  };
  const editTest = () => {
    setViewTest(false);
  };
  
  const medicine_obj = {
    id: currentMedicines?.id,
    name: currentMedicines?.name,
    item_id: currentMedicines?.item_id,
    formula: currentMedicines?.formula,
    unit_of_measure: currentMedicines?.unit_of_measure,
    route: currentMedicines?.route,
    medicine_type: currentMedicines?.medicine_type,
    manufacturer_number: currentMedicines?.manufacturer_number,
    manufacturer_name: currentMedicines?.manufacturer_name,
    sales_price: currentMedicines?.sales_price,
    purchase_price: currentMedicines?.purchase_price,
    discountable: false,
    currency: currentMedicines?.currency,
    quantity: currentMedicines?.quantity,
  };
  const [medicines, setMedicines] = useState(medicine_obj);

  const dispatch = useDispatch();
  const editTestField = async () => {
    if (
      medicines?.name === undefined &&
      medicines?.item_id === undefined &&
      medicines?.formula === undefined &&
      medicines?.unit_of_measure === undefined &&
      medicines?.route === undefined &&
      medicines?.medicine_type === undefined &&
      medicines?.manufacturer_name === undefined &&
      medicines?.manufacturer_number === undefined &&
      medicines?.sales_price === undefined &&
      medicines?.purchase_price === undefined &&
      medicines?.currency === undefined &&
      medicines?.quantity === undefined
    ) {
      NotificationManager.error('Please Enter Details', 'ERROR', 5000, '', '');
      return;
    } else {
      let res = await dispatch(UpdateMedicinesAction(medicines));
      if (res) {
        NotificationManager.success(
          'Sucessfully Updated',
          'SUCESS',
          5000,
          '',
          ''
        );
        props.history.push('/app/Medicines/viewMedicines');
        return;
      }
    }
  };
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Button
            className="btn-btn-secondary"
            onClick={handleChangeToView}
            style={{ marginRight: '10px', 'background-color': '#003766' }}
          >
            Back
          </Button>
        </CardTitle>
        <CardTitle>
          <h4>{viewTest ? "View Medicine" : "Edit Medicine"}</h4>
        </CardTitle>

        <Formik>
          <Form>
            <Row className="h-100">
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Name</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.name}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.name}
                      defaultValue={currentMedicines?.name}
                      className="form-control"
                      name="name"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({ ...medicines, name: e.target.value })
                      }
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Item Id</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.item_id}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.item_id}
                      defaultValue={currentMedicines?.item_id}
                      className="form-control"
                      name="itemId"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({ ...medicines, item_id: e.target.value })
                      }
                    />
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Formula</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.formula}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.formula}
                      defaultValue={currentMedicines?.formula}
                      className="form-control"
                      name="formula"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({ ...medicines, formula: e.target.value })
                      }
                    />
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Unit Of Measure</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.unit_of_measure}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.unit_of_measure}
                      className="form-control"
                      defaultValue={currentMedicines?.unit_of_measure}
                      name="unitofMeasure"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          unit_of_measure: e.target.value,
                        })
                      }
                    />
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Route</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.route}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.route}
                      className="form-control"
                      defaultValue={currentMedicines?.route}
                      name="route"
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({ ...medicines, route: e.target.value })
                      }
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Medicine Type</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.medicine_type}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.medicine_type}
                      defaultValue={currentMedicines?.medicine_type}
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
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Manufacture Number</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.manufacturer_number}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.manufacturer_number}
                      defaultValue={currentMedicines?.manufacturer_number}
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
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Manufacture Name</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.manufacturer_name}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.manufacturer_name}
                      defaultValue={currentMedicines?.manufacturer_name}
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
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Sale Price</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.sales_price}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.sales_price}
                      className="form-control"
                      name="salePrice"
                      defaultValue={currentMedicines?.sales_price}
                      // validate={validateEmail}
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          sales_price: Number(e.target.value),
                        })
                      }
                    />
                  )}
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Purchase Price</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.purchase_price}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.purchase_price}
                      defaultValue={currentMedicines?.purchase_price}
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
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Currency</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.currency?.name}</p>
                    </span>
                  ) : (
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name-slot-duration"
                      //   value={medicines?.currency}
                      //   defaultValue={currentMedicines?.currency?.name}
                      defaultValue={{
                        label: currentMedicines?.currency?.name,
                        value: currentMedicines?.currency?.name,
                        key: currentMedicines?.currency?.id,
                      }}
                      onChange={(val) =>
                        setMedicines({
                          ...medicines,
                          currency: { id: val?.key, name: val?.value },
                        })
                      }
                      options={currencyOption}
                    />
                  )}
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6>Quantity</h6>
                  </Label>
                  {viewTest ? (
                    <span>
                      <p>{currentMedicines?.quantity}</p>
                    </span>
                  ) : (
                    <Input
                      required
                      //   value={medicines.quantity}
                      className="form-control"
                      defaultValue={currentMedicines?.quantity}
                      name="quantity"
                      onChange={(e) =>
                        setMedicines({
                          ...medicines,
                          quantity: Number(e.target.value),
                        })
                      }
                    />
                  )}
                </FormGroup>
              </Col>
            </Row>
            {viewTest ? (
              <Button
                className="btn-btn-secondary"
                onClick={editTest}
                style={{ 'background-color': '#003766' }}
              >
                Edit Medicine
              </Button>
            ) : (
              <Button
                className="btn-btn-secondary"
                onClick={editTestField}
                style={{ 'background-color': '#003766' }}
              >
                Save
              </Button>
            )}
          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}
