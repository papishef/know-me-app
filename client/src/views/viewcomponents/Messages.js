//jshint esversion: 6
import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message'


const Messages = ({ messages, nickname }) => {
    return (
        <div className='message-container border-2'>
            <ScrollToBottom>
                {messages.map((message, i) => <div key={i}><Message message={message} nickname={nickname} /></div>)}
            </ScrollToBottom>
        </div>
    )
}
export default Messages
