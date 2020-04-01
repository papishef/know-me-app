import React, { Component } from 'react'
import Logo from '../assets/playroom-logo.png'
import { Container, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap'

export class SignIn extends Component {
    render() {
        return (
            <div className='page-wrapper'>
                <Container className="themed-container" >
                    <div><img className='logo pt-4' src={Logo} alt='#' /></div>
                    <div className='pt-4'>
                        <InputGroup>
                            <Input className='bg-transparent text-white form-input' placeholder="Nickname" />
                        </InputGroup>
                        <br />
                        <InputGroup>
                            <Input className='bg-transparent text-white form-input' placeholder="sex" />
                        </InputGroup>
                        {/* <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                            </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup> */}
                        <br />
                        <Button className='submit border border-light' color="secondary">secondary</Button>{' '}
                    </div>
                    <div className='text-white'>
                        <strong>Disclaimer:</strong>Nickname should be kept private,
                         it would be used to identify you when you log in and out of the game.
                    </div>
                    <div className='text-white'>
                        By submiting, I agree to your <strong>Terms of service</strong> and
                        <strong>Privacy Policy</strong>
                    </div>
                </Container>
            </div>
        )
    }
}

export default SignIn
