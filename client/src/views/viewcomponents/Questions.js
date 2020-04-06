//jshint esversion: 6
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup } from 'reactstrap';


const Questions = (props) => {

const [question, setQuestion] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/questions`)
    .then(res => {
      const data = res.data.allQuestions;

      setQuestion(data);

    })
    .catch(error => {
      console.log(error);
  });

  },[]);
///This useEffect block triggers when the question variable changes from calling setQuestion in the first useEffect block///////////
  useEffect(() => {
    console.log(question);
  },[question]);
  
  const selectQuestion = (e) => {
    setQuestion(e.target.value);
    };

  return (
    <div>

       <InputGroup className='pt-4'>
        <select value={question} onChange={selectQuestion} 
          style={{borderRadius: 5, height: 35}}>
            <option>Pick a question</option> 
          {question.map((question) => <option key={question.key} value={question.q} >{question.q}</option>)} 
        </select>
      </InputGroup>
    </div>
  );
}

export default Questions;