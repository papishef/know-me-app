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
    //location hooks from react-router-dom to manipulate platform route, path, location
    const location = useLocation();

    // Username and gender state hooks
    const [nickname, setNickname] = useState("");
    const [roomID, setRoomID] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        //capture param with location prop
        const {nickname, roomID} = queryString.parse(location.search);
        console.log(nickname, roomID);
        socket = io(ENDPOINT);
        console.log(socket);

        setNickname(nickname);
        setRoomID(roomID);

        //listen for when a new user joins the room and send a message
        socket.emit('join', {nickname, roomID});

        return() => {
            //will fire when users leave the room
            socket.emit('disconnect');
            
            //web sockets stop listening
            socket.off()
        }

    },[ ENDPOINT, location.search ]); //will trigger useeffect if values change

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        })
    }, [messages])

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