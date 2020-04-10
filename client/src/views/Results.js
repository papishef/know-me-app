//jshint esversion: 6
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Logo from '../assets/playroom-logo.png';
import { Container, NavLink, Button } from 'reactstrap';
import { useLocation, Redirect } from 'react-router-dom';
import Hot from '../assets/sex2.png';
import Love from '../assets/smiley.png';
import Casual from '../assets/social.png';
import queryString from 'query-string';

export default function Results() {

    const location = useLocation();

    const [resultData, setResultData] = useState({});
    const [playAgain, setPlayAgain] = useState(false);
    const [roomID, setRoomID] = useState("");

  //question state
useEffect(() => {

    const {roomID} = queryString.parse(location.search);
    setRoomID(roomID);

    axios.get(`http://localhost:4000/results/${roomID}`)
    .then(res => {
      const data = res.data;
        //console.log(data)
      setResultData(data.maxEl);

    })
    .catch(error => {
      console.log(error.response);
  });

  },[]);

  useEffect(() => {
    console.log(resultData);
  });

  
const endCurrentGame = () => {
    setPlayAgain(true);
};

    //Delete all question history from database
    useEffect(() => {

        axios.delete(`http://localhost:4000/deleteQuestHistory/${roomID}`);
    
    }, [playAgain]);



    return (
        <div className='page-wrapper'>
            <Container>
                <div><img className='logo pt-4' src={Logo} alt='logo' /></div>
                <Container className='pt-4'>
                    <p className='text-light font-weight-bold text-center'>SNEEK GIST🤐</p>  
                    <div className='container'>
                        {resultData === 'casual' ? <img src={Casual} className='mx-auto smiley d-inline-block' alt='#'/>
                        : resultData === 'sexual' ? <img src={Hot} className='mx-auto smiley d-inline-block' alt='#'/>
                        : <img src={Love} className='mx-auto smiley d-inline-block' alt='#'/>}

                        {resultData === 'casual' ? <p className='text-light font-weight-bold text-center pt-3'>PARTY BUDDY</p>
                        : resultData === 'sexual' ? <p className='text-light font-weight-bold text-center pt-3'>SMASH</p>
                        : <p className='text-light font-weight-bold text-center pt-3'>RELATIONSHIP</p>}
                        
                        {resultData === 'casual' ? <p className='text-light text-center pt-3'>Can you roll a blunt?</p>
                        : resultData === 'sexual' ? <p className='text-light text-center pt-3'>Don't fuck this up!!!</p>
                        : <p className='text-light text-center pt-3'>Someone's crushing on you</p>}

                    </div>
                    <div className='row pt-4'>
                        <div className='col-4'>
                            <Button style={{background: 'transparent', border: 'solid 2px white'}}>End</Button>
                        </div>
                        <div className='col-3'></div>
                        <div className='col-5'>
                            <Button style={{background: 'transparent', border: 'solid 2px white'}} onClick={endCurrentGame} >Play again</Button>
                            { playAgain && <Redirect to = "/" /> }
                        </div>
                    </div>
                </Container>
            </Container>
        </div>
    )
}
