import React from 'react';
import Logo from '../assets/playroom-logo.png';
import { Container, NavLink, Button } from 'reactstrap';
import Hot from '../assets/smiley.png'

export default function Results() {
    return (
        <div className='page-wrapper'>
            <Container>
                <div><img className='logo pt-4' src={Logo} alt='logo' /></div>
                <Container className='pt-4'>
                    <p className='text-light font-weight-bold text-center'>SCORE</p>  
                    <div className='container'>
                        <img src={Hot} className='mx-auto smiley d-inline-block' alt='#'/>
                        <p className='h2 font-weight-bold text-white pt-3 text-center'>89%</p>
                        <p className='text-light font-weight-bold text-center pt-3'>SMASH</p>
                        <p className='text-light text-center pt-3'>Don't fuck this up!!!</p>
                    </div>
                    <div className='row pt-4'>
                        <div className='col-4'>
                            <Button style={{background: 'transparent', border: 'solid 2px white'}}>End</Button>
                        </div>
                        <div className='col-3'></div>
                        <div className='col-5'>
                            <Button style={{background: 'transparent', border: 'solid 2px white'}}>Play again</Button>
                        </div>
                    </div>

                </Container>
            </Container>
        </div>
    )
}
