import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from "react-router-dom";
// import { BrowserRouter } from 'react-router-dom';

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
  
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Navbar />
        
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



// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;