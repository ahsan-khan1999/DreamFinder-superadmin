/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, Card, CardBody, FormGroup, Label, Button } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import { useDispatch } from 'react-redux';
import { GetMarketsData } from 'Store/Actions/ConcordDoctor/DoctorAction';

import {
  FormikReactSelect,
  FormikCheckboxGroup,
  FormikCheckbox,
  FormikRadioButtonGroup,
  FormikCustomCheckbox,
  FormikCustomCheckboxGroup,
  FormikCustomRadioGroup,
  FormikTagsInput,
  FormikSwitch,
  FormikDatePicker,
} from './FormikFields';

const SignupSchema = Yup.object().shape({
  reactSelect: Yup.array()
    .min(3, 'Pick at least 3 tags')
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    ),
  
});

const options = [
  { value: 'food', label: 'Food' },
  { value: 'beingfabulous', label: 'Being Fabulous', disabled: true },
  { value: 'reasonml', label: 'ReasonML' },
  { value: 'unicorns', label: 'Unicorns' },
  { value: 'kittens', label: 'Kittens' },
];

const FormikCustomComponents = () => {
  const onSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      reactSelect: values.reactSelect.map((t) => t.value),
    };
    console.log(values,"")
  };
  const dispatch = useDispatch();

  return (
    <Row className="mb-4">
      <Colxx xxs="12">
        <Card>
          <CardBody>
            <h6 className="mb-4">Custom Components and Layouts with Yup</h6>
            <Formik
              initialValues={{
                reactSelect: '',
              }}
              validationSchema={SignupSchema}
              onSubmit={onSubmit}
            >
              {({
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isSubmitting,
              }) => (
                <Form className="av-tooltip tooltip-label-right">

                  <FormGroup className="error-l-100">
                    <Label>React Select </Label>
                    <FormikReactSelect
                      name="reactSelect"
                      id="reactSelect"
                      value={values.reactSelect}
                      isMulti
                      options={options}
                      onChange={
                        dispatch(GetMarketsData('', 'region'))
                      }
                      onBlur={setFieldTouched}
                    />
                    {errors.reactSelect && touched.reactSelect ? (
                      <div className="invalid-feedback d-block">
                        {errors.reactSelect}
                      </div>
                    ) : null}
                  </FormGroup>

                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Colxx>
    </Row>
  );
};
export default FormikCustomComponents;
