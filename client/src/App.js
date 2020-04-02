//jshint esversion: 6
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import SignIn from './views/SignIn'
import Invitation from './views/Invitation';
import Chat from './views/chat'

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
