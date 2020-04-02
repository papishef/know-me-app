//jshint esversion: 6
import React, {useEffect} from 'react';
import queryString from 'query-string';
import Navbar from './viewcomponents/Navbar';
import Message from './viewcomponents/Message';
import Texting from './viewcomponents/Texting';
import AdminPanel from './viewcomponents/AdminPanel'



const Chat = (location) => {

    useEffect(() => {
        //capture param with location prop
        const data = queryString.parse(location.search);
        console.log(location.search);
        console.log(data);
    });

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