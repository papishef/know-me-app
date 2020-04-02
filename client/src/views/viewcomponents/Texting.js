import React from 'react'
import {
    Input,
    InputGroup,
    InputGroupText,
    InputGroupAddon
} from 'reactstrap'

const Texting = () => {
    return (
        <div className='text-box'>
            <InputGroup className='p-0'>
                <Input  className='p-0' placeholder="" />
                <InputGroupAddon addonType="append">
                <InputGroupText>Send</InputGroupText>
                </InputGroupAddon>
            </InputGroup>
      <br />
        </div>
    )
}
export default Texting