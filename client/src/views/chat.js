//jshint esversion: 6
import React, {useState, useEffect} from 'react';
import {  useLocation } from 'react-router-dom'
import queryString from 'query-string';
import io from 'socket.io-client'
import Navbar from './viewcomponents/Navbar';
import Message from './viewcomponents/Message';
import Texting from './viewcomponents/Texting';
import AdminPanel from './viewcomponents/AdminPanel'

let socket;
const ENDPOINT  = 'localhost:4000';

const Chat = () => {
    const location = useLocation();

    // Username and gender state hooks
    const [nickname, setNickname] = useState("");
    const [roomID, setRoomID] = useState("");

    useEffect(() => {
        //capture param with location prop
        const {nickname, roomID} = queryString.parse(location.search);
        console.log(nickname, roomID);
        socket = io(ENDPOINT);
        console.log(socket);

        setNickname(nickname);
        setRoomID(roomID);

    },[ ENDPOINT, location.search ])

    return (
        <div className='page-wrapper'>
            <Navbar />
            <AdminPanel />
            <Message />
            <Texting />
        </div>
    )
}
export default Chat