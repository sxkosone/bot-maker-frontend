import React, { Component } from 'react';
import Navbar from './Containers/Navbar';
import WelcomeContainer from './Containers/WelcomeContainer'
import BotMakerContainer from './Containers/BotMakerContainer'
import {Route, Link, Switch} from "react-router-dom";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={WelcomeContainer} />
        <Switch>
          <Route path="/create" component={BotMakerContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
