//jshint esversion: 6
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Logo from '../assets/playroom-logo.png';
import { Container, NavLink, Button } from 'reactstrap';
import Hot from '../assets/smiley.png';

export default function Results({roomID}) {

    const [resultData, setResultData] = useState({});

    let socket;
//question state
useEffect(() => {
    axios.get(`http://localhost:4000/${roomID}`)
    .then(res => {
      const data = res.data.resultData;

      setResultData(data);

    })
    .catch(error => {
      console.log(error.response);
  });

  },[]);

  //on final disconect
useEffect(() => {

    return () => {
        socket.emit("disconnect");
        socket.off();
    };

  },[]);



    return (
        <div className='page-wrapper'>
            <Container>
                <div><img className='logo pt-4' src={Logo} alt='logo' /></div>
                <Container className='pt-4'>
                    <p className='text-light font-weight-bold text-center'>SNEEK GIST🤐</p>  
                    <div className='container'>
                        <img src={Hot} className='mx-auto smiley d-inline-block' alt='#'/>
                        <p className='h2 font-weight-bold text-white pt-3 text-center'>89%</p>
                        <p className='text-light font-weight-bold text-center pt-3'>SMASH</p>
                        <p className='text-light text-center pt-3'>Don't fuck this up!!!</p>
                    </div>
                    <div className='row pt-4'>
                        <div className='col-4'>
                            <Button style={{background: 'transparent', border: 'solid 2px white'}}>End</Button>
                        </div>
                        <div className='col-3'></div>
                        <div className='col-5'>
                            <Button style={{background: 'transparent', border: 'solid 2px white'}}>Play again</Button>
                        </div>
                    </div>

                </Container>
            </Container>
        </div>
    )
}
