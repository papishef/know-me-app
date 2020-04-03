//jshint esversion: 6
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/playroom-logo.png'
import { Container, Input, InputGroup, Button } from 'reactstrap'


// sign in component
 const Signin = () => {
    // Username and gender state hooks
    const [input, setInput] = useState("");
    const [gender, setGender] = useState("");


    // function to handle input change
    const handleChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
      })

   //function to handle dropdown change
   const selectGender = (e) => {
    setGender(e.target.value);
    }
    const preventswitch = e => !input.nickname || !input.roomID || !gender ? e.preventDefault(): null

    // function to submit data
    const handleSubmit = (e) => {
        e.preventDefault();
    }
       
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
                            name='nickname' placeholder="Nickname"  
                            type="string"  onChange={handleChange} />
                        </InputGroup>
                        <br />

                        <InputGroup className='pt-4'>
                            <Input 
                            color='light'
                            className='form-input' 
                            name='roomID' placeholder="Invitation ID"  
                            type="string"  onChange={handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup className='pt-4'>
                        <select value={gender} onChange={selectGender} style={{borderRadius: 5, height: 35, width: 600}}>
                            <option>Gender</option> 
                             <option value="Male">Male</option>
                             <option value="Female">Female</option>
                        </select>
                        </InputGroup>
                        <div className='text-white pt-4'>
                        <strong>Disclaimer:</strong> Nickname should be kept private,
                         it would be used to identify you when you log in and out of the game.
                    </div>
                        <br />

                        <Link to={`/chat?nickname=${input.nickname}&roomID=${input.roomID}`}
                                onClick={preventswitch}>
                            <Button 
                                style={{borderWidth: 2, fontWeight: 800}}
                                className='submit border border-light' 
                                type='submit' 
                                color="secondary">Submit
                            </Button>{' '}
                        </Link>    
                    </form>


                    {/* additional information */}


                    <div className='text-white pt-2'>
                        By submiting, I agree to your <Link to={`/terms`} style={{color: "purple"}}><strong>Terms of service</strong></Link> and 
                        <Link to={`/privacy`} style={{color: "purple"}}><strong> Privacy Policy</strong></Link>
                    </div>
                    <div className='text-white pt-2'>
                        Learn <Link to={`/terms`} style={{color: "purple"}}><strong>How to play</strong></Link>
                    </div>

                </Container>
            </div>
        )
}

export default Signin;