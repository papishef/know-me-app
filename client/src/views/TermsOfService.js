//jshint esversion: 6
import React from 'react'
import { Link } from 'react-router-dom'


export default function TermsOfService() {
    return (
        <div>
            <p className='p-2'><Link to='/'>back</Link></p>
            <div className='container pt-4'>
            <p className='h2 font-weight-bold'>Terms of Service</p>
            <div className='pt-2'>
                <p className='h3 py-2 font-weight-bold'>Welcome to playroom</p>
                <p style={{textIndent: '50px'}}>
                    PlayRoom is a question and answer based 
                    application built to help you get to know
                    more about friends and acquaintances, 
                    through a network of questions and 
                    corresponding answers; with a view to- but
                    not restricted to-knowing their personality
                    traits and ideologies.
                </p>
                <p style={{textIndent: '50px'}}>
                    By using this Application, you agree to be
                    bound by these Terms and Conditions of use.
                    Your access to use this service is
                    conditioned on your acceptance of and 
                    compliance with these Terms. These Terms
                    and Conditions apply to all Users.
                </p>
                
            </div>
            <p className='h2 font-weight-bold'>Terms of Service</p>
            <div className='pt-2'>
                <p className='h3 py-2 font-weight-bold'>Definition of Terms</p>
                <p>
                    In these Terms and Conditions of Use, the following terms
                    shall have the following meanings, except where the
                    context otherwise requires:
                </p>
                <ul style={{listStyle: 'decimal'}}>
                    <li> 
                        Users: ‘users’ means users of PlayRoom Mobile
                        Application, including you and ‘user’ means 
                        any of them.
                    </li>
                    <li>
                        Account: ‘Account’ means an account created by 
                        a User on the Mobile Application as part of 
                        registration.
                    </li>
                    <li>
                        Username:  ‘username’ is a name that uniquely 
                        identifies you on the Application. To access 
                        PlayRoom, you are required to enter your username. 
                    </li>
                    <li>
                        Password: Your password is your memorized secret,
                        a string of characters used to confirm your identity
                        as a User. On PlayRoom Application, your password 
                        is your registered username. 
                    </li>
                    <li>
                        Register: ‘Register’ means to download and create an 
                        account of the Application. “Registration” means the 
                        act of creating such an account. 
                    </li>
                </ul>
            </div>
            
            <div className='pt-2'>
                <p className='py-2 h3 font-weight-bold'>Authorized Users</p>
                <p>
                    PlayRoom Application usage is intended for users who are,
                    at least, 18 years old. Persons under this age are not 
                    permitted to register on this Application.
                </p>
                <p className='py-2 h3 font-weight-bold'>Prohibited Activities</p>
                <p>You agree not to use this application in any way that:</p>
                <ul style={{listStyle: 'decimal'}}>
                    <li>Harass, intimidate or threaten other users.</li>
                    <li>Attempt to impersonate another user.</li>
                    <li>promotes discrimination, based on race,
                         sex, religion, sexual orientation and disability.
                    </li>
                    <li>Defamatory of any other user.</li>
                </ul>
            </div>
            <div className='pt-2'>
                <p className='py-2 h3 font-weight-bold'>Termination of Account</p>
                <p>
                    A User’s account will be terminated if such user is inactive
                    for one week (7days). However, such user will have to create
                    another account with a new username, if he must use PlayRoom
                    again.
                </p>
                <p className='py-2 h3 font-weight-bold'>Intellectual Property/Copyright</p>
                <p>
                    This application is our exclusive property. All text, logo, website
                    design and all functionalities contained therein, are protected by
                    the Copyright Laws of the Federal Republic of Nigeria. No part of
                    this application and no content may be copied, reproduced, aggregated,
                    republished encoded, transmitted or distributed for any commercial
                    purpose whatsoever, without our express prior authorization.
                </p>
                <p className='py-2 h3 font-weight-bold'>Limitation of Liability</p>
                <p>
                    It is important, however, to say that, though the decisions
                    of our users might be based, to some extent, on the answers
                    provided to the network of questions on this application,
                    the outcome of such decisions, however, are solely the users’.
                    We are not liable for incidental or consequential damages 
                    resulting from the use of this application.
                </p>
            </div>
            </div>
        </div>
    )
}
