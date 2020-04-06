//jshint esversion: 6
import React from 'react'
import Logo from '../assets/playroom-logo.png'
import Whatsapp from '../assets/whatsapp.svg'
import Facebook from '../assets/facebook.svg'
import Instagram from '../assets/instagram.svg'
import { NavLink, Col, Row } from 'reactstrap';


export default function Invitation() {
    return (
        <div className='page-wrapper pt-4'>
            <div><img className='logo pt-4' src={Logo} alt='#' /></div>
            <p className='text-white text-center display-4 font-weight-bold pt-4'>slickback</p>
            <p className='text-white text-center pt-4'>invite friends with your profile link so they can have fun with you.</p>
            <p className='text-white text-center pt-4'>http://playroom.live/</p>

            <div>
                <Row xs='3'>
                    <Col>
                        <span className='p-3'>
                            <NavLink className='text-light' href="https://wa.me/?text=I'm%20interested%20in%20your%20car%20for%20sale" target='blank'>
                                <img className='social-icon' src={Whatsapp} alt='#' />
                            </NavLink>
                        </span>
                    </Col>
                    <Col>
                        <span className='p-3'>
                            <NavLink className='text-light' href="http://m.me/mybot?ref=joinmyroom"  target='blank'>
                                <img className='social-icon' src={Facebook} alt='#' />
                            </NavLink>
                        </span>
                    </Col>
                    <Col>
                        <span className='p-3'>
                            <NavLink href="http://instagram.com/_u/" target='blank'>
                                <img className='social-icon' src={Instagram} alt='#' />
                            </NavLink>
                        </span>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
