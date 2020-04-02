//jshint esversion: 6
import React from 'react';
import Navbar from './viewcomponents/Navbar';
import Message from './viewcomponents/Message'


const Chat = () => {
    return (
        <div className='page-wrapper'>
            <Navbar />
            <Message />
        </div>
    )
}
export default Chat