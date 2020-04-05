import React from 'react'
import { Link } from 'react-router-dom'

export default function HowToPlay() {
    return (
        <div>
            <p className='p-2'><Link to='/'>back</Link></p>
            <div className='container pt-4'>
            <div className='pt-2'>
                <p className='h3 py-2 font-weight-bold'>How to play</p>
                <ul style={{listStyle: 'decimal'}}>
                    <li> 
                        The Registration/ Login Process: 
                        Users register using the welcome page. They proceed by filling
                        in their nickname ( which will be used for subsequent logins)
                        together with the Room Identification ID (which can either be
                        created or joined if invited by an already existing User.
                        This room ID is used to refer you to the requested room. Then,
                        finally, the initiator of the game will guide result calculations
                        after each game. 
                    </li>
                    <li>
                        The Game Process 
                        Each User is requested to select a question from the questions tab, 
                        in which the other User must respond to, before the game can proceed.
                        After each answer to selected question, the Users can further discuss
                        the question before asking the next question.
                    </li>
                    <li>
                        The Hamburger Menu Tab
                        The hamburger menu tab is at the top right corner of the chat page.
                        This menu tab reveals three options to click:
                        <ul>
                            <li>Option one contains the “how to play” page.</li>
                            <li>Option two takes you to a page where you can
                                easily invite friends from other social platforms
                                by sharing the link to the game and your Room 
                                Invitation ID.
                            </li>
                            <li>Option three ends the current game and calculate the scores.</li>
                        </ul>
                    </li>
                    <li>
                        Register: ‘Register’ means to download and create an 
                        account of the Application. “Registration” means the 
                        act of creating such an account. 
                    </li>
                </ul>
            </div>
            </div>
        </div>
    )
}
