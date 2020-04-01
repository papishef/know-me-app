import React from 'react'
import Logo from '../assets/playroom-logo.png'
import Whatsapp from '../assets/whatsapp.svg'
import Facebook from '../assets/facebook.svg'
import Instagram from '../assets/instagram.svg'
import { Button } from 'reactstrap';

export default function Invitation() {
    return (
        <div className='page-wrapper'>
            <div><img className='logo pt-4' src={Logo} alt='#' /></div>
            <p className='text-white text-center display-4 font-weight-bold'>My name</p>
            <p className='text-white text-center'>invite friends with your profile link so they can have fun with you.</p>
            <p className='text-white text-center'>http://playroom.live/nickname</p>

            <div>
                <span className='p-3'>
                    <Button className='w-75 m-auto' color="success" size="lg" block>
                        <img className='social-icon' src={Whatsapp} alt='#' /> Whatsapp
                    </Button>
                </span>
                <span className='p-3'>
                    <Button className='w-75 m-auto' color="primary" size="lg" block>
                    <img className='social-icon' src={Facebook} alt='#' /> Facebook</Button>
                </span>
                <span className='p-3'>
                    <Button className='w-75 m-auto bg-transparent' size="lg" block>
                    <img className='social-icon' src={Instagram} alt='#' /> Instagram</Button>
                </span>
            </div>
        </div>
    )
}
