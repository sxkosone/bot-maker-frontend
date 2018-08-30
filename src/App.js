import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";

import Navbar from './Containers/Navbar';
import WelcomeContainer from './Containers/WelcomeContainer'
import BotMakerContainer from './Containers/BotMakerContainer'
import BotChatContainer from './Containers/BotChatContainer';
import LoginSignup from './Components/LoginSignup'
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Route exact path="/" component={WelcomeContainer} />
        <Switch>
          <Route path="/create" component={BotMakerContainer} />
          <Route path="/chat" component={BotChatContainer} />
          <Route path="/login" component={LoginSignup} />
        </Switch>
      </div>
    );
  }
}

export default App;
