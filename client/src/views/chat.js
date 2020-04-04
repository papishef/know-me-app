//jshint esversion: 6
import React, {useState, useEffect} from 'react';
import {  useLocation } from 'react-router-dom'
import queryString from 'query-string';
import io from 'socket.io-client'
import Navbar from './viewcomponents/Navbar';
import Message from './viewcomponents/Message';
import Texting from './viewcomponents/Texting';
import AdminPanel from './viewcomponents/AdminPanel';
import axios from "axios";

let socket;


const Chat = () => {
    //location hooks from react-router-dom to manipulate platform route, path, location
    const location = useLocation();

    // // Username and gender state hooks
    const [nickname, setNickname] = useState("");
    const [roomID, setRoomID] = useState("");
    const [gender, setGender] = useState("");
    const [message, setMessage] = useState("");
    // const [messages, setMessages] = useState("");
    
    const endPoint  = 'http://localhost:4000';

    useEffect(() => {
        const {nickname, roomID, gender} = queryString.parse(location.search);
 
        setNickname(nickname);
        setRoomID(roomID);
        console.log(nickname, roomID);

        socket = io(endPoint);

        console.log(socket);

        socket.emit("join", {nickname, roomID});

        return () => {
            socket.emit("disconnect");

            socket.off();
        }
    }, [endPoint, location.search]);

    return (
        <div className='page-wrapper'>
            <Navbar nickname= {nickname} roomID={roomID} />
            <AdminPanel />
            <Message message={message} msgHandler={setMessage} />
            <Texting />
        </div>
    );
}
export default Chat