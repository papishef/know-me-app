import React from 'react'
import {
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Button
} from 'reactstrap'

const Texting = ( props ) => {
    return (
        <div className='text-box'>
            <form>
                <InputGroup className='px-3 border-0'>
                    <Input  className='p-0' placeholder="" 
                            value={props.message}/>
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