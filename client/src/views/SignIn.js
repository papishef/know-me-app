//jshint esversion: 6
//jshint esversion: 9
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/playroom-logo.png';
import { Container, Input, InputGroup, Button } from 'reactstrap';
import { Redirect } from "react-router-dom";
import axios from "axios";
import Footer from "./viewcomponents/Footer.js";
import styled, { keyframes } from "styled-components";
import { bounce } from "react-animations";


const Bounce = styled.div`animation: 3s ${keyframes `${bounce}`} infinite`;


// sign in component
 const Signin = () => {
    // Username and gender state hooks
    const [input, setInput] = useState("");
    const [isSignedUp, setIsSignedUp] = useState(false);

    // function to handle input change
    const handleChange = (e) => setInput({
        ...input,
        [e.currentTarget.name]: e.currentTarget.value
      });


    const preventswitch = e => !input.nickname || !input.roomID || !input.gender ? e.preventDefault(): null;


    // function to submit data
    const handleSubmit = (e) => {

        e.preventDefault();
        preventswitch(e);
        axios.post("http://localhost:4000/signIn", input)
        .then(response => {
            console.log(response.data);
            if (response.status === 200 || "OK") {
                setIsSignedUp(true);
            }
        })
        .catch(error => {
            console.error(error.message);
        });
    };
       
    return (
        <div className='page-wrapper'>
           {/* content container */}
                <Container className="themed-container login-wrapper" >
                    {/* logo */}
                    <div> <img className='logo py-4' src={Logo} alt='#' /> </div>

                    {/* user form */}
                    <form className='form-wrapper' onSubmit={handleSubmit}>
                   <Bounce> <div style={{fontSize: 24, position: "relative", bottom: 50, left: 10, color: "#E962EA", fontWeight: 600, fontFamily: "CombiNumerals" }}>18+</div></Bounce>
                        <InputGroup className='pt-2'>
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
                            name='roomID' placeholder="New Room/Invitation ID"  
                            type="string"  onChange={handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup className='pt-4'>
                        <select name="gender" onChange={handleChange} style={{borderRadius: 5, height: 35, width: 600}}>
                            <option>Gender</option> 
                             <option value="Male">Male</option>
                             <option value="Female">Female</option>
                        </select>
                        </InputGroup>
                        
                        <div className='text-white pt-4' style={{fontSize: 12}}>
                        <strong>Disclaimer:</strong> Nickname should be kept private,
                         it would be used to identify you subsequently.
                    </div>
                        <br />

                        {/* Redirect User to room after successful login or registration */}
                      {isSignedUp ? <Redirect  to= {`/chat?nickname=${input.nickname}&roomID=${input.roomID}`} /> : <Redirect  to= "/" />}
                            <Button 
                                style={{borderWidth: 2, fontWeight: 800}}
                                className='submit border border-light' 
                                type='submit' 
                                onClick={handleSubmit}
                                color="secondary">Submit
                            </Button>{' '}
                           
                    </form>


                    {/* additional information */}
                    <div className='text-white pt-2' style={{fontSize: 12}}>
                        We know you won't, but we strongly recommend the <Link to={`/terms`} style={{color: "purple"}}><strong>Terms of service</strong></Link> and 
                        <Link to={`/privacy`} style={{color: "purple"}}><strong> Privacy policy</strong></Link>
                    </div>
                    <div className='text-white pt-2'>
                        Learn <Link to='/how-to-play' style={{color: "purple"}}><strong>How to play</strong></Link>
                    </div>

                </Container>
                <Footer />
            </div>
     )
}



export default Signin;