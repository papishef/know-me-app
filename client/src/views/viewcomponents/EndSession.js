import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const EndSession = (props) => {
  const {
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>EndSession</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>End Session?</ModalHeader>
        <ModalBody>
          If you continue, your chat room session shall be ended and deleted from the system.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>End Session</Button>{' '}
          <Button color="success" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default EndSession;