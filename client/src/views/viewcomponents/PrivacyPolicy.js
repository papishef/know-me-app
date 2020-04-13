//jshint esversion: 6
//jshint esversion: 9
import { Link } from 'react-router-dom';
import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className='container pt-4'>
        <p className='p-2'><Link to='/'>back</Link></p>
          <p>At PlayRoom, we have only two rules;</p>  
          <ul>
              <li>Be 18 years or older,</li>
              <li>Learn <Link to='/how-to-play' style={{color: "purple"}}><strong>How to play</strong></Link></li>
          </ul>
          <p>We do not save messages history after you end a game session or use cookies for anything but user authentication to keep your chats private. <br />Happy playing...😎</p>
        </div>
    )
}
