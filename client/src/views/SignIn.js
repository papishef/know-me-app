//jshint esversion: 6
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/playroom-logo.png'
import { Container, Input, InputGroup,
     /*, InputGroupAddon, InputGroupText,*/ 
     Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
     Button } from 'reactstrap'


// sign in component
 const Signin = () => {
    // Username and gender state hooks
    const [input, setInput] = useState("");
    const [gender, setGender] = useState("");

    //dropdown toggle-state and toggle-function
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    // function to handle input change
    const handleChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
      })

   //function to handle dropdown change
   const selectGender = (e) => {
       setGender(e.target.value)
        console.log(gender)
    }
    const preventswitch = e => !input.username || !input.room ? e.preventDefault(): null

    // function to submit data
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input.username)
        //post request goes here
        fetch("http://localhost:5000/nickName", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ post: input })
        })
      .then(res => res.json())
      .then(
        (result) => {
          setInput(input);
        })
        

    }
      // reset state
       
    return (
        <div className='page-wrapper'>
           {/* content container */}
                <Container className="themed-container login-wrapper" >
                    {/* logo */}
                    <div><img className='logo py-4' src={Logo} alt='#' /></div>

                    {/* user form */}
                    <form className='pt-4 form-wrapper' onSubmit={handleSubmit}>

                        <InputGroup className='pt-4'>
                            <Input 
                            color='light'
                            className='form-input' 
                            name='username' placeholder="Nickname"  
                            type="string"  onChange={handleChange} />
                        </InputGroup>
                        <br />

                        <InputGroup className='pt-4'>
                            <Input 
                            color='light'
                            className='form-input' 
                            name='room' placeholder="Room name"  
                            type="string"  onChange={handleChange} />
                        </InputGroup>
                        <br />

                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle name='gender' color='light' caret>
                                Gender
                                </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>Select your gender</DropdownItem>
                                <DropdownItem name='gender' onClick={selectGender}>Male</DropdownItem>
                                <DropdownItem name='gender' onClick={selectGender} >Female</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <br />

                        <Link to={`/chat?room=${input.room}&&userID=${input.username}`}
                                onClick={preventswitch}>
                            <Button 
                                className='submit border border-light' 
                                type='submit' 
                                color="secondary">submit
                            </Button>{' '}
                        </Link>    
                    </form>


                    {/* additional information */}
                    <div className='text-white pt-4'>
                        <strong>Disclaimer:</strong>Nickname should be kept private,
                         it would be used to identify you when you log in and out of the game.
                    </div>

                    <div className='text-white pt-2'>
                        By submiting, I agree to your <strong>Terms of service</strong> and
                        <strong>Privacy Policy</strong>
                    </div>

                </Container>
            </div>
        )
}

export default Signin;