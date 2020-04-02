//jshint esversion: 6
import React from 'react';
import Navbar from './viewcomponents/Navbar';
import Message from './viewcomponents/Message';
import Texting from './viewcomponents/Texting';


const Chat = () => {
    return (
        <div className='page-wrapper'>
            <Navbar />
            <Message />
            <Texting />
        </div>
    )
}
export default Chat