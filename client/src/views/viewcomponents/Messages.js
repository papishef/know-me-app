//jshint esversion: 6
import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios'
import Message from './Message';
import OldMessage from './OldMessage';
import {  useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useInView } from 'react-intersection-observer'
import { css } from '@emotion/core'
import BeatLoader from "react-spinners/BeatLoader";

// const [roomID, setroomID] = useState("");
// const [messageHistory, setMessageHistory] = useState([]);



const Messages = ({ messages, clrMsgs }) => {

  const loaderCss = css `
  display: flex;
  size: 10;
  justify-content: center
`;

  const [limit, updateLimit] = useState(5)
  const [loading, setLoading] = useState(false);
  const [messageHistory, updateMessageHistory] = useState([]);
  const [ref, inView, entry] = useInView({
    /* Threshold value */
    threshold: 0.5,
  })
 const loc = useLocation()
 const {nickname, roomID} = queryString.parse(loc.search);

 ////////////////PREVIOUS MESSAGES API REQUEST
  useEffect(() => {
    setLoading(true)
  const fetchHistory = async () => {
    try {
        const result = await axios.get(`http://localhost:4000/history/${roomID}/${limit}`);
        updateMessageHistory([...result.data.messagesInHistory].reverse());
        setLoading(false)
    } catch (error) {
        console.log(error);
    }
  };
    if (inView === true) {
      fetchHistory();
    }
  }, [inView])

  //////////////////LIMIT INCREMENT
  useEffect(() => {
    if (inView === true) {
      updateLimit(limit + 10)
    }
  }, [inView])

  useEffect(() => {
     if (messages.length >= 6) {
      updateMessageHistory([])
      updateLimit(6)
   }
  }, [messages])
  
  /////////////////SCROLL TO BOTTOM
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
  useEffect(scrollToBottom, [messages]);


    return (
        <div className='message-container'>
          <div style={{color:'transparent'}} ref={ref}>{`${inView}`}</div>
          <BeatLoader css={loaderCss} size={10} color={"#f9f9f9"} loading={loading} />}
          {loading && <p className= "text-center" style={{ textAlign: "center", color: "white", fontFamily: "Comic Sans MS", fontSize: 12 }}>Loading chats</p>}
          <div>{messageHistory && messageHistory.map((messageHistory, i) => <div key={i}><OldMessage messageH={messageHistory.message} sender={messageHistory.sender} nickname={nickname} /></div>)}</div>  
          <div> {messages.map((message, i) => <div key={i}><Message message={message} nickname={nickname} /></div>)}</div>
            <div ref={messagesEndRef} className='pt-3 pb-3' />
        </div>
    )
}
export default Messages
