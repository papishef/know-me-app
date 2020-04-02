//jshint esversion: 6
import React, { Component } from 'react'
import Logo from '../assets/playroom-logo.png'
import { Container, Input, InputGroup, /*, InputGroupAddon, InputGroupText,*/ Button } from 'reactstrap'

export class SignIn extends Component {

    state = {
        nickname: '',
        gender: ''
      }
      handleChange = event => {
        event.preventDefault();
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
          [name]: value    });
      };

      handleSubmit = event => { 
    event.preventDefault();

    const user = {
      nickname: this.state.nickname,
      gender: this.state.gender
    };
    console.log(user)
    /////SET STATE BACK TO EMPTY ON SUBMIT////
    this.setState({
        nickname: '',
        gender: ''
    })
    }
    render() {
        return (
            <div className='page-wrapper'>
                <Container className="themed-container login-wrapper" >
                    <div><img className='logo py-4' src={Logo} alt='#' /></div>
                    <form className='pt-4 form-wrapper' onSubmit={this.handleSubmit}>
                        <InputGroup className='pt-4'>
                            <Input className='bg-transparent text-white form-input' name='nickname' placeholder="Nickname" value={this.state.nickname} type="string"  onChange={this.handleChange} />
                        </InputGroup>
                        <br />
                        <InputGroup className='pt-4'>
                            <Input className='bg-transparent text-white form-input' name='gender' placeholder="Gender" value={this.state.gender} type="string" onChange={this.handleChange}/>
                        </InputGroup>
                        {/* <InputGroup>
                            <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for following text input" />
                            </InputGroupText>
                            </InputGroupAddon>
                        </InputGroup> */}
                        <br />
                        <Button className='submit border border-light' type='submit' color="secondary">submit</Button>{' '}
                    </form>
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
}

export default SignIn
