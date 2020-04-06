//jshint esversion: 6
import React, { useRef, useEffect } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from './Message';



const Messages = ({ messages, nickname}) => {

    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(scrollToBottom, [messages]);

    return (
        <div className='message-container'>
            {messages.map((message, i) => <div key={i}><Message message={message} nickname={nickname} /></div>)}
            <div ref={messagesEndRef} />
        </div>
    )
}
export default Messages
