//jshint esversion: 6
import React from 'react'
import {
    InputGroup,
} from 'reactstrap';




const MyInput = ( {message, setMessage, sendMessage} ) => {
    
    return (
    <InputGroup className='px-2 text-box'>
        <input  className='p-0 form-control' placeholder="Answer a question..." onChange={(e) => setMessage(e.target.value)} value={message} onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}  />
        <button className='btn btn-success' type='submit' onClick={(e) => sendMessage(e)} >Send</button>
    </InputGroup>
    )
}

export default MyInput