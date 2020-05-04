//jshint esversion: 6
//jshint esversion: 8
import React, {useState, useEffect} from 'react';
import {  useLocation } from 'react-router-dom';
import { InputGroup } from 'reactstrap';
import axios from 'axios';
import queryString from 'query-string';
import io from 'socket.io-client';
import Navbar from './viewcomponents/Navbar';
import Messages from './viewcomponents/Messages';
import MyInput from './viewcomponents/Input';
// import { css } from "@emotion/core";
// import PacmanLoader from "react-spinners/PacmanLoader";
import UIfx from 'uifx';
import SendSound from '../assets/clearly.mp3';
const snd = new UIfx(SendSound);


let socket;

///css rules from emotion/core for ringloader
// const loaderCss = css `
//     display: block;
//     position: absolute;
//     top: 40%;
//     left: 15%;
// `;


const Chat = () => {
    //location hooks from react-router-dom to manipulate platform route, path, location
    const location = useLocation();

    // // Username and gender state hooks
    const [nickname, setNickname] = useState("");
    const [roomID, setRoomID] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [question, setQuestion] = useState([]);
    const [messageHistory, setMessageHistory] = useState([]);
    const [quest, setQuest] = useState("");
    const [questionCategory, setQuestionCategory] = useState("");
    // const [loading, setLoading] = useState(false);
    
    const endPoint  = 'https://limitless-river-10398.herokuapp.com/';

/////////////////////////////////////////////////
//question state
useEffect(() => {
    axios.get(`https://limitless-river-10398.herokuapp.com/questions`)
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
    setNickname(nickname);

    axios.get(`https://limitless-river-10398.herokuapp.com/history/${roomID}`)
    .then(response => {
        setMessageHistory(response.data.messagesInHistory);
    })
    .catch(error => {
        console.log(error.response);
    });
},[location.search]);

///////////////////////////////////////////////////////////////////////
useEffect(() => {
    const {nickname, roomID} = queryString.parse(location.search);
 
    setNickname(nickname.trim().toLowerCase());
    setRoomID(roomID.trim().toLowerCase());   
    socket = io(endPoint, {transports: ['websocket']});   
    socket.emit("join", {nickname, roomID}, (error) => {
        if(error) {
            alert(error);
        }
    });  

},[endPoint, location.search]);


/////////////////////////////////////////////////
useEffect(() => {

     socket.on("message", (message) => {
             setMessages([...messages, message]);snd.play();
     });
},[messages]);

useEffect(() => {
    const {nickname, roomID} = queryString.parse(location.search);
    setRoomID(roomID);
    setNickname(nickname);
   
    if (messages.length > 3) {
        // let lastMessage = messages.pop();
        messages.splice(0, messages.length);
        messageHistory.splice(0, messageHistory.length);
        const fetchHistory = async () => {
            try {
                const result = await axios.get(`https://limitless-river-10398.herokuapp.com/chat/${roomID}`,);
                setMessageHistory(result.data.messagesInHistory);
            } catch (error) {
                console.log(error);
            }
        };
        fetchHistory();
    }
}, [messages, location.search]);

useEffect(() => {
    socket.on("quest", (quest) => {
        setMessages([...messages, quest]);
    });
}, [messages]);


//Sending Question to the server
useEffect(() => {

     if(quest) {
        socket.emit("sendQuestion", quest, roomID, nickname, () => setQuest(""));
    }

}, [quest, roomID]);

// save question categories for results calculation
useEffect(() => {

    if(questionCategory) {
        socket.emit("sendCategory", questionCategory, roomID, nickname, () => setQuestionCategory(""));
    }
}, [questionCategory, roomID]);


//handleSubmit and sendMessage conflicted so it's only sendMesage now
const sendMessage = (e) => {
    e.preventDefault();
    if(message) {
        socket.emit("sendMessage", message, roomID, nickname, () => setMessage(""));
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
            {/* <PacmanLoader css={loaderCss} size={100} color={"#c525cd"} loading={loading} /> */}
            {/* {loading && <p className= "ml-5" style={{zIndex: 9999, position: "absolute", top: 500, color: "white", fontFamily: "Comic Sans MS", fontSize: 22, fontWeight: 900}}>Loading...</p>} */}
            <Messages messageHistory={messageHistory} messages={messages} nickname={nickname} />
            <MyInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
}
export default Chat