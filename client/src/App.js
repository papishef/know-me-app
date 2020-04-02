//jshint esversion: 6
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Onboarding from './views/Onboarding';
import SignIn from './views/SignIn'
import Invitation from './views/Invitation';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/onboard">
            <Onboarding />
          </Route>
          <Route path="/signin">
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
