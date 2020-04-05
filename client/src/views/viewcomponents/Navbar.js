//jshint esversion: 6
import React, {useState} from 'react';
import Questions from './Questions';
import { Nav,
    NavLink, 
    Dropdown,
    DropdownToggle,
     DropdownMenu,
      DropdownItem } from 'reactstrap';
import SmallLogo from '../../assets/logo-sm.png';
import DropIcon from '../../assets/drop-icon.png';

const Navbar = (props) => {
    
    

    //dropdown state and hooks
    const [dropdownOpen, setDropdownOpen] = useState(false);
    //dropdown toggle function
    const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div>
      <div className='p-1'><img src={SmallLogo} alt='#' /></div>
      <Nav>
        <NavLink className='text-light font-weight-bold'>{props.nickname}'s Room {props.roomID}</NavLink>
        <span className='mx-auto'><Questions /></span>
        <Dropdown className='ml-auto pr-2' isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle className='bg-transparent border-0'>
                    <img src={DropIcon} alt='#' />
                    </DropdownToggle>
                <DropdownMenu className='drp-content'>
                    <DropdownItem>How to play</DropdownItem>
                    <DropdownItem>
                    <NavLink className='text-dark' href='/invite'>Invite</NavLink>
                    </DropdownItem>
                    <DropdownItem>End Session</DropdownItem>
                </DropdownMenu>
            </Dropdown>
      </Nav>
    </div>
  );
}

export default Navbar;
