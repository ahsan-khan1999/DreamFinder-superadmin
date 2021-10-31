/* eslint-disable */
import AvailityBasic from 'containers/form-validations/AvailityBasic'
import AvailityCustom from 'containers/form-validations/AvailityCustom'
import FormikBasicFieldLevel from 'containers/form-validations/FormikBasicFieldLevel'
import FormikBasicFormLevel from 'containers/form-validations/FormikBasicFormLevel'
import FormikCustomWithTopLabels from 'containers/form-validations/FormikCustomWithTopLabels'
import React from 'react'
import FormikCustomComponents from '../../../../containers/form-validations/FormikCustomComponents'
import FormikValidationSchema from '../../../../containers/form-validations/FormikValidationSchema'
const ViewCurrentDoctors = () => {
  return (
    <div>
      <FormikCustomComponents/>
      <FormikValidationSchema/>
      <AvailityBasic/>
      <AvailityCustom/>
      <FormikBasicFieldLevel/>
      <FormikBasicFormLevel/>
      <FormikCustomWithTopLabels/>
    </div>
  )
}

export default ViewCurrentDoctors
