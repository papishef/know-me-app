//jshint esversion: 6
import React from 'react';

//user && text props destructured from message prop
const Message = ({messageH, nickname}) =>{
    //parameter to check active user on the device
    let isSentbyCurrentUser = false;

    //remove whitespace around name
    let trimmedName = nickname.trim().toLowerCase();


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
                    <div className='sentMessage'>{messageH}</div>
                </span>
                
            </div>
        )
        :(
            <div className='theirMessages'>
                <p className='reciever'>{nickname}</p>
                <span className = 'text-wrapper'>
                    <div className='recievedMessage'>{messageH}</div>
                </span>
            </div>
        )
        
    )
}

export default Message