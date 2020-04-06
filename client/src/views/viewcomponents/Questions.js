//jshint esversion: 6
import React, { useState, useEffect } from 'react';

import { InputGroup } from 'reactstrap';


const Questions = ({question}, selectQuestion) => {

  return (
    <div>
       <InputGroup className='pt-4'>
        <select className='qst-wrapper' value={question} onChange={selectQuestion}>
            <option className='qst-list'>Pick a question</option> 
          {question.map((question) => <option className='qst-list' key={question.key} value={question.q} >{question.q}</option>)} 
        </select>
      </InputGroup>
    </div>
  );
}

export default Questions;