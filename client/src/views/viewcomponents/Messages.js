//jshint esversion: 6
import React, { useRef, useEffect} from 'react';
import Message from './Message';
import OldMessage from './OldMessage';


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
          <div>{messageHistory.map((messageHistory, i) => <div key={i}><OldMessage messageH={messageHistory.message} sender={messageHistory.sender} nickname={nickname} /></div>)}</div>  
           <div>
             <p style={{fontSize: '0.7rem', color: '#f5f5f5', fontWeight: 'bold', textAlign: 'center'}}>older messages</p>
             <hr style={{border: 'solid 1.5px #f5f5f5'}} />
           </div>
           <div> {messages.map((message, i) => <div key={i}><Message message={message} nickname={nickname} /></div>)}</div>
            <div ref={messagesEndRef} />
        </div>
    )
}
export default Messages
