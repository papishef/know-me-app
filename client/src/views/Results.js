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
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import io from 'socket.io-client';

///css rules from emotion/core for ringloader
const loaderCss = css `
    display: block;
    position: absolute;
    top: 40%;
    left: 35%;
`;

let socket;

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

    //Delete all chats from room when session ends
  useEffect(() => {
    const {roomID} = queryString.parse(location.search);
    setRoomID(roomID);
    axios.delete(`https://limitless-river-10398.herokuapp.com/delete/${roomID}`)
    .then((err, res) => {
      if (err) throw err;
      return res;
    });
  }, []);

  //on final disconect
  useEffect(() => {
    socket = io("https://limitless-river-10398.herokuapp.com/");
    return () => {
        socket.emit("disconnect");
        socket.off();
    };
  },[]);

  useEffect(() => {
    console.log(resultData);
  });

  
const endCurrentGame = () => {
    setPlayAgain(true);
};

    //Delete all question history from database
    useEffect(() => {
      const {roomID} = queryString.parse(location.search);
      setRoomID(roomID);
      axios.delete(`https://limitless-river-10398.herokuapp.com/deleteQuestHistory/${roomID}`);
    
    }, [playAgain]);



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
                        : <ClimbingBoxLoader css={loaderCss} size={25} color={"#c525cd"} loading={loading} />}
                        {loading && <p className= "text-center ml-3" style={{zIndex: 9999, textAlign: "center", marginTop: "40vh", color: "white", fontFamily: "Comic Sans MS", fontSize: 22, fontWeight: 900}}>Fetching result data... Please wait</p>}
                        {resultData === 'casual' ? <p className='text-light text-center pt-3'>Can you roll a blunt? Cuz this bloke is definitely a friend to keep!</p>
                        : resultData === 'sexual' ? <p className='text-light text-center pt-3'>There is a lot of sexual energy between you two you know, and here at PlayRoom we call that a smash!!! 80 percent chance to get laid and 20 percent chance you fuck it up.</p>
                        : resultData === 'personal' ? <p className='text-light text-center pt-3'>Someone's crushing on you, something sweet might just brew up between you two... We will wait and see.</p>
                        : resultData === null ? <div>No result data found</div>
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
