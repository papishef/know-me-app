//jshint esversion: 6
import React from 'react'
import {
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Button
} from 'reactstrap';




const MyInput = ( {message, setMessage, handleSubmit} ) => 

    // let socket = io("http://localhost:4000");
    // ///////////////////////SEND MESSAGE///////////////


    
    // return (

    // )

    <form onSubmit={(e) => handleSubmit(e)}>
        <InputGroup className='px-3 border-0'>
            <Input  className='p-0' placeholder="Answer a question..." onChange={(e) => setMessage(e.target.value)} value={message} onKeyPress={event => event.key === 'Enter' ? handleSubmit(event) : null}  />
            <InputGroupAddon  className='bg-transparent border-0' addonType="append">
            <InputGroupText className='bg-transparent border-0 mb-5'>
                <Button type='submit' >Send</Button>
            </InputGroupText>
            </InputGroupAddon>
        </InputGroup>
    </form>

export default MyInput