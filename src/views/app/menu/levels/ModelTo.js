/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import AdvancedSearch from 'containers/dashboards/AdvancedSearch';
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

const ModalExample = (props) => {
  const {
    buttonLabel,
    className,
    clickHandler
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button style={{'background-color': '#003766'}}  color="btn btn-secondary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Slots</ModalHeader>
        <ModalBody>
          <AdvancedSearch clickHandler={clickHandler} setModal={setModal}/>
        </ModalBody>
        
      </Modal>
    </div>
  );
}

export default ModalExample;