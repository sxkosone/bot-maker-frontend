import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Navbar from './Containers/Navbar';
import WelcomeContainer from './Containers/WelcomeContainer';
import BotMakerContainer from './Containers/BotMakerContainer';
import BotChatContainer from './Containers/BotChatContainer';
import LoginSignup from './Components/LoginSignup';
import UserPage from './Containers/UserPage';
import BotPage from './Containers/BotPage';
import SaveBotAndUser from './Components/SaveBotAndUser';
import EditUsersBot from './Containers/EditUsersBot';
import BotTraining from './Containers/BotTraining';


class App extends Component {
  
  logout = () => {
    localStorage.clear()
    
    //redirecting
    const saveState = {
          goal: "redirect user to front page after logged out"
        };
         
    window.history.pushState(saveState, "", "/");

    this.props.addLoggedOutMessage("You're now logged out")
    setTimeout(this.props.clearMessage, 5000)
    this.props.clearCurrentUserFromState()
    this.props.clearScripts()
  }
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar logout={this.logout}/>
        {this.props.info ? <p className="info-message">{this.props.info}</p> : null}
        {this.props.error ? <p className="error-message">{this.props.error}</p> : null}
        <Switch>
          <Route exact path="/" component={WelcomeContainer} />
          <Route path="/create" component={BotMakerContainer} />
          <Route path="/chat" component={BotChatContainer} />
          <Route path="/login" component={LoginSignup} />
          <Route path="/my-page" component={UserPage} />
          <Route path='/bots/:id' render={(props) => {
            let botId = props.match.params.id
            return <BotPage botId={botId}/>
          }} />
          <Route path='/training/:id' render={(props) => {
            let botId = props.match.params.id
            return <BotTraining botId={botId}/>
          }} />
          <Route path="/save-bot" component={SaveBotAndUser} />
          <Route path="/edit-bot/:id" render={(props) => {
            let urlId = props.match.params.id
            return <EditUsersBot urlId={urlId}/>}
          }
             />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    info: state.messages.info,
    error: state.messages.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLoggedOutMessage: (message) => dispatch({ type: "ADD_INFO_MESSAGE", info: message }),
    clearMessage: () => dispatch({ type: "ERASE_INFO_MESSAGE" }),
    clearCurrentUserFromState: () => dispatch({ type: "LOG_OUT" }),
    clearScripts: () => dispatch({ type: "CLEAR_SCRIPTS" })
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
