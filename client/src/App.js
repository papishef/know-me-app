//jshint esversion: 6
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import SignIn from './views/SignIn';
import Invitation from './views/Invitation';
import Chat from './views/chat';
import TermsOfService from './views/TermsOfService';
import HowToPlay from './views/HowToPlay';
import Results from './views/Results';
import PrivacyPolicy from './views/viewcomponents/PrivacyPolicy';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
            <Route exact path="/">
              <SignIn />
            </Route>
            <Route path="/invite">
              <Invitation />
            </Route>
            <Route path="/chat">
              <Chat />
            </Route>
            <Route path="/terms">
              <TermsOfService />
            </Route>
            <Route path="/how-to-play">
              <HowToPlay />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
            <Route path="/privacy">
              <PrivacyPolicy />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
