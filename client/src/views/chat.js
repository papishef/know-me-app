//jshint esversion: 6
import React, {useState, useEffect} from 'react';
import {  useLocation } from 'react-router-dom'
import axios from 'axios';
import queryString from 'query-string';
import io from 'socket.io-client';
import Navbar from './viewcomponents/Navbar';
import Messages from './viewcomponents/Messages';
import MyInput from './viewcomponents/Input';
import Questions from './viewcomponents/Questions';

let socket;


const Chat = () => {
    //location hooks from react-router-dom to manipulate platform route, path, location
    const location = useLocation();

    // // Username and gender state hooks
    const [nickname, setNickname] = useState("");
    const [roomID, setRoomID] = useState("");
    // const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState([]);
 
    
    const endPoint  = 'http://localhost:4000';
///////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const {nickname, roomID} = queryString.parse(location.search);
 
        setNickname(nickname);
        setRoomID(roomID);
        console.log(nickname, roomID);

        socket = io(endPoint);

        console.log(socket);

        socket.emit("join", {nickname, roomID}, (error) => {
            if(error) {
                alert(error);
            }
        });

        return () => {
            socket.emit("disconnect");

            socket.off();
        }
    }, [endPoint, location.search]);
/////////////////////////////////////////////////
    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
    }, [messages]);
    
/////////////////////////////////////////////////
//question state
useEffect(() => {
    axios.get(`http://localhost:4000/questions`)
    .then(res => {
      const data = res.data.allQuestions;

      setQuestion(data);

    })
    .catch(error => {
      console.log(error);
  });

  },[]);
///This useEffect block triggers when the question variable changes from calling setQuestion in the first useEffect block///////////
  useEffect(() => {
    console.log(question);
  },[question]);
  
  const selectQuestion = (e) => {
    setQuestion(e.target.value);
    };



    //handleSubmit and sendMessage conflicted so it's only sendMesage now
    const sendMessage = (e) => {
        e.preventDefault();
        //console.log(message)
        if(message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
        console.log(message, messages)
    };

    
//////////////////////////////////////////////////
    return (
        <div className='page-wrapper'>
            <Navbar nickname= {nickname} roomID={roomID} />
            <Questions question={question} selectQuestion={selectQuestion} />
            <Messages messages={messages} nickname={nickname} />
            <MyInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
}
export default Chat