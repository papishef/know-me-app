//jshint esversion: 6
import React, {useState, useEffect} from 'react';
import {  useLocation, Redirect } from 'react-router-dom';
import { InputGroup } from 'reactstrap';
import axios from 'axios';
import queryString from 'query-string';
import io from 'socket.io-client';
import Navbar from './viewcomponents/Navbar';
import Messages from './viewcomponents/Messages';
import MyInput from './viewcomponents/Input';

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
    const [messageHistory, setMessageHistory] = useState([]);
    const [quest, setQuest] = useState("");
    const [qtype, setQtype] = useState("");
    
    // const [questions, setQuestions] = useState([]);
 
    
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

            // socket.off();
        }
    }, [endPoint, location.search]);

    





/////////////////////////////////////////////////
    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        });
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
      console.log(error);
  });

  },[]);
///This useEffect block triggers when the question variable changes from calling setQuestion in the first useEffect block///////////
  useEffect(() => {
    console.log(question);
  },[question]);


  useEffect(() => {

    const {nickname, roomID} = queryString.parse(location.search);
    setRoomID(roomID);
    console.log(roomID);

    axios.get(`http://localhost:4000/chat/${roomID}`)
    .then(response => {
        console.log(response.data.messagesInHistory);
        setMessageHistory(response.data.messagesInHistory);
    })
    .catch(error => {
        console.log(error.response);
    });
}, []);
//Test message history rendering
useEffect(() => { 
    console.log(messageHistory);
}, [messageHistory]);


//Sending Question to the server
useEffect(() => {
    if(quest) {
        socket.emit("sendQuestion", quest, roomID,  () => setQuest(""));
    }
    console.log(qtype);
}, [quest]);


    //handleSubmit and sendMessage conflicted so it's only sendMesage now
    const sendMessage = (e) => {
        e.preventDefault();
        //console.log(message)
        if(message) {
            socket.emit("sendMessage", message, roomID, () => setMessage(""));
        }
        console.log(message, messages);
    };



    
/////////////Return page/////////////
    return (
        <div className='page-wrapper'>

            <Navbar nickname= {nickname} roomID={roomID}  />
            
            <div>
                <InputGroup className='pt-4'>
<<<<<<< HEAD
                    <select className='qst-wrapper' data-cat={qtype} value={quest} onChange={(e) => {setQuest(e.target.value); setQtype(e.target.dataCat)} }>
                    <option style={{maxWidth:'100vw'}} className='qst-list'>Pick a question</option> 
                    {question.map((question, index) => <option style={{maxWidth:'100vw'}} className='qst-list' key={index + 1} value={question.q} data-cat={question.category} onClick={(e) => setQtype(e.target.cat)} >{index + 1}. {question.q}</option>)} 
=======
                    <select className='qst-wrapper' value={quest} onChange={(e) => setQuest(e.target.value)}>
                    <option className='qst-list'>Pick a question</option> 
                    {question.map((question, index) => <option style={{backgroundColor: "#a83297", borderWidth: 1, borderColor: "#420439" }} className='qst-list' key={index + 1} value={question.Q}  >{index + 1}. {question.q}</option>)} 
>>>>>>> a0b4360d126770192d99e5cae7546cc598325cd8
                    </select>
                </InputGroup>
            </div>
            {/* <Questions question={question} selectQuestion={selectQuestion} /> */}
            <Messages messageHistory={messageHistory} messages={messages} nickname={nickname} />
            <MyInput message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    );
}
export default Chat