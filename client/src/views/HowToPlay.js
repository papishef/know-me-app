//jshint esversion: 6
//jshint esversion: 9
import React from 'react';
import { Link } from 'react-router-dom';

export default function HowToPlay() {
    return (
        <div>
            <p className='p-2'><Link to='/'>back</Link></p>
            <div className='container pt-4'>
            <div className='pt-2'>
                <p className='h3 py-2 font-weight-bold'>How to play</p>
                <ul style={{listStyle: 'decimal'}}>
                    <li>PlayRoom is an adults only question and answer game to help you know a person better</li>
                    <li>Every user is required to register or join a room they were invited to using the landing page form</li>
                    <li>Only two users can be in a room at a time, and for your privacy we advise that you only give out a room ID once and only when not within an active game session or after you have ended a session with a previous user.</li>
                    <li>To play with multiple users at a time, you can create several rooms in several browser windows with the same nickname</li>
                    <li>The idea behind the game is that a user picks a question of choice from the questions dropdown menu for the other user to answer, and vice versa.</li>
                    <li>You can leave the game at anytime and return to continue the session as long as you do not end the session manually</li>
                    <li>To end session manually, user is required to access an end button from the hamburger menu on the right of the chat screen, which deletes all messages history between current users</li>
                    <li>After session end, a result page with compatibility information and 2 cent advise is diplayed to help users make decision, if you require PlayRoom's advice.<span role="img" aria-labelledby="wink">😉</span></li>
                    <li style={{color: "red"}}>Remember to only share room ID once for your own privacy.</li>
                    <li>Happy playing player...<span role="img"  aria-labelledby="right-point">👉</span></li>
                </ul>
            </div>
            </div>
        </div>
    )
}
