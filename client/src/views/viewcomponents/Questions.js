//jshint esversion: 6
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const Questions = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button className='mx-auto bg-transparent border-0'  onClick={toggle}>Questions</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Select a question to get started</ModalHeader>
        <ModalBody>
            <span onClick={toggle}> 1.question</span>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Close</Button>{' '}
         
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Questions;