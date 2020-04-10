//jshint esversion: 6
import React, {useState, useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { Nav,
    NavLink, 
    Dropdown,
    DropdownToggle,
     DropdownMenu,
      DropdownItem, Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import SmallLogo from '../../assets/logo-sm.png';
import DropIcon from '../../assets/drop-icon.png';
import io from 'socket.io-client';
import axios from 'axios';


const Navbar = ({roomID}) => {
  const [isEnded, setIsEnded] = useState(false);
  const [modal, setModal] = useState(false);
  

const endGame = () => {
  setIsEnded(true);
};

//Delete all chats from room when session ends
  useEffect(() => {

    axios.delete(`http://localhost:4000/delete/${roomID}`);

  }, [isEnded]);

    //dropdown state and hooks
    const [dropdownOpen, setDropdownOpen] = useState(false);
    //dropdown toggle function
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const trigger = () => setModal(!modal);


  return (
    <div>
      <div className='p-1'><img src={SmallLogo} alt='#' /></div>
      <Nav>
        <NavLink className='text-light font-weight-bold'>🔥Room {roomID}</NavLink>
        <Dropdown className='ml-auto pr-2' isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className='bg-transparent border-0'>
                    <img src={DropIcon} alt='#' />
                    </DropdownToggle>
                <DropdownMenu className='drp-content'>
                    <DropdownItem href='/how-to-play'>
                      <NavLink>How to play</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                    <NavLink className='text-dark' href='/invite'>Invite</NavLink>
                    </DropdownItem>
                    <DropdownItem>
                    <div>
                      <Button color="danger" onClick={trigger}>End Session</Button>
                      <Modal isOpen={modal} toggle={trigger}>
                        <ModalBody>
                        Once session ends, the chat room shall be closed and all stored data shall be deleted<br />
                        Do you still wish to continue?
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" onClick={endGame}>Yes</Button>{' '}
                          <Button color="secondary" onClick={trigger}>No</Button>
                        </ModalFooter>
                      </Modal>
                    </div>
                    {/* <button onClick={endGame} style={{backgroundColor: "red",}} >End Session</button> */}
                    { isEnded && <Redirect to = {`/results/${roomID}`} /> }
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
      </Nav>
    </div>
  );
}

export default Navbar;
