//jshint esversion: 6
//jshint esversion: 8
import React, { useRef, useEffect, useState} from 'react';
import Message from './Message';
import OldMessage from './OldMessage';
import { useInView } from 'react-intersection-observer';
import { css } from '@emotion/core';
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios';



const Messages = ({ messages, nickname, messageHistory, setMessageHistory, roomID}) => {

  const loaderCss = css `
  display: flex;
  size: 10;
  justify-content: center
`;

  const [limit, updateLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [ref, inView, entry] = useInView({
    /* Threshold value */
    rootMargin: "200px",
    threshold: 0
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
  messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

useEffect(scrollToBottom, [messages]);

//////////////////LIMIT INCREMENT
useEffect(() => {
  if (inView === true) {
    updateLimit(prevLimit => prevLimit + 10);
  }
}, [inView]);

////////////////PREVIOUS MESSAGES API REQUEST
useEffect(() => {
  setLoading(true);
  const fetchHistory = async () => {
  try {
      const result = await axios.get(`https://limitless-river-10398.herokuapp.com/history/${roomID}/${limit}`);
      setMessageHistory([...result.data.messagesInHistory].reverse());
      setLoading(false);
  } catch (error) {
      console.log(error);
  }
};
  if (inView === true) {
    fetchHistory();
  }
}, [inView]);



  return (
    <div className='message-container'>
      <div className='pb-3' style={{color:'transparent'}} ref={ref}>{`${inView}`}</div>
      <BeatLoader css={loaderCss} size={10} color={"#f9f9f9"} loading={loading} />
      {loading ? <p className= "text-center" style={{ textAlign: "center", color: "white", fontFamily: "Comic Sans MS", fontSize: 12 }}>Loading chats</p> : <p className="text-center" style={{ color: "white", fontFamily: "Comic Sans MS", fontSize: 12, backgroundColor: "#C12BBC", width: "150px", margin: "auto", borderRadius: 3 }}>End of messages</p>}
      <div>{messageHistory && messageHistory.map((messageHistory, i) => <div key={i}><OldMessage messageH={messageHistory.message} sender={messageHistory.sender} nickname={nickname} /></div>)}</div>  
      <div> {messages.map((message, i) => <div key={i}><Message message={message} nickname={nickname} /></div>)}</div>
        <div ref={messagesEndRef} className='pt-5 pb-0' />
    </div>
  )
}
export default Messages

