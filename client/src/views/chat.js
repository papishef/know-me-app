//jshint esversion: 6
import React, {useState, useEffect} from 'react';
import {  useLocation } from 'react-router-dom';
import { InputGroup } from 'reactstrap';
import axios from 'axios';
import queryString from 'query-string';
import io from 'socket.io-client';
import Navbar from './viewcomponents/Navbar';
import Messages from './viewcomponents/Messages';
import MyInput from './viewcomponents/Input';
import { css } from "@emotion/core";
import RingLoader from "react-spinners/RingLoader";
import UIfx from 'uifx';
import SendSound from '../assets/send.mp3';
const snd = new UIfx(SendSound);


let socket;
///css rules from emotion/core for ringloader
const loaderCss = css `
    display: block;
    position: absolute;
    top: 20%;
    left: 20%;
`;


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
    const [messageHistory, setMessageHistory] = useState([]);
    const [quest, setQuest] = useState("");
    const [questionCategory, setQuestionCategory] = useState("");
    const [loading, setLoading] = useState(false);
    // const [questions, setQuestions] = useState([]);
 
    
    const endPoint  = 'http://localhost:4000';
///////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const {nickname, roomID} = queryString.parse(location.search);
 
        setNickname(nickname);
        setRoomID(roomID);
        console.log(nickname, roomID);

        socket = io(endPoint);

        socket.emit("join", {nickname, roomID}, (error) => {
            if(error) {
                alert(error.response);
            }
        });

        
    
        return () => {
            // socket.emit("disconnect");
            setLoading(false);
            // socket.off();
        };
    }, [endPoint, location.search]);


/////////////////////////////////////////////////
    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);snd.play();
        });
        if (messages.length > 6) {
            setLoading(true);
            return window.location.reload(true);
        }
    }, [messages]);

    useEffect(() => {
        socket.on("quest", (quest) => {
            setMessages([...messages, quest]);
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
      console.log(error.response);
  });

  },[]);


useEffect(() => {

    const {nickname, roomID} = queryString.parse(location.search);
    setRoomID(roomID);

    axios.get(`http://localhost:4000/chat/${roomID}`)
    .then(response => {
        console.log(response.data.messagesInHistory);
        setMessageHistory(response.data.messagesInHistory);
    })
    .catch(error => {
        console.log(error.response);
    });
}, []);


//Sending Question to the server
useEffect(() => {

     if(quest) {
        socket.emit("sendQuestion", quest, roomID, () => setQuest(""));
    }

}, [quest]);

// save question categories for results calculation
useEffect(() => {

    if(questionCategory) {
        socket.emit("sendCategory", questionCategory, roomID, () => setQuestionCategory(""));
    }
    console.log(questionCategory);
}, [questionCategory]);


    //handleSubmit and sendMessage conflicted so it's only sendMesage now
    const sendMessage = (e) => {
        e.preventDefault();
        //console.log(message)
        if(message) {
            socket.emit("sendMessage", message, roomID, () => setMessage(""));
        }
        
    };



    
/////////////Return page/////////////
    return (
        <div className='page-wrapper'>

            <Navbar nickname= {nickname} roomID={roomID}  />
            
            <div>
                <InputGroup className='pt-4'>
                    <select className='qst-wrapper' value={quest} onChange={e => {setQuest(e.target.value); setQuestionCategory(e.target.childNodes[e.target.selectedIndex].getAttribute("category"))}}>
                    <option className='qst-list'>Pick a question</option> 
                    {question.map((question, index) => <option style={{backgroundColor: "#c525cd", borderWidth: 1, borderColor: "#420439" }} className='qst-list' key={index + 1} value={question.q} category={question.category} >{index + 1}. {question.q}</option>)} 
                    </select>
                </InputGroup>
            </div>
            {/* <Questions question={question} selectQuestion={selectQuestion} /> */}
            <RingLoader css={loaderCss} size={250} color={"#c525cd"} loading={loading} />
            <Messages messageHistory={messageHistory} messages={messages} nickname={nickname} />
            <MyInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
}
export default Chat