//jshint esversion: 6
import React from 'react';

//user && text props destructured from message prop
const Message = ({messageH, sender, nickname}) =>{
    //parameter to check active user on the device
    let isSentbyCurrentUser = false;

    //remove whitespace around name
    let trimmedName = sender.trim().toLowerCase();


    //confirms which user is active on that device
    if (nickname === trimmedName) {
        isSentbyCurrentUser = true;
    }
    
    return (
        //conditional rendering by active user. renders active user messages different from other user
        isSentbyCurrentUser ? (
            <div className='myMessages'>
                    <p className='sender'>{trimmedName}</p>
                <span className = 'text-wrapper'>
                    <div style={{background: '#9b25cd'}} className='sentMessage text-light'>{messageH}</div>
                </span>
            </div>
        )
        : isSentbyCurrentUser === false ? (
            <div className='theirMessages'>
                <p className='reciever'>{sender}</p>
                <span className = 'text-wrapper'>
                    <div style={{background: 'whitesmoke'}} className='recievedMessage'>{messageH}</div>
                </span>
            </div>
        ) : null
        
    )
}

export default Message