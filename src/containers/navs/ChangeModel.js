/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
/* eslint-disable */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useFormik } from 'formik';
import { Row, Card, CardTitle, Label, FormGroup } from 'reactstrap';
import { Colxx } from 'components/common/CustomBootstrap';
import IntlMessages from 'helpers/IntlMessages';
import ResetPassword from '../../views/user/reset-password';
import close from '../../assets/logos/close.svg';

const ModalChangePassword = (props) => {
  const { handleClose, show } = props;

  // let showHideClassName = show ? 'display-block' : 'display-none';
  // console.log(show,"show value",showHideClassName);
  return (
    <Modal isOpen={show} size="sm" centered style={{boxShadow:'none'}}>
      <ModalHeader toggle={handleClose} style={{ padding: '15px 20px' }}>
        Change password
      </ModalHeader>
      <ModalBody>
        <ResetPassword handleClose={handleClose} history={props.history}/>
      </ModalBody>
    </Modal>
  );
};

export default ModalChangePassword;
