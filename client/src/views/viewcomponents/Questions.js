//jshint esversion: 6
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup } from 'reactstrap';


const Questions = (props) => {

  const [question, setQuestion] = useState({})

  useEffect(() => {
    axios.get(`http://localhost:4000/questions`)
    .then(res => {
      const data = res.data;
      console.log(data);
      setQuestion(data.allQuestions);
      console.log(question);
    })
  },[])
  
  
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