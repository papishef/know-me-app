//jshint esversion: 6
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Logo from '../assets/playroom-logo.png';
import { Container, Button } from 'reactstrap';
import { useLocation, Redirect } from 'react-router-dom';
import Hot from '../assets/sex2.png';
import Love from '../assets/smiley.png';
import Casual from '../assets/social.png';
import queryString from 'query-string';
import { css } from "@emotion/core";
import PacmanLoader from "react-spinners/RingLoader";

///css rules from emotion/core for ringloader
const loaderCss = css `
    display: block;
    position: absolute;
    top: 20%;
    left: 20%;
`;

export default function Results() {

    const location = useLocation();

    const [resultData, setResultData] = useState({});
    const [playAgain, setPlayAgain] = useState(false);
    const [roomID, setRoomID] = useState("");
    const [loading, setLoading] = useState(true);

  //question state
useEffect(() => {
    const {roomID} = queryString.parse(location.search);
    setRoomID(roomID);

    axios.get(`https://limitless-river-10398.herokuapp.com/results/${roomID}`)
    .then(res => {
      const data = res.data;
        //console.log(data)
      setResultData(data.maxEl);

    }).then(() => {
      setLoading(false);
    })
    .catch(error => {
      console.log(error.response);
  });

},[location.search]);

  useEffect(() => {
    console.log(resultData);
  });

  
const endCurrentGame = () => {
    setPlayAgain(true);
};

    //Delete all question history from database
    useEffect(() => {

        axios.delete(`https://limitless-river-10398.herokuapp.com/deleteQuestHistory/${roomID}`);
    
    }, [playAgain, roomID]);



    return (
        <div className='page-wrapper'>
            <Container>
                <div><img className='logo pt-4' src={Logo} alt='logo' /></div>
                <Container className='pt-4'>
                    <p className='text-light font-weight-bold text-center'>SNEEK GIST<span role="img"  aria-labelledby="zip it">🤐</span></p>  
                    <div className='container'>
                        <div className='smiley-wrapper'>
                            {resultData === 'casual' ? <img src={Casual} className='mx-auto smiley' alt='#'/>
                            : resultData === 'sexual' ? <img src={Hot} className='mx-auto smiley' alt='#'/>
                            : resultData === 'personal' ? <img src={Love} className='mx-auto smiley' alt='#'/>
                            : null}
                        </div>
                        {resultData === 'casual' ? <p className='text-light font-weight-bold text-center pt-3'>PARTY BUDDY</p>
                        : resultData === 'sexual' ? <p className='text-light font-weight-bold text-center pt-3'>SMASH</p>
                        : resultData === 'personal' ? <p className='text-light font-weight-bold text-center pt-3'>RELATIONSHIP</p>
                        : <PacmanLoader css={loaderCss} size={250} color={"#c525cd"} loading={loading} />}
                        
                        {resultData === 'casual' ? <p className='text-light text-center pt-3'>Can you roll a blunt? Cuz this bloke is definitely a friend to keep!</p>
                        : resultData === 'sexual' ? <p className='text-light text-center pt-3'>There is a lot of sexual energy between you two you know, and here at PlayRoom we call that a smash!!! 80 percent chance to get laid and 20 percent chance you fuck it up.</p>
                        : resultData === 'personal' ? <p className='text-light text-center pt-3'>Someone's crushing on you, something sweet might just brew up between you two... We will wait and see.</p>
                        : null}

                    </div>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button style={{background: 'transparent', border: 'solid 2px white'}} onClick={endCurrentGame} >Play again</Button>
                        { playAgain && <Redirect to = "/" /> }
                    </div>
                </Container>
            </Container>
        </div>
    )
}
