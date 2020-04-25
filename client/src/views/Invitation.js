//jshint esversion: 6
import React from 'react';
import Logo from '../assets/playroom-logo.png';
import Whatsapp from '../assets/whatsapp.svg';
import Facebook from '../assets/facebook.svg';
import Instagram from '../assets/instagram.svg';
import { NavLink, Button } from 'reactstrap';


export default function Invitation() {
    return (
        <div className='page-wrapper pt-4'>
            <div><img className='logo pt-4' src={Logo} alt='#' /></div>
            <p className='text-white text-center display-4 font-weight-bold pt-4'>slickback</p>
            <p className='text-white text-center pt-4'>invite friends with your profile link so they can have fun with you.</p>
            <p className='text-white text-center pt-4'>https://playroom.live/</p>

            <div style={{maxWidth: '80vw', margin: 'auto'}}>  
                <span className='p-4'>  
                    <Button style={{background: 'white'}} block>
                        <NavLink className='text-dark' href="https://wa.me/?text=https://www.playroom.live" target='blank'>
                            <img className='social-icon' src={Whatsapp} alt='#' />
                            Whatsapp
                        </NavLink>
                    </Button>
                </span>
                <span className='p-4'>
                    <Button className='bg-primary' block>
                        <NavLink className='text-light' href="http://m.me/mybot?ref=https://www.playroom.live"  target='blank'>
                            <img className='social-icon' src={Facebook} alt='#' />
                            Facebook
                        </NavLink>
                    </Button>
                </span>
                <span className='p-4'>
                    <Button style={{background: 'transparent', border: 'solid 2px pink'}} block>
                        <NavLink className='text-light' href="http://instagram.com/?ref=https://www.playroom.live" target='blank'>
                            <img className='social-icon' src={Instagram} alt='#' />
                            Instagram
                        </NavLink>
                    </Button>
                </span>
            </div>
        </div>
    )
}
