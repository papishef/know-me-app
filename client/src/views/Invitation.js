import React from 'react'
import Logo from '../assets/playroom-logo.png'
import Whatsapp from '../assets/whatsapp.svg'
import Facebook from '../assets/facebook.svg'
import Instagram from '../assets/instagram.svg'
import { Button } from 'reactstrap';


export default function Invitation() {
    return (
        <div className='page-wrapper pt-4'>
            <div><img className='logo pt-4' src={Logo} alt='#' /></div>
            <p className='text-white text-center display-4 font-weight-bold pt-4'>slickback</p>
            <p className='text-white text-center pt-4'>invite friends with your profile link so they can have fun with you.</p>
            <p className='text-white text-center pt-4'>http://playroom.live/slickback</p>

            <div>
                <span className='p-3'>
                    <Button className='w-75 m-auto' color="success" size="lg" block>
                        <img className='social-icon' src={Whatsapp} alt='#' /> Whatsapp
                    </Button>
                </span>
                <span className='p-3'>
                    <Button style={{background: '#4267b2'}} className='w-75 m-auto' size="lg" block>
                    <img className='social-icon' src={Facebook} alt='#' /> Facebook</Button>
                </span>
                <span className='p-3'>
                    <Button className='w-75 m-auto text-danger' color='light' size="lg" block>
                    <img className='social-icon' src={Instagram} alt='#' /> Instagram</Button>
                </span>
            </div>
        </div>
    )
}
