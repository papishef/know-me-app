import React from 'react'
import {
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Button
} from 'reactstrap'

const Texting = ( {message, setMessage} ) => {
    
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    
    return (
        <div className='text-box'>
            <form onSubmit={handleSubmit}>
                <InputGroup className='px-3 border-0'>
                    <Input  className='p-0' placeholder="" onChange={(e) => setMessage(e.target.value)}
                            value={message}/>
                    <InputGroupAddon  className='bg-transparent border-0' addonType="append">
                    <InputGroupText className='bg-transparent border-0'>
                        <Button type='submit'>Send</Button>
                    </InputGroupText>
                    </InputGroupAddon>
                </InputGroup>
            </form>
      <br />
        </div>
    )
}
export default Texting