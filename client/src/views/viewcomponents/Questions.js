//jshint esversion: 6
import React, { useState } from 'react';
import { InputGroup } from 'reactstrap';


const Questions = (props) => {

  const [question, setQuestion] = useState('')
  
  
  const selectQuestion = (e) => {
    setQuestion(e.target.value);
    }

  return (
    <div>
      <InputGroup className='pt-4'>
        <select value={question} onChange={selectQuestion} 
          style={{borderRadius: 5, height: 35}}>
            <option>Pick a question</option> 
             <option value="id">what is you birthdate?</option>
             <option value="id">Have you smoked before?</option>
        </select>
      </InputGroup>
    </div>
  );
}

export default Questions;