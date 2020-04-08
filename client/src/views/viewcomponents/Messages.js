//jshint esversion: 6
import React, { useRef, useEffect} from 'react';
import Message from './Message';


// const [roomID, setroomID] = useState("");
// const [messageHistory, setMessageHistory] = useState([]);



const Messages = ({ messages, nickname, messageHistory, sender}) => {



    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  useEffect(scrollToBottom, [messages]);

    return (
        <div className='message-container'>
          <div>{messageHistory.map((messageHistory, i) => <div key={i}><Message message={messageHistory.message} nickname={messageHistory.sender} /></div>)}</div>  
           <div> {messages.map((message, i) => <div key={i}><Message message={message} nickname={nickname} /></div>)}</div>
            <div ref={messagesEndRef} />
        </div>
    )
}
export default Messages
