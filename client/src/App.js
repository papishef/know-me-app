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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
