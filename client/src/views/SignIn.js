import React, { useState } from 'react'
import Logo from '../assets/playroom-logo.png'
import { Container, Input, InputGroup, /*, InputGroupAddon, InputGroupText,*/ Button } from 'reactstrap'


// sign in component
 const Signin = () => {
    // generic state hooks for all input
    const [input, setInput] = useState('')
    
    // function to handle input change
    const handleChange = (e) => setInput({
        ...input, [e.target.name]: e.target.value
    })

    // function to submit data
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(input)
        // post request goes here

        // reset state
        
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
                            className='bg-transparent text-white form-input' 
                            name='username' placeholder="Nickname"  
                            type="string"  onChange={handleChange} />
                        </InputGroup>
                        <br />

                        <InputGroup className='pt-4'>
                            <Input 
                            className='bg-transparent text-white form-input' 
                            name='gender' placeholder="gender"  
                            type="string" onChange={handleChange}/>
                        </InputGroup>
                        <br />

                        <Button 
                        className='submit border border-light' 
                        type='submit' 
                        color="secondary">submit</Button>{' '}
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