//jshint esversion: 6
import React from 'react';

//user && text props destructured from message prop
const Message = ({message: {user, text}, nickname}) =>{
    //parameter to check active user on the device
    let isSentbyCurrentUser = false;

    //remove whitespace around name
    let trimmedName = nickname.trim().toLowerCase();


    //confirms which user is active on that device
    if (user === trimmedName) {
        isSentbyCurrentUser = true;
    }
    
    return (
        //conditional rendering by active user. renders active user messages different from other user
        isSentbyCurrentUser ? (
            <div className='myMessages'>
                    <p className='sender'>{trimmedName}</p>
                <span className = 'text-wrapper'>
                    <div className='sentMessage'>{text}</div>
                </span>
                
            </div>
        )
        :(
            <div className='theirMessages'>
                <p className='reciever'>{user}</p>
                <span className = 'text-wrapper'>
                    <div className='recievedMessage'>{text}</div>
                </span>
            </div>
        )
        
    )
}

export default Message